import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import ListSearch from "../commonComp/ListSearch";
import axios from "axios";
import NoData from "../commonComp/NoData";
import moment from "moment";
import {
    CommonConfig,
    DelegateTabData, DelegateType
} from '../config/commonConfig';
import LoadMore from "../commonComp/LoadMore";
import ListTab from "../commonComp/TabBtnComp";
import URL from "../../../public/api/serverAPI.config";
import Tips from "../commonComp/TipsComp";
import { getDept } from "../commonInterface/DeclareComm";
import { PreDeptFilter } from "../commonComp/EditCommonFilter";
import ExpenseChooseList from "../payExpense/component/ExpenseChooseList";
import { DelegateListItem } from "./component/DelegateListItem";
import DelegateListFilter from "./component/DelegateListFilter";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayDelegateList extends React.Component {
    @observable data = {
        userid: '',
        type: 'ListDownBudget',
        params: {
            Type: '',
            TypeName: '',
            Kjnd: '',
            Dept: '',
            DeptName: '',
            Bmdm: '',
            startTime: '',
            endTime: '',
            StartDate: '',
            EndDate: '',
            pageIndex: 1,
            pageSize: 10,
            Status: '',
            StatusName: '',
            deptKey: ''
        },
        listType: '',
        tabData: DelegateTabData,
        currentIndex: '0',
        payDelegateList: [],
        resData: '',
        noData: false,
        isShowFilter: false,
        filterClassName: '',
        currentInput: '',
        timeParams: {
            max: '',
            min: '',
            isOpen: false
        },
        isLoadingMore: false,
        isShowLoadMore: false,
        moreText: CommonConfig.loadMoreTxt,
        listClassName: '',
        deptClassName: '',
        filterList: [],
        addDeptList: [],
        isShowList: false,
        getType: '',
        title: '下发列表',
        hideItem: false,
        hideStatus: true,
        tipsText: '',
        isShowTips: false,
        showTab: false
    };

    constructor(props) {
        super(props);
        this.state = {
            overflow: CommonConfig.scroll
        };
    }

    componentDidMount() {
        this.data.userid = BaseComm.GetLoginID();
        sessionStorage.removeItem("params");
        sessionStorage.removeItem('ID');
        this.data.resData = sessionStorage.getItem("payDelegateList");
        if (this.data.resData !== null && this.data.resData !== undefined) {
            this.data.payDelegateList = JSON.parse(this.data.resData);
            this.data.isShowFilter = true;
            this.data.tipsText = '请稍等...';
            this.data.isShowTips = true;
        } else {
            this.data.isShowFilter = true;
            this.data.tipsText = '请稍等...';
            this.data.isShowTips = true;
        }
        let currentTime = sessionStorage.getItem("currentTime");
        if (currentTime) {
            this.data.currentIndex = currentTime;
        } else {
            this.data.currentIndex = '0';
        }
        if (this.data.currentIndex === '0') {
            this.data.params.Status = '0';
            this.data.params.StatusName = '未提交';
        }
        if (this.data.currentIndex === '1') {
            this.data.params.Status = '1';
            this.data.params.StatusName = '未审批';
        }
        if (this.data.currentIndex === '2') {
            this.data.params.Status = '2';
            this.data.params.StatusName = '已完成';
        }
        this.payDelegateList();
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
        this.data.params.pageIndex += 1;
        this.payDelegateList();
    };

    handleClickBack = () => {
        window.location.href = '/home';
    };

    handleClickAdd = () => {
        window.location.href = '/home/payDelegateAdd?' + BaseComm.UrlVersion();
    };

    handleClickTab = (e) => {
        const type = e.target.id;
        this.data.isShowFilter = true;
        this.data.tipsText = '请稍等...';
        this.data.isShowTips = true;
        if (type === 'notSub') {
            this.data.params.Status = '0';
            this.data.currentIndex = '0';
            sessionStorage.setItem("currentTime", this.data.currentIndex);
            this.data.payDelegateList = [];
            this.data.params.pageIndex = 1;
            this.payDelegateList();
        }
        if (type === 'submit') {
            this.data.params.Status = '1';
            this.data.currentIndex = '1';
            sessionStorage.setItem("currentTime", this.data.currentIndex);
            this.data.payDelegateList = [];
            this.data.params.pageIndex = 1;
            this.payDelegateList();
        }
        if (type === 'success') {
            this.data.params.Status = '2';
            this.data.currentIndex = '2';
            sessionStorage.setItem("currentTime", this.data.currentIndex);
            this.data.payDelegateList = [];
            this.data.params.pageIndex = 1;
            this.payDelegateList();
        }
    };

    payDelegateList = () => {
        if (!this.data.isShowFilter && !this.data.payDelegateList) {
            this.data.isShowFilter = true;
            this.data.tipsText = '请稍等...';
            this.data.isShowTips = true;
        }
        let self = this.data;
        self.noData = false;
        self.moreText = CommonConfig.loadMoreTxt;
        axios({
            url: URL.histBudget,
            params: {
                type: self.type,
                userid: self.userid,
                json: {
                    Type: self.params.Type,
                    Kjnd: self.params.Kjnd,
                    Bmdm: self.params.Bmdm,
                    StartDate: self.params.StartDate,
                    EndDate: self.params.EndDate,
                    Status: self.params.Status,
                    pageIndex: self.params.pageIndex,
                    pageSize: self.params.pageSize,
                }
            },
            method: 'get'
        }).then((res) => {
            if (this.data.isShowTips) {
                self.payDelegateList = [];
            }
            this.data.isShowFilter = false;
            this.data.isShowTips = false;
            this.data.tipsText = '';
            if (self.payDelegateList.length > 0) {
                if (res.data.length > 0) {
                    self.payDelegateList = self.payDelegateList.concat(res.data);
                    if (res.data.length < 10) {
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
                if (res.data.length > 0) {
                    self.noData = false;
                    self.payDelegateList = self.payDelegateList.concat(res.data);
                    if (res.data.length < 10) {
                        self.isShowLoadMore = true;
                        self.moreText = CommonConfig.loadFinishTxt;
                        sessionStorage.setItem("payDelegateList", JSON.stringify(self.payDelegateList));
                    } else {
                        self.isShowLoadMore = true;
                        self.moreText = CommonConfig.loadMoreTxt;
                        sessionStorage.setItem("payDelegateList", JSON.stringify(self.payDelegateList));
                    }
                } else {
                    self.noData = true;
                    self.isShowLoadMore = true;
                    self.moreText = CommonConfig.loadFinishTxt;
                }
            }
        }).catch(() => {
            this.data.isShowFilter = false;
            this.data.isShowTips = false;
            this.data.tipsText = '';
            self.noData = true;
            self.isShowLoadMore = true;
            self.moreText = CommonConfig.loadFailTxt;
        });
    };

    handleChangeInput = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.data.params[name] = value;
        if (name === 'deptKey') {
            this.data.addDeptList = await getDept(this.data.userid, this.data.params.deptKey);
        }
    };

    handleEnterSearch = (e) => {
        if (e.charCode === 13) {
            this.data.payDelegateList = [];
            this.data.params.pageIndex = 1;
            this.payDelegateList();
        }
    };

    handleClickClear = async (e) => {
        const name = e.target.id;
        if (name === 'deptKey') {
            this.data.params.deptKey = '';
            this.data.addDeptList = await getDept(this.data.userid);
        }
        if (name === 'Name') {
            this.data.params.Name = '';
        }
    };

    handleClickFilter = () => {
        this.setState({
            overflow: CommonConfig.hidden
        });
        this.data.filterClassName = CommonConfig.opened;
        this.data.isShowFilter = true;
    };

    handleClickCover = () => {
        const isShowFilter = this.data.isShowFilter;
        if (this.data.isShowList) {
            this.data.listClassName = CommonConfig.closed;
            this.data.deptClassName = CommonConfig.closed;
            this.data.isShowList = false;
            this.setState({
                overflow: CommonConfig.scroll
            });
        } else {
            if (isShowFilter) {
                this.data.filterClassName = CommonConfig.closed;
                this.data.typeClassName = CommonConfig.closed;
                this.data.isShowFilter = false;
                this.setState({
                    overflow: CommonConfig.scroll
                });
            }
        }
    };

    handleSelectDate = (date) => {
        this.data.timeParams.isOpen = false;
        if (this.data.currentInput === 'startTime') {
            // eslint-disable-next-line no-undef
            this.data.params.startTime = moment(date).format('YYYY-MM-DD');
            this.data.params.StartDate = this.data.params.startTime;
            if (this.data.params.endTime && this.data.params.endTime < this.data.params.startTime) {
                this.data.params.endTime = this.data.params.startTime;
                this.data.params.EndDate = this.data.params.StartDate;
            }
        }
        if (this.data.currentInput === 'endTime') {
            this.data.params.endTime = moment(date).format('YYYY-MM-DD');
            this.data.params.EndDate = this.data.params.endTime;
        }
    };

    handleClickDate = (e, name) => {
        this.data.timeParams.isOpen = true;
        if (name === 'startTime') {
            this.data.timeParams.max = new Date();
            this.data.timeParams.min = new Date('2000-1-1');
        } else if (name === 'endTime') {
            this.data.timeParams.max = new Date('2100-1-1');
            this.data.timeParams.min = new Date(this.data.params.startTime);
        }
        this.data.currentInput = name;
    };

    handleCancelDate = () => {
        this.data.timeParams.isOpen = false;
    };

    handleClickChose = async (event) => {
        this.data.getType = event.target.name;
        if (this.data.getType === 'Type') {
            this.data.filterList = DelegateType;
            this.data.isShowList = true;
            this.data.listClassName = CommonConfig.opened;
        }
        if (this.data.getType === 'Dept') {
            this.data.addDeptList = await getDept(this.data.userid, this.data.params.deptKey)
            this.data.isShowList = true;
            this.data.deptClassName = CommonConfig.opened;
        }
    };

    handleChooseDept = async (e) => {
        this.data.params.Dept = e.target.id;
        this.data.params.Bmdm = this.data.params.Dept;
        this.data.params.DeptName = e.target.innerText;
        this.data.deptClassName = CommonConfig.closed;
        this.data.isShowList = false;
        this.data.params.deptKey = '';
    };

    handleClickReset = () => {
        this.data.params.Type = "";
        this.data.params.TypeName = "";
        this.data.params.Dept = '';
        this.data.params.Bmdm = '';
        this.data.params.DeptName = '';
        this.data.params.startTime = '';
        this.data.params.StartDate = '';
        this.data.params.endTime = '';
        this.data.params.EndDate = '';
    };

    handleClickConfirm = () => {
        this.data.payDelegateList = [];
        this.payDelegateList();
        this.data.isShowFilter = false;
        this.data.filterClassName = CommonConfig.closed;

        this.setState({
            overflow: CommonConfig.scroll
        });
    };

    handleClickName = (event) => {
        this.data.params[`${this.data.getType}Name`] = event.target.innerHTML;
        this.data.params[this.data.getType] = event.target.id;
        this.data.isShowList = false;
        this.data.listClassName = CommonConfig.closed;
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <DelegateListFilter
                        filterClassName={this.data.filterClassName}
                        param={this.data.params} hideItem={this.data.hideItem}
                        timeParams={this.data.timeParams} hideStatus={this.data.hideStatus}
                        handleSelectDate={this.handleSelectDate}
                        handleClickDate={this.handleClickDate}
                        handleCancelDate={this.handleCancelDate}
                        handleChangeInput={this.handleChangeInput}
                        handleClickChose={this.handleClickChose}
                        handleClickReset={this.handleClickReset}
                        handleClickConfirm={this.handleClickConfirm} />
                    <ExpenseChooseList
                        listClassName={this.data.listClassName}
                        list={this.data.filterList}
                        handleClickName={this.handleClickName} />
                    <PreDeptFilter filterClassName={this.data.deptClassName}
                        addPreList={this.data.addDeptList.data || []} name="deptKey"
                        handleChangeInput={this.handleChangeInput}
                        deptKey={this.data.params.deptKey}
                        handleChooseFilter={this.handleChooseDept}
                        handleClickClear={this.handleClickClear} />
                    <HeadTitle titleTxt={this.data.title} showAddBtn={this.data.title === '下发列表'}
                        handleClickAdd={this.handleClickAdd}
                        handleClickBack={this.handleClickBack} />
                    <ListSearch name="Name" keyword='' isShowFilter={true} iconSearch={true} iconRight={true}
                        handleChangeInput={this.handleChangeInput}
                        handleEnterSearch={this.handleEnterSearch}
                        handleClickClear={this.handleClickClear}
                        handleClickFilter={this.handleClickFilter}
                        placeholder={`请点击右侧按钮，选择必要条件筛选`} />
                    <ListTab handleClickTab={this.handleClickTab}
                        tabData={this.data.tabData} showTab={this.data.showTab}
                        currentIndex={this.data.currentIndex} />
                    <div className="list-content" ref={content => { this.content = content }}>
                        {this.data.payDelegateList.map((item, index) => (
                            <DelegateListItem listData={item}
                                key={index}
                                listType={this.data.listType}
                            />
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
                    body{
                        overflow-y:${this.state.overflow};
                    }
                    .filter-btns{
                        bottom: 0rem;
                    }
                `}</style>
            </div>
        )
    }
}
export default PayDelegateList;
