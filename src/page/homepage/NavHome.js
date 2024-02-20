import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import axios from "axios";
import URL from "../../../public/api/serverAPI.config";
import FuncList from "./component/FuncList";
import { Link } from "react-router-dom";
import HomeFunc from "./component/HomeFunc";
import Tips from "../commonComp/TipsComp";
import MyProfile from "./component/MyProfile";
import Footer from "./component/Footer";
import ListTab from "../commonComp/TabBtnComp";
import { AllMenu, CommonConfig, HomeTabData } from "../config/commonConfig";
import LoadMore from "../commonComp/LoadMore";
import NoData from "../commonComp/NoData";
import { NoticeListItem } from "../notice/component/NoticeListItem";
import BaseComm from "../commonInterface/BaseComm";

@observer
class NavHome extends React.Component {
    @observable data = {
        userid: '',
        type: '',
        params: {
            page: 1,
            artName: '政策信息'
        },
        toApList: [],
        currentTab: '0',
        currentIndex: 'home',
        tabData: HomeTabData,
        noticeList: [],
        isLoadingMore: false,
        isShowLoadMore: false,
        moreText: CommonConfig.loadMoreTxt,
        noData: false,
        tipsText: '',
        isShowTips: false,
        version: BaseComm.UrlVersion()
    };

    componentDidMount() {
        this.data.userid = BaseComm.GetLoginID();
    }

    render() {
        return (
            <div className={`wrapper indexZ ${this.props.currentIndex === 'navHome' ? 'show' : 'hide'}`}>
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <div id="list-filterF" className="list-filterF"
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <div className="firstHomeBg">
                        <div className="headCir">
                            <div className="headDf"></div>
                        </div>
                        <div className="useInfo">
                            <div className="useContent">
                                <div>{this.props.userInfo.userName || '冯晓'}</div>
                                <div>{this.props.userInfo.userOrg || '教务处'}</div>
                            </div>
                            <div className="iconfont icon-xiangyou iconMySet" onClick={this.props.handleClick}></div>
                        </div>
                    </div>
                    <div className="detail-query">
                        <div className="detail-content">
                            {/* <Link to={'/home/payYearHome/payThisMonth?' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[6].isShow ? true : this.props.AllMenu[7].isShow ? true : false}
                                    iconName="icon-accountPay" funcName="本月查询" />
                            </Link>
                            <Link to={'/home/payYearHome/payYearDetail?' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[6].isShow ? true : this.props.AllMenu[7].isShow ? true : false}
                                    iconName="icon_home_approval" funcName="自然年查询" />
                            </Link> */}
                            <Link to={'/home/payYearHome/payMonthDetail?' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[6].isShow ? true : this.props.AllMenu[7].isShow ? true : false}
                                    iconName="icon_home_declare" funcName="工资查询" />
                            </Link>
                            {/* <Link to={'/home/payYearHome/payContrastDetail?' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[6].isShow ? true : this.props.AllMenu[7].isShow ? true : false}
                                    iconName="icon_home_myInfo" funcName="对比查询" />
                            </Link>
                            <Link to={'/home/payYearHome/PayAllowanceDetail?' + this.data.version}>
                                <HomeFunc isShow={this.props.AllMenu[6].isShow ? true : this.props.AllMenu[7].isShow ? true : false}
                                    iconName="icon_home_declare" funcName="薪酬明细" />
                            </Link> */}
                          
                        </div>
                        <div className="icon_footBg" />
                    </div>
                </div>
                <style>{`
                    .color_declare{
                        background: #F35544
                    }
                    .color_approval{
                        background: #1677FF
                    }
                    .color_query{
                        background: #83C0EF
                    }
                    .color_notice{
                        background: #FE933D
                    }
                    .color_myset{
                        background: #4D0095
                    }
                    .iconMySet{
                        color: #ffffff;
                        justify-content: flex-end;
                    }
                    .funcSquare{
                        position: relative;
                        width: 1.6rem;
                        height: 1.6rem;
                        border-radius: 0.2rem;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display:flex;
                        flex-direction: column;
                        -webkit-flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: #FFFFFF;
                        font-size: 0.22rem;
                        margin: 0.05rem;
                    }
                    .func_main{
                        position: relative;
                        width: 100%;
                        height:1.7rem;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display:flex;
                        flex-direction: row;
                        -webkit-flex-direction: row;
                        align-items: center;
                        justify-content: center;
                    }
                    .content_mainN{
                        position:relative;
                        width: 100%;
                        padding:0.36rem;
                        background-color: #FFFFFF;
                    }
                    .useInfo{
                        width: calc(100% - 1.4rem);
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        flex-direction: row;
                        -webkit-flex-direction: row;
                        align-items: center;
                        color: #fff;
                    }
                    .useContent{
                        width: 100%;
                        padding: 0.2rem;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        justify-content: flex-start;
                        flex-direction: column;
                        -webkit-flex-direction: column;
                    }
                    .listBotMar{
                        margin-bottom: 0.88rem;
                    }
                    .indexZ{
                        z-index: 99;
                    }
                `}</style>
            </div>
        )
    }
}

export default NavHome;