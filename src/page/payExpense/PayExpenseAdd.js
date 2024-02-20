import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { ContentHead, HeadTitle } from "../commonComp/HeadTitle";
import { SubmitBtn, AddProject } from "../commonComp/SubmitBtnComp";
import axios from "axios";
import { ContentInputs } from "../commonComp/InputComp";
import URL from "../../../public/api/serverAPI.config";
import Tips from "../commonComp/TipsComp";
import { PreApplicatFilter, PreAttnFilter, PreDeptFilter, PreItemFilter } from "../commonComp/EditCommonFilter";
import { CommonConfig } from "../config/commonConfig";
import { getDept, getEmployee, getItem, getUploadFile } from "../commonInterface/DeclareComm";
import DatePicker from "react-mobile-datepicker";
import moment from "moment";
import { AlterTips } from "../../page/commonComp/AlterTips";
import { getMoneyNumber, uuid } from "../config/commonCheck";
import { AddProgressBar } from "../commonComp/ProgressBar";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayExpenseAdd extends React.Component {
    @observable data = {
        userid: '',
        type: 'AddApproval',
        Name: '',
        Dept: '',
        Year: '',
        pfi_id: '',
        params: {
            Use_1: '',
            UseID_1: '',
            Money_1: '0.00',
            Payment1: '0.00',
            Bill1: '0.00',
            Note_1: '',
            Use_2: '',
            UseID_2: '',
            Money_2: '0.00',
            Payment2: '0.00',
            Bill2: '0.00',
            Note_2: '',
            Use_3: '',
            UseID_3: '',
            Money_3: '0.00',
            Payment3: '0.00',
            Bill3: '0.00',
            Note_3: '',
            Moneyhidden: '0.00',
            PaymentSum: '0.00',
            BillSum: '0.00',
            otherNote: '',
            Account: '',
            Enclosure: '0',
            NameBuMenID: '',
            AttnBumenID: '',
            BankAccID: '',
            ApplicantBuMenID: '',
            Managers: '',
            ApplicantID: '',
            BankAccName: '',
            AttnId: '',
            Rbperson: '',
            danweiID: '',
            Applicant: '',
            YearDate: '',
            Rbunit: '',
            IsTravel: '0',
            deptKey: '',
            managersKey: '',
            attnKey: '',
            useKey: ''
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
        isDeptShow: false,
        isEmployeeShow: false,
        isUseShow: false,
        deptClassName: '',
        managersClassName: '',
        rbpersonClassName: '',
        useClassName: '',
        isShowBlock2: false,
        isShowBlock3: false,
        useCurrent: '',
        epCurrent: 'Dept',
        danweiID: '',
        confirmText: '',
        timeParams: {
            max: '',
            min: '',
            isOpen: false
        },
        isShowToast: false,
        isShowTravel: false,
        currAddSum: 1,
        currDel: 0
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
        console.log(dept);
        this.data.params.danweiID = dept.data[0].DeptCode;
        this.data.params.Rbunit = dept.data[0].DeptName;
        this.data.params.ApplicantBuMenID = id;
        this.data.params.Applicant = name;
        this.data.params.ApplicantID = this.data.userid;
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        this.data.params.YearDate = year + '-' + month + "-" + day;
        //let params = JSON.parse(sessionStorage.getItem("params"));
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
        let currAddSum = JSON.parse(sessionStorage.getItem("currAddSum"));
        if (currAddSum) {
            this.data.currAddSum = currAddSum;
            if (this.data.currAddSum > 2) {
                this.data.isShowBlock2 = true;
                this.data.isShowBlock3 = true;
                this.data.currDel = 1;
            }
            if (this.data.currAddSum === 2) {
                this.data.isShowBlock2 = true;
                this.data.isShowBlock3 = false;
                this.data.currDel = 1;
            }
            if (this.data.currAddSum === 1) {
                this.data.isShowBlock2 = false;
                this.data.isShowBlock3 = false;
                this.data.currDel = 0;
            }
        }
    };

    //获取报销详情
    getDetail = (PFI_ID) => {
        axios({
            url: URL.histExpense,
            params: {
                type: 'GetApproval',
                userid: this.data.userid,
                json: {
                    PFI_ID: PFI_ID
                }
            },
            method: 'post'
        }).then(res => {
            console.log(res.data);
            if (res.data.Use_1 != "" && res.data.UseID_1 != "" && res.data.Money_1 != "") {
                this.data.params.Use_1 = res.data.Use_1;
                this.data.params.UseID_1 = res.data.UseID_1;
                this.data.params.Money_1 = res.data.Money_1;
                this.data.params.Payment1 = res.data.Payment1;
                this.data.params.Bill1 = res.data.Bill1;
                this.data.params.Note_1 = res.data.Note_1;
                this.data.params.Use_2 = res.data.Use_2;
                this.data.params.UseID_2 = res.data.UseID_2;
                this.data.params.Money_2 = res.data.Money_2;
                this.data.params.Payment2 = res.data.Payment2;
                this.data.params.Bill2 = res.data.Bill2;
                this.data.params.Note_2 = res.data.Note_2;
                this.data.params.Use_3 = res.data.Use_3;
                this.data.params.UseID_3 = res.data.UseID_3;
                this.data.params.Money_3 = res.data.Money_3;
                this.data.params.Payment3 = res.data.Payment3;
                this.data.params.Bill3 = res.data.Bill3;
                this.data.params.Note_3 = res.data.Note_3;
                this.data.params.Moneyhidden = res.data.Moneyhidden;
                this.data.params.PaymentSum = res.data.PaymentSum;
                this.data.params.BillSum = res.data.BillSum;
                this.data.params.otherNote = res.data.otherNote;
                this.data.params.Account = res.data.Account;
                this.data.params.Enclosure = res.data.Enclosure;
                this.data.params.NameBuMenID = res.data.NameBuMenID;
                this.data.params.AttnBumenID = res.data.AttnBumenID;
                this.data.params.BankAccID = res.data.BankAccID;
                this.data.params.ApplicantBuMenID = res.data.ApplicantBuMenID;
                this.data.params.Managers = res.data.Managers;
                this.data.params.BankAccName = res.data.BankAccName;
                this.data.params.ApplicantID = res.data.ApplicantID;
                this.data.params.AttnId = res.data.AttnId;
                this.data.params.Applicant = res.data.Applicant;
                this.data.params.Rbperson = res.data.Rbperson;
                this.data.params.danweiID = res.data.danweiID;
                this.data.params.YearDate = res.data.YearDate;
                this.data.params.Rbunit = res.data.Rbunit;
                this.data.params.IsTravel = res.data.IsTravel;
                if (this.data.params.UseID_1 && this.data.params.UseID_2 && this.data.params.UseID_3) {
                    this.data.currAddSum = 3;
                }
                if (this.data.params.UseID_1 && this.data.params.UseID_2 && !this.data.params.UseID_3) {
                    this.data.currAddSum = 2;
                }
                if (this.data.params.UseID_1 && !this.data.params.UseID_2 && !this.data.params.UseID_3) {
                    this.data.currAddSum = 1;
                }
                if (this.data.currAddSum > 2) {
                    this.data.isShowBlock2 = true;
                    this.data.isShowBlock3 = true;
                    this.data.currDel = 1;
                }
                if (this.data.currAddSum === 2) {
                    this.data.isShowBlock2 = true;
                    this.data.isShowBlock3 = false;
                    this.data.currDel = 1;
                }
                if (this.data.currAddSum === 1) {
                    this.data.isShowBlock2 = false;
                    this.data.isShowBlock3 = false;
                    this.data.currDel = 0;
                }
            }
        }).catch(reason => {
            console.log(reason);
        });
    };

    handleClickBack = () => {
        window.location.href = '/home/payExpenseList?4';
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
        if (name === 'applicatKey') {
            this.data.addApplicatList = await getEmployee(this.data.userid, this.data.params.applicatKey);
        }
        if (name === 'attnKey') {
            this.data.addAttnList = await getEmployee(this.data.userid, this.data.params.attnKey);
        }
        if (name === 'useKey') {
            this.data.addUseList = await getItem(this.data.userid, this.data.params.danweiID, this.data.params.useKey);
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
            this.setState({
                overflow: 'scroll'
            });
        }
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
        if (name === 'Managers') {
            this.data.addDeptList = await getDept(this.data.userid);
            if (!this.data.isDeptShow) {
                this.data.isShowFilter = true;
                this.data.deptClassName = CommonConfig.opened;
                this.data.epCurrent = 'Managers';
            }
        }
        if (name === 'Rbperson') {
            this.data.addDeptList = await getDept(this.data.userid);
            if (!this.data.isDeptShow) {
                this.data.isShowFilter = true;
                this.data.deptClassName = CommonConfig.opened;
                this.data.epCurrent = 'Rbperson';
            }
        }
        if (name === 'Use_1') {
            if (this.data.params.danweiID) {
                this.data.useCurrent = 'use1';
                this.data.addUseList = await getItem(this.data.userid, this.data.params.danweiID);
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
        if (name === 'Use_2') {
            if (this.data.params.danweiID) {
                this.data.useCurrent = 'use2';
                this.data.addUseList = await getItem(this.data.userid, this.data.params.danweiID);
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
        if (name === 'Use_3') {
            if (this.data.params.danweiID) {
                this.data.useCurrent = 'use3';
                this.data.addUseList = await getItem(this.data.userid, this.data.params.danweiID);
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
            this.data.addUseList = await getItem(this.data.userid, this.data.params.danweiID);
        }
    };

    handleChooseDept = async (e) => {
        if (this.data.epCurrent === 'Managers') {
            this.data.danweiID = e.target.id;
            this.data.deptClassName = CommonConfig.closed;
            this.data.addApplicatList = await getEmployee(this.data.userid, this.data.danweiID);
            this.data.managersClassName = CommonConfig.opened;
        } if (this.data.epCurrent === 'Rbperson') {
            this.data.danweiID = e.target.id;
            this.data.deptClassName = CommonConfig.closed;
            this.data.addAttnList = await getEmployee(this.data.userid, this.data.danweiID);
            this.data.rbpersonClassName = CommonConfig.opened;
        }
        if (this.data.epCurrent === 'Dept') {
            this.data.params.danweiID = e.target.id;
            this.data.params.Rbunit = e.target.innerText;
            this.data.deptClassName = CommonConfig.closed;
            this.data.isShowFilter = false;
        }
    };

    handleChooseManagers = (e) => {
        this.data.params.AttnId = e.target.id;
        this.data.params.Managers = e.target.innerText;
        this.data.params.AttnBumenID = e.target.title;
        this.data.managersClassName = CommonConfig.closed;
        this.data.isShowFilter = false;
        this.data.epCurrent = 'Dept';
    };

    handleChooseAttn = (e) => {
        this.data.params.Account = e.target.id;
        this.data.params.Rbperson = e.target.innerText;
        this.data.params.NameBuMenID = e.target.title;
        this.data.rbpersonClassName = CommonConfig.closed;
        this.data.isShowFilter = false;
        this.data.epCurrent = 'Dept';
    };

    handleChooseUse = (e) => {
        if (this.data.useCurrent === 'use1') {
            this.data.params.UseID_1 = e.target.id;
            this.data.params.Use_1 = e.target.innerText;
            this.data.useClassName = CommonConfig.closed;
            this.data.isShowFilter = false;
        }
        if (this.data.useCurrent === 'use2') {
            this.data.params.UseID_2 = e.target.id;
            this.data.params.Use_2 = e.target.innerText;
            this.data.useClassName = CommonConfig.closed;
            this.data.isShowFilter = false;
        }
        if (this.data.useCurrent === 'use3') {
            this.data.params.UseID_3 = e.target.id;
            this.data.params.Use_3 = e.target.innerText;
            this.data.useClassName = CommonConfig.closed;
            this.data.isShowFilter = false;
        }
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

    handleClickAddPro = () => {
        if (this.data.currAddSum === 1 && this.data.currDel === 0) {
            this.data.isShowBlock2 = true;
            this.data.currAddSum += 1;
            return;
        }
        if (this.data.currAddSum === 2 && this.data.currDel === 0) {
            this.data.currDel = 1;
            this.data.isShowBlock2 = true;
            this.data.isShowBlock3 = true;
            this.data.currAddSum += 1;
        }
    };

    handleClickDelPro = () => {
        if (this.data.currAddSum > 2 && this.data.currDel === 1) {
            this.data.currAddSum -= 1;
            this.data.isShowBlock3 = false;
            this.data.params.Use_3 = "";
            this.data.params.UseID_3 = "";
            this.data.params.Note_3 = "";
            this.data.params.Money_3 = "0.00";
            this.data.params.Payment3 = "0.00";
            this.data.params.Bill3 = "0.00";
            this.data.params.PaymentSum = getMoneyNumber(parseFloat(this.data.params.Payment1) + parseFloat(this.data.params.Payment2));
            this.data.params.BillSum = getMoneyNumber(parseFloat(this.data.params.Bill1) + parseFloat(this.data.params.Bill2));
            this.data.params.Moneyhidden = getMoneyNumber(parseFloat(this.data.params.Money_2) + parseFloat(this.data.params.Money_1));
            return;
        }
        if (this.data.currAddSum === 2 && this.data.currDel === 1) {
            this.data.isShowBlock3 = false;
            this.data.isShowBlock2 = false;
            this.data.params.Use_2 = "";
            this.data.params.UseID_2 = "";
            this.data.params.Note_2 = "";
            this.data.params.Money_2 = "0.00";
            this.data.params.Payment2 = "0.00";
            this.data.params.Bill2 = "0.00";
            this.data.params.PaymentSum = getMoneyNumber(parseFloat(this.data.params.Payment1));
            this.data.params.BillSum = getMoneyNumber(parseFloat(this.data.params.Bill1));
            this.data.params.Moneyhidden = getMoneyNumber(parseFloat(this.data.params.Money_1));
            this.data.currAddSum -= 1;
            this.data.currDel = 0;
        }
    };

    handleNextStep = () => {
        if (this.data.currAddSum === 1) {
            if (!this.data.params.Use_1) {
                this.data.isShowTips = true;
                this.data.tipsText = "请选择经费项目！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return;
            }
            if (!this.data.params.Note_1) {
                this.data.isShowTips = true;
                this.data.tipsText = "请填写摘要！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return;
            }
            if (this.data.params.Use_1 && this.data.params.Note_1) {
                sessionStorage.setItem("currAddSum", JSON.stringify(this.data.currAddSum));
                sessionStorage.setItem("params", JSON.stringify(this.data.params));
                window.location.href = '/home/addExpenseTwo';
            }
        }
        if (this.data.currAddSum === 2) {
            if (!this.data.params.Use_1 || !this.data.params.Use_2) {
                this.data.isShowTips = true;
                this.data.tipsText = "请选择经费项目！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return;
            }
            if (!this.data.params.Note_1 || !this.data.params.Note_2) {
                this.data.isShowTips = true;
                this.data.tipsText = "请填写摘要！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return;
            }
            if (this.data.params.Use_1 && this.data.params.Note_1
                && this.data.params.Use_2 && this.data.params.Note_2) {
                sessionStorage.setItem("currAddSum", JSON.stringify(this.data.currAddSum));
                sessionStorage.setItem("params", JSON.stringify(this.data.params));
                window.location.href = '/home/addExpenseTwo';
            }
        }
        if (this.data.currAddSum === 3) {
            if (!this.data.params.Use_1 || !this.data.params.Use_2 || !this.data.params.Use_3) {
                this.data.isShowTips = true;
                this.data.tipsText = "请选择经费项目！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return;
            }
            if (!this.data.params.Note_1 || !this.data.params.Note_2 || !this.data.params.Note_3) {
                this.data.isShowTips = true;
                this.data.tipsText = "请填写摘要！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return;
            }
            if (this.data.params.Use_1 && this.data.params.Note_1
                && this.data.params.Use_2 && this.data.params.Note_2
                && this.data.params.Use_3 && this.data.params.Note_3) {
                sessionStorage.setItem("currAddSum", JSON.stringify(this.data.currAddSum));
                sessionStorage.setItem("params", JSON.stringify(this.data.params));
                window.location.href = '/home/addExpenseTwo';
            }
        }
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail colorAddBG">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
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
                    <HeadTitle titleTxt="报销新增" handleClickBack={this.handleClickBack} />
                    <AddProgressBar onClickTwo={this.handleNextStep} />
                    <div className="content_main">
                        <ContentInputs name="YearDate" display="none" readOnly={true}
                            title="申报日期" type="text"
                            value={this.data.params.YearDate} />
                        <ContentInputs name="danwei" display="none" readOnly={true}
                            title="经费部门" type="text" placeholder="请选择"
                            value={this.data.params.Rbunit} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                        <ContentInputs name="Note_1" display="block"
                            title="①&nbsp;&nbsp;&nbsp;摘要" type="text" placeholder="请填写"
                            value={this.data.params.Note_1}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="Use_1" display="block" readOnly={true}
                            title="经费项目" type="text" placeholder="请选择"
                            value={this.data.params.Use_1} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                        <div id="box_main"
                            className={`box_main ${this.data.isShowBlock2 ? 'main_opened' : 'main_closed'}`}>
                            <ContentInputs name="Note_2" display="block"
                                title="②&nbsp;&nbsp;&nbsp;摘要" type="text" placeholder="请填写"
                                value={this.data.params.Note_2}
                                handleChange={this.handleChangeInput} />
                            <ContentInputs name="Use_2" display="block" readOnly={true}
                                title="经费项目" type="text" placeholder="请选择"
                                value={this.data.params.Use_2} iconName="iconfont icon-xiangyou icon-select"
                                handleClick={this.handleClickFilter} />
                        </div>
                        <div id="box_main"
                            className={`box_main ${this.data.isShowBlock3 ? 'main_opened' : 'main_closed'}`}>
                            <ContentInputs name="Note_3" display="block"
                                title="③&nbsp;&nbsp;&nbsp;摘要" type="text" placeholder="请填写"
                                value={this.data.params.Note_3}
                                handleChange={this.handleChangeInput} />
                            <ContentInputs name="Use_3" display="block" readOnly={true}
                                title="经费项目" type="text" placeholder="请选择"
                                value={this.data.params.Use_3} iconName="iconfont icon-xiangyou icon-select"
                                handleClick={this.handleClickFilter} />
                        </div>
                    </div>
                </div>
                <AddProject currAddSum={this.data.currAddSum} currDel={this.data.currDel}
                    handleClickAdd={this.handleClickAddPro}
                    handleClickDel={this.handleClickDelPro}
                />
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
export default PayExpenseAdd;