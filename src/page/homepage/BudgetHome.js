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
import BaseComm from "../commonInterface/BaseComm";

@observer
class BudgetHome extends React.Component {
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
            <div className={`wrapper ${this.props.currentIndex === 'budget' ? 'show' : 'hide'}`}>
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <div className="declareHomeBg">
                        <div className="homeBgTxt">预算管理</div>
                        <div className="homeBgEg">Declaration management</div>
                    </div>
                    <div className="detail-query">
                        <div className="detail-content">
                            <Link to={'/home/PayDelegateList?' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[2].isShow ? true : false}
                                    iconName="icon-payExpense" funcName="下发申报" />
                            </Link>
                            <Link to={'/home/PayAllocationList?' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[3].isShow ? true : false}
                                    iconName="icon-payExpense" funcName="分配申报" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default BudgetHome;