import React from 'react'

const Tips =(props)=>{
        return(
            <div className={props.isShow? "show":"hide"}>
                <div className="toast-box1">
                    <div className="toast-content1">{props.text}</div>
                </div>
                <style>{`
                    .toast-box1{
                        position:fixed;
                        left:44%;
                        top:39%;
                        transform:translate(-30%,-30%);
                        z-index:10000;
                        background: #000000;
                        border-radius:0.08rem;
                        text-align:center;
                        opacity:0.8;
                    }
                    .toast-content1{
                        position:relative;
                        width:100%;
                        padding:0.1rem 0.2rem;
                        line-height:0.4rem;
                        font-size:0.26rem;
                        color: #EDEDED;
                    }
                `}</style>
            </div>
        )
    }
export default Tips;