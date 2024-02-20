import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import ListSearch from "../commonComp/ListSearch";
import axios from "axios";
import NoData from "../commonComp/NoData";
import { CommonConfig, SearchType, ZczfData } from '../config/commonConfig';
import LoadMore from "../commonComp/LoadMore";
import { DchListItem } from "./component/AllowanceListItem"
import URL from "../../../public/api/serverAPI.config";
import ExpenseChooseList from "../payExpense/component/ExpenseChooseList";
import DchListFilter from "./component/DchListFilter";
import { PreDeptFilter, PreItemFilter, PreZwdFilter } from "../commonComp/EditCommonFilter";
import { getDept, getEmployee, getItem, getZwd } from "../commonInterface/DeclareComm";
import Tips from "../commonComp/TipsComp";
import BaseComm from "../commonInterface/BaseComm";

@observer
class AllowanceDchList extends React.Component {
    @observable data = {
        userid: '',
        type: 'GetDCH',
        params: {
            ZCZF: "",
            ZCZFName: "",
            DeptCode: "",
            DeptCodeName: "",
            DWBH: "",
            DWBHName: "",
            ItemCode: "",
            ItemCodeName: ""
        },
        AllowanceDchList: [],
        page: 1,
        noData: false,
        isShowFilter: false,
        filterClassName: '',
        currentInput: '',
        isLoadingMore: false,
        isShowLoadMore: false,
        moreText: CommonConfig.loadMoreTxt,
        listClassName: '',
        filterList: [],
        isShowList: false,
        getType: '',
        deptKey: '',
        itemKey: '',
        zwdKey: '',
        addDeptList: [],
        addItemList: [],
        addZwdList: [],
        deptClassName: '',
        itemClassName: '',
        zwdClassName: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            overflow: CommonConfig.scroll
        };
    }

    componentDidMount() {
        let DeptCode = BaseComm.GetLoginInfo().userOrgID;
        let DeptName = BaseComm.GetLoginInfo().userOrg;
        this.data.userid = BaseComm.GetLoginID();
        this.data.params.ZCZF = "zc";
        this.data.params.ZCZFName = "暂存";
        this.data.params.DWBH = this.props.DWBH;
        this.data.params.DWBHName = this.props.DWBHName;
        this.data.params.DeptCode = this.props.DeptCode;
        if (this.data.params.DeptCode == '') this.data.params.DeptCode = DeptCode;
        this.data.params.DeptCodeName = this.props.DeptName;
        if (this.data.params.DeptCodeName == '') this.data.params.DeptCodeName = DeptName;
        this.data.params.ItemCode = this.props.ItemCode;
        this.data.params.ItemCodeName = this.props.ItemName;
        this.AllowanceDchList();
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
        this.AllowanceDchList();
    };

    AllowanceDchList = () => {
        let self = this.data;
        let data = self.AllowanceDchList;
        self.noData = false;
        axios({
            url: URL.histCommon,
            params: {
                type: self.type,
                userid: self.userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(self.params))))
            },
            method: 'get'
        }).then((res) => {
            let datas = decodeURIComponent(escape(window.atob(res.data)));
            datas = eval('(' + datas + ')');
            if (data.length > 0) {
                if (datas.data.length > 0) {
                    self.AllowanceDchList = data.concat(datas.data);
                    if (datas.data.length < 10) {
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
                if (datas.data.length > 0) {
                    self.AllowanceDchList = data.concat(datas.data);
                    if (self.AllowanceDchList.length < 10) {
                        self.isShowLoadMore = true;
                        self.moreText = CommonConfig.loadFinishTxt;
                    } else {
                        self.isShowLoadMore = true;
                        self.moreText = CommonConfig.loadMoreTxt;
                    }
                } else {
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

    handleClickClear = async (e) => {
        const name = e.target.name;
        this.data[name] = '';
        if (name === 'deptKey') {
            this.data.addDeptList = await getDept(this.data.userid);
        }
        if (name === 'zwdKey') {
            this.data.addZwdList = await getZwd(this.data.userid);
        }
    }

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
            this.data.zwdClassName = CommonConfig.closed;
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

    handleClickChose = async (event) => {
        this.data.getType = event.target.name;
        if (this.data.getType === 'ZCZF') {
            this.data.filterList = ZczfData;
            this.data.listClassName = CommonConfig.opened;
        }
        if (this.data.getType === 'DeptCode') {
            this.data.addDeptList = await getDept(this.data.userid);
            this.data.deptClassName = CommonConfig.opened;
        }
        if (this.data.getType === 'ItemCode') {
            if (this.data.params.DeptCode) {
                this.data.addItemList = await getItem(this.data.userid, this.data.params.DeptCode);
                this.data.itemClassName = CommonConfig.opened;
            } else {
                this.data.isShowTips = true;
                this.data.tipsText = "请先选择部门！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    this.data.isShowList = false;
                }, 1000);
            }
        }
        if (this.data.getType === 'DWBH') {
            this.data.addZwdList = await getZwd(this.data.userid);
            this.data.zwdClassName = CommonConfig.opened;
        }
        this.data.isShowList = true;
    };

    handleClickReset = () => {
        this.data.params.ZCZF = '';
        this.data.params.ZCZFName = '';
        this.data.params.DeptCode = '';
        this.data.params.DeptCodeName = '';
        this.data.params.DWBH = '';
        this.data.params.DWBHName = '';
        this.data.params.ItemCode = '';
        this.data.params.ItemCodeName = '';
    };

    handleClickConfirm = () => {
        this.data.AllowanceDchList = [];
        this.AllowanceDchList();
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

    handleChooseDept = async (e) => {
        this.data.params.DeptCode = e.target.id;
        this.data.params.DeptCodeName = e.target.innerText;
        this.data.deptClassName = CommonConfig.closed;
        this.data.isShowList = false;
    };

    handleChooseItem = async (e) => {
        this.data.params.ItemCode = e.target.id;
        this.data.params.ItemCodeName = e.target.innerText;
        this.data.itemClassName = CommonConfig.closed;
        this.data.isShowList = false;
    };

    handleChooseZwd = async (e) => {
        this.data.params.DWBH = e.target.id;
        this.data.params.DWBHName = e.target.innerText;
        this.data.zwdClassName = CommonConfig.closed;
        this.data.isShowList = false;
    };

    handleChangeFilter = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.data[name] = value;
        if (name === 'deptKey') {
            this.data.addDeptList = await getDept(this.data.userid, this.data.deptKey);
        }
        if (name === 'deptKey') {
            this.data.addDeptList = await getDept(this.data.userid, this.data.deptKey);
        }
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail">
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <DchListFilter
                        filterClassName={this.data.filterClassName}
                        param={this.data.params}
                        handleClickChose={this.handleClickChose}
                        handleClickReset={this.handleClickReset}
                        handleClickConfirm={this.handleClickConfirm}
                    />
                    <ExpenseChooseList
                        listClassName={this.data.listClassName}
                        list={this.data.filterList}
                        handleClickName={this.handleClickName}
                    />
                    <PreDeptFilter filterClassName={this.data.deptClassName}
                        addPreList={this.data.addDeptList || []} name="deptKey"
                        handleChangeInput={this.handleChangeFilter}
                        deptKey={this.data.deptKey || ''}
                        handleChooseFilter={this.handleChooseDept}
                        handleClickClear={this.handleClickClear} />
                    <PreItemFilter filterClassName={this.data.itemClassName}
                        addPreList={this.data.addItemList || []} name="itemKey"
                        itemKey={this.data.itemKey || ''}
                        handleChangeInput={this.handleChangeFilter}
                        handleChooseFilter={this.handleChooseItem}
                        handleClickClear={this.handleClickClear} />
                    <PreZwdFilter filterClassName={this.data.zwdClassName}
                        addPreList={this.data.addZwdList || []} name="zwdKey"
                        handleChangeInput={this.handleChangeFilter}
                        readyOnly={true}
                        handleChooseFilter={this.handleChooseZwd}
                        handleClickClear={this.handleClickClear} />
                    <HeadTitle titleTxt="对冲号列表" handleClickBack={this.props.handleBackAdd} />
                    <ListSearch name="Name" keyword={this.data.params.Name || ''}
                        isShowFilter={true} readOnly={true}
                        handleClickFilter={this.handleClickFilter}
                        placeholder="请点击右边按钮根据条件查找" />
                    <div className="list-content" ref={content => { this.content = content }}>
                        {this.data.AllowanceDchList.map((item, index) => (
                            <DchListItem listData={item} key={index} handleClick={this.props.handleClickDch}
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
export default AllowanceDchList;