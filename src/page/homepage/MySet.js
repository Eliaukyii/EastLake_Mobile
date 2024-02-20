import React from 'react'
import Tips from "../commonComp/TipsComp";
import { observable } from "mobx";
import { observer } from 'mobx-react';
import { LoginInput } from "../commonComp/InputComp";
import { OutLoginBtn } from "../commonComp/SubmitBtnComp";
import SetFunc from "../commonComp/SetFunc";
import BaseComm from "../commonInterface/BaseComm";

@observer
class MySet extends React.Component {
    @observable data = {
        userid: '',
        type: '',
        currentIndex: 'home',
        tipsText: '',
        openRem: false,
        isShowTips: false
    };


    componentDidMount() {
        this.data.userid = BaseComm.GetLoginID();
    }

    handleClickOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login';
    };

    render() {
        return (
            <div className={`wrapper ${this.props.currentIndex === 'mySet' ? 'show' : 'hide'}`}>
                <div className="wrapper-detail wrapperColor">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <div id="list-filterF" className="list-filterF" onClick={this.handleClickCover}
                        style={{ display: this.data.isShowFilter ? 'block' : 'none' }}>
                    </div>
                    <div className="setHead">
                        <div className="iconfont icon-xiangzuo iconOutSet" onClick={this.props.handleBack}></div>
                        <div className="userCir">
                            <div className="headDf"></div>
                        </div>
                        <div className="userInfo">
                            <div className="userContent">
                                <div className="userName">{this.props.userInfo.userName || '冯晓'}</div>
                                <div className="userDept">{this.props.userInfo.userOrg || '教务处'}</div>
                            </div>
                        </div>
                    </div>
                    <LoginInput type="text" title="手机号" readOnly={true} iconName="iconfont icon-lianxixx icon_user"
                        value={this.props.userInfo.userPhone || '暂无'} />
                    <LoginInput type="text" title="邮箱" readOnly={true} iconName="iconfont2 iconyouxiang1 icon_user"
                        value={this.props.userInfo.userMail || '暂无'} />
                    <OutLoginBtn value="退出登录" handleClick={this.handleClickOut} />
                </div>
                <style>{`
                    .iconOutSet{
                        position: absolute;
                        top:0.28rem;
                        left:0.28rem;
                        width: 0.36rem;
                        height: 0.36rem;
                        color: #333333;
                    }
                    .setHead{
                        position: relative;
                        width: 100%;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        flex-direction: column;
                        -webkit-flex-direction: column;
                        align-items: center;
                        background-color: #fff;
                        padding: 0.28rem;
                    }
                    .wrapperColor{
                        background: #F5F5F5;
                    }
                    .userInfo{
                        width: calc(100% - 1.4rem);
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        flex-direction: row;
                        -webkit-flex-direction: row;
                        align-items: center;
                    }
                    .userContent{
                        width: 100%;
                        padding: 0.2rem;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        justify-content: flex-start;
                        flex-direction: column;
                        -webkit-flex-direction: column;
                        align-items: center;
                    }
                    .userName{
                        font-family: PingFangSC-Medium;
                        font-size: 0.29rem;
                        color: #333333;
                        letter-spacing: 0.27px;
                        text-align: center;
                        line-height: 0.42rem;
                    }
                    .userDept{
                        font-family: PingFangSC-Regular;
                        font-size: 0.26rem;
                        color: #999999;
                        letter-spacing: 0.23px;
                        text-align: center;
                    }
                    .listBotMar{
                        margin-bottom: 0.88rem;
                    }
                `}</style>
            </div>
        )
    }
}
export default MySet;