import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import axios from "axios";
import Tips from "./commonComp/TipsComp";
import { LoginInput } from "./commonComp/InputComp";
import { SchoolBadge } from "./commonComp/SchoolBadge";
import URL from "../../public/api/serverAPI.config";
import BaseComm from "./commonInterface/BaseComm"

@observer
class Login extends React.Component {
    @observable data = {
        userInfo: {
            userId: '',
            userName: '',
            userOrg: '',
            userOrgID: '',
            userPhone: '',
            Mail: ''
        },
        params: {
            account: '',
            password: '',
            yzm: '',
            yzmCheck: ''
        },
        tipsText: '',
        isShowTips: false,
        isShowFilter: false
    };
    GetyzmCode() {
        var code = "";
        var codeLength = 4;//验证码的长度   
        var selectChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (var i = 0; i < codeLength; i++) {
            var charIndex = Math.floor(Math.random() * selectChar.length);
            code += selectChar[charIndex];
        }
        this.data.params.yzmCheck = code;
    };

    componentDidMount() {
    //   debugger  
        this.GetyzmCode = this.GetyzmCode.bind(this);
        this.GetyzmCode();

        let code=this.props.location.search;
        if (code.indexOf("?") !== -1) {
            code = code.slice(1);
        }
        if (code!=null && code !=="") {
            this.getSSO(code)
        }

        this.data.userid = BaseComm.GetLoginIDOnly();
        if (this.data.userid) {
            window.location.href = '/home';
        }
    }
    getSSO = (json)=>{
        axios({
            url:URL.histLogin,
            method:'post',
            params:{
                type: 'SSO',
                json:json
            }
        }).then((res)=>{
            console.log(res);
        if(res.data.status === '1'){
                this.data.userInfo.userId = res.data.data[0].Mem_Account || '';
                this.data.userInfo.userName = res.data.data[0].Mem_Name || '';
                this.data.userInfo.userOrg = res.data.data[0].Org_Name || '';
                this.data.userInfo.userOrgID = res.data.data[0].Org_ID || '';
                this.data.userInfo.userPhone = res.data.data[0].Mem_Phone || '';
                this.data.userInfo.Mail = res.data.data[0].Mem_Mail || '';
                    BaseComm.SetLoginInfo(this.data.userInfo);
                    this.data.isShowTips = true;
                    this.data.tipsText = '登录成功';
                    setTimeout(() => {
                        window.location.href = '/home';
                    }, 1000);
            }
        }
        )
};


    handleChangeVal = (e) => {
        const name = e.target.name;
        this.data.params[name] = e.target.value;
    };

    handleChangeValyzm = (e) => {
        const name = e.target.name;
        this.data.params[name] = e.target.value;
        if (e.target.value.length === this.data.params.yzmCheck.length) {
            this.handleClickLogin();
        }
    };

    handleClickClear = (e) => {
        const id = e.target.id;
        if (id === 'account') {
            this.data.params.account = '';
            this.data.params.password = '';
            this.data.params.yzm = '';
        }
        this.data.params[id] = '';
    };

    handleClickLogin = () => {
        if (this.data.params.account !== '' && this.data.params.password !== '') {
            if (this.data.params.yzm.toLowerCase() === this.data.params.yzmCheck.toLowerCase()) {
                let json = {
                    account: this.data.params.account,
                    password: this.data.params.password
                };
                this.data.isShowFilter = true;
                this.data.tipsText = '请稍等...';
                this.data.isShowTips = true;
                // debugger
                axios({
                    url: URL.histLogin,
                    params: {
                        type: 'Login',
                        userid: '',
                        json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
                    },
                    method: 'post'
                }).then((res) => {
                    console.log(res);
                    this.data.isShowFilter = false;
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                    let data = decodeURIComponent(escape(window.atob(res.data)));
                    let obj = JSON.parse(data);
                    if (obj.status === '00') {
                        this.data.userInfo.userId = obj.data[0].Mem_Account || '';
                        this.data.userInfo.userName = obj.data[0].Mem_Name || '';
                        this.data.userInfo.userOrg = obj.data[0].Org_Name || '';
                        this.data.userInfo.userOrgID = obj.data[0].Org_ID || '';
                        this.data.userInfo.userPhone = obj.data[0].Mem_Phone || '';
                        this.data.userInfo.Mail = obj.data[0].Mem_Mail || '';
                        BaseComm.SetLoginInfo(this.data.userInfo);
                        this.data.isShowTips = true;
                        this.data.tipsText = '登录成功';
                        setTimeout(() => {
                            window.location.href = '/home';
                        }, 1000);
                    } else {
                        this.data.params.yzm = '';
                        this.GetyzmCode();
                        this.data.isShowTips = true;
                        this.data.tipsText = obj.msg;
                        setTimeout(() => {
                            this.data.isShowTips = false;
                            this.data.tipsText = '';
                        }, 1000);
                    }
                }).catch(reason => {
                    console.log(reason);
                    this.data.isShowFilter = false;
                    this.data.isShowTips = true;
                    this.data.tipsText = "接口异常，请检查网络或管理员！";
                    setTimeout(() => {
                        this.data.isShowTips = false;
                        this.data.tipsText = '';
                    }, 1000);
                })
            } else {
                this.data.params.yzm = '';
                this.data.isShowTips = true;
                this.data.tipsText = "验证码错误！";
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
            }
        } else {
            this.data.params.yzm = '';
            this.GetyzmCode();
            this.data.isShowTips = true;
            this.data.tipsText = "账户密码不能为空！";
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
        }
    };

