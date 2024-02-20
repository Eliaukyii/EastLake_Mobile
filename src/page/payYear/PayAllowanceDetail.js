import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import axios from "axios";
import URL from "../../../public/api/serverAPI.config"
import Tips from "../commonComp/TipsComp";
import { HeadTitle } from "../commonComp/HeadTitle";
import { AllowanceItem } from "./component/PayYearItem";
import NoData from "../commonComp/NoData";
import SelectYearBtn from "./component/SelectYearBtn";
import moment from "moment";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayAllowanceDetail extends React.Component {
    @observable data = {
        params: {
            userid: '',
            type: 'AssistPay',
            year: '',
            month: '',
        },
        AssistPay: [],
        childShow: false,
        page: 1,
        noData: false,
        tipsText: '',
        isShowTips: false,
        timeParams: {
            isOpen: false,
            max: '',
        }
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
        this.payYearDetail(this.data.params.year, this.data.params.month);
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
            console.log(res);
            this.data.isShowTips = false;
            if (res.data) {
                // let obj = res.data; //eval('(' + res.data + ')');
                let pay = res.data;//obj[0].Pays;
                if (pay.length > 0 && pay[0].AccYear == year && parseInt(pay[0].AccMonth) == parseInt(month)) {
                    this.data.noData = false;
                    this.data.AssistPay = pay;
                } else {
                    this.data.noData = true;
                }
            } else {
                this.data.noData = true;
            }
        });
    };

    handleClickTime = () => {
        this.data.timeParams.isOpen = true;
        this.data.timeParams.max = new Date();
    };

    handleSelectDate = (date) => {
        this.data.isShowTips = true;
        this.data.tipsText = '正在查询，请稍等';
        this.data.timeParams.isOpen = false;
        this.data.params.year = moment(date).format('YYYY');
        this.data.params.month = moment(date).format('MM');
        this.data.AssistPay = [];
        this.payYearDetail(this.data.params.year, this.data.params.month);
    };

    handleCancelDate = () => {
        this.data.timeParams.isOpen = false;
    };

    handleClickDetail = () => {
        this.data.childShow = !this.data.childShow;
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <HeadTitle titleTxt={`${this.data.params.year || ''}年${this.data.params.month || ''}月薪酬明细`} handleClickBack={this.handleClickBack} />
                    <div className="list-content" ref={content => { this.content = content }}>
                        <div className={`list-title ${this.data.AssistPay.length ? 'show' : 'hide'}`}>
                            <div className="pay-title">标题</div>
                            <div className="pay-title">部门</div>
                            <div className="pay-title">栏目</div>
                            <div className="pay-title">金额</div>
                        </div>
                        {this.data.AssistPay.map(item => (
                            <AllowanceItem key={item.OddNumber} OddNumber={item.OddNumber}
                                Title={item.Title}
                                DeptName={item.DeptName}
                                ColName={item.ColName}
                                Money={item.Money}
                            />
                        ))}
                        <NoData noData={this.data.noData} />
                    </div>
                    <SelectYearBtn iptTxt="请选择年月" dateConfig={this.dateConfig}
                        timeParams={this.data.timeParams} btnNum={3}
                        handleClickTime={this.handleClickTime}
                        handleSelectDate={this.handleSelectDate}
                        handleCancelDate={this.handleCancelDate}
                        handleClickDetail={this.handleClickDetail}
                    />
                </div>
                <style>{`
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
                        align-items: center;
                    }
                    .type-title{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        font-size: 0.25rem;
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
export default PayAllowanceDetail;