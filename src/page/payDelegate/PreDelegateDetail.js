import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import { AuditBtn, SubmitBtn, TwoSelectBtn } from "../commonComp/SubmitBtnComp";
import axios from "axios";
import Tips from "../commonComp/TipsComp";
import { ExpenseAuditAlter } from "../commonComp/AuditAlterComp";
import { DetailBold, DetailNormal } from "../commonComp/InputComp";
import { CommonConfig } from "../config/commonConfig";
import URL from "../../../public/api/serverAPI.config";
import { FilePreviewList } from "../commonComp/FilePreviewList";
import { getAttachment, getDept, getFilePreview, getItem, getProcess } from "../commonInterface/DeclareComm";
import AuditProcess from "../commonComp/AuditProcess";
import { AlterTips } from "../commonComp/AlterTips";
import { AddBudgetProgressBar, AddOtherProgressBar } from "../commonComp/ProgressBar";
import { uuid, getMoneyNumber } from "../config/commonCheck";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PreDelegateDetail extends React.Component {
    @observable data = {
        type: 'ListDownBudgetImport',
        userid: '',
        params: {
            ID: '',
            Note: '',
            ItemID: '',
            Money: '',
            Type: '',
            Context: '',
            YearDate: ''
        },
        title: '下发预览',
        listType: '',
        isShowFilter: false,
        tipsText: '',
        isShowTips: false,
        isShowToast: false,
        checker: '',
        btnSelect: false
    };

    constructor(props) {
        super(props);
        this.state = {
            overflow: 'scroll'
        };
    }

    componentDidMount = async () => {
        this.data.userid = BaseComm.GetLoginID();
        const ID = sessionStorage.getItem('ID');
        if (ID) {
            this.data.btnSelect = true;
            this.data.params.ID = ID;
        }
        let params = JSON.parse(sessionStorage.getItem("params"));
        if (params) {
            this.data.params = params;
        }
    };

    handleClickBack = () => {
        this.props.history.go(-1);
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
    //保存
    handleClickSave = (e) => {
        this.data.isShowFilter = true;
        this.data.isShowTips = true;
        this.data.tipsText = "正在保存请稍候...";
        let params = this.data.params;
        axios({
            url: URL.histBudget,
            params: {
                type: 'SaveDownBudget',
                userid: this.data.userid,
                json: {
                    ID: params.ID,
                    Note: params.Note,
                    Type: params.Type,
                    ItemID: params.ItemID,
                    Money: params.Money,
                    Context: params.Context
                }
            }
        }).then(res => {
            if (res.data.code === '00') {
                this.data.params.ID = res.data.msg;
                this.data.isShowTips = true;
                this.data.tipsText = "保存成功！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    this.data.isShowToast = true;
                }, 1000);
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
            this.data.tipsText = "保存失败，请检查网络或服务器！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
            this.data.isShowFilter = false;
        })
    };
    //提交
    handleClickAlterOK = (e) => {
        this.data.isShowToast = false;
        this.data.isShowTips = true;
        this.data.tipsText = "正在提交请稍候...";
        axios({
            url: URL.histBudget,
            params: {
                type: 'SubmitDownBudget',
                userid: this.data.userid,
                json: {
                    ID: this.data.params.ID
                }
            }
        }).then(res => {
            if (res.data.code === '00') {
                this.data.isShowTips = true;
                this.data.tipsText = "提交成功！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    this.data.isShowFilter = false;
                    sessionStorage.removeItem('ID');
                    sessionStorage.setItem("addType", '下发');
                    window.location.href = '/home/delegateSubmitSuccess';
                }, 1000);
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
            this.data.tipsText = "提交失败，请检查网络或服务器！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
            this.data.isShowFilter = false;
        })
    };

    handleClickAlterCancel = () => {
        this.data.isShowFilter = false;
        this.data.isShowToast = false;
        sessionStorage.removeItem('ID');
        window.location.href = '/home/payDelegateList';
    }

    handleClickAltersCancel = () => {
        this.data.isShowFilter = false;
        this.data.isShowToast = false;
    }

    render() {
        const detail = this.data.params;
        return (
            <div className="wrapper">
                <div className="wrapper-detail colorAddBG">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <AlterTips isShowToast={this.data.isShowToast} text="是否提交本次下发单据？"
                        handleClickOK={this.handleClickAlterOK} handleClickCancel={this.handleClickAltersCancel} />
                    <div id="list-filter" className="list-filter" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <HeadTitle titleTxt={this.data.title} btnSelect={this.data.btnSelect}
                        handleClickBack={this.handleClickBack} />
                    <AddBudgetProgressBar oneTit='下发明细' twoTit='预览' threeTit='提交'
                        secondOver={true} onClickOne={this.handleClickBack} onClickTwo={this.handleNextStep} />
                    <div className="content_mainS">
                        <div className="content_mainDetail">
                            <div className='detailBorder borderBottom'>
                                <DetailBold label="申报日期" value={detail.YearDate} />
                                <DetailBold label="预算类型" value={detail.TypeName} />
                                <DetailBold label="下发原因" value={detail.Note} />
                            </div>
                            <div className='detailBorder detailMarTop'>
                                <DetailNormal label="下发部门" value={detail.DeptName} />
                                <DetailNormal label="下发项目" value={detail.ItemName} />
                                <DetailNormal label="下发金额" value={`${detail.Money || '0.00'}元`} />
                                <DetailNormal label="下发备注" value={detail.Context} />
                            </div>
                        </div>
                    </div>
                </div>
                <SubmitBtn value='保存' handleClick={this.handleClickSave} />
                <style>{`
                    body{
                        overflow-y:${this.state.overflow};
                    }
                `}</style>
            </div>
        )
    }
}
export default PreDelegateDetail;