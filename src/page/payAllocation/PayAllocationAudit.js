import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import { AuditBtn, SubmitBtn } from "../commonComp/SubmitBtnComp";
import axios from "axios";
import Tips from "../commonComp/TipsComp";
import { ExpenseAuditAlter } from "../commonComp/AuditAlterComp";
import { DetailBold, DetailNormal } from "../commonComp/InputComp";
import { CommonConfig } from "../config/commonConfig";
import URL from "../../../public/api/serverAPI.config";
import { FilePreviewList } from "../commonComp/FilePreviewList";
import { getAttachment, getDept, getFilePreview, getItemAll, getProcess } from "../commonInterface/DeclareComm";
import AuditProcess from "../commonComp/AuditProcess";
import { AlterTips } from "../commonComp/AlterTips";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayAllocationAudit extends React.Component {
    @observable data = {
        type: 'ListAllocationImportShow',
        userid: '',
        params: {
            IA_ID: '',
        },
        title: '',
        listType: '',
        isShowFilter: false,
        tipsText: '',
        toastText: '是否提交本次分配单据？',
        isShowTips: false,
        auditClassName: '',
        auditDetail: { allot: [], allotDetail: [] },
        auditType: '',
        isBtnHide: true,
        isBtnHide2: true,
        checker: '',
        filePreList: [],
        PFI_Status: '',
        processList: [],
        isShowPro: false,
        showDelBtn: false
    };

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
        let code1, code2;
        code1 = code.split('&')[0];
        this.data.params.IC_ID = code1;
        code2 = code.split('&')[1];
        if (code2 == 'null') code2 = null;
        this.data.listType = code2;
        this.getDetail(code1);
        if (code2) {
            let Item = [];
            Item = await getItemAll();
            for (let i = 0; i < Item.length; i++) {
                if (Item[i].ItemID == code2) {
                    this.data.params.ItemName = Item[i].ItemName;
                }
            }
        }
        if (this.data.listType === '1') {
            this.data.title = '分配审批';
            this.data.isBtnHide = false;
        }
        if (this.data.listType === '2') {
            this.data.title = '分配详情';
            //this.data.showDelBtn = false;
        }
    };

    handleClickBack = () => {
        this.props.history.go(-1);
    };
    //获取详情
    getDetail = (ID) => {
        this.data.isShowTips = true;
        this.data.tipsText = '正在获取数据...';
        axios({
            url: URL.histBudget,
            params: {
                type: this.data.type,
                userid: this.data.userid,
                json: {
                    ID: ID
                }
            },
            method: 'post'
        }).then(res => {
            this.data.isShowTips = false;
            console.log(res.data);
            if (res.data != null && res.data != undefined && res.data.allotDetail != null && res.data.allotDetail.length > 0) {
                this.data.auditDetail = res.data;
                console.log(this.data.auditDetail);
                if (this.data.listType === "2" && (this.data.auditDetail.allot.AccountNum == "" || this.data.auditDetail.allot.AccountNum === undefined || this.data.auditDetail.allot.AccountNum === null)) {
                    this.data.isBtnHide2 = false;
                }
                this.data.params.ID = res.data.allot.IA_ID;
            } else {
                this.data.isShowTips = true;
                this.data.tipsText = '详情获取失败，请检查网络或服务器！';
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
            }
        }).catch(reason => {
            this.data.isShowTips = true;
            this.data.tipsText = '详情获取失败，请检查网络或服务器！';
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
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
        this.data.isShowFilter = true;
        this.data.isShowTips = true;
        this.data.tipsText = "正在处理请稍候...";
        axios({
            url: URL.histBudget,
            params: {
                type: 'ApprovalAllocation',
                userid: this.data.userid,
                json: {
                    ID: this.data.params.ID,
                }
            }
        }).then(res => {
            if (res.data.code == '00') {
                this.data.tipsText = '审批成功！';
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    this.data.isShowFilter = false;
                    window.location.href = '/home/payAllocationList';
                }, 1000);
                this.data.isShowFilter = false;
            } else {
                this.data.isShowTips = true;
                this.data.tipsText = res.data.msg;
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                this.data.isShowFilter = false;
            }
        }).catch(reason => {
            this.data.isShowTips = true;
            this.data.tipsText = "审批失败，请检查网络或服务器！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
            this.data.isShowFilter = false;
        });
    };

    //生成凭证
    handleClickAudit2 = (e) => {
        this.data.isShowFilter = true;
        this.data.isShowTips = true;
        this.data.tipsText = "正在生成凭证请稍候...";
        axios({
            url: URL.histBudget,
            params: {
                type: 'CredentialAllocation',
                userid: this.data.userid,
                json: {
                    ID: this.data.params.ID,
                }
            }
        }).then(res => {
            if (res.data.code == '00') {
                this.data.tipsText = '生成成功！';
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    this.data.isShowFilter = false;
                    this.data.isBtnHide2 = true;
                    this.data.auditDetail.AccountNum = res.data.msg;
                }, 1000);
                this.data.isShowFilter = false;
            } else {
                this.data.isShowTips = true;
                this.data.tipsText = res.data.msg;
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
                this.data.isShowFilter = false;
            }
        }).catch(reason => {
            this.data.isShowTips = true;
            this.data.tipsText = "审批失败，请检查网络或服务器！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
            this.data.isShowFilter = false;
        });
    };

    handleClickDel = () => {
        this.data.isShowFilter = true;
        this.data.isShowToast = true;
    }

    handleClIAkAlterOK = () => {
        this.data.isShowToast = false;
        this.data.isShowTips = true;
        this.data.tipsText = '正在提交单据，请稍后...';
        axios({
            url: URL.histBudget,
            params: {
                type: 'SubmitDownBudget',
                userid: this.data.userid,
                json: {
                    ID: this.data.params.IA_ID
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
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <AlterTips isShowToast={this.data.isShowToast} text={this.data.toastText}
                        handleClickOK={this.handleClickAlterOK} handleClickCancel={this.handleClickAlterCancel} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <HeadTitle btnSelect={true} titleTxt={this.data.title} showDelBtn={this.data.showDelBtn}
                        handleClickDel={this.handleClickDel}
                        handleClickBack={this.handleClickBack}
                    />
                    <div className="content_mainS">
                        <div className="content_mainDetail">
                            <div className='detailBorder detailMarTop borderBottom'>
                                <DetailBold label="创建时间" value={this.data.auditDetail.allot.CreateTime} />
                                <DetailBold label="分配类型" value={this.data.auditDetail.allot.IA_Type === 0 ? '调整预算' : this.data.auditDetail.allot.IA_Type === 1 ? '年初预算' : '结转预算'} />
                                <DetailBold label="分配原因" value={this.data.auditDetail.allot.IA_Note} />
                                <DetailBold label="创建人" value={this.data.auditDetail.allot.CreateUser} />
                                <DetailBold label="项目数" value={this.data.auditDetail.allot.IA_Num} />
                                <DetailBold label="项目金额" value={`${this.data.auditDetail.allot.IA_Money || '0.00'}元`} />
                                <DetailBold label="分配凭证" value={this.data.auditDetail.allot.AccountNum} />
                            </div>
                            {this.data.auditDetail.allotDetail.map((item, index) => (
                                <div className='detailBorder detailMarTop borderBottom'>
                                    <DetailNormal label="分配部门" value={item.DeptName} />
                                    <DetailNormal label="分配项目" value={item.ItemID} />
                                    <DetailNormal label="分配金额" value={`${item.AllocationSum || '0.00'}元`} />
                                    <DetailNormal label="分配摘要" value={item.Context || ''} />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <SubmitBtn value='通过' isBtnHide={this.data.isBtnHide} handleClick={this.handleClickAudit} />
                <SubmitBtn value='生成凭证' isBtnHide={this.data.isBtnHide2} handleClick={this.handleClickAudit2} />
                <style>{`
                    body{
                        overflow-y:${this.state.overflow};
                    }
                `}</style>
            </div>
        )
    }
}
export default PayAllocationAudit;