import React from 'react'
import { observable, set } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import { AuditBtn } from "../commonComp/SubmitBtnComp";
import axios from "axios";
import Tips from "../commonComp/TipsComp";
import { ExpenseAuditAlter } from "../commonComp/AuditAlterComp";
import { DetailBold, DetailNormal } from "../commonComp/InputComp";
import { CommonConfig } from "../config/commonConfig";
import URL from "../../../public/api/serverAPI.config";
import { FilePreviewList } from "../commonComp/FilePreviewList";
import { getAttachment, getFilePreview, getProcess } from "../commonInterface/DeclareComm";
import AuditProcess from "../commonComp/AuditProcess";
import BaseComm from "../commonInterface/BaseComm";
import Command from "../commonInterface/Command";

@observer
class PayExpenseAudit extends React.Component {
    @observable data = {
        type: '',
        userid: '',
        params: {
            PI_ID: '',
            Note: '',
            To: '',
            ToValue: '',
            PFI_ID: ''
        },
        title: '',
        listType: '',
        isShow: true,
        isShowFilter: false,
        tipsText: '',
        isShowTips: false,
        auditClassName: '',
        auditDetail: [],
        auditType: '',
        isBtnHide: true,
        checker: '',
        filePreList: [],
        PFI_Status: '',
        processList: [],
        isShowPro: false,
        PrintShow: false,
        saveableCanvas: null,
        isSign: true,
        _title: ''
    };
    signCanvas = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            overflow: 'scroll'
        };
    }

    componentDidMount = async () => {
        this.data.userid = BaseComm.GetLoginID();
        let code = this.props.location.search;
        code = code.slice(1);
        let pars = code.split('&');
        this.data.params.PFI_ID = pars[0];
        this.data.params.PI_ID = pars[1];
        this.data.listType = pars[2];
        this.data.PFI_Status = pars[3];
        var PFI_Status = decodeURI(pars[4]);
        this.getDetail(this.data.params.PFI_ID);
        if (this.data.listType === '1') {
            this.data.title = '报销详情';
        }
        if ((this.data.listType === '2' || this.data.listType === '3') && (PFI_Status === '进行中' || PFI_Status === '面签')) {
            this.data.title = '报销审批';
            this.getChecker(this.data.params.PI_ID, this.data.params.PFI_ID);
        }
        if (this.data.listType === '4') {
            this.data.title = '报销申报';
        }
        this.data.filePreList = await getAttachment(this.data.userid, this.data.params.PFI_ID);
        let processList = await getProcess(this.data.userid, this.data.params.PI_ID);
        if (processList.status === '00') {
            this.data.processList = processList.data;
        }
    };

    handleClickBack = () => {
        let backUrlList = localStorage.getItem("backUrlList");
        if (backUrlList) {
            localStorage.removeItem("backUrlList");
            window.location.href = backUrlList;
        } else {
            this.props.history.go(-1);
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
            this.data.auditDetail = res.data;
        }).catch(reason => {
        });
    };
    //获取报销审批处理人
    getChecker = (PI_ID, PFI_ID) => {
        axios({
            url: URL.histExpense,
            params: {
                type: 'ApprovalMan',
                userid: this.data.userid,
                json: {
                    PI_ID: PI_ID,
                    PFI_ID: PFI_ID
                }
            },
            method: 'post'
        }).then(res => {
            console.log(res);   
            if(res.data.List !== undefined && res.data.List !== null){
                if (res.data.List[0].To !== undefined && res.data.List[0].To !== null) {
                    this.data.params.AiName=res.data.AiName
                    this.data.params.Status=res.data.Status
                    console.log(res.data);

                    this.data.isBtnHide = false;
                    this.data.params.To = res.data.List[0].To;
                    this.data.params.ToValue = res.data.List[0].ToValue;
                }
            }
            else {
                this.data.isBtnHide = true;
                this.data.isShowTips = true;
                this.data.tipsText = res.data;
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
            }
        }).catch(reason => {
            console.log(reason);
        });
    };

    handleClickCover = () => {
        const isShowFilter = this.data.isShowFilter;
        if (isShowFilter) {
            this.data.auditClassName = 'audit-hide';
            this.data.isShowFilter = false;
            this.setState({
                overflow: CommonConfig.scroll
            });
            this.data.params.Note = '';
        }
    };

    handleClickAudit = (e) => {
        this.data.auditType = e.target.name;
        this.data.isShowFilter = true;
        this.data.auditClassName = 'audit-show';
    };

    //----------------------手签
    handleShowPrint = () => {
        if (this.data.auditType === 'audit' || this.data.auditType === 'reject' || this.data.auditType === 'repulse') {
            this.data.auditClassName = 'audit-hide';
            this.data.isShowFilter = false;
            this.data.params.Note = '';
            this.data.isShow = false;
            this.data.isBtnHide = true;
            this.checkFullWidthHeight();
            var evt = "onorientationchange" in window ? "orientationchange" : "resize";
            window.addEventListener(evt, this.checkFullWidthHeight);
        } else {
            this.handleConfirmAudit();
        }
    };

    checkFullWidthHeight = () => {
        setTimeout(() => {
            if (Command.CheckIsX()) {
                this.data.PrintShow = false;
                this.data.isShowTips = true;
                this.data.tipsText = '请在竖屏下签名，并关闭旋转屏幕';
            } else {
                this.data._title = this.data.title;
                this.data.title = '审批签名（请横签）';
                this.data.PrintShow = true;
                this.data.isShowTips = true;
                this.data.tipsText = '请进行签名，也可直接跳过。（如果有签名将会使用最后一次签名）';
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
            }
        }, 100);
    };

    handleClearPrint = () => {
        this.signCanvas.current.clear();
    };
    //跳过签名
    handleConfirmAuditJump = () => {
        this.data.isSign = false;
        this.handleConfirmAudit();
    };
    /////---------------------

    handleCancelAudit = () => {
        this.data.auditClassName = 'audit-hide';
        this.data.isShowFilter = false;
        this.data.params.Note = '';
    };


    handleConfirmAudit = () => {
        //还原标题
        this.data.title = this.data._title;
        //
        this.data.isShow = true;
        this.data.isShowTips = true;
        this.data.tipsText = '正在提交';
        this.data.PrintShow = true;
        let signImg = '';
        if (this.data.isSign) {
            var evt = "onorientationchange" in window ? "orientationchange" : "resize";
            window.removeEventListener(evt, this.setFullWidthHeight);
            //------------------旋转90度
            signImg = this.signCanvas.current.canvas.drawing.toDataURL('image/png');
            Command.rotateBase64Img(signImg, 270, function (img) {
                signImg = encodeURI(img);
                this.ConfirmAuditReal(signImg);
            }.bind(this));
            //---------------------
        } else {
            this.ConfirmAuditReal('');
        }
    };

    ConfirmAuditReal = (signImg) => {
        const params = new URLSearchParams();
        params.append('userid', this.data.userid);
        var json = {
            PFI_ID: this.data.params.PFI_ID,
            PI_ID: this.data.params.PI_ID,
            Note: this.data.params.Note,
            SignImg: signImg,
            List: [{ To: this.data.params.To, ToValue: this.data.params.ToValue }]
        };
        params.append('json', JSON.stringify(json));
        if (this.data.auditType === 'audit') {
            params.append('type', 'ApprovalOK');
            axios.post(URL.histExpense, params).then(res => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                if (res.status === 200) {
                    this.handleClickBack();
                }
            })
        }
        if (this.data.auditType === 'reject') {
            params.append('type', 'ApprovalNo');
            axios.post(URL.histExpense, params).then(res => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.props.history.go(-1);
            })
        }
        if (this.data.auditType === 'repulse') {
            params.append('type', 'ApprovalBack');
            axios.post(URL.histExpense, params).then(res => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.props.history.go(-1);
            })
        }
        if (this.data.auditType === 'unLock') {
            params.append('type', 'ApprovalUnLock');
            axios.post(URL.histExpense, params).then(res => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.props.history.go(-1);
            })
        }
        if (this.data.auditType === 'faceSg') {
            params.append('type', 'ApprovalLock');
            axios.post(URL.histExpense, params).then(res => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
                this.props.history.go(-1);
            })
        }
    };

    handleChangeNote = (e) => {
        this.data.params.Note = e.target.value;
    };

    handleClickPreView = async (item) => {
        let fileAtId = item.At_ID;
        localStorage.setItem('At_ID',item.At_ID)
        let fileAtType = item.F_Type;
        if (fileAtType === null || fileAtType === '') fileAtType = '.pdf';
        if (fileAtId) {
            localStorage.setItem("backUrl", window.location.href);
            let fileUrl = await getFilePreview(this.data.userid, fileAtId);
            console.log(fileUrl);
            if (fileAtType === '.pdf' || fileAtType === '.ppt' || fileAtType === '.pptx' || fileAtType === '.doc' ||
                fileAtType === '.docx' || fileAtType === '.xls' || fileAtType === '.xlsx' || fileAtType === '.wps') {
                if (fileUrl.data) {
                    this.data.isShowTips=true;
                    this.data.tipsText='正在加载中...';
                    setTimeout(()=>{
                        this.data.isShowTips=false;
                        this.data.tipsText='';
                        localStorage.setItem("fileUrl", fileUrl.data);
                        localStorage.setItem('count',fileUrl.count)
                        window.location.href = '/home/filePreviewDetail';
                    },1000)
                } else {
                    this.data.isShowTips = true;
                    this.data.tipsText = fileUrl.msg;
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1000);
                }
            } else {
                if (fileUrl.data) {
                    localStorage.setItem("fileUrl", fileUrl.data);
                    window.location.href = '/home/filePreviewDetail2';
                } else {
                    this.data.isShowTips = true;
                    this.data.tipsText = fileUrl.msg;
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1000);
                }
            }
        }
    };

    handleClickProcess = () => {
        this.data.isShowPro = !this.data.isShowPro;
    };

    render() {
        const detail = this.data.auditDetail;
        return (
            <div className="wrapper">
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <HeadTitle titleTxt={this.data.title} handleClickBack={this.handleClickBack} isShow={this.data.isShow} />
                    <div className="content_mainS" style={{ display: this.data.isShow ? 'block' : 'none' }}>
                        <div className="content_mainDetail">
                            <div className='detailBorder borderBottom'>
                                <DetailBold label="申报日期" value={detail.YearDate} />
                                <DetailBold label="报销单位" value={detail.Rbunit} />
                                <DetailBold label="经办人" value={detail.Managers} />
                                <DetailBold label="报销人" value={detail.Rbperson} />
                                <DetailBold label="申报人" value={detail.Applicant} />
                                <DetailBold label="银行账户" value={detail.BankAccID} isHide={false} />
                                <DetailBold label="账户名称" value={detail.BankAccName} isHide={false} />
                            </div>
                            <div className={`detailBorder detailMarTop ${detail.Note_1 && detail.Use_1 ? 'show' : 'hide'}`}>
                                <DetailNormal label="①&nbsp;&nbsp;&nbsp;摘要" value={detail.Note_1 || ''} />
                                <DetailNormal label="经费用途" value={`${detail.Use_1 || '0.00'}元`} />
                                <DetailNormal label="报销金额" value={`${detail.Money_1 || '0.00'}元`} />
                                <DetailNormal label="实付金额" value={`${detail.Payment1 || '0.00'}元`} />
                                <DetailNormal label="挂账金额" value={`${detail.Bill1 || '0.00'}元`} />
                            </div>
                            <div className={`detailBorder detailMarTop borderBottom ${detail.Note_2 && detail.Use_2 ? 'show' : 'hide'}`} >
                                <DetailNormal label="②&nbsp;&nbsp;&nbsp;摘要" value={detail.Note_2 || ''} />
                                <DetailNormal label="经费用途" value={`${detail.Use_2 || '0.00'}元`} />
                                <DetailNormal label="报销金额" value={`${detail.Money_2 || '0.00'}元`} />
                                <DetailNormal label="实付金额" value={`${detail.Payment2 || '0.00'}元`} />
                                <DetailNormal label="挂账金额" value={`${detail.Bill2 || '0.00'}元`} />
                            </div>
                            <div className={`detailMarTop ${detail.Note_3 && detail.Use_3 ? 'show' : 'hide'}`} >
                                <DetailNormal label="③&nbsp;&nbsp;&nbsp;摘要" value={detail.Note_3 || ''} />
                                <DetailNormal label="经费用途" value={`${detail.Use_3 || '0.00'}元`} />
                                <DetailNormal label="报销金额" value={`${detail.Money_3 || '0.00'}元`} />
                                <DetailNormal label="实付金额" value={`${detail.Payment3 || '0.00'}元`} />
                                <DetailNormal label="挂账金额" value={`${detail.Bill3 || '0.00'}元`} />
                            </div>
                        </div>
                        <div className="spaceG" />
                        <div className='content_mainDetail'>
                            <DetailBold label="总金额" value={`${detail.Moneyhidden || '0.00'}元`} />
                            <DetailBold label="付款合计" value={`${detail.PaymentSum || '0.00'}元`} />
                            <DetailBold label="挂账合计" value={`${detail.BillSum || '0.00'}元`} />
                        </div>
                        <div className="spaceG" />
                        <div className='content_mainDetail'>
                            <DetailBold label="附件" value={detail.Enclosure} />
                            <DetailBold label="其他记载" value={detail.otherNote} />
                            <AuditProcess processList={this.data.processList} handleClick={this.handleClickProcess} isShow={this.data.isShowPro} />
                            <FilePreviewList FileList={this.data.filePreList.data || []}
                                handleClick={this.handleClickPreView} />
                        </div>
                    </div>
                </div>
                <ExpenseAuditAlter value={this.data.params.Note}
                    checker={this.data.params.To}
                    auditClassName={this.data.auditClassName}
                    handleChangeInput={this.handleChangeNote}
                    handleCancelAudit={this.handleCancelAudit}
                    handleConfirmAudit={this.handleConfirmAudit}
                    handleShowPrint={this.handleShowPrint}
                    handleClearPrint={this.handleClearPrint}
                    saveableCanvas={this.data.saveableCanvas}
                    PrintShow={this.data.PrintShow}
                    signCanvas={this.signCanvas}
                    handleConfirmAuditJump={this.handleConfirmAuditJump}
                />
                <AuditBtn isBtnHide={this.data.isBtnHide} handleClickAudit={this.handleClickAudit} status={this.data.PFI_Status}
                />
                <style>{`
                    body{
                        overflow-y:${this.state.overflow};
                    }
                `}</style>
            </div >
        )
    }
}
export default PayExpenseAudit;