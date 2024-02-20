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
class AddExpenseTwo extends React.Component {
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
        fileArr: [],
        currAddSum: '',
        currDel: ''
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
        let currAddSum = JSON.parse(sessionStorage.getItem("currAddSum"));
        if (currAddSum) {
            this.data.currAddSum = currAddSum;
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
            this.data.addUseList = await getItem(this.data.userid, this.data.params.danweiID, this.data.params.useKey);
        }
        if (name === 'Money_1') {
            if (valueC) {
                if (!isNaN(parseFloat(valueC))) {
                    this.data.params[name] = valueC;
                } else {
                    this.data.timeParams.isOpen = false;
                    this.data.isShowTips = true;
                    this.data.tipsText = '请输入金额！';
                    this.data.params[name] = '0.00';
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1500);
                }
            }
        }
        if (name === 'Money_2') {
            if (valueC) {
                if (!isNaN(parseFloat(valueC))) {
                    this.data.params[name] = valueC;
                } else {
                    this.data.timeParams.isOpen = false;
                    this.data.isShowTips = true;
                    this.data.tipsText = '请输入金额！';
                    this.data.params[name] = '0.00';
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1500);
                }
            }
        }
        if (name === 'Money_3') {
            if (valueC) {
                if (!isNaN(parseFloat(valueC))) {
                    this.data.params[name] = valueC;
                } else {
                    this.data.timeParams.isOpen = false;
                    this.data.isShowTips = true;
                    this.data.tipsText = '请输入金额！';
                    this.data.params[name] = '0.00';
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1500);
                }
            }
        }
        if (name === 'Payment1') {
            if (valueC) {
                if (!isNaN(parseFloat(valueC))) {
                    if (parseInt(getMoneyNumber(valueC) * 100) > parseInt(getMoneyNumber(this.data.params.Money_1) * 100)) {
                        valueC = getMoneyNumber(this.data.params.Money_1);
                    } else if (valueC < 0) {
                        valueC = 0;
                    }
                    this.data.params[name] = valueC;
                } else {
                    this.data.timeParams.isOpen = false;
                    this.data.isShowTips = true;
                    this.data.tipsText = '请输入金额！';
                    this.data.params[name] = '0.00';
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1500);
                }
            }
        }
        if (name === 'Payment2') {
            if (valueC) {
                if (!isNaN(parseFloat(valueC))) {
                    if (valueC > getMoneyNumber(this.data.params.Money_2)) {
                        valueC = getMoneyNumber(this.data.params.Money_2);
                    } else if (valueC < 0) {
                        valueC = 0;
                    }
                    this.data.params[name] = valueC;
                } else {
                    this.data.timeParams.isOpen = false;
                    this.data.isShowTips = true;
                    this.data.tipsText = '请输入金额！';
                    this.data.params[name] = '0.00';
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1500);
                }
            }
        }
        if (name === 'Payment3') {
            if (valueC) {
                if (!isNaN(parseFloat(valueC))) {
                    if (valueC > getMoneyNumber(this.data.params.Money_3)) {
                        valueC = getMoneyNumber(this.data.params.Money_3);
                    } else if (valueC < 0) {
                        valueC = 0;
                    }
                    this.data.params[name] = valueC;
                } else {
                    this.data.timeParams.isOpen = false;
                    this.data.isShowTips = true;
                    this.data.tipsText = '请输入金额！';
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                        this.data.params[name] = '0.00';
                    }, 1500);
                }
            }
        }
        if (name === 'uploadFile') {
            if (e.target.files.length === 0) {
                return;
            }
            let file = e.target.files[0];
            if (file) {
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!isLt10M) {
                    alert('上传文件大小不能超过 10MB!');
                    return false;
                }
            }
            this.data.fileArr.push(file);
            let fileList = this.data.fileArr;
            let fileDetail = this.content;
            let reader = new FileReader();
            // 图片文件转换为base64
            reader.readAsDataURL(file);
            reader.onload = function () {
                if (/^image\/[jpeg|png|jpg|gif]/.test(file.type)) {
                    // 显示图片
                    let box = document.createElement('div');
                    box.className = 'fileBox';
                    let img = document.createElement('img');
                    img.className = 'file_img';
                    img.src = `${this.result}`;
                    let btn = document.createElement('div');
                    btn.className = 'deleteFile';
                    btn.innerText = '删除';
                    btn.id = `${file.name}`;
                    btn.addEventListener("click", function (event) {
                        let filename = event.target.id;
                        for (let j = 0; j < fileList.length; j++) {
                            if (fileList[j].name === filename) {
                                fileList.splice(j, 1);//从数组中移除
                                box.remove();
                                break;
                            }
                        }
                    });
                    box.appendChild(img);
                    box.appendChild(btn);
                    fileDetail.appendChild(box);
                } else {
                    let box = document.createElement('div');
                    box.className = 'fileBox';
                    let text = document.createElement('textarea');
                    text.className = 'file_img';
                    text.innerText = `${file.name}`;
                    let btn = document.createElement('div');
                    btn.className = 'deleteFile';
                    btn.innerText = '删除';
                    btn.id = `${file.name}`;
                    btn.addEventListener("click", function (event) {
                        let filename = event.target.id;
                        for (let j = 0; j < fileList.length; j++) {
                            if (fileList[j].name === filename) {
                                fileList.splice(j, 1);//从数组中移除
                                box.remove();
                                break;
                            }
                        }
                    });
                    box.appendChild(text);
                    box.appendChild(btn);
                    fileDetail.appendChild(box);
                }
            };
            this.data.fileArr = fileList;
        }
    };

    handleBlurMoney = (e) => {
        const name = e.target.name;
        if (!this.data.params[name]) {
            this.data.params[name] = '0.00';
        }
        if (name === 'Money_1') {
            this.data.params[name] = getMoneyNumber(this.data.params[name]);
            this.data.params.Payment1 = this.data.params[name];
            this.data.params.PaymentSum = getMoneyNumber(parseFloat(this.data.params[name]) + parseFloat(this.data.params.Payment3) + parseFloat(this.data.params.Payment2));
            this.data.params.Bill1 = getMoneyNumber(parseFloat(this.data.params.Money_1) - parseFloat(this.data.params[name]));
            this.data.params.BillSum = getMoneyNumber(parseFloat(this.data.params.Bill3) + parseFloat(this.data.params.Bill1) + parseFloat(this.data.params.Bill2));
            this.data.params.Moneyhidden = getMoneyNumber(parseFloat(this.data.params[name]) + parseFloat(this.data.params.Money_2) + parseFloat(this.data.params.Money_3));
            if (isNaN(this.data.params.Payment1)) this.data.params.Payment3 = "0.00";
            if (isNaN(this.data.params.PaymentSum)) this.data.params.PaymentSum = "0.00";
            if (isNaN(this.data.params.Bill1)) this.data.params.Bill3 = "0.00";
            if (isNaN(this.data.params.BillSum)) this.data.params.BillSum = "0.00";
        }
        if (name === 'Money_2') {
            this.data.params[name] = getMoneyNumber(this.data.params[name]);
            this.data.params.Payment2 = this.data.params[name];
            this.data.params.PaymentSum = getMoneyNumber(parseFloat(this.data.params[name]) + parseFloat(this.data.params.Payment3) + parseFloat(this.data.params.Payment1));
            this.data.params.Bill2 = getMoneyNumber(parseFloat(this.data.params.Money_2) - parseFloat(this.data.params[name]));
            this.data.params.BillSum = getMoneyNumber(parseFloat(this.data.params.Bill3) + parseFloat(this.data.params.Bill1) + parseFloat(this.data.params.Bill2));
            this.data.params.Moneyhidden = getMoneyNumber(parseFloat(this.data.params[name]) + parseFloat(this.data.params.Money_1) + parseFloat(this.data.params.Money_3));
            if (isNaN(this.data.params.Payment2)) this.data.params.Payment3 = "0.00";
            if (isNaN(this.data.params.PaymentSum)) this.data.params.PaymentSum = "0.00";
            if (isNaN(this.data.params.Bill2)) this.data.params.Bill3 = "0.00";
            if (isNaN(this.data.params.BillSum)) this.data.params.BillSum = "0.00";
        }
        if (name === 'Money_3') {
            this.data.params[name] = getMoneyNumber(this.data.params[name]);
            this.data.params.Payment3 = this.data.params[name];
            this.data.params.PaymentSum = getMoneyNumber(parseFloat(this.data.params[name]) + parseFloat(this.data.params.Payment2) + parseFloat(this.data.params.Payment1));
            this.data.params.Bill3 = getMoneyNumber(parseFloat(this.data.params.Money_3) - parseFloat(this.data.params[name]));
            this.data.params.BillSum = getMoneyNumber(parseFloat(this.data.params.Bill3) + parseFloat(this.data.params.Bill1) + parseFloat(this.data.params.Bill2));
            this.data.params.Moneyhidden = getMoneyNumber(parseFloat(this.data.params[name]) + parseFloat(this.data.params.Money_2) + parseFloat(this.data.params.Money_1));
            if (isNaN(this.data.params.Payment3)) this.data.params.Payment3 = "0.00";
            if (isNaN(this.data.params.PaymentSum)) this.data.params.PaymentSum = "0.00";
            if (isNaN(this.data.params.Bill3)) this.data.params.Bill3 = "0.00";
            if (isNaN(this.data.params.BillSum)) this.data.params.BillSum = "0.00";
        }
        if (name === 'Payment1') {
            this.data.params[name] = getMoneyNumber(this.data.params[name]);
            this.data.params.PaymentSum = getMoneyNumber(parseFloat(this.data.params[name]) + parseFloat(this.data.params.Payment3) + parseFloat(this.data.params.Payment2));
            this.data.params.Bill1 = getMoneyNumber(parseFloat(this.data.params.Money_1) - parseFloat(this.data.params[name]));
            this.data.params.BillSum = getMoneyNumber(parseFloat(this.data.params.Bill3) + parseFloat(this.data.params.Bill1) + parseFloat(this.data.params.Bill2));
            if (isNaN(this.data.params.PaymentSum)) this.data.params.PaymentSum = "0.00";
            if (isNaN(this.data.params.Bill1)) this.data.params.Bill3 = "0.00";
            if (isNaN(this.data.params.BillSum)) this.data.params.BillSum = "0.00";
        }
        if (name === 'Payment2') {
            this.data.params[name] = getMoneyNumber(this.data.params[name]);
            this.data.params.PaymentSum = getMoneyNumber(parseFloat(this.data.params[name]) + parseFloat(this.data.params.Payment3) + parseFloat(this.data.params.Payment1));
            this.data.params.Bill2 = getMoneyNumber(parseFloat(this.data.params.Money_2) - parseFloat(this.data.params[name]));
            this.data.params.BillSum = getMoneyNumber(parseFloat(this.data.params.Bill3) + parseFloat(this.data.params.Bill1) + parseFloat(this.data.params.Bill2));
            if (isNaN(this.data.params.PaymentSum)) this.data.params.PaymentSum = "0.00";
            if (isNaN(this.data.params.Bill2)) this.data.params.Bill3 = "0.00";
            if (isNaN(this.data.params.BillSum)) this.data.params.BillSum = "0.00";
        }
        if (name === 'Payment3') {
            this.data.params[name] = getMoneyNumber(this.data.params[name]);
            this.data.params.PaymentSum = getMoneyNumber(parseFloat(this.data.params[name]) + parseFloat(this.data.params.Payment2) + parseFloat(this.data.params.Payment1));
            this.data.params.Bill3 = getMoneyNumber(parseFloat(this.data.params.Money_3) - parseFloat(this.data.params[name]));
            this.data.params.BillSum = getMoneyNumber(parseFloat(this.data.params.Bill3) + parseFloat(this.data.params.Bill1) + parseFloat(this.data.params.Bill2));
            if (isNaN(this.data.params.PaymentSum)) this.data.params.PaymentSum = "0.00";
            if (isNaN(this.data.params.Bill3)) this.data.params.Bill3 = "0.00";
            if (isNaN(this.data.params.BillSum)) this.data.params.BillSum = "0.00";
        }
    };

    handleFocusMoney = (e) => {
        let name = '';
        name = e.target.name;
        if (name === 'Money_1' || name === 'Money_2' || name === 'Money_3' || name === 'Payment1' || name === 'Payment2' || name === 'Payment3' || name === 'Enclosure') {
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
            this.data.isShowToast = false;
            this.data.isShowTravel = false;
            this.data.isShowFilter = false;
            this.setState({
                overflow: 'scroll'
            });
        }
    };

    handleNextStep = () => {
        if (this.data.currAddSum === 1) {
            if (!this.data.params.Money_1) {
                this.data.isShowTips = true;
                this.data.tipsText = "请填写报销金额！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return;
            }
            if (!this.data.params.Payment1) {
                this.data.isShowTips = true;
                this.data.tipsText = "请填写实付金额！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return;
            }
            if (this.data.params.Money_1 && this.data.params.Payment1) {
                sessionStorage.setItem("currAddSum", JSON.stringify(this.data.currAddSum));
                sessionStorage.setItem("params", JSON.stringify(this.data.params));
                window.location.href = '/home/addExpenseThird';
            }
        }
        if (this.data.currAddSum === 2) {
            if (!this.data.params.Money_1 || !this.data.params.Money_2) {
                this.data.isShowTips = true;
                this.data.tipsText = "请填写报销金额！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return;
            }
            if (!this.data.params.Payment1 || !this.data.params.Payment2) {
                this.data.isShowTips = true;
                this.data.tipsText = "请填写实付金额！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return;
            }
            if (this.data.params.Money_1 && this.data.params.Money_2
                && this.data.params.Payment1 && this.data.params.Payment2) {
                sessionStorage.setItem("currAddSum", JSON.stringify(this.data.currAddSum));
                sessionStorage.setItem("params", JSON.stringify(this.data.params));
                window.location.href = '/home/addExpenseThird';
            }
        }
        if (this.data.currAddSum === 3) {
            if (!this.data.params.Money_1 || !this.data.params.Money_2 || !this.data.params.Money_3) {
                this.data.isShowTips = true;
                this.data.tipsText = "请填写报销金额！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return;
            }
            if (!this.data.params.Payment1 || !this.data.params.Payment2 || !this.data.params.Payment3) {
                this.data.isShowTips = true;
                this.data.tipsText = "请填写实付金额！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return;
            }
            if (this.data.params.Money_1 && this.data.params.Payment1
                && this.data.params.Money_2 && this.data.params.Payment2
                && this.data.params.Money_3 && this.data.params.Payment3) {
                sessionStorage.setItem("currAddSum", JSON.stringify(this.data.currAddSum));
                sessionStorage.setItem("params", JSON.stringify(this.data.params));
                window.location.href = '/home/addExpenseThird';
            }
        }
    };

    handleClickFilter = async (e) => {
        const name = e.target.name;
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

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail colorBG">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <AlterTips isShowToast={this.data.isShowTravel} text="是否为差旅费？"
                        handleClickOK={this.handleClickAlterIsT} handleClickCancel={this.handleClickAlterNoT} />
                    <AlterTips isShowToast={this.data.isShowToast} text="是否提交？"
                        handleClickOK={this.handleClickAlterOK} handleClickCancel={this.handleClickAlterCancel} />
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
                        onClickOne={this.handleClickBack}
                        onClickThree={this.handleNextStep}
                    />
                    <div className="content_main list-bomPad">
                        <ContentInputs name="Money_1" display="block" iconName="icon-select" price="元"
                            title="①报销金额" type="text" placeholder="请填写" handleFocus={this.handleFocusMoney}
                            value={this.data.params.Money_1} handleBlur={this.handleBlurMoney}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="Payment1" display="block" iconName="icon-select" price="元"
                            title="①实付金额" type="text" placeholder="请填写" handleFocus={this.handleFocusMoney}
                            value={this.data.params.Payment1} handleBlur={this.handleBlurMoney}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="Bill1" display="block" readOnly={true} iconName="icon-select" price="元"
                            title="①挂账金额" type="text" placeholder="请填写"
                            value={this.data.params.Bill1}
                            handleChange={this.handleChangeInput} />
                        <div id="box_main"
                            className={`box_main ${this.data.isShowBlock2 ? 'main_opened' : 'main_closed'}`}>
                            <ContentInputs name="Money_2" display="block" iconName="icon-select" price="元"
                                title="②报销金额" type="text" placeholder="请填写" handleFocus={this.handleFocusMoney}
                                value={this.data.params.Money_2} handleBlur={this.handleBlurMoney}
                                handleChange={this.handleChangeInput} />
                            <ContentInputs name="Payment2" display="block" iconName="icon-select" price="元"
                                title="②实付金额" type="text" placeholder="请填写" handleFocus={this.handleFocusMoney}
                                value={this.data.params.Payment2} handleBlur={this.handleBlurMoney}
                                handleChange={this.handleChangeInput} />
                            <ContentInputs name="Bill2" display="block" readOnly={true} iconName="icon-select" price="元"
                                title="②挂账金额" type="text" placeholder="请填写"
                                value={this.data.params.Bill2}
                                handleChange={this.handleChangeInput} />
                        </div>
                        <div id="box_main"
                            className={`box_main ${this.data.isShowBlock3 ? 'main_opened' : 'main_closed'}`}>
                            <ContentInputs name="Money_3" display="block" iconName="icon-select" price="元"
                                title="③报销金额" type="text" placeholder="请填写" handleFocus={this.handleFocusMoney}
                                value={this.data.params.Money_3} handleBlur={this.handleBlurMoney}
                                handleChange={this.handleChangeInput} />
                            <ContentInputs name="Payment3" display="block" iconName="icon-select" price="元"
                                title="③实付金额" type="text" placeholder="请填写" handleFocus={this.handleFocusMoney}
                                value={this.data.params.Payment3} handleBlur={this.handleBlurMoney}
                                handleChange={this.handleChangeInput} />
                            <ContentInputs name="Bill3" display="block" readOnly={true} iconName="icon-select" price="元"
                                title="③挂账金额" type="text" placeholder="请填写"
                                value={this.data.params.Bill3}
                                handleChange={this.handleChangeInput} />
                        </div>
                        <ContentInputs name="Moneyhidden" display="none" readOnly={true}
                            title="总金额" type="text" placeholder="请填写"
                            value={this.data.params.Moneyhidden}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="PaymentSum" display="none" readOnly={true}
                            title="付款合计" type="text" placeholder="请填写"
                            value={this.data.params.PaymentSum}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="BillSum" display="none" readOnly={true}
                            title="挂账合计" type="text" placeholder="请填写"
                            value={this.data.params.BillSum}
                            handleChange={this.handleChangeInput} />
                    </div>
                </div>
                <SubmitBtn value="下一步" handleClick={this.handleNextStep} />
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
export default AddExpenseTwo;