    render() {
        return (
            <div className="wrapper">
                <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                <div id="list-filterH" className="list-filterH"
                    style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                </div>
                <div className="wrapper-login">
                    <SchoolBadge />
                    <div className="login">
                        <LoginInput type="text" name="account" id="account" needClear={true}
                            iconName="iconfont icon-yonghu1 icon_user" placeholder="请输入身份证号"
                            handleChange={this.handleChangeVal}
                            value={this.data.params.account}
                            handleClickClear={this.handleClickClear} />
                        <LoginInput type="password" name="password" id="password" needClear={true}
                            iconName="iconfont icon-password icon_user" placeholder="请输入身份证号后六位"
                            handleChange={this.handleChangeVal}
                            value={this.data.params.password}
                            handleClickClear={this.handleClickClear} />
                        <div className="yzmLeft">
                            <LoginInput type="text" name="yzm" id="yzm" needClear={true}
                                iconName="iconfont icon-yanzhengm icon_user" placeholder="请输入右侧验证码"
                                handleChange={this.handleChangeValyzm}
                                value={this.data.params.yzm}
                                handleClickClear={this.handleClickClear} />
                        </div>
                        <div className="yzmright"><span onClick={this.GetyzmCode} style={{ lineHeight: "0.86rem", paddingLeft: "0.36rem" }}>{this.data.params.yzmCheck}</span></div>
                        <input className="login-btn" readOnly={true} value="登录" onClick={this.handleClickLogin} />
                    </div>
                </div>
                <style>{`
                    .wrapper-login{
                        position: relative;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: -moz-box;
                        display: flex;
                        -webkit-flex-direction:column;
                        flex-direction: column;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        overflow-y: auto;
                        align-items: center;
                        background: #F5F5F5;
                    }
                    .login{
                        width: 100%;
                        height: 4rem;
                        padding: 0.36rem 0.28rem;
                    }
                    .login-btn{
                        margin-top: 0.4rem;
                        width:100%;
                        border-radius: 0.1rem;
                        outline: none;
                        border: none;
                        color:#fff;
                        font-size: 0.24rem;
                        height: 0.8rem;
                        text-align: center;
                        background: #3D70FF;
                        font-size:0.26rem;
                        border-radius:3px;
                        -webkit-border-radius:3px;
                    }
                    .remPassword{
                        position: absolute;
                        right: 1.2rem;
                        font-size: 0.26rem;
                        line-height: 0.36rem;
                        color: #000;
                        margin-top: 0.2rem;
                    }
                    .swich{
                        position:relative;
                        width:0.8rem;
                        margin-top: 0.2rem;
                        float: right;
                    }
                    .swich .box{
                        position: relative;
                        width:0.8rem;
                        height:0.4rem;
                        background:#ccc;
                        border-radius:0.2rem;
                        transition: all 0.2s ease;
                    }
                    .swich .box .boxSpan{
                        position: relative;
                        height:0.42rem;
                        width:0.42rem;
                        border-radius:0.21rem;
                        background:#fff;
                        transform:translateX(0rem);
                        transition: all 0.2s ease;
                    }
                    .boxOn{
                        position: relative;
                        width:0.8rem;
                        height:0.4rem;
                        background:#2071FE;
                        border-radius:0.2rem;
                        transition: all 0.2s ease;
                    }
                    .boxOn .boxOnSpan{
                        position: relative;
                        height:0.42rem;
                        width:0.42rem;
                        border-radius:0.21rem;
                        background:#fff;
                        transform:translateX(0.4rem);
                        transition: all 0.2s ease;
                    }
                    .yzmLeft{
                        width:49%;
                        float:left;
                    }
                    .yzmRight{
                        width:49%;
                        float:right;
                    }
                `}</style>
            </div>
        )
    }
}
export default Login;