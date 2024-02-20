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
// import Footer from "./component/Footer";
import ListTab from "../commonComp/TabBtnComp";
import { AllMenu, CommonConfig, HomeTabData } from "../config/commonConfig";
import LoadMore from "../commonComp/LoadMore";
import NoData from "../commonComp/NoData";
import { NoticeListItem } from "../notice/component/NoticeListItem";
import FirstHome from "./FirstHome";
import MySet from "./MySet";
import DeclareHome from "./DeclareHome";
import ApprovalHome from "./ApprovalHome";
import QueryHome from "./QueryHome";
import NavHome from "./NavHome";
import PolicyList from "../notice/PolicyList";
import NoticeList from "../notice/NoticeList";
import BudgetHome from "./BudgetHome";
import BaseComm from "../commonInterface/BaseComm";

@observer
class Home extends React.Component {
    @observable data = {
        userid: '',
        userInfo: {},
        type: '',
        currentIndex: 'navHome',
        tipsText: '',
        isShowTips: false
    };
    @observable AllMenu = AllMenu;
    componentDidMount() {
        this.data.userid = BaseComm.GetLoginID();
        this.data.userInfo = BaseComm.GetLoginInfo();
        let currentIndex = sessionStorage.getItem("currentIndex");
        if (currentIndex) {
            this.data.currentIndex = currentIndex;
        }
        //权限获取
        let allMenu = sessionStorage.getItem('allMenu');
        if (allMenu !== null && allMenu !== undefined) {
            this.AllMenu = JSON.parse(allMenu);
        } else {
            axios({
                url: URL.histCommon,
                params: {
                    type: 'GetMenu',
                    userid: this.data.userid
                },
                method: 'get'
            }).then(res => {
                let data = decodeURIComponent(escape(window.atob(res.data)));
                let obj = eval('(' + data + ')');
                if (obj.status === '00') {
                    for (let i = 0; obj.data.length > i; i++) {
                        for (let j = 0; this.AllMenu.length > j; j++) {
                            if (this.AllMenu[j].Menu_ID === obj.data[i].Menu_ID) {
                                this.AllMenu[j].isShow = true;
                            }
                        }
                    }
                    sessionStorage.setItem('allMenu', JSON.stringify(this.AllMenu));
                } else {
                    this.data.isShowTips = true;
                    this.data.tipsText = "获取权限失败！" + obj.msg;
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1000);
                    return false;
                }
            });
        }
    };

    handleClickFooter = (index, title) => {
        this.data.currentIndex = index;
        sessionStorage.setItem("currentIndex", this.data.currentIndex);
    };

    handleClickSet = () => {
        this.data.currentIndex = 'mySet';
        sessionStorage.setItem("currentIndex", this.data.currentIndex);
    };

    handleBackHome = () => {
        this.data.currentIndex = 'navHome';
        sessionStorage.setItem("currentIndex", this.data.currentIndex);
    };

    handleClickIndex = (e) => {
        this.data.currentIndex = e.target.id;
        sessionStorage.setItem("currentIndex", this.data.currentIndex);
    };

    handleClickFunc = (e) => {
        this.data.isShowTips = true;
        this.data.tipsText = "更多新功能敬请期待！";
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
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <QueryHome AllMenu={this.AllMenu} currentIndex={this.data.currentIndex} />
                    <ApprovalHome AllMenu={this.AllMenu} currentIndex={this.data.currentIndex} />
                    <DeclareHome AllMenu={this.AllMenu} currentIndex={this.data.currentIndex} />
                    <BudgetHome AllMenu={this.AllMenu} currentIndex={this.data.currentIndex} />
                    <MySet userInfo={this.data.userInfo} currentIndex={this.data.currentIndex}
                        handleClick={this.handleClickSet} handleBack={this.handleBackHome} />
                    {/*<FirstHome userInfo={this.data.userInfo} currentIndex={this.data.currentIndex} handleClick={this.handleClickSet}/>*/}
                    <NavHome AllMenu={this.AllMenu} userInfo={this.data.userInfo} currentIndex={this.data.currentIndex} handleClickFunc={this.handleClickFunc}
                        handleClick={this.handleClickSet} handleClickIndex={this.handleClickIndex} />
                    {/* <Footer isShowDeclare={this.AllMenu[0].isShow ? true : this.AllMenu[4].isShow ? true : this.AllMenu[8].isShow ? true : this.AllMenu[10].isShow ? true : false}
                        isShowApproval={this.AllMenu[1].isShow ? true : this.AllMenu[5].isShow ? true : this.AllMenu[9].isShow ? true : this.AllMenu[11].isShow ? true : false}
                        isShowQuery={this.AllMenu[0].isShow ? true : this.AllMenu[4].isShow ? true : this.AllMenu[6].isShow ? true :
                            this.AllMenu[7].isShow ? true : this.AllMenu[8].isShow ? true : this.AllMenu[10].isShow ? true : this.AllMenu[11].isShow ? true : this.AllMenu[12].isShow ? true : false}
                        currentIndex={this.data.currentIndex} handleClick={this.handleClickFooter} /> */}
                </div>
                <PolicyList currentIndex={this.data.currentIndex} handleBack={this.handleBackHome} />
                <NoticeList currentIndex={this.data.currentIndex} handleBack={this.handleBackHome} />
                <style>{`
                `}</style>
            </div>
        )
    }
}

export default Home;