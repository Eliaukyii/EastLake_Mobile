import React from 'react'

const MyProfile =(props)=> {
    let userInfo = props.userInfo;
        return(
            <div className="myProfile">
                <div className="financeInfo">
                    <div className="financeTit">
                        <div className="diamond"/>
                        个人信息
                    </div>
                    <div className="payInfo"><span>姓名</span><span>{userInfo.userName}</span></div>
                    <div className="payInfo"><span>部门职位</span><span>{userInfo.userOrg}</span></div>
                    <div className="payInfo"><span>手机号码</span><span>{userInfo.userPhone}</span></div>
                    <div className="payInfo"><span>电子邮箱</span><span>{userInfo.userMail}</span></div>
                </div>
                <style>{`
                    .myProfile{
                        position: relative;
                        display: -webkit-flex;
                        display: flex;
                        width: 100%;
                        height: 2.4rem;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                        margin-top: 0.2rem;
                    }
                    .financeInfo{
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                    }
                    .financeTit{
                        width: 100%;
                        height: 0.6rem;
                        line-height: 0.6rem;
                        padding-left: 0.5rem;
                        font-weight: bold;
                        font-size: 0.28rem;
                        border-bottom: 1px solid #e6e6e6;
                    }
                    .payInfo{
                        width: 100%;
                        height: 0.6rem;
                        line-height: 0.6rem;
                        padding-left: 0.28rem;
                    }
                    .payInfo span{
                        margin-right: 0.1rem;
                        font-size: 0.26rem;
                    }
                `}</style>
            </div>
        )
    }
export default MyProfile;