import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { ContentHead, HeadTitle } from "../commonComp/HeadTitle";
import { SubmitBtn, AddProject } from "../commonComp/SubmitBtnComp";
import axios from "axios";
import { ContentInputs, ContentTextarea } from "../commonComp/InputComp";
import URL from "../../../public/api/serverAPI.config";
import Tips from "../commonComp/TipsComp";
import { PreApplicatFilter, PreAttnFilter, PreDeptFilter, PreItemFilter } from "../commonComp/EditCommonFilter";
import { CommonConfig, DelegateType } from "../config/commonConfig";
import { getDept, getEmployee, getItemAll, getUploadFile, getItemAllot } from "../commonInterface/DeclareComm";
import DatePicker from "react-mobile-datepicker";
import moment from "moment";
import { AlterTips } from "../../page/commonComp/AlterTips";
import { getMoneyNumber, uuid } from "../config/commonCheck";
import ExpenseChooseList from "../payExpense/component/ExpenseChooseList";
import { AddBudgetProgressBar, AddOtherProgressBar } from "../commonComp/ProgressBar";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayAllocationAdd extends React.Component {
    @observable data = {
        userid: '',
        type: 'SaveAllocation',
        params: {
            ID: '',
            Type: '',//类型
            TypeName: '',
            Dept: '',
            DeptName: '',
            ItemID: '',//项目ID
            ItemName: '',
            Money: '',//金额
            Note: '',
            Context: '',//说明
            deptKey: '',
            useKey: '',
            YearDate: ''
        },
        payAllocationAdd: [],
        page: 1,
        isShowFilter: false,
        tipsText: '',
        toastText: '是否提交本次分配单据？',
        isShowTips: false,
        maxMoney: '',
        addDeptList: [],
        addUseList: [],
        isDeptShow: false,
        isUseShow: false,
        listClassName: '',
        deptClassName: '',
        useClassName: '',
        isShowList: false,
        epCurrent: 'Dept',
        confirmText: '',
        timeParams: {
            max: '',
            min: '',
            isOpen: false
        },
        isShowToast: false,
        isShowTravel: false,
        showDelBtn: false,
        btnSelect: false
    };
    @observable dateConfig = {
        'year': {
            format: 'YYYY',
            caption: 'Year',
            step: 1,
        },
        'month': {
            format: 'MM',
            caption: 'Mon',
            step: 1,
        },
        'date': {
            format: 'DD',
            caption: 'Day',
            step: 1,
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            overflow: 'scroll'
        };
    }

    componentDidMount = async () => {
        let id = BaseComm.GetLoginInfo().userOrgID;
        let name = BaseComm.GetLoginInfo().userName;
        this.data.userid = BaseComm.GetLoginID();
        let dept = [];
        dept = await getDept(this.data.userid, id);
        this.data.params.Dept = dept.data[0].DeptCode;
        this.data.params.DeptName = dept.data[0].DeptName;
        this.data.params.ApplicantBuMenID = id;
        this.data.params.Applicant = name;
        this.data.params.ApplicantID = this.data.userid;
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        this.data.params.YearDate = year + '-' + month + "-" + day;
        let params = JSON.parse(sessionStorage.getItem("params"));
        if (params) {
            this.data.params = params;
        } else {
            let code = this.props.location.search;
            code = decodeURI(code.slice(1));
            if (code.indexOf("&") != -1) {
                code = code.split('&')[0];
            }
            if (code && code.indexOf('.') < 0) {
                //if (code.indexOf("ItemID") !== -1 && code.indexOf("ItemName") !== -1) {
                var _code = JSON.parse(code);
                //    this.data.params.Type = _code.Type;
                //    this.data.params.TypeName = _code.TypeName;
                //    this.data.params.Dept = _code.Dept;
                //    this.data.params.DeptName = _code.DeptName;
                //    this.data.params.ItemID = _code.ItemID;
                //    this.data.params.ItemName = _code.ItemName;
                //    this.data.params.Money = getMoneyNumber(_code.Money);
                //    this.data.maxMoney = getMoneyNumber(await getItemAllot(this.data.userid, this.data.ItemID, this.data.params.Type));
                this.getDetail('', '', _code.ICID);
            } else {
                this.data.showDelBtn = true;
                this.data.btnSelect = true;
                this.getDetail(code);
            }
        }

    };

    //获取报销详情
    getDetail = (ID, ItemID, ICID) => {
        this.data.isShowTips = true;
        this.data.tipsText = '正在获取数据...';
        axios({
            url: URL.histBudget,
            params: {
                type: 'ListAllocationImport',
                userid: this.data.userid,
                json: {
                    ID: ID,
                    ICID: ICID
                }
            },
            method: 'post'
        }).then(res => {
            this.data.isShowTips = false;
            if (res.data.length > 0) {
                sessionStorage.setItem("ID", res.data[0].IA_ID);
                this.data.params.ID = res.data[0].IA_ID;
                this.data.params.Dept = res.data[0].DeptCode;
                this.data.params.DeptName = res.data[0].DeptName;
                this.data.params.ItemID = res.data[0].ItemID;
                this.data.params.ItemName = res.data[0].ItemName;
                this.data.params.Money = getMoneyNumber(`${res.data[0].AllocationSum}`);
                this.data.maxMoney = this.data.params.Money;
                this.data.Money = this.data.maxMoney;
                this.data.params.Context = res.data[0].Context;
                this.data.params.Note = res.data[0].IA_Note;
                this.data.params.Type = `${res.data[0].IA_Type}`;
                if (this.data.params.Type === '0') {
                    this.data.params.TypeName = '调整预算';
                }
                if (this.data.params.Type === '1') {
                    this.data.params.TypeName = '年初预算';
                }
                if (this.data.params.Type === '2') {
                    this.data.params.TypeName = '结转预算';
                }
            }
        }).catch(reason => {
        });
    };

    handleClickBack = () => {
        window.location.href = '/home/payAllocationList';
    };

    handleChangeInput = async (e) => {
        const name = e.target.name;
        let valueC = e.target.value;
        this.data.params[name] = valueC;
        if (name === 'Enclosure') {
        }
        if (name === 'deptKey') {
            this.data.addDeptList = await getDept(this.data.userid, this.data.params.deptKey);
        }
        if (name === 'useKey') {
            this.data.addUseList = await getItemAll(this.data.userid, this.data.params.Dept, this.data.params.useKey);
        }
        if (name === 'Money') {
        }
    };

    handleClickCover = () => {
        const isShowFilter = this.data.isShowFilter;
        if (isShowFilter) {
            this.data.isDeptShow = false;
            this.data.deptClassName = CommonConfig.closed;
            this.data.params.deptKey = '';
            this.data.isEmployeeShow = false;
            this.data.managersClassName = CommonConfig.closed;
            this.data.rbpersonClassName = CommonConfig.closed;
            this.data.isUseShow = false;
            this.data.useClassName = CommonConfig.closed;
            this.data.isShowToast = false;
            this.data.isShowTravel = false;
            this.data.isShowFilter = false;
            this.data.listClassName = CommonConfig.closed;
            this.data.isShowList = false;
            this.setState({
                overflow: 'scroll'
            });
        }
    };

    handleClickFilter = async (e) => {
        const name = e.target.name;
        if (name === 'Type') {
            if (!this.data.isShowList) {
                this.data.isShowFilter = true;
                this.data.listClassName = CommonConfig.opened;
            }
        }
        if (name === 'Dept') {
            this.data.addDeptList = await getDept(this.data.userid, "");
            if (!this.data.isDeptShow) {
                this.data.isShowFilter = true;
                this.data.deptClassName = CommonConfig.opened;
            }
        }
        if (name === 'Item') {
            if (this.data.params.Dept) {
                if (this.data.params.Type) {
                    this.data.addUseList = await getItemAll(this.data.userid, this.data.params.Dept);
                    if (!this.data.isUseShow) {
                        this.data.isShowFilter = true;
                        this.data.useClassName = CommonConfig.opened;
                    }
                } else {
                    this.data.isShowTips = true;
                    this.data.tipsText = '请先选择类型！';
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1000);
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

    handleClickClear = async (e) => {
        const name = e.target.id;
        if (name === 'deptKey') {
            this.data.params.deptKey = '';
            this.data.addDeptList = await getDept(this.data.userid);
        }
        if (name === 'useKey') {
            this.data.params.useKey = '';
            this.data.addUseList = await getItemAll(this.data.userid, this.data.params.Dept);
        }
    };

    handleClickName = async (event) => {
        this.data.params.TypeName = event.target.innerHTML;
        this.data.params.Type = event.target.id;
        this.data.isShowFilter = false;
        this.data.listClassName = CommonConfig.closed;
        //选择后，重新计算金额
        this.data.maxMoney = getMoneyNumber(await getItemAllot(this.data.userid, this.data.params.ItemID, this.data.params.Type));
        this.data.params["Money"] = this.data.maxMoney;
    };

    handleChooseDept = async (e) => {
        this.data.params.Dept = e.target.id;
        this.data.params.DeptName = e.target.innerText;
        this.data.deptClassName = CommonConfig.closed;
        this.data.isShowFilter = false;
        //选择后，清空金额和项目
        this.data.params.ItemID = '';
        this.data.params.ItemName = '';
        this.data.params.Money = '0.00';
    };

    handleChooseUse = async (e) => {
        this.data.params.ItemID = e.target.id;
        this.data.params.ItemName = e.target.innerText;
        this.data.useClassName = CommonConfig.closed;
        this.data.isShowFilter = false;
        this.data.maxMoney = getMoneyNumber(await getItemAllot(this.data.userid, e.target.id, this.data.params.Type));
        this.data.params["Money"] = this.data.maxMoney;
    };

    //选择时间
    handleClickDate = () => {
        this.data.timeParams.isOpen = true;
        this.data.timeParams.max = new Date();
    };

    handleSelectDate = (date) => {
        this.data.timeParams.isOpen = false;
        this.data.params.YearDate = moment(date).format('YYYY-MM-DD');
    };

    handleCancelDate = () => {
        this.data.timeParams.isOpen = false;
    };

    handleNextStep = () => {
        if (!this.data.params.Note) {
            this.data.isShowTips = true;
            this.data.tipsText = "请填写分配原因！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
            return;
        }
        if (!this.data.params.Type) {
            this.data.isShowTips = true;
            this.data.tipsText = "请选择预算类型！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
            return;
        }
        if (!this.data.params.ItemID) {
            this.data.isShowTips = true;
            this.data.tipsText = "请选择预算项目！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
            return;
        }
        if (!this.data.params.Money) {
            this.data.isShowTips = true;
            this.data.tipsText = "请填写金额！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
            return;
        } else {
            if (parseFloat(this.data.params.Money) > this.data.maxMoney) {
                this.data.isShowTips = true;
                this.data.tipsText = '最大分配金额为' + this.data.maxMoney;
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1500);
                return;
            }
            //else if (parseFloat(this.data.params.Money) < 0) {
            //    this.data.isShowTips = true;
            //    this.data.tipsText = '分配金额不能小于0';
            //    setTimeout(() => {
            //        this.data.isShowTips = false;
            //        this.data.tipsText = '';
            //    }, 1500);
            //    return;
            //}
        }
        if (!this.data.params.Context) {
            this.data.isShowTips = true;
            this.data.tipsText = "请填写备注！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
            return;
        }
        if (this.data.params.Note && this.data.params.Type &&
            this.data.params.ItemID && this.data.params.Money && this.data.params.Context) {
            sessionStorage.setItem("params", JSON.stringify(this.data.params));
            window.location.href = '/home/preAllocationAdd';
        }
    };

    handleClickDel = () => {
        this.data.isShowFilter = true;
        this.data.isShowToast = true;
    }

    handleClickAlterOK = () => {
        this.data.isShowToast = false;
        this.data.isShowTips = true;
        this.data.tipsText = '正在提交单据，请稍后...';
        axios({
            url: URL.histBudget,
            params: {
                type: 'SubmitDownBudget',
                userid: this.data.userid,
                json: {
                    ID: this.data.params.ID
                }
            },
            method: 'get'
        }).then(res => {
            if (res.data.code === '00') {
                this.data.isShowTips = true;
                this.data.tipsText = '提交成功！';
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    this.data.isShowFilter = false;
                    window.location.href = '/home/payAllocationList';
                }, 1000);
            }
        });
    }

    handleClickAlterCancel = () => {
        this.data.isShowFilter = false;
        this.data.isShowToast = false;
    }

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail colorAddBG">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <AlterTips isShowToast={this.data.isShowToast} text={this.data.toastText}
                        handleClickOK={this.handleClickAlterOK} handleClickCancel={this.handleClickAlterCancel} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <DatePicker theme='ios'
                        showHeader={false}
                        confirmText={this.data.confirmText || "完成"}
                        dateConfig={this.dateConfig}
                        value={new Date()}
                        max={this.data.timeParams.max ? this.data.timeParams.max : (new Date())}
                        isOpen={this.data.timeParams.isOpen}
                        onSelect={(date) => this.handleSelectDate(date)}
                        onCancel={this.handleCancelDate}
                    />
                    <ExpenseChooseList
                        listClassName={this.data.listClassName}
                        list={DelegateType}
                        handleClickName={this.handleClickName} />
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
                    <HeadTitle titleTxt="分配明细" btnSelect={this.data.btnSelect} showDelBtn={this.data.showDelBtn}
                        handleClickBack={this.handleClickBack}
                        handleClickDel={this.handleClickDel}
                    />
                    <AddBudgetProgressBar oneTit='分配明细' twoTit='预览' threeTit='完成' onClickTwo={this.handleNextStep} />
                    <div className="content_main">
                        <ContentInputs name="YearDate" display="none" readOnly={true}
                            title="日期" type="text"
                            value={this.data.params.YearDate} />
                        <ContentInputs name="Type" display="none" readOnly={true}
                            title="类型" type="text" placeholder="请选择"
                            value={this.data.params.TypeName} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                        <ContentTextarea name="Note" display="none"
                            title="原因" type="text" placeholder="请填写"
                            value={this.data.params.Note}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="Dept" display="none" readOnly={true}
                            title="部门" type="text" placeholder="请选择"
                            value={this.data.params.DeptName} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                        <ContentInputs name="Item" display="none" readOnly={true}
                            title="项目" type="text" placeholder="请选择"
                            value={this.data.params.ItemName} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                        <ContentInputs name="Money" display="none" iconName="icon-select" price="元"
                            title="金额" type="text" placeholder="请填写"
                            value={this.data.params.Money}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="Context" display="none"
                            title="摘要" type="text" placeholder="请填写"
                            value={this.data.params.Context}
                            handleChange={this.handleChangeInput} />
                    </div>
                </div>
                <SubmitBtn value="下一步" handleClick={this.handleNextStep} />
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
export default PayAllocationAdd;