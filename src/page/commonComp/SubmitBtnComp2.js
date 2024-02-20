import React from 'react'

export const SubmitBtn = (props) => {
    return (
        <div className={props.isBtnHide ? "hide" : "submitBox"}>
            <input type="text" className="submitBtn"
                value={props.value} readOnly={true}
                onClick={props.handleClick}
            />
            <style jsx>{`
            .submitBox{
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: -moz-box;
                display: flex;
                width:100%;
                height: 0.88rem;
                position: relative;
                border-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                -moz-box-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                -webkit-box-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                align-items: center;
                justify-content: center;
                line-height: 0.88rem;
            }
            .submitBtn{
                width:100%;
                position: relative;
                text-align: center;
                display:inline-block;
                background:#197efe;
                border: none;
                outline: none;
                color:#fff;
                font-size: 0.3rem;
                height: 0.88rem;
                }
          `}</style>
        </div>
    )
};

export const OutLoginBtn = (props) => {
    return (
        <div className="outLoginBox">
            <input type="text" className="outLoginBtn"
                value={props.value} readOnly={true}
                onClick={props.handleClick}
            />
            <style jsx>{`
            .outLoginBox{
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: -moz-box;
                display: flex;
                width:100%;
                height: 0.88rem;
                position: relative;
                align-items: center;
                justify-content: center;
                line-height: 0.88rem;
                margin-top: 0.2rem;
            }
            .outLoginBtn{
                width:100%;
                position: relative;
                text-align: center;
                display:inline-block;
                background:#fff;
                border: none;
                outline: none;
                font-family: PingFangSC-Regular;
                font-size: 0.27rem;
                color: #333333;
                letter-spacing: 0.29px;
                text-align: center;
                height: 0.88rem;
            }
          `}</style>
        </div>
    )
};

export const TwoSelectBtn = (props) => {
    return (
        <div className='submitBox'>
            <input type="text" className="submitBtn"
                value="保存" readOnly={true}
                onClick={props.handleClickSave}
            />
            <input type="text" className="submitBtn"
                value="提交" readOnly={true}
                onClick={props.handleClickSubmit}
            />
            <style>{`
                .submitBox{
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
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
                    padding: 0 0.28rem;
                }
                .submitBtn{
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
                }
          `}</style>
        </div>
    )
};

export const AuditBtn = (props) => {
    return (
        <div className={`submitBox ${props.isBtnHide ? "hide" : "show"}`}>
            <input type="text" name="audit" className={props.status === '3' ? "hide" : "submitBtnAD"}
                value="通过" readOnly={true}
                onClick={props.handleClickAudit}
            />
            <input type="text" name="repulse" className={props.status === '3' ? "hide" : "submitBtnRE"}
                value="打回" readOnly={true}
                onClick={props.handleClickAudit}
            />
            <input type="text" name="reject" className={props.status === '3' ? "hide" : "submitBtnRJ"}
                value="拒绝" readOnly={true}
                onClick={props.handleClickAudit}
            />
            <style>{`
                .submitBox{
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
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
                    padding: 0 0.28rem;
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
                }
                .submitBtnRJ{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    flex:1;
                    position: relative;
                    text-align: center;
                    background: red;
                    border: none;
                    outline: none;
                    color:#fff;
                    width: 90%;
                    font-size: 0.28rem;
                    height: 0.6rem;
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
                }
                .submitBtnUL{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    flex:1;
                    position: relative;
                    text-align: center;
                    background: #197efe;
                    border: none;
                    outline: none;
                    color:#fff;
                    width: 90%;
                    font-size: 0.28rem;
                    height: 0.6rem;
                }
          `}</style>
        </div>
    )
};

export const AddProject = (props) => {
    return (
        <div className="addProject">
            {props.currDel === 1 ?
                <div className='addBtn colorRed' onClick={props.handleClickDel}>
                    <div className="addBtn_text">删除项目</div>
                </div> :
                <div className='addBtn' onClick={props.handleClickAdd}>
                    <div className="icon_add" />
                    <div className="addBtn_text">添加项目</div>
                </div>
            }
            <style>{`
                .addProject{
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    position:relation;
                    padding-top: 0.2rem;
                    background:#F2F2F2;
                    width: 100%;
                    -webkit-flex-direction:column;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .addBtn{
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    position:relation;
                    width: 100%;
                    background:#fff;
                    -webkit-flex-direction:row;
                    flex-direction: rwo;
                    justify-content: center;
                    align-items: center;
                    min-height: 0.88rem;
                    font-size: 0.3rem;
                    color: #197efe;
                }
                .colorRed{
                    color: #F35544 !important;
                }
            `}</style>
        </div>
    )
};