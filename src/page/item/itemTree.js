import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import { DetailBold, ContentInputs } from "../commonComp/InputComp";
import { SubmitBtn } from "../commonComp/SubmitBtnComp";
import { PreDeptFilter, PreItemFilter } from "../commonComp/EditCommonFilter";
import { getDept, getItemAll } from "../commonInterface/DeclareComm";
import { CommonConfig } from "../config/commonConfig";
import axios from "axios";
import URL from "../../../public/api/serverAPI.config";
import Tips from "../commonComp/TipsComp";
import { getMoneyNumber } from "../config/commonCheck";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayBorrowAdd extends React.Component {
    @observable data = {
        userid: '',
        userInfo: [],
        type: 'AddAnysingle',
        params: {
            Use_1: '',
            UseID_1: '',
            danweiID: '',
            deptKey: '',
            Rbunit: '',
            useKey: ''
        },
        res: {
            DeptName: '请先查询',
            ItemName: '请先查询',
            money1: '0',
            money2: '0',
            money3: '0',
            money4: '0',
            MoneyOther: '0',
            MoneyPay: '0',
            MoneyApproval: '0'
        },
        money: '',
        msg: '',
        tipsText: '',
        isShowTips: false,
        isShowFilter: false,
        fileArr: [],
        deptClassName: '',
        useClassName: '',
        epCurrent: 'Dept',
        addDeptList: [],
        addUseList: []
    };
    constructor(props) {
        super(props);
        this.state = {
            overflow: 'scroll'
        };
    }

    componentDidMount = async () => {
        this.data.userid = BaseComm.GetLoginID();
    };

    handleChangeInput = async (e) => {
        const name = e.target.name;
        let valueC = e.target.value;
        this.data.params[name] = valueC;
        if (name === 'deptKey') {
            this.data.addDeptList = await getDept(this.data.userid, this.data.params.deptKey);
        }
        if (name === 'useKey') {
            this.data.addUseList = await getItemAll(this.data.userid, this.data.params.danweiID, this.data.params.useKey);
        }
    };

    handleClickClear = async (e) => {
        const name = e.target.id;
        if (name === 'deptKey') {
            this.data.params.deptKey = '';
            this.data.addDeptList = await getDept(this.data.userid);
        }
        if (name === 'useKey') {
            this.data.params.useKey = '';
            this.data.addUseList = await getItemAll(this.data.userid, this.data.params.danweiID);
        }
    };

    handleChooseDept = async (e) => {
        if (this.data.epCurrent === 'Dept') {
            this.data.params.danweiID = e.target.id;
            this.data.params.Rbunit = e.target.innerText;
            this.data.deptClassName = CommonConfig.closed;
            this.data.isShowFilter = false;
        }
    };
    handleChooseUse = (e) => {
        this.data.params.UseID_1 = e.target.id;
        this.data.params.Use_1 = e.target.innerText;
        this.data.useClassName = CommonConfig.closed;
        this.data.isShowFilter = false;
    };

    handleClickBack = () => {
        this.props.history.go(-1);
    };

    handleClickFilter = async (e) => {
        const name = e.target.name;
        if (name === 'danwei') {
            this.data.addDeptList = await getDept(this.data.userid, "");
            if (!this.data.isDeptShow) {
                this.data.isShowFilter = true;
                this.data.deptClassName = CommonConfig.opened;
            }
        }
        if (name === 'Use_1') {
            if (this.data.params.danweiID) {
                this.data.useCurrent = 'use1';
                this.data.addUseList = await getItemAll(this.data.userid, this.data.params.danweiID);
                if (!this.data.isUseShow) {
                    this.data.isShowFilter = true;
                    this.data.useClassName = CommonConfig.opened;
                }
            } else {
                this.data.isShowTips = true;
                this.data.tipsText = '请先选择经费部门！';
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
            }
        }
    };

    handleNextStep = () => {
        //查看明细
        if (!this.data.params.danweiID) {
            this.data.isShowTips = true;
            this.data.tipsText = '请先选择经费部门！';
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
        } else {
            if (!this.data.params.UseID_1) {
                this.data.isShowTips = true;
                this.data.tipsText = '请先选择项目！';
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
            } else {
                this.data.isShowTips = true;
                this.data.tipsText = '正在查询，请稍等';
                //获取执行情况详情
                axios({
                    url: URL.histBudget,
                    params: {
                        type: 'ItemAllot2',
                        userid: this.data.userid,
                        json: {
                            UseID_1: this.data.params.UseID_1,
                            danweiID: this.data.params.danweiID
                        }
                    },
                    method: 'post'
                }).then(res => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    this.data.res = res.data;
                }).catch(reason => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    console.log(reason);
                });
            }
        }
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail colorAddBG">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <HeadTitle titleTxt="预算分配执行查询" handleClickBack={this.handleClickBack} />
                    <PreDeptFilter filterClassName={this.data.deptClassName}
                        addPreList={this.data.addDeptList.data || []} name="deptKey"
                        handleChangeInput={this.handleChangeInput}
                        deptKey={this.data.params.deptKey}
                        handleChooseFilter={this.handleChooseDept}
                        handleClickClear={this.handleClickClear} />
                    <PreItemFilter filterClassName={this.data.useClassName}
                        addPreList={this.data.addUseList.data || []} name="useKey"
                        handleChangeInput={this.handleChangeInput}
                        itemKey={this.data.params.useKey}
                        handleChooseFilter={this.handleChooseUse}
                        handleClickClear={this.handleClickClear} />
                    <div className="content_main" style={{ minHeight: '2.1rem' }}>
                        <div className="content_mainDetail">
                            <ContentInputs name="danwei" display="block" readOnly={true}
                                title="经费部门" type="text" placeholder="请选择"
                                value={this.data.params.Rbunit} iconName="iconfont icon-xiangyou icon-select"
                                handleClick={this.handleClickFilter} />
                            <ContentInputs name="Use_1" display="block" readOnly={true}
                                title="经费项目" type="text" placeholder="请选择"
                                value={this.data.params.Use_1} iconName="iconfont icon-xiangyou icon-select"
                                handleClick={this.handleClickFilter} />
                        </div>
                    </div>
                    <div className="spaceG" />
                    <SubmitBtn value="查询执行情况" handleClick={this.handleNextStep} isBtnHide={this.data.isBtnHide} />
                    <div className="spaceG" />
                    <div className="content_mainS">
                        <div className="content_mainDetail">
                            <DetailBold label="经费部门" value={this.data.res.DeptName} />
                            <DetailBold label="经费项目" value={this.data.res.ItemName} />
                        </div>
                        <div className="spaceG" />
                        <div className="content_mainDetail">
                            <DetailBold label="预算分配合计" value={getMoneyNumber(this.data.res.money1)} />
                            <DetailBold label="财务支出" value={getMoneyNumber(this.data.res.MoneyOther)} />
                            <DetailBold label="报销在途" value={getMoneyNumber(this.data.res.MoneyApproval)} />
                            <DetailBold label="薪酬在途" value={getMoneyNumber(this.data.res.MoneyPay)} />
                        </div>
                        <div className="spaceG" />
                        <div className="content_mainDetail">
                            <DetailBold label="支出合计" value={getMoneyNumber(this.data.res.money3)} />
                            <DetailBold label="预算余额" value={getMoneyNumber(this.data.res.money4)} />
                        </div>
                        <div className="spaceG" />
                    </div>
                </div>
                <style>{`
                    body{
                        overflow-y:${this.state.overflow};
                    }
                    .main_closed{
                        height:0
                        overflow:hidden;
                    }
                    .main_opened{
                        height:auto;
                        overflow:initial;
                    }
                `}</style>
            </div>
        )
    }
}
export default PayBorrowAdd;