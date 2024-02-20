import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { ContentHead, HeadTitle } from "../commonComp/HeadTitle";
import { SubmitBtn } from "../commonComp/SubmitBtnComp";
import axios from "axios";
import { ContentInputs } from "../commonComp/InputComp";
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
class AddAllowanceTwo extends React.Component {
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
        is_submit: '',
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
        let params = JSON.parse(sessionStorage.getItem("params"));
        if (params) {
            this.data.params = params;
        }
        const PFI_ID = sessionStorage.getItem('pfi_id');
        if (PFI_ID) {
            this.data.pfi_id = PFI_ID;
            this.data.is_submit = '1';
        } else {
            this.data.pfi_id = uuid();
            this.data.is_submit = '0';
        }
    };

    handleClickBack = () => {
        this.props.history.go(-1);
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
        if (name === 'Money_1') {
            this.data.params[name] = getMoneyNumber(this.data.params[name]);
        }
    };

    handleFocusMoney = (e) => {
        let name = '';
        name = e.target.name;
        if (name === 'Money_1') {
            this.data.params[name] = '';
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
    //保存
    handleClickSubmit = async () => {
        if (parseFloat(this.data.params.Enclosure) <= 0) {
            this.data.isShowTips = true;
            this.data.tipsText = "附件数不能为0或负数！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.data.isShowFilter = false;
            }, 1000);
            return;
        }
        if (!this.data.params.ApplicantBuMenID) {
            this.data.isShowTips = true;
            this.data.tipsText = "申报人部门ID不能为空！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.data.isShowFilter = false;
            }, 1000);
            return;
        }
        if (!this.data.params.Attn) {
            this.data.isShowTips = true;
            this.data.tipsText = "请选择经办人！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.data.isShowFilter = false;
            }, 1000);
            return;
        }
        if (!this.data.params.Anyperson) {
            this.data.isShowTips = true;
            this.data.tipsText = "请选择领款人！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.data.isShowFilter = false;
            }, 1000);
            return;
        }
        if (!this.data.params.Applicant) {
            this.data.isShowTips = true;
            this.data.tipsText = "申报人不能为空！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.data.isShowFilter = false;
            }, 1000);
            return;
        }
        if (this.data.params.Unit && this.data.params.Anyreason
            && this.data.params.YearDate && this.data.params.ApplicantBuMenID && this.data.params.wandeihidden && this.data.params.AllCourse
            && this.data.params.AnyBuMenID && this.data.params.AttnId && this.data.params.Enclosure && this.data.params.Applicant
            && this.data.params.hid_use && this.data.params.ApplicantID && this.data.params.AttnBumenID
            && this.data.params.Anyperson && this.data.params.AnypersonID && this.data.params.Attn && this.data.params.use && this.data.params.PaymentCourse
            && this.data.params.Money_1 && this.data.params.ItemID && this.data.params.HedgeNum) {
            this.data.isShowFilter = true;
            this.data.isShowTips = true;
            this.data.tipsText = "正在保存请稍候...";
            axios({
                url: URL.histAllowance,
                params: {
                    userid: this.data.userid,
                    type: this.data.type,
                    pfi_id: this.data.pfi_id,
                    is_submit: this.data.is_submit,
                    json: this.data.params
                },
                method: 'get'
            }).then(res => {
                if (res.data.code === '00') {
                    this.data.isShowTips = true;
                    this.data.tipsText = "保存成功！";
                    sessionStorage.setItem("params", JSON.stringify(this.data.params));
                    sessionStorage.setItem("pfi_id", this.data.pfi_id);
                    window.location.href = '/home/addAllowanceThird';
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                        this.data.isShowFilter = true;
                        this.data.isShowToast = true;
                    }, 1000);
                }
                if (res.data.code === '01') {
                    this.data.isShowTips = true;
                    this.data.tipsText = res.data.msg;
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1000);
                }
                if (res.data.code === '02') {
                    this.data.isShowTips = true;
                    this.data.tipsText = res.data.msg;
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
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
            this.data.isShowDch = true;
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
        if (this.data.epCurrent === 'Dept') {
            this.data.params.wandeihidden = e.target.id;
            this.data.params.Unit = e.target.innerText;
            this.data.Unit = e.target.innerText;
            this.data.deptClassName = CommonConfig.closed;
            this.data.isShowFilter = false;
            this.data.epCurrent = '';
        }
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

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail colorAddBG">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
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
                        secondOver={true}
                        onClickOne={this.handleClickBack}
                        onClickThree={this.handleClickSubmit} />
                    <div className="content_main list-bomPad">
                        <ContentInputs name="BankAccID" display="none" isHide={false}
                            title="银行账户" type="text" placeholder="请填写"
                            value={this.data.params.BankAccID}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="BankAccName" display="none" isHide={false}
                            title="账户名称" type="text" placeholder="请填写"
                            value={this.data.params.BankAccName}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="Attn" display="block" readOnly={true}
                            title="经办人" type="text" placeholder="请选择"
                            value={this.data.params.Attn} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                        <ContentInputs name="Anyperson" display="block" readOnly={true}
                            title="领款人" type="text" placeholder="请选择"
                            value={this.data.params.Anyperson} iconName="iconfont icon-xiangyou icon-select"
                            handleClick={this.handleClickFilter} />
                        <ContentInputs name="Othernote" display="none"
                            title="其他记载" type="text" placeholder="请填写"
                            value={this.data.params.Othernote}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="Enclosure" display="block"
                            title="附件" type="number" placeholder="请填写"
                            value={this.data.params.Enclosure}
                            handleChange={this.handleChangeInput} />
                    </div>
                </div>
                <SubmitBtn value="保存" handleClick={this.handleClickSubmit} />
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
export default AddAllowanceTwo;