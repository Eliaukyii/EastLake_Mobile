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
import bgapprovalHome from '../../img/background/bg-approvalHome.png';
import BaseComm from "../commonInterface/BaseComm";


@observer
class ApprovalHome extends React.Component {
    @observable data = {
        version: BaseComm.UrlVersion()
    };

    render() {
        return (
            <div className={`wrapper ${this.props.currentIndex === 'approval' ? 'show' : 'hide'}`}>
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <div className="approvalHomeBg">
                        <div className="homeBgTxt">审批管理</div>
                        <div className="homeBgEg">Audit management</div>
                    </div>
                    <div className="detail-query">
                        <div className="detail-content">
                            <Link to={'/home/payExpenseList?2&' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[1].isShow ? true : false}
                                    iconName="icon-payExpense" funcName="报销审批" />
                            </Link>
                            <Link to={'/home/payManageList?2&' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[5].isShow ? true : false}
                                    iconName="icon-payManage" funcName="薪酬审批" />
                            </Link>
                            <Link to={'/home/payBorrowList?2&' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[11].isShow ? true : false}
                                    iconName="icon-payBorrow" funcName="借支审批" />
                            </Link>
                            <Link to={'/home/payAllowanceList?2&' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[9].isShow ? true : false}
                                    iconName="icon-payAllowance" funcName="往来审批" />
                            </Link>
                        </div>
                    </div>
                </div>
                <style>{`
                .approvalHomeBg {
                    position: relative;
                    width: 100%;
                    height: 2.7rem;
                    background: url('`+ bgapprovalHome + `') no-repeat;
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
            </div>
        )
    }
}
export default ApprovalHome;