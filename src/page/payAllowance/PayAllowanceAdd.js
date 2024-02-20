import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { ContentHead, HeadTitle } from "../commonComp/HeadTitle";
import { SubmitBtn } from "../commonComp/SubmitBtnComp";
import axios from "axios";
import { ContentInputs, ContentTextarea } from "../commonComp/InputComp";
import URL from "../../../public/api/serverAPI.config";
import Tips from "../commonComp/TipsComp";
import {
    PreApplicatFilter,
    PreAttnFilter,
    PreDeptFilter,
    PreItemFilter,
    PreZwdFilter,
    PreBillFilter,
} from "../commonComp/EditCommonFilter";
import { CommonConfig } from "../config/commonConfig";
import { getBill, getDept, getEmployee, getItem, getZwd, getUploadFile } from "../commonInterface/DeclareComm";
import DatePicker from "react-mobile-datepicker";
import moment from "moment";
import { AlterTips } from "../../page/commonComp/AlterTips";
import { getMoneyNumber, uuid } from "../config/commonCheck";
import AllowanceDchList from "./AllowanceDchList";
import { AddOtherProgressBar, AddProgressBar } from "../commonComp/ProgressBar";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayAllowanceAdd extends React.Component {
    @observable data = {
        userid: '',
        type: 'AddCurrentPayment',
        Name: '',
        Dept: '',
        Year: '',
        params: {
            Anyreason: '',
            Item: '',
            ItemID: '',
            hid_use: '',
            use: '',
            Applicant: '',
            ApplicantID: '',
            ApplicantBuMenID: '',
            Anyperson: '',
            AnypersonID: '',
            AnyBuMenID: '',
            Unit: '',
            wandeihidden: '',
            Attn: '',
            AttnId: '',
            AttnBumenID: '',
            Money_1: '0.00',
            BankAccName: '',
            BankAccID: '',
            YearDate: '',
            Enclosure: '0',
            Othernote: '',
            AllCourse: '',
            PaymentCourse: '',
            HedgeNum: '',
            deptKey: '',
            managersKey: '',
            attnKey: '',
            useKey: '',
            zwdKey: '',
            billKey: ''
        },
        payExpenseAdd: [],
        page: 1,
        isShowFilter: false,
        tipsText: '',
        isShowTips: false,
        addDeptList: [],
        addApplicatList: [],
        addAttnList: [],
        addUseList: [],
        addZwdList: [],
        addBillList: [],
        isDeptShow: false,
        isEmployeeShow: false,
        isUseShow: false,
        isZwdShow: false,
        isBillShow: false,
        deptClassName: '',
        managersClassName: '',
        rbpersonClassName: '',
        useClassName: '',
        zwdClassName: '',
        billClassName: '',
        epCurrent: 'Dept',
        danweiID: '',
        confirmText: '',
        timeParams: {
            max: '',
            min: '',
            isOpen: false
        },
        isShowToast: false,
        Unit: '',
        use: '',
        isShowDch: false,
        pfi_id: '',
        fileArr: []
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
        let DeptCode = BaseComm.GetLoginInfo().userOrgID;
        let DeptName = BaseComm.GetLoginInfo().userOrg;
        let name = BaseComm.GetLoginInfo().userName;
        this.data.params.wandeihidden = DeptCode;
        this.data.params.Unit = DeptName;
        this.data.Unit = DeptName;
        this.data.params.ApplicantBuMenID = DeptCode;
        this.data.params.Applicant = name;
        this.data.params.ApplicantID = this.data.userid;
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        this.data.params.YearDate = year + '-' + month + "-" + day;
        this.data.userid = BaseComm.GetLoginID();
        let params = JSON.parse(sessionStorage.getItem("params"));
        //if (params) {
        //    this.data.params = params;
        //} else {
        let code = this.props.location.search;
        code = code.slice(1);
        if (code.indexOf("&") != -1) {
            code = code.split('&')[0];
        }
        if (code && code.indexOf('.') < 0) {
            sessionStorage.setItem("pfi_id", code);
            this.getDetail(code);
        } else {
            sessionStorage.setItem("pfi_id", "");
        }
        //}
    };
    //获取报销详情
    getDetail = (PFI_ID) => {
        axios({
            url: URL.histAllowance,
            params: {
                type: 'GetCurrentPayment',
                userid: this.data.userid,
                json: {
                    PFI_ID: PFI_ID
                }
            },
            method: 'post'
        }).then(res => {
            if (res.data.Money_1 != "") {
                this.data.params.BankAccID = res.data.BankAccID;
                this.data.params.Unit = res.data.Unit;
                this.data.Unit = res.data.Unit;
                this.data.params.Anyreason = res.data.Anyreason;
                this.data.params.YearDate = res.data.YearDate;
                this.data.params.ApplicantBuMenID = res.data.ApplicantBuMenID;
                this.data.params.wandeihidden = res.data.wandeihidden;
                this.data.params.AllCourse = res.data.AllCourse;
                this.data.params.AnyBuMenID = res.data.AnyBuMenID;
                this.data.params.AttnId = res.data.AttnId;
                this.data.params.Enclosure = res.data.Enclosure;
                this.data.params.Applicant = res.data.Applicant;
                this.data.params.Othernote = res.data.Othernote;
                this.data.params.hid_use = res.data.hid_use;
                this.data.params.ApplicantID = res.data.ApplicantID;
                this.data.params.BankAccName = res.data.BankAccName;
                this.data.params.AttnBumenID = res.data.AttnBumenID;
                this.data.params.AnypersonID = res.data.AnypersonID;
                this.data.params.Anyperson = res.data.Anyperson;
                this.data.params.Attn = res.data.Attn;
                this.data.params.use = res.data.use;
                this.data.params.PaymentCourse = res.data.PaymentCourse;
                this.data.params.Money_1 = res.data.Money_1;
                this.data.params.HedgeNum = res.data.HedgeNum;
                this.data.params.ItemID = res.data.ItemID;
                if (this.data.params.ItemID) {
                    getItem(this.data.userid, this.data.params.wandeihidden, null, this.data.params.YearDate.slice(0, 4)).then(res => {
                        if (res.status === '00') {
                            for (let i = 0; res.data.length > i; i++) {
                                if (res.data[i].ItemID === this.data.params.ItemID) {
                                    this.data.params.Item = res.data[i].ItemName;
                                }
                            }
                        } else {
                            this.data.isShowTips = true;
                            this.data.tipsText = `${res.msg}，项目名称加载失败`;
                            setTimeout(() => {
                                this.data.isShowTips = false;
                                this.data.tipsText = '';
                            }, 1000);
                        }
                    });
                }
            }
        }).catch(reason => {
            console.log(reason);
        });
    };

    handleClickBack = () => {
        window.location.href = '/home/payAllowanceList?4';
    };

    handleChangeInput = async (e) => {
        const name = e.target.name;
        let valueC = e.target.value;
        this.data.params[name] = valueC;
        if (name === 'Enclosure') {
            if (!isNaN(parseFloat(valueC))) {
                valueC = parseInt(valueC);
                this.data.params.Enclosure = valueC;
            }
        }
        if (name === 'deptKey') {
            this.data.addDeptList = await getDept(this.data.userid, this.data.params.deptKey);
        }
        if (name === 'applicatKey') {
            this.data.addApplicatList = await getEmployee(this.data.userid, this.data.params.applicatKey);
        }
        if (name === 'attnKey') {
            this.data.addAttnList = await getEmployee(this.data.userid, this.data.params.attnKey);
        }
        if (name === 'useKey') {
            this.data.addUseList = await getItem(this.data.userid, this.data.params.wandeihidden, this.data.params.useKey);
        }
        if (name === 'zwdKey') {
            this.data.addZwdList = await getZwd(this.data.userid, this.data.params.zwdKey);
        }
        if (name === 'billKey') {
            this.data.addBillList = await getBill(this.data.userid, this.data.params.billKey);
        }
    };

    handleBlurMoney = (e) => {
        const name = e.target.name;
        if (!this.data.params[name]) {
            this.data.params[name] = '0.00';
        }
        if (name === 'Money_1') {
            this.data.params[name] = getMoneyNumber(this.data.params[name]);
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
            this.data.isZwdShow = false;
            this.data.zwdClassName = CommonConfig.closed;
            this.data.isBillShow = false;
            this.data.billClassName = CommonConfig.closed;
            this.data.isZczfShow = false;
            this.data.zczfClassName = CommonConfig.closed;
            this.data.isDchfShow = false;
            this.data.dchClassName = CommonConfig.closed;
            this.data.dchFilterClassName = CommonConfig.closed;
            this.data.isShowToast = false;
            this.data.isShowFilter = false;
            this.setState({
                overflow: 'scroll'
            });
        }
    };

    handleClickFilter = async (e) => {
        const name = e.target.name;
        if (name === 'Unit') {
            this.data.addDeptList = await getDept(this.data.userid);
            if (!this.data.isDeptShow) {
                this.data.isShowFilter = true;
                this.data.deptClassName = CommonConfig.opened;
            }
        }
        if (name === 'Attn') {
            this.data.addDeptList = await getDept(this.data.userid);
            if (!this.data.isDeptShow) {
                this.data.isShowFilter = true;
                this.data.deptClassName = CommonConfig.opened;
                this.data.epCurrent = 'Attn';
            }
        }
        if (name === 'Anyperson') {
            this.data.addDeptList = await getDept(this.data.userid);
            if (!this.data.isDeptShow) {
                this.data.isShowFilter = true;
                this.data.deptClassName = CommonConfig.opened;
                this.data.epCurrent = 'Anyperson';
            }
        }
        if (name === 'use') {
            this.data.addZwdList = await getZwd(this.data.userid);
            if (!this.data.isZwdShow) {
                this.data.isShowFilter = true;
                this.data.zwdClassName = CommonConfig.opened;
            }
        }
        if (name === 'AllCourse') {
            this.data.addBillList = await getBill(this.data.userid);
            if (!this.data.isBillShow) {
                this.data.isShowFilter = true;
                this.data.billClassName = CommonConfig.opened;
            }
        }
        if (name === 'HedgeNum') {
            this.data.isShowTips = true;
            this.data.tipsText = '正在打开对冲号记录...';
            setTimeout(() => {
                this.data.isShowDch = true;
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
        }
        if (name === 'Item') {
            if (this.data.params.wandeihidden) {
                this.data.addUseList = await getItem(this.data.userid, this.data.params.wandeihidden);
                if (!this.data.isUseShow) {
                    this.data.isShowFilter = true;
                    this.data.useClassName = CommonConfig.opened;
                }
            } else {
                this.data.isShowTips = true;
                this.data.tipsText = '请先选择借支部门！';
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
        if (name === 'applicatKey') {
            this.data.params.applicatKey = '';
            this.data.addApplicatList = await getEmployee(this.data.userid);
        }
        if (name === 'attnKey') {
            this.data.params.attnKey = '';
            this.data.addAttnList = await getEmployee(this.data.userid);
        }
        if (name === 'useKey') {
            this.data.params.useKey = '';
            this.data.addUseList = await getItem(this.data.userid, this.data.params.wandeihidden);
        }
        if (name === 'zwdKey') {
            this.data.params.zwdKey = '';
            this.data.addZwdList = await getZwd(this.data.userid);
        }
        if (name === 'billKey') {
            this.data.params.billKey = '';
            this.data.addBillList = await getBill(this.data.userid);
        }
    };

    handleChooseDept = async (e) => {
        if (this.data.epCurrent === 'Attn') {
            this.data.danweiID = e.target.id;
            this.data.deptClassName = CommonConfig.closed;
            this.data.addApplicatList = await getEmployee(this.data.userid, this.data.danweiID);
            this.data.managersClassName = CommonConfig.opened;
        } if (this.data.epCurrent === 'Anyperson') {
            this.data.danweiID = e.target.id;
            this.data.deptClassName = CommonConfig.closed;
            this.data.addAttnList = await getEmployee(this.data.userid, this.data.danweiID);
            this.data.rbpersonClassName = CommonConfig.opened;
        }
        //if (this.data.epCurrent === 'Dept') {
        //    this.data.params.wandeihidden = e.target.id;
        //    this.data.params.Unit = e.target.innerText;
        //    this.data.Unit = e.target.innerText;
        //    this.data.deptClassName = CommonConfig.closed;
        //    this.data.isShowFilter = false;
        //    this.data.epCurrent = '';
        //}
    };

    handleChooseManagers = (e) => {
        this.data.params.AttnId = e.target.id;
        this.data.params.Attn = e.target.innerText;
        this.data.params.AttnBumenID = e.target.title;
        this.data.managersClassName = CommonConfig.closed;
        this.data.isShowFilter = false;
        this.data.epCurrent = 'Dept';
    };

    handleChooseAttn = (e) => {
        this.data.params.AnypersonID = e.target.id;
        this.data.params.Anyperson = e.target.innerText;
        this.data.params.AnyBuMenID = e.target.title;
        this.data.rbpersonClassName = CommonConfig.closed;
        this.data.isShowFilter = false;
        this.data.epCurrent = 'Dept';
    };

    handleChooseUse = (e) => {
        this.data.params.ItemID = e.target.id;
        this.data.params.Item = e.target.innerText;
        this.data.useClassName = CommonConfig.closed;
        this.data.isShowFilter = false;
    };

    handleChooseZwd = (e) => {
        this.data.params.hid_use = e.target.id;
        this.data.params.use = e.target.innerText;
        this.data.zwdClassName = CommonConfig.closed;
        this.data.isShowFilter = false;
    };

    handleChooseBill = (e) => {
        this.data.params.AllCourse = e.target.innerText;
        this.data.params.PaymentCourse = e.target.id;
        this.data.billClassName = CommonConfig.closed;
        this.data.isShowFilter = false;
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

    handleClickDch = (listData) => {
        this.data.isShowDch = false;
        this.data.params.HedgeNum = listData.dch;
        this.data.params.hid_use = listData.dwbh;
        this.data.params.use = listData.dwmc;
        this.data.params.ItemID = listData.xmbh;
        this.data.params.Item = listData.xmmc;
        this.data.params.PaymentCourse = listData.kmbh;
        this.data.params.AllCourse = listData.kmmc;
        if (listData.jje > 0) {
            this.data.params.Money_1 = getMoneyNumber(listData.jje);
        } else {
            this.data.params.Money_1 = getMoneyNumber(listData.dje);
        }
    };

    handleBackAdd = () => {
        this.data.isShowDch = false;
    };

    handleNextStep = () => {
        if (parseFloat(this.data.params.Money_1) <= 0.00) {
            this.data.isShowTips = true;
            this.data.tipsText = "总金额不能为0或负数！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.data.isShowFilter = false;
            }, 1000);
            return;
        }
        if (!this.data.params.Anyreason) {
            this.data.isShowTips = true;
            this.data.tipsText = "请填写领款事由！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
            return;
        }
        if (!this.data.params.use) {
            this.data.isShowTips = true;
            this.data.tipsText = "请选择往来单位！";
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
        if (!this.data.params.HedgeNum) {
            this.data.isShowTips = true;
            this.data.tipsText = "请选择对冲号！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
            return;
        }
        if (this.data.params.Anyreason
            && this.data.params.AllCourse && this.data.params.ItemID && this.data.params.use
            && this.data.params.Money_1 && this.data.params.HedgeNum) {
            sessionStorage.setItem("params", JSON.stringify(this.data.params));
            window.location.href = '/home/addAllowanceTwo';
        }
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail colorAddBG">
                    <div style={{ display: this.data.isShowDch ? 'block' : 'none' }}>
                        <div className="Customer-select">
                            <AllowanceDchList
                                DeptCode={this.data.params.wandeihidden} DeptName={this.data.params.Unit}
                                DWBH={this.data.params.hid_use} DWBHName={this.data.params.use}
                                ItemCode={this.data.params.ItemID} ItemName={this.data.params.Item}
                                handleBackAdd={this.handleBackAdd}
                                handleClickDch={this.handleClickDch} />
                        </div>
                    </div>
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <AlterTips isShowToast={this.data.isShowToast} text="是否提交？"
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
                    <PreDeptFilter filterClassName={this.data.deptClassName}
                        addPreList={this.data.addDeptList.data || []} name="deptKey"
                        handleChangeInput={this.handleChangeInput}
                        deptKey={this.data.params.deptKey}
                        handleChooseFilter={this.handleChooseDept}
                        handleClickClear={this.handleClickClear} />
                    <PreApplicatFilter filterClassName={this.data.managersClassName}
                        addPreList={this.data.addApplicatList.data || []} name="managersKey"
                        handleChangeInput={this.handleChangeInput}
                        managersKey={this.data.params.managersKey}
                        handleChooseFilter={this.handleChooseManagers}
                        handleClickClear={this.handleClickClear} />
                    <PreAttnFilter filterClassName={this.data.rbpersonClassName}
                        addPreList={this.data.addAttnList.data || []} name="attnKey"
                        handleChangeInput={this.handleChangeInput}
                        attnKey={this.data.params.attnKey}
                        handleChooseFilter={this.handleChooseAttn}
                        handleClickClear={this.handleClickClear} />
                    <PreItemFilter filterClassName={this.data.useClassName}
                        addPreList={this.data.addUseList.data || []} name="useKey"
                        handleChangeInput={this.handleChangeInput}
                        itemKey={this.data.params.useKey}
                        handleChooseFilter={this.handleChooseUse}
                        handleClickClear={this.handleClickClear} />
                    <PreZwdFilter filterClassName={this.data.zwdClassName}
                        addPreList={this.data.addZwdList.data || []} name="zwdKey"
                        handleChangeInput={this.handleChangeInput}
                        itemKey={this.data.params.zwdKey}
                        handleChooseFilter={this.handleChooseZwd}
                        handleClickClear={this.handleClickClear} />
                    <PreBillFilter filterClassName={this.data.billClassName}
                        addPreList={this.data.addBillList.data || []} name="billKey"
                        handleChangeInput={this.handleChangeInput}
                        itemKey={this.data.params.billKey}
                        handleChooseFilter={this.handleChooseBill}
                        handleClickClear={this.handleClickClear} />
                    <HeadTitle titleTxt="往来新增" handleClickBack={this.handleClickBack} />
                    <AddOtherProgressBar oneTit='项目明细' twoTit='其他信息' threeTit='附件上传' fourTit='申报完成'
                        onClickTwo={this.handleNextStep} />
                    <div className="content_main">
                        <ContentInputs name="YearDate" display="block" readOnly={true}
                            title="申报日期" type="text" placeholder="请选择"
                            value={this.data.params.YearDate} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickDate} />
                        <ContentInputs name="Unit" display="block" readOnly={true}
                            title="领款部门" type="text" placeholder="请选择"
                            value={this.data.Unit} />
                        <ContentInputs name="HedgeNum" display="block" readOnly={true}
                            title="对冲号" type="text" placeholder="请选择"
                            value={this.data.params.HedgeNum} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                        <ContentInputs name="use" display="block" readOnly={true}
                            title="往来单位" type="text" placeholder="请选择"
                            value={this.data.params.use} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                        <ContentTextarea name="Anyreason" display="block"
                            title="领款事由" type="text" placeholder="请填写"
                            value={this.data.params.Anyreason}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="AllCourse" display="block" readOnly={true}
                            title="挂账科目" type="text" placeholder="请选择"
                            value={this.data.params.AllCourse} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                        <ContentTextarea name="Item" display="block" readOnly={true}
                            title="预算项目" type="text" placeholder="请选择"
                            value={this.data.params.Item} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                        <ContentInputs name="Money_1" display="block"
                            title="总金额" type="text" placeholder="请填写"
                            handleBlur={this.handleBlurMoney}
                            value={this.data.params.Money_1}
                            handleChange={this.handleChangeInput} />
                    </div>
                </div>
                <SubmitBtn value="下一步" handleClick={this.handleNextStep} />
                <style>{`
                    body{
                        overflow-y:${this.state.overflow};
                    }
                    .Customer-select{
                        position: fixed;
                        width: 100%;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        z-index:100;
                    }
                    #img_div{
                        position:relative;
                        width:100%;
                    }
                    #file_img{
                        position:relative;
                        width:2rem;
                        height:2rem;
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
export default PayAllowanceAdd;