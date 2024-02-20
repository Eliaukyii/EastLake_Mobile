import React, { Fragment } from 'react'
import { HeadTitle } from "../commonComp/HeadTitle";
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import axios from 'axios'
import { YearDetailItem } from "./component/PayYearItem";
import moment from "moment";
import SelectYearBtn from "./component/SelectYearBtn";
import NoData from "../commonComp/NoData";
import URL from "../../../public/api/serverAPI.config";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayYearDetail extends React.Component {
    @observable data = {
        userid: '',
        params: {
            type: 'AllisPay2',
        },
        payYearList: [],
        payYear: '',
        selectYear: '',
        keyword: '',
        noData: false,
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
        }
    };

    handleClickBack = () => {
        this.props.history.go(-1);
    };

    componentDidMount() {
        this.data.userid = BaseComm.GetLoginID();
        this.data.selectYear = new Date().getFullYear();
        this.payYearList(this.data.selectYear);
    }

    payYearList = (year) => {
        axios({
            url: URL.histPay,
            params: {
                type: this.data.params.type,
                userid: this.data.userid,
                json: '',
                Year:this.data.selectYear
            },
            method: 'post'
        }).then((res) => {
            this.data.payYearList = res.data;
            for (let i = 0; i < this.data.payYearList.length; i++) {
                if (parseInt(this.data.payYearList[i].AccYear) == year) {
                    this.data.payYear = this.data.payYearList[i]
                }
            }
            if (!this.data.payYear) {
                this.data.noData = true;
            } else {
                this.data.noData = false;
            }
        });
    };

     handleClickTime =()=>{
         this.data.timeParams.isOpen = true;
         this.data.timeParams.max = new Date();
     };
    
     handleSelectDate =(date)=>{
         this.data.timeParams.isOpen = false;
         this.data.selectYear = moment(date).format('YYYY');
         console.log(this.data.selectYear);
         this.data.payYear = '';
         this.payYearList(parseInt(this.data.selectYear));
     };
    
     handleCancelDate =()=>{
         this.data.timeParams.isOpen = false;
     };

     handleClickDetail =()=>{
         window.location.href = '/home/payMonthDetail';
     };


    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail">
                    <HeadTitle titleTxt={`${this.data.selectYear || ''}年自然年薪酬`} handleClickBack={this.handleClickBack} />
                    <div className="list-contentB" ref={content => { this.content = content }}>
                        {this.data.payYear ?
                            <Fragment>
                                <YearDetailItem item={this.data.payYear} />
                                {/*<div className="checkDtl" onClick={this.handleClickDetail}><div className="goTri"/>查看每月薪酬明细</div>*/}
                            </Fragment>
                            : null
                        }
                        <NoData noData={this.data.noData} />
                    </div>
                    <SelectYearBtn iptTxt="请选择年份" dateConfig={this.dateConfig}
                                   timeParams={this.data.timeParams}
                                   handleClickTime={this.handleClickTime}
                                   handleSelectDate={this.handleSelectDate}
                                   handleCancelDate={this.handleCancelDate}
                    />
                </div>
                <style>{`
                    .checkDtl{
                        position: relative;
                        float:right;
                        margin-top: 0.28rem;
                        margin-right: 0.28rem;
                        font-size: 0.26rem;
                        color: red;
                    }
                    .goTri{
                        float:left;
                        width: 0;
                        height: 0;
                        border: 0.15rem solid;
                        border-color: transparent transparent  transparent #197efe;
                    }
                `}</style>
            </div>
        )
    }
}

export default PayYearDetail;