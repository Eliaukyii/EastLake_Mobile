import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { ContentHead, HeadTitle } from "../commonComp/HeadTitle";
import { SubmitBtn, TwoSelectBtn } from "../commonComp/SubmitBtnComp";
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
class AddExpenseFour extends React.Component {
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
        sessionStorage.removeItem("payExpenseList");
        window.location.href = '/home/payExpenseList?4';
    };

    handleChangeInput = async (e) => {
        const name = e.target.name;
        let valueC = e.target.value;
        this.data.params[name] = valueC;
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

    //保存
    handleClickSave = async () => {
        if (parseFloat(this.data.params.Moneyhidden) <= 0.00) {
            this.data.isShowTips = true;
            this.data.tipsText = "总金额不能为0或负数！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.data.isShowFilter = false;
            }, 1000);
            return;
        }
        if (parseFloat(this.data.params.BillSum) < 0.00) {
            this.data.isShowTips = true;
            this.data.tipsText = "挂账合计不能为负数！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.data.isShowFilter = false;
            }, 1000);
            return;
        }
        if (parseFloat(this.data.params.PaymentSum) < 0.00) {
            this.data.isShowTips = true;
            this.data.tipsText = "付款合计不能为负数！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.data.isShowFilter = false;
            }, 1000);
            return;
        }
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
        if (!this.data.params.Managers) {
            this.data.isShowTips = true;
            this.data.tipsText = "请选择经办人！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.data.isShowFilter = false;
            }, 1000);
            return;
        }
        if (!this.data.params.Rbperson) {
            this.data.isShowTips = true;
            this.data.tipsText = "请选择报销人！";
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
        if (this.data.params.Moneyhidden && this.data.params.PaymentSum && this.data.params.BillSum
            && this.data.params.Account && this.data.params.Enclosure && this.data.params.NameBuMenID
            && this.data.params.AttnBumenID && this.data.params.ApplicantBuMenID && this.data.params.Managers
            && this.data.params.ApplicantID && this.data.params.AttnId && this.data.params.Rbperson && this.data.params.danweiID
            && this.data.params.Applicant && this.data.params.YearDate && this.data.params.Rbunit) {
            if (this.data.fileArr.length > 0) {
                this.data.isShowTips = true;
                this.data.tipsText = "正在上传文件请稍等！";
                let formData = new FormData();
                this.data.fileArr.map(item => {
                    formData.append('fileView', item);
                });
                let res = await getUploadFile(this.data.userid, formData, this.data.pfi_id);
                if (res.status === '00') {
                    this.data.isShowTips = true;
                    this.data.tipsText = res.msg;
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1000);
                } else {
                    this.data.isShowTips = true;
                    this.data.tipsText = "请检查文件和网络或重新上传";
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1000);
                    return false;
                }
            }
            this.data.isShowTips = true;
            this.data.tipsText = "正在保存请稍候...";
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
                sessionStorage.removeItem('currAddSum');
                sessionStorage.removeItem("params");
                sessionStorage.removeItem("payExpenseList");
                if (res.data.code === '00') {
                    this.data.isShowTips = true;
                    this.data.tipsText = "保存成功！";
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                        this.data.isShowToast = true;
                        this.data.isShowFilter = true;
                        window.location.href = '/home/payExpenseList?4';
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

    //提交
    handleClickSubmit = async () => {
        if (this.data.fileArr.length > 0) {
            this.data.isShowTips = true;
            this.data.tipsText = "正在上传文件请稍等！";
            let formData = new FormData();
            this.data.fileArr.map(item => {
                formData.append('fileView', item);
            });
            let res = await getUploadFile(this.data.userid, formData, this.data.pfi_id);
            if (res.status === '00') {
                this.data.isShowTips = true;
                this.data.tipsText = res.msg;
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
            } else {
                this.data.isShowTips = true;
                this.data.tipsText = "请检查文件和网络或重新上传";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                return false;
            }
        }
        this.data.isShowToast = false;
        this.data.isShowTips = true;
        this.data.tipsText = "正在提交请稍候...";
        axios({
            url: URL.histExpense,
            params: {
                type: this.data.type,
                userid: this.data.userid,
                pfi_id: this.data.pfi_id,
                is_submit: '2',
                json: this.data.params
            },
            method: 'get'
        }).then(res => {
            this.data.isShowFilter = false;
            sessionStorage.removeItem('currAddSum');
            sessionStorage.removeItem("payExpenseList");
            if (res.data.code === '00') {
                sessionStorage.setItem("addType", '报销');
                window.location.href = '/home/expenseSubmitSuccess';
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
            this.data.tipsText = "提交失败，请检查网络或服务器！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
            this.data.isShowFilter = false;
        })
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail colorBG">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <HeadTitle titleTxt="报销新增" handleClickBack={this.handleClickBack} />
                    <AddProgressBar secondOver={true}
                        thirdOver={true}
                        fourthOver={true}
                        onClickFour={this.handleClickSubmit}
                    />
                    <div className="content_main list-bomPad">
                        <ContentInputs display="none"
                            readOnly={true} title="上传文件"
                            multiple="multiple" borderBot={true} />
                        <div className="detail-contentBot" ref={content => { this.content = content }}>
                            <div className="addFile" name="uploadFile">
                                <input type="file" name="uploadFile" className="inputFile"
                                    readOnly={true} multiple="multiple"
                                    onChange={this.handleChangeInput}
                                />
                                <div className="icon_uploadFile" />
                                <span>上传图片/文件</span>
                            </div>
                        </div>
                    </div>
                </div>
                <TwoSelectBtn handleClickSave={this.handleClickSave} handleClickSubmit={this.handleClickSubmit} />
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
export default AddExpenseFour;