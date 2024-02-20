import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import { SubmitBtn } from "../commonComp/SubmitBtnComp";
import axios from "axios";
import { ContentInputs } from "../commonComp/InputComp";
import URL from "../../../public/api/serverAPI.config";
import Tips from "../commonComp/TipsComp";
import { getDept, getEmployee, getItem, getPayCol, getPayColType, getUploadFile } from '../commonInterface/DeclareComm';
import {
    PreDeptFilter,
    PreApplicatFilter,
    PreAttnFilter,
    PreItemFilter,
    PreSalaryFilter
} from "../commonComp/EditCommonFilter";
import { CommonConfig } from '../config/commonConfig'
import { uuid } from "../config/commonCheck";
import DatePicker from "react-mobile-datepicker";
import moment from "moment";
import ManagePersonItem from "./component/ManagePersonItem";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayManageAdd extends React.Component {
    @observable data = {
        userid: '',
        type: 'AddAllowance',
        Name: '',
        Dept: '',
        Year: '',
        params: {
            PayTitle: '',
            PayReesion: '',
            SmallMoney: '0.00',
            AttnBMID: '',
            Data: '',
            Enclosure: '',
            FundIndex: '',
            Department: '',
            Data2: '',
            ApplicationID: '',
            SalaryCol: '',
            DepartmentID: '',
            Time: '',
            OddNumbers: '',
            SendTime: '',
            Application: '',
            Attn: '',
            AttnID: '',
            FundIndexID: '',
            SalaryColID: '',
            List: [],
            deptKey: '',
            itemKey: '',
            attnKey: ''
        },
        payExpenseAdd: [],
        page: 1,
        isShowFilter: false,
        tipsText: '',
        isShowTips: false,
        deptClassName: '',
        applicatClassName: '',
        attnClassName: '',
        salaryClassName: '',
        addDeptList: [],
        addApplicatList: [],
        addAttnList: [],
        addSalaryList: [],
        isDeptShow: false,
        isEmployeeShow: false,
        isItemShow: false,
        isSalaryShow: false,
        pfi_id: '',
        confirmText: '',
        timeParams: {
            max: '',
            min: '',
            isOpen: false
        },
        danwei: '',
        danweiID: '',
        epCurrent: '',
        SalaryType: '',
        SalaryTypeID: '',
        currentArr: {
            DeptCode: '',
            DeptName: '',
            EmployeeName: '',
            Money: '0.00',
            Num: '1',
            Unit: '元/期',
            Standard: '0.00',
            Note: '',
            EmployeeCode: '',
        }
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
        let id = BaseComm.GetLoginInfo().userOrgID;
        let name = BaseComm.GetLoginInfo().userName;
        this.data.pfi_id = uuid();
        let dept = [];
        dept = await getDept(this.data.userid, id);
        this.data.params.DepartmentID = dept.data[0].DeptCode;
        this.data.params.Department = dept.data[0].DeptName;
        this.data.danweiID = dept.data[0].DeptCode;
        this.data.params.Application = name;
        this.data.params.ApplicationID = this.data.userid;
        this.data.params.Attn = name;
        this.data.params.AttnID = this.data.userid;
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        this.data.params.Time = year + '-' + month + "-" + day;
        this.data.params.SendTime = year + '-' + month;
    }

    handleClickBack = () => {
        this.props.history.go(-1);
    };

    handleChangeInput = async (e) => {
        const name = e.target.name;
        const valueC = e.target.value;
        this.data.params[name] = valueC;
        if (name === 'deptKey') {
            this.data.addDeptList = await getDept(this.data.userid, this.data.params.deptKey);
        }
        if (name === 'itemKey') {
            this.data.addApplicatList = await getItem(this.data.userid, this.data.params.DepartmentID, this.data.params.itemKey);
        }
        if (name === 'attnKey') {
            this.data.addAttnList = await getEmployee(this.data.userid, this.data.params.attnKey);
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
            let formData = new FormData();
            formData.append(`fileView.${file.type}`, e.target.files[0]);
            let res = await getUploadFile(this.data.userid, formData, this.data.pfi_id);
            if (res && file.type.slice(0, 5) === 'image') {
                var reader = new FileReader();
                // 图片文件转换为base64
                reader.readAsDataURL(file);
                reader.onload = function () {
                    // 显示图片
                    document.getElementById("file_img").src = this.result;
                }
            }
        }
    };

    handleClickCover = () => {
        const isShowFilter = this.data.isShowFilter;
        if (isShowFilter) {
            this.data.isDeptShow = false;
            this.data.deptClassName = CommonConfig.closed;
            this.data.params.deptKey = '';
            this.data.isItemShow = false;
            this.data.applicatClassName = CommonConfig.closed;
            this.data.isEmployeeShow = false;
            this.data.attnClassName = CommonConfig.closed;
            this.data.isSalaryShow = false;
            this.data.salaryClassName = CommonConfig.closed;
            this.data.params.employeeKey = '';
            this.data.isShowFilter = false;
            this.setState({
                overflow: 'scroll'
            });
        }
    };

    handleClickSubmit = (e) => {
        axios({
            url: URL.histPayManage,
            params: {
                userid: this.data.userid,
                type: this.data.type,
                pfi_id: this.data.pfi_id,
                json: this.data.params
            },
            method: 'get'
        }).then(res => { });
    };

    handleClickFilter = async (e) => {
        const name = e.target.name;
        if (name === 'DeptName') {
            this.data.epCurrent = 'dept';
            this.data.addDeptList = await getDept(this.data.userid);
            if (!this.data.isDeptShow) {
                this.data.isShowFilter = true;
                this.data.deptClassName = CommonConfig.opened;
            }
        }
        if (name === 'person') {
            this.data.epCurrent = 'person';
            this.data.addDeptList = await getDept(this.data.userid);
            if (!this.data.isDeptShow) {
                this.data.isShowFilter = true;
                this.data.deptClassName = CommonConfig.opened;
            }
        }
        if (name === 'FundIndex') {
            this.data.addApplicatList = await getItem(this.data.userid, this.data.params.DepartmentID);
            if (!this.data.isItemShow) {
                this.data.isShowFilter = true;
                this.data.applicatClassName = CommonConfig.opened;
            }
        }
        if (name === 'SalaryCol') {
            if (this.data.params.FundIndexID) {
                this.data.addSalaryList = await getPayCol(this.data.userid, this.data.params.FundIndexID);
                if (!this.data.isSalaryShow) {
                    this.data.isShowFilter = true;
                    this.data.salaryClassName = CommonConfig.opened;
                }
            } else {
                this.data.isShowTips = true;
                this.data.tipsText = '请先选择经费项目！';
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
            }
        }
        if (name === 'SalaryType') {
            this.data.isShowTips = true;
            this.data.tipsText = '请先选择薪酬栏目！';
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
        }
        if (name === 'Attn') {
            this.data.epCurrent = 'attn';
            this.data.addDeptList = await getDept(this.data.userid);
            if (!this.data.isDeptShow) {
                this.data.isShowFilter = true;
                this.data.deptClassName = CommonConfig.opened;
            }
        }
    };

    handleClickClear = async (e) => {
        const name = e.target.id;
        if (name === 'deptKey') {
            this.data.params.deptKey = '';
            this.data.addDeptList = await getDept(this.data.userid);
        }
        if (name === 'itemKey') {
            this.data.params.itemKey = '';
            this.data.addApplicatList = await getItem(this.data.userid, this.data.params.DepartmentID);
        }
        if (name === 'attnKey') {
            this.data.params.attnKey = '';
            this.data.addAttnList = await getEmployee(this.data.userid);
        }
    };

    handleChooseDept = async (e) => {
        if (this.data.epCurrent === 'dept') {
            this.data.params.DeptCode = e.target.id;
            this.data.params.DeptName = e.target.innerText;
            this.data.deptClassName = CommonConfig.closed;
            this.data.isShowFilter = false;
            this.data.epCurrent = '';
        }
        if (this.data.epCurrent === 'attn') {
            this.data.danweiID = e.target.id;
            this.data.danwei = e.target.innerText;
            this.data.deptClassName = CommonConfig.closed;
            this.data.epCurrent = '';
            this.data.addAttnList = await getEmployee(this.data.userid, this.data.danweiID);
            if (!this.data.isEmployeeShow) {
                this.data.isShowFilter = true;
                this.data.attnClassName = CommonConfig.opened;
            }
        }
        if (this.data.epCurrent === 'person') {
            this.data.danweiID = e.target.id;
            this.data.danwei = e.target.innerText;
            this.data.currentArr.DeptCode = e.target.id;
            this.data.currentArr.DeptName = e.target.innerText;
            this.data.deptClassName = CommonConfig.closed;
            this.data.addAttnList = await getEmployee(this.data.userid, this.data.danweiID);
            if (!this.data.isEmployeeShow) {
                this.data.isShowFilter = true;
                this.data.attnClassName = CommonConfig.opened;
            }
        }
    };

    handleChooseApplicat = (e) => {
        this.data.params.FundIndexID = e.target.id;
        this.data.params.FundIndex = e.target.innerText;
        this.data.applicatClassName = CommonConfig.closed;
        this.data.isShowFilter = false;
    };

    handleChooseAttn = (e) => {
        if (this.data.epCurrent === 'person') {
            this.data.currentArr.EmployeeCode = e.target.id;
            this.data.currentArr.EmployeeName = e.target.innerText;
            this.data.attnClassName = CommonConfig.closed;
            this.data.isShowFilter = false;
            this.data.epCurrent = '';
            this.data.params.List.push(this.data.currentArr);
        } else {
            this.data.params.AttnID = e.target.id;
            this.data.params.Attn = e.target.innerText;
            this.data.attnClassName = CommonConfig.closed;
            this.data.isShowFilter = false;
        }
    };

    handleChooseSalary = async (item) => {
        this.data.params.SalaryColID = item.ColCode;
        this.data.params.SalaryCol = item.ColName;
        this.data.SalaryTypeID = item.PayColCode;
        let SalaryType = await getPayColType(this.data.userid, this.data.SalaryTypeID);
        this.data.SalaryType = SalaryType[0].PayColName;
        this.data.SalaryTypeID = SalaryType[0].PayCode;
        this.data.salaryClassName = CommonConfig.closed;
        this.data.isShowFilter = false;
    };

    //选择时间
    handleClickDate = () => {
        this.data.timeParams.isOpen = true;
        this.data.timeParams.max = new Date();
    };

    handleSelectDate = (date) => {
        this.data.timeParams.isOpen = false;
        this.data.params.SendTime = moment(date).format('YYYY-MM');
    };

    handleCancelDate = () => {
        this.data.timeParams.isOpen = false;
    };

    handleClickDel = () => { };

    handleChangeItem = (e, index) => {
        // const name = e.target.name;
        // const valueC = e.target.value;
        // this.data.params.List[index][name] = valueC;
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail">
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
                        addPreList={this.data.addDeptList.data} name="deptKey"
                        handleChangeInput={this.handleChangeInput}
                        deptKey={this.data.params.deptKey}
                        handleChooseFilter={this.handleChooseDept}
                        handleClickClear={this.handleClickClear} />
                    <PreItemFilter filterClassName={this.data.applicatClassName}
                        addPreList={this.data.addApplicatList.data} name="itemKey"
                        handleChangeInput={this.handleChangeInput}
                        itemKey={this.data.params.itemKey}
                        handleChooseFilter={this.handleChooseApplicat}
                        handleClickClear={this.handleClickClear} />
                    <PreSalaryFilter filterClassName={this.data.salaryClassName}
                        addPreList={this.data.addSalaryList.data}
                        handleChooseFilter={this.handleChooseSalary} />
                    <PreAttnFilter filterClassName={this.data.attnClassName}
                        addPreList={this.data.addAttnList.data} name="attnKey"
                        handleChangeInput={this.handleChangeInput}
                        applicatKey={this.data.params.attnKey}
                        handleChooseFilter={this.handleChooseAttn}
                        handleClickClear={this.handleClickClear} />
                    <HeadTitle titleTxt="薪酬添加" handleClickBack={this.handleClickBack} />
                    <div className="content_main">
                        <ContentInputs name="Time" display="none" readOnly={true}
                            title="申报日期" type="text "
                            value={this.data.params.Time} />
                        <ContentInputs name="SendTime" display="none" readOnly={true}
                            title="发放年月" type="text " placeholder="请选择"
                            value={this.data.params.SendTime}
                            handleClick={this.handleClickDate} />
                        <ContentInputs name="Department" display="none" readOnly={true}
                            title="申报部门" type="text"
                            value={this.data.params.Department} />
                        <ContentInputs name="FundIndex" display="none" readOnly={true}
                            title="经费项目" type="text" placeholder="请选择"
                            value={this.data.params.FundIndex}
                            handleClick={this.handleClickFilter} />
                        <ContentInputs name="SalaryCol" display="none" readOnly={true}
                            title="薪酬栏目" type="text" placeholder="请选择"
                            value={this.data.params.SalaryCol}
                            handleClick={this.handleClickFilter} />
                        <ContentInputs name="SalaryType" display="none" readOnly={true}
                            title="薪酬类型" type="text" placeholder="请选择"
                            value={this.data.SalaryType}
                            handleClick={this.handleClickFilter} />
                        <ContentInputs name="PayTitle" display="none"
                            title="发放标题" type="text" placeholder="请填写"
                            value={this.data.params.PayTitle}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="PayReesion" display="none"
                            title="发放事由" type="text" placeholder="请填写"
                            value={this.data.params.PayReesion}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="SmallMoney" display="none" readOnly={true}
                            title="总金额小写" type="text"
                            value={this.data.params.SmallMoney}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="Enclosure" display="none"
                            title="附件" type="number" placeholder="请填写"
                            value={this.data.params.Enclosure}
                            handleChange={this.handleChangeInput} />
                        {/*<ContentInputs name="OddNumbers" display="none"*/}
                        {/*               title="单号" type="number" placeholder="请填写"*/}
                        {/*               value={this.data.params.OddNumbers}*/}
                        {/*               handleChange={this.handleChangeInput}/>    */}
                        <ContentInputs name="SendTime" display="none"
                            title="发放年月" type="text" placeholder="请填写"
                            value={this.data.params.SendTime}
                            handleChange={this.handleChangeInput} />
                        <ContentInputs name="Application" display="none" readOnly={true}
                            title="申报人" type="text"
                            value={this.data.params.Application} />
                        <ContentInputs name="Attn" display="none" readOnly={true}
                            title="发放人" type="text" placeholder="请填写"
                            value={this.data.params.Attn}
                            handleClick={this.handleClickFilter} />
                        <ContentInputs name="uploadFile" display="none" readOnly={true}
                            title="上传文件" type="file" placeholder="请选择"
                            multiple="multiple"
                            handleChange={this.handleChangeInput} />
                        <div id="img_div">
                            <img id="file_img" src="" alt="" />
                        </div>
                        <ContentInputs name="person" display="none" readOnly={true}
                            title="选择人员" placeholder="请选择"

                            handleClick={this.handleClickFilter} />
                        {/*{this.data.params.List.map((item,index) =>(*/}
                        {/*    <ManagePersonItem item={item} index={index} key={index}*/}
                        {/*                      handleClick={this.handleClickDel}*/}
                        {/*                      handleChange={this.handleChangeItem}/>*/}
                        {/*))}*/}
                    </div>
                </div>
                <SubmitBtn value="提交" handleClick={this.handleClickSubmit} />
                <style>{`
                    body{
                        overflow-y:${this.state.overflow};
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
                `}</style>
            </div>
        )
    }
}
export default PayManageAdd;