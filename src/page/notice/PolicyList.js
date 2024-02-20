import React from 'react';
import { observable } from "mobx";
import { observer } from 'mobx-react';
import axios from 'axios';
import URL from "../../../public/api/serverAPI.config";
import { NoticeListItem } from "./component/NoticeListItem";
import { HeadTitle } from "../commonComp/HeadTitle";
import LoadMore from "../commonComp/LoadMore";
import NoData from "../commonComp/NoData";
import { CommonConfig } from "../config/commonConfig";
import Tips from "../commonComp/TipsComp";
import { PolicyListItem } from "./component/PolicyListItem";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PolicyList extends React.Component {
    @observable data = {
        userid: '',
        type: 'Article1',
        params: {
            page: 1,
            artName: '政策信息'
        },
        policyList: [],
        isLoadingMore: false,
        isShowLoadMore: false,
        moreText: CommonConfig.loadMoreTxt,
        noData: false,
        tipsText: '',
        isShowTips: false
    };

    componentDidMount() {
        this.data.userid = BaseComm.GetLoginID();
        let resData = sessionStorage.getItem("policyList");
        if (resData !== null && resData !== undefined) {
            this.data.policyList = JSON.parse(resData);
            this.data.isShowFilter = true;
            this.data.tipsText = '请稍等...';
            this.data.isShowTips = true;
        } else {
            this.data.isShowFilter = true;
            this.data.tipsText = '请稍等...';
            this.data.isShowTips = true;
        }
        this.getNoticeList();
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

    getNoticeList = () => {
        let self = this.data;
        let dataOld = self.policyList;
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
                this.data.policyList = [];
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
                        self.policyList = dataOld.concat(arr.list);
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
                        self.policyList = dataOld.concat(arr.list);
                        sessionStorage.setItem("policyList", JSON.stringify(this.data.policyList));
                        if (self.policyList.length < 10) {
                            self.isShowLoadMore = true;
                            self.moreText = CommonConfig.loadFinishTxt;
                        } else {
                            self.isShowLoadMore = true;
                            self.moreText = CommonConfig.loadMoreTxt;
                        }
                    } else {
                        self.policyList = [];
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
                self.policyList = [];
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
            self.policyList = [];
            this.data.isShowFilter = false;
            this.data.isShowTips = false;
            this.data.tipsText = '';
            self.noData = true;
            self.isShowLoadMore = true;
            self.moreText = CommonConfig.loadFailTxt;
        });
    };

    render() {
        return (
            <div className={`wrapper indexZ ${this.props.currentIndex === 'policyList' ? 'show' : 'hide'}`}>
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <HeadTitle titleTxt="政策信息"
                        handleClickBack={this.props.handleBack} />
                    <div className="list-content" ref={content => { this.content = content }}>
                        {this.data.policyList.map((item, index) => (
                            <PolicyListItem listData={item}
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
            </div>
        )
    }
}
export default PolicyList;