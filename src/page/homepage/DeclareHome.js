import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import axios from "axios";
import URL from "../../../public/api/serverAPI.config"
import Tips from "../commonComp/TipsComp";
import { HeadTitle } from "../commonComp/HeadTitle";
import HomeFunc from "./component/HomeFunc";
import { Link } from "react-router-dom";
import { AllMenu } from "../config/commonConfig";
import bgdeclareHome from '../../img/background/bg-declareHome.png';
import BaseComm from "../commonInterface/BaseComm";

@observer
class DeclareHome extends React.Component {
    @observable data = {
        version: BaseComm.UrlVersion()
    };

    handleClickFunc = (e) => {
        this.data.isShowTips = true;
        this.data.tipsText = "暂不开放，仍在完善";
        setTimeout(() => {
            this.data.isShowTips = false;
            this.data.tipsText = '';
        }, 1000);
        e.stopPropagation();
    };

    render() {
        return (
            <div className={`wrapper ${this.props.currentIndex === 'declare' ? 'show' : 'hide'}`}>
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <div className="declareHomeBg">
                        <div className="homeBgTxt">申报管理</div>
                        <div className="homeBgEg">Declaration management</div>
                    </div>
                    <div className="detail-query">
                        <div className="detail-content">
                            {/*<Link to="/home/payManageAdd">*/}
                            {/*    <HomeFunc iconName="icon-payManage" funcName="薪酬申报"/>*/}
                            {/*</Link>*/}
                            <Link to={'/home/payExpenseAdd?' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[0].isShow ? true : false}
                                    iconName="icon-payExpense" funcName="报销申报" />
                            </Link>
                            {/*<Link to="/home/queryHome/payDebtList?4">*/}
                            {/*    <HomeFunc iconName="icon-accountPay" funcName="欠款申报"/>*/}
                            {/*</Link>*/}
                            <Link to={'/home/payBorrowAdd?' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[10].isShow ? true : false}
                                    iconName="icon-payBorrow" funcName="借支申报" />
                            </Link>
                            <Link to={'/home/payAllowanceAdd?' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[8].isShow ? true : false}
                                    iconName="icon-payAllowance" funcName="往来申报" />
                            </Link>
                        </div>
                    </div>
                </div>
                <style>{`
                .declareHomeBg {
                    position: relative;
                    width: 100%;
                    height: 2.7rem;
                    background: url('`+ bgdeclareHome + `') no-repeat;
                    background-size: 100% 100%;
                    -webkit-background-size: 100% 100%;
                    -moz-background-size: 100% 100%;
                    -o-background-size: 100% 100%;
                    padding: 0.28rem;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    flex-direction: column;
                    -webkit-flex-direction: column;
                    align-items: flex-start;
                }
                `}</style>
            </div >
        )
    }
}
export default DeclareHome;