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
import bgdeclareHome from "../../img/background/bg-declareHome.png";
import BaseComm from "../commonInterface/BaseComm";


@observer
class QueryHome extends React.Component {
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
            <div className={`wrapper ${this.props.currentIndex === 'query' ? 'show' : 'hide'}`}>
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <div className="queryHomeBg">
                        <div className="homeBgTxt">综合查询</div>
                        <div className="homeBgEg">Comprehensive query</div>
                    </div>
                    <div className="detail-query">
                        <div className={this.props.AllMenu[6].isShow ? "detail-div" : this.props.AllMenu[7].isShow ? "detail-div" : 'hide'}>
                            <div className="queryTit">
                                <div className="diamond" />
                                个人查询
                            </div>
                            <div className="detail-content">
                                <Link to={'/home/payYearHome?' + this.data.version}>
                                    <HomeFunc isShow={this.props.AllMenu[6].isShow ? true : this.props.AllMenu[7].isShow ? true : false}
                                        iconName="icon-accountPay" funcName="工资查询" />
                                </Link>
                                <Link to={'/home/PayDebtDetail?' + this.data.version}>
                                    <HomeFunc isShow={"funcBox"} iconName="icon-accountPay" funcName="欠款查询" />
                                </Link>
                            </div>
                        </div>
                        <div className={this.props.AllMenu[0].isShow ? "detail-div" : this.props.AllMenu[4].isShow ? "detail-div" :
                            this.props.AllMenu[8].isShow ? "detail-div" : this.props.AllMenu[10].isShow ? "detail-div" : 'hide'}>
                            {/* <div className="queryTit">
                                <div className="diamond" />
                                公共查询
                            </div> */}
                            <div className="detail-content">
                                <Link to={'/home/payManageList?1&' + this.data.version}>
                                    <HomeFunc isShow={this.props.AllMenu[4].isShow ? true : false}
                                        iconName="icon-payManage" funcName="薪酬查询" />
                                </Link>
                                {/* <Link to={'/home/payExpenseList?1&' + this.data.version}>
                                    <HomeFunc isShow={this.props.AllMenu[0].isShow ? true : false}
                                        iconName="icon-payExpense" funcName="报销查询" />
                                </Link> */}
                                {/*<HomeFunc iconName="icon-accountPay" funcName="欠款查询" handleClick={this.handleClickFunc}/>*/}
                                {/* <Link to={'/home/payBorrowList?1&' + this.data.version}>
                                    <HomeFunc isShow={this.props.AllMenu[10].isShow ? true : false}
                                        iconName="icon-payBorrow" funcName="借支查询" />
                                </Link>
                                <Link to={'/home/payAllowanceList?1&' + this.data.version}>
                                    <HomeFunc isShow={this.props.AllMenu[8].isShow ? true : false}
                                        iconName="icon-payAllowance" funcName="往来查询" />
                                </Link> */}
                            </div>
                        </div>
                        {/* <div className={this.props.AllMenu[12].isShow ? "detail-div" : this.props.AllMenu[13].isShow ? "detail-div" : 'hide'}>
                            <div className="queryTit">
                                <div className="diamond" />
                                预算查询
                            </div>
                            <div className="detail-content">
                                <Link to={'/home/itemTree?' + this.data.version}>
                                    <HomeFunc isShow={this.props.AllMenu[12].isShow ? true : false}
                                        iconName="icon-payAllowance" funcName="预算执行" />
                                </Link>
                                <Link to={'/home/itemTree2?' + this.data.version}>
                                    <HomeFunc isShow={this.props.AllMenu[13].isShow ? true : false}
                                        iconName="icon-payAllowance" funcName="下发分配" />
                                </Link>
                            </div>
                        </div> */}
                    </div>
                </div>
                <style>{`
                .queryHomeBg {
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
                }`}</style>
            </div>
        )
    }
}
export default QueryHome;