import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import ListSearch from "../commonComp/ListSearch";
import axios from "axios";
import NoData from "../commonComp/NoData";
import { ExpenseListItem } from "../payExpense/component/ExpenseListItem";
import ExpenseListFilter from "../payExpense/component/ExpenseListFilter";
import moment from "moment";
import { ActType, SearchType, ContractTabData, CommonConfig } from '../config/commonConfig';
import LoadMore from "../commonComp/LoadMore";
import ExpenseChooseList from "../payExpense/component/ExpenseChooseList";
import ListTab from "../commonComp/TabBtnComp";
import { getDay } from "../config/commonCheck"
import URL from "../../../public/api/serverAPI.config";

@observer
class PayDebtList extends React.Component {
    @observable data = {
        userid: '',
        type: 'ListApproval',
        params: {
            Name: '',
            TermType: 0,
            TermTypeName: '单号',
            Dept: '',
            Year: '',
            Year2: '',
            startTime: '',
            endTime: '',
            pageIndex: 1,
            pageSize: 10,
            actName: '',
            act: 'SP'
        },
        tabData: ContractTabData,
        currentIndex: '2',
        payDebtList: [],
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
        filterList: [],
        isShowList: false,
        getType: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            overflow: CommonConfig.scroll
        };
    }

    componentDidMount() {
        let data = sessionStorage.getItem("userId");
        this.data.userid = data;
        if (!data) {
            window.location.href = '/login';
        }
        let over = "overturn";
        sessionStorage.setItem("overturn", over);
        this.payDebtList();
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
        this.payDebtList();
    };

    handleClickBack = () => {
        if (this.data.listType === '1') {
            window.location.href = '/home/queryHome'
        }
        if (this.data.listType === '2') {
            window.location.href = '/home/approvalHome'
        }
    };

    handleClickAdd = () => {
        window.location.href = '/home/queryHome/payExpenseHome/payExpenseAdd';
    };

    handleClickTab = (e) => {
        const type = e.target.id;
        if (type === 'three') {
            this.data.params.Year = `${getDay(-2)}`;
            this.data.currentIndex = '0';
            this.data.payDebtList = [];
            this.payDebtList();
        }
        if (type === 'week') {
            this.data.params.Year = `${getDay(-6)}`;
            this.data.currentIndex = '1';
            this.data.payDebtList = [];
            this.payDebtList();
        }
        if (type === 'all') {
            this.data.params.Year = '';
            this.data.currentIndex = '2';
            this.data.payDebtList = [];
            this.payDebtList();
        }
    };

    payDebtList = () => {
        let self = this.data;
        let data = self.payDebtList;
        self.noData = false;
        self.moreText = CommonConfig.loadMoreTxt;
        axios({
            url: URL.histExpense,
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
                    act: self.params.act
                }
            },
            method: 'get'
        }).then((res) => {
            if (data.length > 0) {
                if (res.data.length > 0) {
                    self.payDebtList = data.concat(res.data);
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
                    self.payDebtList = data.concat(res.data);
                    if (self.payDebtList.length < 10) {
                        self.isShowLoadMore = true;
                        self.moreText = CommonConfig.loadFinishTxt;
                    } else {
                        self.isShowLoadMore = true;
                        self.moreText = CommonConfig.loadMoreTxt;
                    }
                } else {
                    self.payDebtList = [];
                    self.noData = true;
                    self.isShowLoadMore = true;
                    self.moreText = CommonConfig.loadFinishTxt;
                }
            }
        }).catch(() => {
            self.noData = true;
            self.isShowLoadMore = true;
            self.moreText = CommonConfig.loadFailTxt;
        });
    };

    handleChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.data.params[name] = value;
    };

    handleEnterSearch = (e) => {
        if (e.charCode === 13) {
            this.data.payDebtList = [];
            this.data.params.pageIndex = 1;
            this.payDebtList();
        }
    };

    handleClickClear = () => {
        this.data.params.Name = '';
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
            this.data.isShowList = false;
            this.setState({
                overflow: CommonConfig.scroll
            });
        } else {
            if (isShowFilter) {
                this.data.filterClassName = CommonConfig.closed;
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

    handleChangeChose = (e) => {
        const name = e.target.name;
        const valueC = e.target.value;
        this.data.params[name] = valueC;
    };

    handleClickChose = (event) => {
        this.data.getType = event.target.name;
        if (this.data.getType === 'act') {
            this.data.filterList = ActType;
        }
        if (this.data.getType === 'TermType') {
            this.data.filterList = SearchType;
        }
        this.data.isShowList = true;
        this.data.listClassName = CommonConfig.opened;
    };

    handleClickReset = () => {
        this.data.params.Dept = '';
        this.data.params.act = '';
        this.data.params.actName = '';
        this.data.params.Year = '';
        this.data.params.startTime = '';
        this.data.params.Year2 = '';
        this.data.params.endTime = '';
    };

    handleClickConfirm = () => {
        this.data.payDebtList = [];
        this.payDebtList();
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
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <ExpenseListFilter
                        filterClassName={this.data.filterClassName}
                        param={this.data.params}
                        timeParams={this.data.timeParams}
                        handleSelectDate={this.handleSelectDate}
                        handleClickDate={this.handleClickDate}
                        handleCancelDate={this.handleCancelDate}
                        handleChangeInput={this.handleChangeInput}
                        handleChangeChose={this.handleChangeChose}
                        handleClickChose={this.handleClickChose}
                        handleClickReset={this.handleClickReset}
                        handleClickConfirm={this.handleClickConfirm} />
                    <ExpenseChooseList
                        listClassName={this.data.listClassName}
                        list={this.data.filterList}
                        handleClickName={this.handleClickName} />
                    <HeadTitle titleTxt="欠款列表" showAddBtn={true}
                        handleClickBack={this.handleClickBack}
                        handleClickAdd={this.handleClickAdd} />
                    <ListSearch name="Name" keyword={this.data.params.Name} isShowFilter={true}
                        handleChangeInput={this.handleChangeInput}
                        handleEnterSearch={this.handleEnterSearch}
                        handleClickClear={this.handleClickClear}
                        handleClickFilter={this.handleClickFilter}
                        placeholder={`请输入${this.data.params.TermTypeName}查询`} />
                    <ListTab handleClickTab={this.handleClickTab}
                        tabData={this.data.tabData}
                        currentIndex={this.data.currentIndex} />
                    <div className="list-content" ref={content => { this.content = content }}>
                        {this.data.payDebtList.map((item, index) => (
                            <ExpenseListItem listData={item}
                                key={index}
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
export default PayDebtList;