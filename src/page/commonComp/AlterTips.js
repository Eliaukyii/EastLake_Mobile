import React from "react"
import {observer} from 'mobx-react'

@observer
export class AlterTips extends React.Component{
    render(){
        return(
            <div className={this.props.isShowToast?"toast":"hide"}>
                <div className="toast-box">
                    <div className="toast-content">{this.props.text}</div>
                    <div className="toast-footer">
                        <span onClick={this.props.handleClickOK} className="btn-ok">是</span>
                        <span onClick={this.props.handleClickCancel} className="btn-cancel">否</span>
                    </div>
                </div>

                <style global jsx>{`
                    .toast-box{
                        position:fixed;
                        top:40%;
                        left:10%;
                        width:80%;
                        background:#fff;
                        border-radius:0.14rem;
                        z-index:19999;
                        font-size:0.26rem;
                        text-align:center;
                    }
                    .toast-content{
                        position:relative;
                        width:100%;
                        padding:0.2rem 0.3rem;
                        line-height:0.5rem;
                    }
                    .toast-footer{
                        position:relative;
                        display:-webkit-flex;
                        display:flex;
                        width:100%;
                        // border-top:0.01rem solid #ddd;
                    }
                    .toast-footer:after {
                        position: absolute;
                        content: '';
                        width: 100%;
                        left: 0;
                        top: 0;
                        height: 1px;
                        background-color: #ddd;
                        -webkit-transform: scale(1,.5);
                        transform: scale(1,.5);
                        -webkit-transform-origin: center bottom;
                        transform-origin: center bottom
                    }
                    .toast-footer .btn-ok,.toast-footer .btn-cancel{
                        display:inline-block;
                        -webkit-flex:1;
                        flex:1;
                        text-align:center;
                        padding:0.16rem 0;
                        color:#0084ff;
                    }
                    .toast-footer .btn-cancel{
                        border-left:0.02rem solid #ddd;
                    }
                `}</style>
            </div>
        )
    }
}