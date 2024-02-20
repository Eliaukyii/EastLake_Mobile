import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import { AuditBtn, SubmitBtn } from "../commonComp/SubmitBtnComp2";
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
class PayDelegateAudit extends React.Component {
    @observable data = {
        type: 'ListDownBudgetImportShow',
        userid: '',
        params: {
            IC_ID: '',
        },
        title: '',
        listType: '',
        isShowFilter: false,
        isShowDetail: true,
        tipsText: '',
        toastText: '是否提交本次下发单据？',
        isShowTips: false,
        auditClassName: '',
        auditDetail: { change: [], changeDetail: [] },
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
        let code1, code2, code3;
        code1 = code.split('&')[0];
        this.data.params.IC_ID = code1;
        code2 = code.split('&')[1];
        if (code2 == 'null') code2 = null;
        this.data.params.ItemID = code2;
        code3 = code.split('&')[2];
        this.data.listType = code3;
        this.getDetail(code1);
        this.data.params.ID = code1;
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
            this.data.title = '下发审批';
            this.data.isBtnHide = false;
        }
        if (this.data.listType === '2') {
            this.data.title = '下发详情';
            //this.data.showDelBtn = false;
            this.data.isBtnHide2 = false;
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
            if (res.data != null && res.data != undefined && res.data.changeDetail != null && res.data.changeDetail.length > 0) {
                this.data.auditDetail = res.data;
                this.data.params.ID = res.data.change.IC_ID;
                this.data.params.Type = `${res.data.change.IC_Type}`;
                if (this.data.params.Type === '0') {
                    this.data.params.TypeName = '调整预算';
                }
                if (this.data.params.Type === '1') {
                    this.data.params.TypeName = '年初预算';
                }
                if (this.data.params.Type === '2') {
                    this.data.params.TypeName = '结转预算';
                }
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
        this.data.auditType = e.target.name;
        this.data.isShowFilter = true;
        this.data.isShowTips = true;
        this.data.tipsText = "正在处理请稍候...";
        axios({
            url: URL.histBudget,
            params: {
                type: 'ApprovalDownBudget',
                userid: this.data.userid,
                auditType: this.data.auditType,
                json: {
                    ID: this.data.params.ID,
                }
            }
        }).then(res => {
            if (res.data.code === '00') {
                this.data.tipsText = '审批成功！';
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    this.data.isShowFilter = false;
                    window.location.href = '/home/payDelegateList';
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

    //同步分配
    handleClickAudit2 = (e) => {
        //var json = {
        //    Type: this.data.params.Type,
        //    TypeName: this.data.params.TypeName,
        //    Dept: this.data.auditDetail.DeptCode,
        //    DeptName: this.data.auditDetail.DeptName,
        //    ItemID: this.data.auditDetail.ItemID,
        //    ItemName: this.data.auditDetail.ItemName,
        //    Money: this.data.auditDetail.Money
        //};
        var json = {
            ICID: this.data.params.ID,
            ItemID: this.data.auditDetail.ItemID,
        };
        this.data.isShowTips = true;
        this.data.tipsText = '正在同步分配数据！';
        setTimeout(() => {
            window.location.href = '/home/payAllocationAdd?' + encodeURI(JSON.stringify(json));
        }, 1000);
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
                    ID: this.data.params.IC_ID
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
                    window.location.href = '/home/payDelegateList';
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
                                <DetailBold label="创建时间" value={this.data.auditDetail.change.CreateTime} />
                                <DetailBold label="下发类型" value={this.data.auditDetail.change.IC_Type === 0 ? '调整预算' : this.data.auditDetail.change.IC_Type === 1 ? '年初预算' : '结转预算'} />
                                <DetailBold label="创建人" value={this.data.auditDetail.change.CreateUser} />
                                <DetailBold label="项目数" value={this.data.auditDetail.change.IC_Num} />
                                <DetailBold label="项目金额" value={this.data.auditDetail.change.IC_Money} />
                                <DetailBold label="下发原因" value={this.data.auditDetail.change.IC_Note} />
                            </div>
                            {this.data.auditDetail.changeDetail.map((item, index) => (
                                <div className='detailBorder detailMarTop borderBottom'>
                                    <DetailNormal label="下发部门" value={item.DeptName} />
                                    <DetailNormal label="下发项目" value={item.ItemID} />
                                    <DetailNormal label="下发金额" value={`${item.Money || '0.00'}元`} />
                                    <DetailNormal label="下发备注" value={item.Remark || ''} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <AuditBtn isBtnHide={this.data.isBtnHide} handleClickAudit={this.handleClickAudit} status={this.data.PFI_Status}
                />
                <SubmitBtn value='同步分配' isBtnHide={this.data.isBtnHide2} handleClick={this.handleClickAudit2} />
                <style>{`
                    body{
                        overflow-y:${this.state.overflow};
                    }
                `}</style>
            </div>
        )
    }
}
export default PayDelegateAudit;