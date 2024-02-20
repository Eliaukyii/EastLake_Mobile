import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import axios from "axios";
import URL from "../../../public/api/serverAPI.config";
import FuncList from "./component/FuncList";
import Tips from "../commonComp/TipsComp";
import ListTab from "../commonComp/TabBtnComp";
import { CommonConfig, HomeTabData } from "../config/commonConfig";
import LoadMore from "../commonComp/LoadMore";
import NoData from "../commonComp/NoData";
import { NoticeListItem } from "../notice/component/NoticeListItem";
import BaseComm from "../commonInterface/BaseComm";
import bgfirstHome from '../../img/background/bg-firstHome.png';

@observer
class FirstHome extends React.Component {
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
        isShowTips: false
    };

    componentDidMount() {
        this.data.userid = BaseComm.GetLoginID();
        let currentTab = sessionStorage.getItem("currentTab");
        if (currentTab) {
            this.data.currentTab = currentTab;
        }
        if (this.data.currentTab === '0') {
            let resData = sessionStorage.getItem("toApList");
            if (resData !== null && resData !== undefined) {
                this.data.toApList = JSON.parse(resData);
                this.data.isShowFilter = true;
                this.data.tipsText = '请稍等...';
                this.data.isShowTips = true;
            } else {
                this.data.isShowFilter = true;
                this.data.tipsText = '请稍等...';
                this.data.isShowTips = true;
            }
            this.getApproval();
        }
        if (this.data.currentTab === '1') {
            let resData = sessionStorage.getItem("noticeList");
            if (resData !== null && resData !== undefined) {
                this.data.noticeList = JSON.parse(resData);
                this.data.isShowFilter = true;
                this.data.tipsText = '请稍等...';
                this.data.isShowTips = true;
            } else {
                this.data.isShowFilter = true;
                this.data.tipsText = '请稍等...';
                this.data.isShowTips = true;
            }
            this.getNoticeList();
        }
        const self = this;

        let timeCount;
        function callback() {
            const top = self.loadMore.getBoundingClientRect().top;
            const windowHeight = window.screen.height;
            if (top && top < windowHeight) {
                self.handleChangePage();
            }
        }

        //滚动加载销售订单列表数据
        this.content.addEventListener('scroll', () => {
            if (this.data.isLoadingMore) {
                return;
            }

            if (timeCount) {
                clearTimeout(timeCount);
            }

            timeCount = setTimeout(callback, 50);
        }, false);
    }

    handleChangePage = () => {
        this.data.params.page += 1;
        this.getNoticeList();
    };

    getApproval = () => {
        axios({
            url: URL.histLogin,
            params: {
                type: 'Approval',
                userid: this.data.userid
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            if (this.data.isShowTips) {
                this.data.toApList = [];
            }
            this.data.isShowFilter = false;
            this.data.isShowTips = false;
            this.data.noData = false;
            this.data.tipsText = '';
            if (obj.status === '00') {
                if (!obj.data) {
                    obj.data = [];
                }
                let arr = obj.data;
                if (this.data.toApList.length > 0) {
                    this.data.toApList = this.data.toApList.concat(arr);
                    sessionStorage.setItem("toApList", JSON.stringify(this.data.toApList));
                    if (arr.length > 0) {
                        if (arr.length < 10) {
                            this.data.isShowLoadMore = true;
                            this.data.moreText = CommonConfig.loadFinishTxt;
                        } else {
                            this.data.isShowLoadMore = true;
                            this.data.moreText = CommonConfig.loadMoreTxt;
                        }
                    } else {
                        this.data.isShowLoadMore = true;
                        this.data.moreText = CommonConfig.loadFinishTxt;
                    }
                } else {
                    this.data.toApList = this.data.toApList.concat(arr);
                    sessionStorage.setItem("toApList", JSON.stringify(this.data.toApList));
                    if (arr.length > 0) {
                        if (arr.length < 10) {
                            this.data.isShowLoadMore = true;
                            this.data.moreText = CommonConfig.loadFinishTxt;
                        } else {
                            this.data.isShowLoadMore = true;
                            this.data.moreText = CommonConfig.loadMoreTxt;
                        }
                    } else {
                        this.data.noData = true;
                        this.data.isShowLoadMore = true;
                        this.data.moreText = "您工作效率太高了，一条待办信息都没有！";
                    }
                }
            } else {
                this.data.toApList = [];
                this.data.noData = true;
                this.data.isShowLoadMore = true;
                this.data.moreText = CommonConfig.loadFailTxt;
                this.data.isShowTips = true;
                this.data.tipsText = obj.msg;
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
            }
        }).catch(reason => {
            this.data.toApList = [];
            this.data.isShowFilter = false;
            this.data.isShowTips = false;
            this.data.tipsText = '';
            this.data.noData = true;
            this.data.isShowLoadMore = true;
            this.data.moreText = CommonConfig.loadFailTxt;
        })
    };

    getNoticeList = () => {
        let self = this.data;
        let dataOld = self.noticeList;
        self.noData = false;
        self.moreText = CommonConfig.loadMoreTxt;
        let json = {
            page: `${this.data.params.page}`,
            artName: this.data.params.artName
        };
        axios({
            url: URL.histLogin,
            params: {
                type: 'Article1',
                userid: this.data.userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            if (this.data.isShowTips) {
                this.data.noticeList = [];
            }
            this.data.isShowFilter = false;
            this.data.isShowTips = false;
            this.data.noData = false;
            this.data.tipsText = '';
            if (obj.status === '00') {
                let arr = {
                    list: []
                };
                if (!obj.data) {
                    arr.list = [];
                } else {
                    arr = eval('(' + obj.data + ')');
                }
                if (dataOld.length > 0) {
                    if (arr.list.length > 0) {
                        self.noticeList = dataOld.concat(arr.list);
                        if (arr.list.length < 10) {
                            self.isShowLoadMore = true;
                            self.moreText = CommonConfig.loadFinishTxt;
                        } else {
                            self.isShowLoadMore = true;
                            self.moreText = CommonConfig.loadMoreTxt;
                        }
                    } else {
                        self.isShowLoadMore = true;
                        self.moreText = CommonConfig.loadFinishTxt;
                    }
                } else {
                    if (arr.list.length > 0) {
                        self.noticeList = dataOld.concat(arr.list);
                        sessionStorage.setItem("noticeList", JSON.stringify(this.data.noticeList));
                        if (self.noticeList.length < 10) {
                            self.isShowLoadMore = true;
                            self.moreText = CommonConfig.loadFinishTxt;
                        } else {
                            self.isShowLoadMore = true;
                            self.moreText = CommonConfig.loadMoreTxt;
                        }
                    } else {
                        self.noticeList = [];
                        self.noData = true;
                        self.isShowLoadMore = true;
                        self.moreText = CommonConfig.loadFinishTxt;
                        this.data.tipsText = '还未发布任何资讯，敬请期待...';
                        this.data.isShowTips = true;
                        setTimeout(() => {
                            this.data.isShowTips = false;
                            this.data.tipsText = '';
                        }, 1000);
                    }
                }
            } else {
                self.noticeList = [];
                self.noData = true;
                self.isShowLoadMore = true;
                self.moreText = CommonConfig.loadFailTxt;
                this.data.tipsText = obj.msg;
                this.data.isShowTips = true;
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
            }
        }).catch(() => {
            self.noticeList = [];
            this.data.isShowFilter = false;
            this.data.isShowTips = false;
            this.data.tipsText = '';
            self.noData = true;
            self.isShowLoadMore = true;
            self.moreText = CommonConfig.loadFailTxt;
        });
    };

    handleClickTab = (e) => {
        const type = e.target.id;
        this.data.currentTab = type;
        this.data.isShowFilter = true;
        this.data.tipsText = '请稍等...';
        this.data.isShowTips = true;
        if (type === 'Approval') {
            this.data.currentTab = '0';
            sessionStorage.setItem('currentTab', '0');
            this.getApproval();
        }
        if (type === 'Article1') {
            this.data.currentTab = '1';
            sessionStorage.setItem('currentTab', '1');
            this.getNoticeList();
        }
    };

    render() {
        return (
            <div className={`wrapper ${this.props.currentIndex === 'home' ? 'show' : 'hide'}`}>
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <div id="list-filterF" className="list-filterF" onClick={this.handleClickCover}
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
                    <ListTab handleClickTab={this.handleClickTab}
                        tabData={this.data.tabData || []}
                        currentIndex={this.data.currentTab} />
                    <div className={`list-content listBotMar ${this.data.currentTab === '0' ? "show" : "hide"}`} ref={content => { this.content = content }}>
                        {this.data.toApList.map((item, index) => (
                            <FuncList listData={item}
                                key={index} />
                        ))}
                        <div ref={ele => {
                            this.loadMore = ele
                        }} style={{ display: this.data.isShowLoadMore ? 'block' : 'none' }}>
                            <LoadMore text={this.data.moreText} />
                        </div>
                        <NoData noData={this.data.noData} />
                    </div>
                    <div className={`list-content listBotMar ${this.data.currentTab === '1' ? "show" : "hide"}`} ref={content => { this.content = content }}>
                        {this.data.noticeList.map((item, index) => (
                            <NoticeListItem listData={item}
                                key={index} />
                        ))}
                        <div ref={ele => {
                            this.loadMore = ele
                        }} style={{ display: this.data.isShowLoadMore ? 'block' : 'none' }}>
                            <LoadMore text={this.data.moreText} />
                        </div>
                        <NoData noData={this.data.noData} />
                    </div>
                </div>
                <style>{`
                    .iconMySet{
                        color: #ffffff;
                        justify-content: flex-end;
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

                    .firstHomeBg {
                        position: relative;
                        width: 100%;
                        height: 2.2rem;
                        background: url('`+ bgfirstHome + `') no-repeat;
                        background-size: 100% 100%;
                        -webkit-background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        -o-background-size: 100% 100%;
                        padding: 0.28rem;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        flex-direction: row;
                        -webkit-flex-direction: row;
                        align-items: center;
                    }
                `}</style>
            </div>
        )
    }
}

export default FirstHome;