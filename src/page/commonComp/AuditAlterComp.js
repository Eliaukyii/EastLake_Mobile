import React from 'react';
import CanvasDraw from "react-canvas-draw";
import Command from "../commonInterface/Command"

export const ExpenseAuditAlter = (props) => {
    let checker = props.checker;
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    if (checker !== undefined) {
        if (checker.length > 30) {
            checker = checker.slice(0, 29) + '...';
        }
    }
    return (
        <div>
            <div id="printCanvas" className={`${props.PrintShow ? 'print' : 'printHide'}`} style={{ 'width': width + 'px', 'height': height + 'px' }}>
                <CanvasDraw ref={props.signCanvas} canvasWidth={width} canvasHeight={height * 0.88} />
                <div id="printCanvasBtn" className="submitBox" style={{ 'width': width + 'px', 'height': (height * 0.12) + 'px' }}>
                    <input type="text" name="repulse" className={props.status === '3' ? "hide" : "submitBtnRE"}
                        style={{ 'width': (width * 0.25) + 'px', 'height': (height * 0.1) + 'px', 'transform': 'rotate(90deg)' }}
                        value="重写" readOnly={true}
                        onClick={props.handleClearPrint}
                    />
                    <input type="text" name="audit" className={props.status === '3' ? "hide" : "submitBtnAD"}
                        style={{ 'width': (width * 0.25) + 'px', 'height': (height * 0.1) + 'px', 'transform': 'rotate(90deg)' }}
                        value="确认" readOnly={true}
                        onClick={props.handleConfirmAudit}
                    />
                    <input type="text" name="audit" className={props.status === '3' ? "hide" : "submitBtnFS"}
                        style={{ 'width': (width * 0.25) + 'px', 'height': (height * 0.1) + 'px', 'transform': 'rotate(90deg)' }}
                        value="跳过签名" readOnly={true}
                        onClick={props.handleConfirmAuditJump}
                    />
                </div>
            </div>
            <div className={`audit-pop-up ${props.auditClassName}`}>
                <div className="pop-title">
                    <span className="cancel" onClick={props.handleCancelAudit}>取消</span>
                    <span className="title">{props.title}</span>
                    <span className="confirm" onClick={Command.ApprovalSign() ? props.handleShowPrint : props.handleConfirmAuditJump}>下一步</span>
                </div>
                <div className="pop-content">
                    <span className="title">下一步</span><span title={props.checker} className="titleLeft">{checker}</span><br />
                    <textarea name="Note" className="notation-opinion"
                        onChange={props.handleChangeInput}
                        value={props.value}
                        placeholder='请填写意见批注，限50字内'
                    />
                </div>
            </div>
            <style jsx>{`
                    .audit-pop-up{
                        position:fixed;
                        height:3.2rem;
                        width:100%;
                        background:#fff;
                        bottom:-3.1rem;
                        padding:0.2rem 0.3rem;
                        z-index:99;
                        transition: bottom linear .3s;
                        -moz-transition: bottom linear .3s;
                        -webkit-transition: bottom linear .3s;
                        -o-transition: bottom linear .3s;
                    }
                    .audit-show{
                        bottom:0rem;
                    }
                    .audit-hid{
                        bottom:-3.1rem;
                    }
                    .pop-title{
                        text-align:center;
                        font-size:0.26rem;
                    }
                    .pop-title .title{
                        font-size:0.26rem;
                    }
                    .audit-pop-up .title{
                        font-weight:bold;
                    }
                    .pop-title .cancel{
                        float:left;
                        color:#ff6769;
                        display:inline-block;
                        width: auto;
                        margin-top:0;
                    }
                    .pop-title .confirm{
                        float:right;
                        color:#0084ff;
                    }
                    .pop-content{
                        margin-top:0.4rem;
                        width:100%;
                    }
                    .titleLeft{
                        position:absolute;
                        right:0.3rem;
                        font-weight:bold;
                        font-size:0.26rem;
                    }
                    .notation-opinion{
                        margin-top:0.1rem;
                        height:1.52rem;
                        width:100%;
                        border:none;
                        background:#f5f5f5;
                        border-radius:0.05rem;
                        outline:none;
                        padding:0.2rem;
                        font-size:0.26rem;
                        line-height:0.32rem;
                    } 
                    .print{
                        position : absolute ;
                        top : 0 ; 
                        left : 0 ;
                        display:inline-block;
                    }
                    .printHide{
                        display:none;
                    }
                    .submitBtnAD{
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                        position: relative;
                        text-align: center;
                        background: green;
                        border: none;
                        outline: none;
                        color:#fff;
                        width: 90%;
                        font-size: 0.28rem;
                        height: 0.6rem;
                        margin-right: 0.2rem;
                        margin-top: 0.2rem;
                    }
                    .submitBtnRE{
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                        position: relative;
                        text-align: center;
                        background: orange;
                        border: none;
                        outline: none;
                        color:#fff;
                        width: 90%;
                        font-size: 0.28rem;
                        height: 0.6rem;
                        margin-right: 0.2rem;
                        margin-top: 0.2rem;
                    }
                    .submitBtnFS{
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                        position: relative;
                        text-align: center;
                        background:#197efe;
                        border: none;
                        outline: none;
                        color:#fff;
                        width: 90%;
                        font-size: 0.28rem;
                        height: 0.6rem;
                        margin-right: 0.2rem;
                        margin-top: 0.2rem;
                    }
                    .submitBox{
                        text-align: center;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: -moz-box;
                        display:inline-block;
                        float:right;
                        width:100%;
                        height: 0.88rem;
                        position: relative;
                        border-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                        -moz-box-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                        -webkit-box-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                        align-items: center;
                        justify-content: center;
                        line-height: 0.88rem;
                        border-top: 1px solid #cdcdcd;
                        backgroud-color:white;
                    }
                `}</style>
        </div >
    )
};