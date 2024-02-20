import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import axios from "axios";
import URL from "../../../public/api/serverAPI.config"
import Tips from "../commonComp/TipsComp";
import { HeadTitle } from "../commonComp/HeadTitle";
import { MonthDetailItem, MonthDetailsItem } from "./component/PayYearItem";
import NoData from "../commonComp/NoData";
import SelectYearBtn from "./component/SelectYearBtn";
import moment from "moment";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayContrastDetail extends React.Component {
    @observable data = {
        userid: '',
        params: {
            type: 'YearPay',
            year: '',
            month: '',
        },
        payAll: [
            [], []
        ],
        payYearDetail: [],
        payYearDetails: [],
        payYearCurrent: [],
        payOneTime: '',
        payTwoTime: '',
        childShow: true,
        page: 1,
        noData: false,
        tipsText: '',
        isShowTips: false,
        timeParams: {
            isOpen: false,
            max: '',
        },
        currentSteps: 1,
        confirmText: '下一步'
    };
    @observable dateConfig = {
        'year': {
            format: 'YYYY',
            caption: 'Year',
            step: 1,
        },
        'month': {
            format: 'MM',
            caption: 'Mon',
            step: 1,
        }
    };

    handleClickBack = () => {
        this.props.history.go(-1);
    };

    componentDidMount() {
        this.data.userid = BaseComm.GetLoginID();
        this.data.params.year = new Date().getFullYear();
        this.data.params.month = new Date().getMonth() + 1;
    }

    payYearDetail = (year, month) => {
        axios({
            url: URL.histPay,
            params: {
                type: this.data.params.type,
                userid: this.data.userid,
                json: {
                    year: year,
                    month: month
                }
            },
            method: 'post'
        }).then((res) => {
            if (res.data) {
                let obj = res.data; //eval('(' + res.data + ')');
                let pay = obj.Pays;//obj[0].Pays;
                if (pay.length > 0 && pay[0].AccYear == year && pay[0].AccMonth == month) {
                    this.data.noData = false;
                    if (this.data.currentSteps === 1) {
                        this.data.payOneTime = "" + year + "年" + month + "月";
                        this.data.payYearCurrent = pay;
                        this.data.currentSteps = 2;
                        this.data.confirmText = '完成';
                    } else {
                        this.data.payTwoTime = "" + year + "年" + month + "月";
                        this.data.payYearDetail = this.data.payYearCurrent;
                        this.data.payYearDetails = pay;
                        this.data.currentSteps = 1;
                        this.data.confirmText = '下一步';
                    }
                } else {
                    this.data.noData = true;
                }
            } else {
                this.data.timeParams.isOpen = false;
                this.data.isShowTips = true;
                this.data.tipsText = '暂无该月薪资请重新选择！';
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1500);
            }
        }).catch(reason => {
            this.data.noData = true;
            this.data.isShowTips = true;
            this.data.tipsText = "接口异常！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
        });
    };

    handleClickTime = () => {
        if (this.data.currentSteps === 1) {
            this.data.timeParams.isOpen = true;
            this.data.payYearDetail = [];
            this.data.payYearDetails = [];
            this.data.payOneTime = '';
            this.data.payTwoTime = '';
            this.data.timeParams.max = new Date();
        } else {
            this.data.timeParams.isOpen = true;
        }
    };

    handleSelectDate = (date) => {
        if (this.data.currentSteps === 1) {
            this.data.params.year = moment(date).format('YYYY');
            this.data.params.month = moment(date).format('MM');
            this.data.payYearDetail = [];
            this.payYearDetail(this.data.params.year, this.data.params.month);
        } else {
            this.data.timeParams.isOpen = false;
            this.data.params.year = moment(date).format('YYYY');
            this.data.params.month = moment(date).format('MM');
            this.data.payYearDetails = [];
            this.payYearDetail(this.data.params.year, this.data.params.month);
        }
    };

    handleCancelDate = () => {
        this.data.timeParams.isOpen = false;
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <HeadTitle titleTxt="对比查询" handleClickBack={this.handleClickBack} />
                    <div className="list-content list-bomMar" ref={content => { this.content = content }}>
                        <div className="list-title">
                            <div className="type-title">{this.data.payOneTime || "工资一"}</div>
                            <div className="pay-title">{this.data.payTwoTime || "工资二"}</div>
                        </div>
                        <div className="list-allBox">
                            <div className="list-flex">
                                {this.data.payYearDetail.map(item => (
                                    <MonthDetailsItem item={item} key={item.ColCode}
                                        childShow={this.data.childShow}
                                    />
                                ))}
                            </div>
                            <div className="list-flex">
                                {this.data.payYearDetails.map(item => (
                                    <MonthDetailsItem item={item} key={item.ColCode}
                                        childShow={this.data.childShow}
                                    />
                                ))}
                            </div>
                        </div>
                        <NoData noData={this.data.noData} />
                    </div>
                    <SelectYearBtn iptTxt="选择比对的薪酬" dateConfig={this.dateConfig}
                        timeParams={this.data.timeParams} confirmText={this.data.confirmText}
                        handleClickTime={this.handleClickTime}
                        handleSelectDate={this.handleSelectDate}
                        handleCancelDate={this.handleCancelDate}
                    />
                </div>
                <style>{`
                    .list-allBox{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                        position: relative;
                        width: 100%;
                    }
                    .list-flex{
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        display: -webkit-flex;
                        display: flex;
                        -webkit-flex-direction:column;
                        flex-direction: column;
                        position: relative;
                        width: 50%;
                    }
                    .list-flex+.list-flex{
                        border-left: 1px solid #333333;
                    }
                    .list-title{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                        width:100%;
                        height: 0.8rem;
                        padding: 0.28rem;
                        border-bottom: 1px solid #cdcdcd;
                        background: #fff;
                    }
                    .type-title{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        font-size: 0.3rem;
                        font-weight: bold;
                        align-items: center;
                    }
                    .pay-title{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        font-size: 0.3rem;
                        font-weight: bold;
                        align-items: center;
                        justify-content: flex-end;
                    }
                `}</style>
            </div>
        )
    }
}
export default PayContrastDetail;