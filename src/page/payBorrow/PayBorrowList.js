import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import ListSearch from "../commonComp/ListSearch";
import axios from "axios";
import NoData from "../commonComp/NoData";
import moment from "moment";
import {
    ActType,
    ApprovalTabData,
    CommonConfig,
    ContractTabData,
    DeclareTabData,
    SearchType,
    StatusType
} from '../config/commonConfig';
import LoadMore from "../commonComp/LoadMore";
import { BorrowListItem } from "./component/BorrowListItem"
import URL from "../../../public/api/serverAPI.config";
import ListTab from "../commonComp/TabBtnComp";
import { getDay } from "../config/commonCheck";
import ExpenseListFilter from "../payExpense/component/ExpenseListFilter";
import ExpenseChooseList from "../payExpense/component/ExpenseChooseList";
import { ExpenseListItem } from "../payExpense/component/ExpenseListItem";
import Tips from "../commonComp/TipsComp";
import { PreDeptFilter } from "../commonComp/EditCommonFilter";
import { getDept } from "../commonInterface/DeclareComm";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayBorrowList extends React.Component {
    @observable data = {
        userid: '',
        type: 'ListAnysingle',
        params: {
            Name: '',
            TermType: 0,
            Dept: '',
            DeptName: '',
            Year: '',
            Year2: '',
            pageIndex: 1,
            pageSize: 10,
            actName: '',
            act: '',
            // IsDisplay:"0",
            isOver: '-1',
            isOverName: '全部',
            TermTypeName: '单号',
            endTime: '',
            startTime: '',
            deptKey: ''
        },
        listType: '',
        payBorrowList: [],
        resData: '',
        page: 1,
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
        typeClassName: '',
        filterList: [],
        addDeptList: [],
        isShowList: false,
        getType: '',
        tabData: DeclareTabData,
        currentIndex: '0',
        title: '借支列表',
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
        localStorage.setItem("backUrlList", window.location.href);
        this.data.userid = BaseComm.GetLoginID();
        sessionStorage.removeItem("params");
        sessionStorage.removeItem("pfi_id");
        var code = window.location.search.slice(1);
        if (code.indexOf("&") != -1) {
            code = code.split("&")[0];
        }
        this.data.listType = code;
        if (this.data.listType === '1') {
            this.data.params.act = '';
            this.data.params.actName = '申报';
            this.data.hideStatus = false;
            this.data.showTab = true;
        }
        if (this.data.listType === '2') {
            this.data.title = '借支审批';
            this.data.params.act = 'SP';
            this.data.params.actName = '审批';
            this.data.hideItem = true;
            this.data.tabData = ApprovalTabData;
            let currentTime = sessionStorage.getItem("currentTime");
            if (currentTime) {
                this.data.currentIndex = currentTime;
            } else {
                this.data.currentIndex = '0';
            }
            if (this.data.currentIndex === '0') {
                this.data.params.isOver = '1';
                this.data.params.isOverName = '待审批';
            }
            if (this.data.currentIndex === '1') {
                this.data.params.isOver = '2';
                this.data.params.isOverName = '已完成';
            }
            if (this.data.currentIndex === '2') {
                this.data.params.isOver = '-1';
                this.data.params.isOverName = '全部';
            }
        }
        if (this.data.listType === '4') {
            this.data.title = '借支申报';
            this.data.params.act = '';
            this.data.params.actName = '申报';
            this.data.hideItem = true;
            let currentTime = sessionStorage.getItem("currentTime");
            if (currentTime) {
                this.data.currentIndex = currentTime;
            } else {
                this.data.currentIndex = '0';
            }
            if (this.data.currentIndex === '0') {
                this.data.params.isOver = '0';
                this.data.params.isOverName = '未提交';
            }
            if (this.data.currentIndex === '1') {
                this.data.params.isOver = '1';
                this.data.params.isOverName = '进行中';
            }
            if (this.data.currentIndex === '2') {
                this.data.params.isOver = '4';
                this.data.params.isOverName = '退回';
            }
        }
        this.data.resData = sessionStorage.getItem("payBorrowList");
        if (this.data.resData !== null && this.data.resData !== undefined) {
            this.data.payBorrowList = JSON.parse(this.data.resData);
            this.data.isShowFilter = true;
            this.data.tipsText = '请稍等...';
            this.data.isShowTips = true;
        } else {
            this.data.isShowFilter = true;
            this.data.tipsText = '请稍等...';
            this.data.isShowTips = true;
        }
        this.payBorrowList();
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
        this.payBorrowList();
    };

    handleClickBack = () => {
        window.location.href = '/home';
    };

    handleClickAdd = () => {
        window.location.href = '/home/payBorrowAdd?' + BaseComm.UrlVersion();
    };

    payBorrowList = () => {
        if (!this.data.isShowFilter && !this.data.payBorrowList) {
            this.data.isShowFilter = true;
            this.data.tipsText = '请稍等...';
            this.data.isShowTips = true;
        }
        let self = this.data;
        let data = self.payBorrowList;
        self.noData = false;
        axios({
            url: URL.histBorrow,
            params: {
                type: self.type,
                userid: self.userid,
                json: {
                    Name: self.params.Name,
                    TermType: self.params.TermType,
                    Dept: self.params.Dept,
                    Year: self.params.Year,
                    Year2: self.params.Year2,
                    pageIndex: self.params.pageIndex,
                    pageSize: self.params.pageSize,
                    act: self.params.act,
                    // IsDisplay:self.params.IsDisplay
                    isOver: self.params.isOver
                }
            },
            method: 'get'
        }).then((res) => {
            if (this.data.isShowTips) {
                self.payBorrowList = [];
            }
            this.data.isShowFilter = false;
            this.data.isShowTips = false;
            this.data.tipsText = '';
            if (data.length > 0) {
                if (res.data.length > 0) {
                    self.payBorrowList = self.payBorrowList.concat(res.data);
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
                self.noData = false;
                if (res.data.length > 0) {
                    self.payBorrowList = self.payBorrowList.concat(res.data);
                    this.data.isShowFilter = false;
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    if (res.data.length < 10) {
                        self.isShowLoadMore = true;
                        self.moreText = CommonConfig.loadFinishTxt;
                        sessionStorage.setItem("payBorrowList", JSON.stringify(self.payBorrowList));
                    } else {
                        self.isShowLoadMore = true;
                        self.moreText = CommonConfig.loadMoreTxt;
                        sessionStorage.setItem("payBorrowList", JSON.stringify(self.payBorrowList));
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
            this.data.payBorrowList = [];
            this.data.params.pageIndex = 1;
            this.payBorrowList();
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
            this.data.params.Year = this.data.params.startTime;
            if (this.data.params.endTime && this.data.params.endTime < this.data.params.startTime) {
                this.data.params.endTime = this.data.params.startTime;
                this.data.params.Year2 = this.data.params.Year;
            }
        }
        if (this.data.currentInput === 'endTime') {
            this.data.params.endTime = moment(date).format('YYYY-MM-DD');
            this.data.params.Year2 = this.data.params.endTime;
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
        if (this.data.getType === 'act') {
            this.data.filterList = ActType;
            this.data.isShowList = true;
            this.data.listClassName = CommonConfig.opened;
        }
        if (this.data.getType === 'TermType') {
            this.data.filterList = SearchType;
            this.data.isShowList = true;
            this.data.listClassName = CommonConfig.opened;
        }
        if (this.data.getType === 'Dept') {
            this.data.addDeptList = await getDept(this.data.userid, this.data.params.deptKey)
            this.data.isShowList = true;
            this.data.deptClassName = CommonConfig.opened;
        }
        if (this.data.getType === 'isOver') {
            this.data.filterList = StatusType;
            this.data.isShowList = true;
            this.data.listClassName = CommonConfig.opened;
        }
    };

    handleChooseDept = async (e) => {
        this.data.params.Dept = e.target.id;
        this.data.params.DeptName = e.target.innerText;
        this.data.deptClassName = CommonConfig.closed;
        this.data.isShowList = false;
    };

    handleClickReset = () => {
        this.data.params.Dept = '';
        this.data.params.DeptName = '';
        this.data.params.act = '';
        this.data.params.actName = '';
        this.data.params.isOver = '';
        this.data.params.isOverName = '';
        this.data.params.Year = '';
        this.data.params.startTime = '';
        this.data.params.Year2 = '';
        this.data.params.endTime = '';
    };

    handleClickConfirm = () => {
        this.data.payBorrowList = [];
        this.payBorrowList();
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

    handleClickTab = (e) => {
        const type = e.target.id;
        this.data.isShowFilter = true;
        this.data.tipsText = '请稍等...';
        this.data.isShowTips = true;
        if (type === 'notSub') {
            this.data.params.isOver = '0';
            this.data.currentIndex = '0';
            sessionStorage.setItem("currentTime", this.data.currentIndex);
            this.data.payBorrowList = [];
            this.data.params.pageIndex = 1;
            this.payBorrowList();
        }
        if (type === 'submit') {
            this.data.params.isOver = '1';
            this.data.currentIndex = '1';
            sessionStorage.setItem("currentTime", this.data.currentIndex);
            this.data.payBorrowList = [];
            this.data.params.pageIndex = 1;
            this.payBorrowList();
        }
        if (type === 'return') {
            this.data.params.isOver = '4';
            this.data.currentIndex = '2';
            sessionStorage.setItem("currentTime", this.data.currentIndex);
            this.data.payBorrowList = [];
            this.data.params.pageIndex = 1;
            this.payBorrowList();
        }
        if (type === 'success') {
            this.data.params.isOver = '2';
            this.data.currentIndex = '1';
            sessionStorage.setItem("currentTime", this.data.currentIndex);
            this.data.payExpenseList = [];
            this.data.params.pageIndex = 1;
            this.payBorrowList();
        }
        if (type === 'all') {
            this.data.params.isOver = '-1';
            this.data.currentIndex = '2';
            sessionStorage.setItem("currentTime", this.data.currentIndex);
            this.data.payExpenseList = [];
            this.data.params.pageIndex = 1;
            this.payBorrowList();
        }
        if (type === 'approval') {
            this.data.params.isOver = '1';
            this.data.currentIndex = '0';
            sessionStorage.setItem("currentTime", this.data.currentIndex);
            this.data.payExpenseList = [];
            this.data.params.pageIndex = 1;
            this.payBorrowList();
        }
    };

    handleClickTypeName = (event) => {
        this.data.params[`${this.data.getType}Name`] = event.target.innerHTML;
        this.data.params[this.data.getType] = event.target.id;
        this.data.isShowFilter = false;
        this.data.typeClassName = CommonConfig.closed;
    };

    handleClickType = () => {
        this.data.getType = 'TermType';
        this.data.filterList = SearchType;
        this.data.typeClassName = CommonConfig.opened;
        this.data.isShowFilter = true;
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <ExpenseListFilter
                        filterClassName={this.data.filterClassName}
                        param={this.data.params} hideItem={this.data.hideItem}
                        timeParams={this.data.timeParams} hideStatus={this.data.hideStatus}
                        handleSelectDate={this.handleSelectDate}
                        handleClickDate={this.handleClickDate}
                        handleCancelDate={this.handleCancelDate}
                        handleChangeInput={this.handleChangeInput}
                        handleClickChose={this.handleClickChose}
                        handleClickReset={this.handleClickReset}
                        handleClickConfirm={this.handleClickConfirm}
                    />
                    <ExpenseChooseList
                        listClassName={this.data.listClassName}
                        list={this.data.filterList}
                        handleClickName={this.handleClickName}
                    />
                    <ExpenseChooseList
                        listClassName={this.data.typeClassName}
                        list={this.data.filterList}
                        handleClickName={this.handleClickTypeName}
                    />
                    <PreDeptFilter filterClassName={this.data.deptClassName}
                        addPreList={this.data.addDeptList.data || []} name="deptKey"
                        handleChangeInput={this.handleChangeInput}
                        deptKey={this.data.params.deptKey}
                        handleChooseFilter={this.handleChooseDept}
                        handleClickClear={this.handleClickClear} />
                    <HeadTitle titleTxt={this.data.title} showAddBtn={this.data.title === '借支申报'}
                        handleClickBack={this.handleClickBack}
                        handleClickAdd={this.handleClickAdd} />
                    <ListSearch name="Name" keyword={this.data.params.Name} isShowFilter={true}
                        handleChangeInput={this.handleChangeInput}
                        handleEnterSearch={this.handleEnterSearch}
                        handleClickClear={this.handleClickClear}
                        handleClickFilter={this.handleClickFilter}
                        handleClick={this.handleClickType}
                        placeholder={`请输入${this.data.params.TermTypeName}查询，点击框内右侧按钮切换`} />
                    <ListTab handleClickTab={this.handleClickTab}
                        tabData={this.data.tabData || []} showTab={this.data.showTab}
                        currentIndex={this.data.currentIndex} />
                    <div className="list-content" ref={content => { this.content = content }}>
                        {this.data.payBorrowList.map(item => (
                            <BorrowListItem listData={item}
                                key={item.PFI_ID}
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
export default PayBorrowList;