import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { ContentHead, HeadTitle } from "../commonComp/HeadTitle";
import { SubmitBtn } from "../commonComp/SubmitBtnComp";
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
class AddExpenseThird extends React.Component {
    @observable data = {
        userid: '',
        type: 'AddApproval',
        Name: '',
        Dept: '',
        Year: '',
        pfi_id: '',
        is_submit: '',
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
        isShowBlock1: true,
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
        this.data.userid = BaseComm.GetLoginID();
        const PFI_ID = sessionStorage.getItem('pfi_id');
        if (PFI_ID) {
            this.data.pfi_id = PFI_ID;
            this.data.is_submit = '1';
        } else {
            this.data.pfi_id = uuid();
            this.data.is_submit = '0';
        }
        let params = JSON.parse(sessionStorage.getItem("params"));
        if (params) {
            this.data.params = params;
        }
    };

    handleClickBack = () => {
        this.props.history.go(-1);
    };

    handleClickBackOne = () => {
        this.props.history.go(-2);
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

    handleClickSubmit = (e) => {
        this.data.isShowTravel = true;
        this.data.isShowFilter = true;
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

    handleFocusMoney = (e) => {
        let name = '';
        name = e.target.name;
        this.data.params[name] = '';
    };

    //差旅选择和保存
    handleClickAlterIsT = async () => {
        this.data.params.IsTravel = '1';
        this.data.isShowTravel = false;
        this.data.isShowFilter = false;
        this.data.isShowTips = true;
        this.data.tipsText = "正在保存请稍候...";
        if (this.data.params.Moneyhidden && this.data.params.PaymentSum && this.data.params.BillSum
            && this.data.params.Account && this.data.params.Enclosure && this.data.params.NameBuMenID
            && this.data.params.AttnBumenID && this.data.params.ApplicantBuMenID && this.data.params.Managers
            && this.data.params.ApplicantID && this.data.params.AttnId && this.data.params.Rbperson && this.data.params.danweiID
            && this.data.params.Applicant && this.data.params.YearDate && this.data.params.Rbunit) {
            axios({
                url: URL.histExpense,
                params: {
                    type: this.data.type,
                    userid: this.data.userid,
                    pfi_id: this.data.pfi_id,
                    is_submit: this.data.is_submit,
                    json: this.data.params
                },
                method: 'get'
            }).then(res => {
                if (res.data.code === '00') {
                    this.data.isShowTips = true;
                    this.data.tipsText = "保存成功！";
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                        // this.data.isShowToast = true;
                        this.data.isShowFilter = true;
                        sessionStorage.setItem("params", JSON.stringify(this.data.params));
                        sessionStorage.setItem("pfi_id", this.data.pfi_id);
                        window.location.href = '/home/addExpenseFour';
                    }, 1000);
                }
                if (res.data.code === '01') {
                    this.data.isShowTips = true;
                    this.data.tipsText = res.data.msg;
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                        this.data.isShowFilter = false;
                    }, 1000);
                }
                if (res.data.code === '02') {
                    this.data.isShowTips = true;
                    this.data.tipsText = res.data.msg;
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                        this.data.isShowFilter = false;
                    }, 1000);
                }
            }).catch(reason => {
                this.data.isShowTips = true;
                this.data.tipsText = "发生错误，保存失败！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    this.data.isShowFilter = false;
                }, 1000);
            })
        } else {
            this.data.isShowTips = true;
            this.data.tipsText = "请完善费用信息！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.data.isShowFilter = false;
            }, 1000);
        }
        this.data.isShowFilter = true;
    };

    handleClickAlterNoT = async () => {
        this.data.params.IsTravel = '0';
        this.data.isShowTravel = false;
        this.data.isShowFilter = false;
        this.data.isShowTips = true;
        this.data.tipsText = "正在保存请稍候...";
        if (this.data.params.Moneyhidden && this.data.params.PaymentSum && this.data.params.BillSum
            && this.data.params.Account && this.data.params.Enclosure && this.data.params.NameBuMenID
            && this.data.params.AttnBumenID && this.data.params.ApplicantBuMenID && this.data.params.Managers
            && this.data.params.ApplicantID && this.data.params.AttnId && this.data.params.Rbperson && this.data.params.danweiID
            && this.data.params.Applicant && this.data.params.YearDate && this.data.params.Rbunit) {
            axios({
                url: URL.histExpense,
                params: {
                    type: this.data.type,
                    userid: this.data.userid,
                    pfi_id: this.data.pfi_id,
                    is_submit: this.data.is_submit,
                    json: this.data.params
                },
                method: 'get'
            }).then(res => {
                if (res.data.code === '00') {
                    this.data.tipsText = '保存成功！';
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                        // this.data.isShowToast = true;
                        sessionStorage.setItem("params", JSON.stringify(this.data.params));
                        sessionStorage.setItem("pfi_id", this.data.pfi_id);
                        window.location.href = '/home/addExpenseFour';
                    }, 1000);
                }
                if (res.data.code === '01') {
                    this.data.isShowTips = true;
                    this.data.tipsText = res.data.msg;
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                        this.data.isShowFilter = false;
                    }, 1000);
                }
                if (res.data.code === '02') {
                    this.data.isShowTips = true;
                    this.data.tipsText = res.data.msg;
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                        this.data.isShowFilter = false;
                    }, 1000);
                }
            }).catch(reason => {
                this.data.isShowTips = true;
                this.data.tipsText = "保存失败，请检查网络或服务器！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    this.data.isShowFilter = false;
                }, 1000);
            });
        } else {
            this.data.isShowTips = true;
            this.data.tipsText = "请完善费用信息！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.data.isShowFilter = false;
            }, 1000);
        }
        this.data.isShowFilter = true;
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail colorBG">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <AlterTips isShowToast={this.data.isShowTravel} text="是否为差旅费？"
                        handleClickOK={this.handleClickAlterIsT} handleClickCancel={this.handleClickAlterNoT} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
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
                    <AddProgressBar secondOver={true}
                        thirdOver={true}
                        onClickOne={this.handleClickBackOne}
                        onClickTwo={this.handleClickBack}
                        onClickFour={this.handleClickSubmit}
                    />
                    <div className="content_main list-bomPad">
                        <ContentInputs name="otherNote" display="none"
                            title="其他记载" type="text" placeholder="请填写"
                            value={this.data.params.otherNote}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="Enclosure" display="block"
                            title="附件" type="number" placeholder="请填写"
                            value={this.data.params.Enclosure} handleFocus={this.handleFocusMoney}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="BankAccID" display="none" isHide={false}
                            title="银行账户" type="text" placeholder="请填写"
                            value={this.data.params.BankAccID}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="BankAccName" display="none" isHide={false}
                            title="账户名称" type="text" placeholder="请填写"
                            value={this.data.params.BankAccName}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="Managers" display="block" readOnly={true}
                            title="经办人" type="text" placeholder="请选择"
                            value={this.data.params.Managers} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                        <ContentInputs name="Rbperson" display="block" readOnly={true}
                            title="报销人" type="text" placeholder="请选择"
                            value={this.data.params.Rbperson} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                    </div>
                </div>
                <SubmitBtn value="保存" handleClick={this.handleClickSubmit} />
                <style>{`
                    .colorBG{
                        background-color: #EDEDED !important;
                    }
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
export default AddExpenseThird;