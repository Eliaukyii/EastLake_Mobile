import React from 'react'

export const SchoolBadge = (props)=>{
    return (
        <div className="loginBg">
            <div className="icon_school"/>
            <span>财务协同管理平台</span>
            <style>{`
            .loginBg span{
                position: relative;
                top: 0.28rem;
                color: #FFF;
                font-size: 0.3rem;
            }
            `}</style>
        </div>
    )
};