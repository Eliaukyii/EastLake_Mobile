import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {ContentHead, HeadTitle} from "../commonComp/HeadTitle";
import {SubmitBtn, AddProject, OutLoginBtn} from "../commonComp/SubmitBtnComp";
import axios from "axios";
import {ContentInputs} from "../commonComp/InputComp";
import URL from "../../../public/api/serverAPI.config";
import Tips from "../commonComp/TipsComp";
import {PreApplicatFilter, PreAttnFilter, PreDeptFilter, PreItemFilter} from "../commonComp/EditCommonFilter";
import {CommonConfig} from "../config/commonConfig";
import {getDept, getEmployee, getItem, getUploadFile} from "../commonInterface/DeclareComm";
import DatePicker from "react-mobile-datepicker";
import moment from "moment";
import {AlterTips} from "../../page/commonComp/AlterTips";
import {getMoneyNumber, uuid} from "../config/commonCheck";
import {AddProgressBar} from "../commonComp/ProgressBar";
@observer
class SubmitSuccessPage extends React.Component{
    @observable data = {
        userid:'',
        tipsText:'',
        isShowTips:'',
        isShowToast: false,
        isShowTravel: false,
        currAddSum:0,
        resultTip:''
    };
    constructor (props){
        super(props);
        this.state={
            overflow:'scroll'
        };
    }

    componentDidMount = async () =>{
        let data = localStorage.getItem("userId");
        this.data.userid = data;
        if (!data){
            window.location.href= '/login';
        }
        let tip = sessionStorage.getItem("addType");
        if (tip){
            this.data.resultTip = tip;
        }
    };

    handleClickBack=()=>{
        sessionStorage.removeItem("addType");
        sessionStorage.removeItem("params");
        this.props.history.go(-2);
    };

    handleGoList =()=>{
        sessionStorage.removeItem("addType");
        window.location.href= '/home';
    };

    render(){
        return(
            <div className="wrapper">
                <div className="wrapper-detail colorAddBG">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips}/>
                    <HeadTitle titleTxt={`${this.data.resultTip}新增`} handleClickBack={this.handleClickBack}/>
                    <AddProgressBar secondOver={true} thirdOver={true}/>
                    <div className="resultBox">
                        <div className="iconSuccess"/>
                        <div className="successTxt">操作成功</div>
                        <div className="successTip">{this.data.resultTip}提交成功</div>
                    </div>
                    <OutLoginBtn value="返回主页" handleClick={this.handleGoList}/>
                </div>
                <style>{`
                    .resultBox{
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: -moz-box;
                        display: flex;
                        -webkit-flex-direction: column;
                        -ms-flex-direction: column;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background: #ffffff;
                        padding: 0.6rem 0;
                        margin-bottom: 0.4rem;
                    }
                    .successTxt{
                        font-size: 0.32rem;
                        font-weight: bold;
                        margin-top: 0.2rem;
                    }
                    .successTip{
                        font-size: 0.24rem;
                        color: #888888;
                        letter-spacing: 0;
                        text-align: center;
                        line-height: 0.24rem;
                        margin-top: 0.2rem;
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
export default SubmitSuccessPage;