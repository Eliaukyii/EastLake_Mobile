import React from 'react'
import Command from "../commonInterface/Command"

class AuditProcess extends React.Component {

    render() {
        let processList = this.props.processList;
        return (
            <div className="processBox">
                <div className="processTit">
                    <div className="processTxt">流程记录</div>
                    <div className="processBtn" onClick={this.props.handleClick}><div className="showBtn">{this.props.isShow ? '-收起' : '+展开'}</div></div>
                </div>
                <div className={`processLine ${this.props.isShow ? 'show' : 'hide'}`}>
                    <div className="processName">名称</div>
                    <div className="processStatus" style={{ display: `${Command.ApprovalSign() ? 'block' : 'none'}` }}>签名</div>
                    <div className="processUserID">操作人</div>
                    <div className="processTime">时间</div>
                    <div className="processNote">备注</div>
                </div>
                {processList ? processList.map((item, index) => (
                    <div className={`processLine ${this.props.isShow ? 'show' : 'hide'}`} key={index}>
                        <div className="processName">{item.AI_Name}</div>
                        <div className="processStatus" style={{ display: `${Command.ApprovalSign() ? 'block' : 'none'}` }}><img className={item.signImg == '' ? 'hide' : item.signImg == null ? 'hide' : 'show'} src={item.signImg} alt="签名" style={{ width: '50px', height: '30px' }}></img>
                        </div>
                        <div className="processUserID">{item.AI_UserID}</div>
                        <div className="processTime">{item.EndTime ? item.EndTime.slice(0, 10) + "\n" + item.EndTime.slice(11) : ""}</div>
                        <div className="processNote">{item.Note}</div>
                    </div>
                )) : null}
                <style>{`
                    .processBox{
                        position: relative;
                        width: 100%;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        -webkit-flex-direction:column;
                        flex-direction: column;
                        color:#333;
                        font-size:0.28rem;
                        margin-bottom: 0.2rem;
                    }
                    .processLine{
                        position: relative;
                        width: 100%;
                        min-height: 0.48rem;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                        color:#333;
                        font-size:0.22rem;
                    }
                    .processTit{
                        position: relative;
                        width: 100%;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                        color:#333;
                        line-height: 0.4rem;
                    }
                    .processTxt{
                        position: relative;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                        color:#333;
                        position:relative;
                    }
                    .processBtn{
                        position: relative;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                        color:#197efe;
                        position:relative;
                        font-size:0.26rem;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        justify-content: flex-end;
                    }
                    .showBtn{
                        position: relative;
                        width:30%;
                        background-color: #197efe;
                        color:#fff;
                        text-align:center;
                        border-radius: 0.08rem;
                    }
                    .processName{
                        position: relative;
                        -webkit-box-flex: 3.5;
                        -webkit-flex: 3.5;
                        flex:3.5;
                        color:#333;
                        position:relative;
                        font-size:0.22rem;
                        border: 1px solid #9d9d9d;
                        margin-left:-1px;
                        margin-top:-1px;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .processStatus{
                        position: relative;
                        -webkit-box-flex: 3;
                        -webkit-flex: 3;
                        flex:3;
                        color:#333;
                        position:relative;
                        font-size:0.22rem;
                        border: 1px solid #9d9d9d;
                        margin-left:-1px;
                        margin-top:-1px;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .processUserID{
                        position: relative;
                        -webkit-box-flex: 3;
                        -webkit-flex: 3;
                        flex:3;
                        color:#333;
                        position:relative;
                        font-size:0.22rem;
                        border: 1px solid #9d9d9d;
                        margin-left:-1px;
                        margin-top:-1px;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .processTime{
                        position: relative;
                        -webkit-box-flex: 5;
                        -webkit-flex: 5;
                        flex:5;
                        color:#333;
                        position:relative;
                        font-size:0.22rem;
                        border: 1px solid #9d9d9d;
                        margin-left:-1px;
                        margin-top:-1px;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .processNote{
                        position: relative;
                        -webkit-box-flex: 5;
                        -webkit-flex: 5;
                        flex:5;
                        color:#333;
                        position:relative;
                        font-size:0.22rem;
                        border: 1px solid #9d9d9d;
                        margin-left:-1px;
                        margin-top:-1px;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        align-items: center;
                        justify-content: center;
                    }
                `}</style>
            </div>
        )
    }
}
export default AuditProcess;