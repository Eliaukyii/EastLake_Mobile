import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import axios from "axios";
import URL from "../../../public/api/serverAPI.config";
import { Link } from "react-router-dom";
import HomeFunc from "../homepage/component/HomeFunc";
import Tips from "../commonComp/TipsComp";
import { AllMenu } from "../config/commonConfig";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayYearHome extends React.Component {
    @observable data = {
        tipsText: '',
        isShowTips: false,
        version: BaseComm.UrlVersion()
    };

    @observable AllMenu = AllMenu;

    handleClickBack = () => {
        this.props.history.go(-1);
    };

    componentDidMount() {
        let allMenu = sessionStorage.getItem('allMenu');
        if (allMenu !== null && allMenu !== undefined) {
            this.AllMenu = JSON.parse(allMenu);
        }
    }

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
            <div className="wrapper">
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <HeadTitle titleTxt="薪资首页" handleClickBack={this.handleClickBack} />
                    <div className="detail-query">
                        <div className="detail-content marginDetail">
                            <Link to={'/home/payYearHome/payThisMonth?' + this.data.version}>
                                <HomeFunc isShow={this.AllMenu[6].isShow ? true : false}
                                    iconName="icon-accountPay" funcName="本月查询" />
                            </Link>
                            <Link to={'/home/payYearHome/payYearDetail?' + this.data.version}>
                                <HomeFunc isShow={this.AllMenu[7].isShow ? true : false}
                                    iconName="icon-accountPay" funcName="自然年查询" />
                            </Link>
                            <Link to={'/home/payYearHome/payMonthDetail?' + this.data.version}>
                                <HomeFunc isShow={this.AllMenu[6].isShow ? true : false}
                                    iconName="icon-accountPay" funcName="自定义查询" />
                            </Link>
                            <Link to={'/home/payYearHome/payContrastDetail?' + this.data.version}>
                                <HomeFunc isShow={this.AllMenu[6].isShow ? true : false}
                                    iconName="icon-accountPay" funcName="对比查询" />
                            </Link>
                            <Link to={'/home/payYearHome/PayAllowanceDetail?' + this.data.version}>
                                <HomeFunc isShow={this.AllMenu[6].isShow ? true : false}
                                    iconName="icon-accountPay" funcName="薪酬明细" />
                            </Link>
                            {/*<HomeFunc iconName="icon-accountPay" funcName="分月统计查询" handleClick={this.handleClickFunc}/>*/}
                        </div>
                    </div>
                </div>
                <style>{`
                    .marginDetail{
                        margin-top: 1rem;
                    }
                `}</style>
            </div>
        )
    }

}
export default PayYearHome;
