import React from 'react'
import {observer} from "mobx-react";


@observer
class SetFunc extends React.Component{

    render(){
        return (
            <div>
                <div className="func_list">
                    <span className='iconfont icon_user'>&#xe848;</span>
                    <div className='inputTit'>{this.props.title}</div>
                    <div className='func_box'>
                        <div className="swich" style={{display:this.props.showSwich?'block':'none'}}>
                            <div className={this.props.openSwich?'boxOn':'box'} onClick={this.props.handleClick}>
                                <div className={this.props.openSwich?'boxOnSpan':'boxSpan'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .func_list{
                        position: relative;
                        width: 100%;
                        height:0.88rem;
                        background-color: #fff;
                        padding-left:0.88rem;
                        padding-right: 0.28rem;
                    }
                    .inputTit{
                        position: absolute;
                        top:0.28rem;
                        left: 1rem;
                        font-size: 0.26rem;
                        color: #333333;
                        letter-spacing: 0.27px;
                        text-align: center;
                        line-height: 0.26rem;
                    }
                    .func_list span{
                        width: 1.65rem;
                        height: 0.3rem;
                        line-height: 0.3rem;
                        color: #000;
                        font-size: 0.26rem;
                        font-family: "黑体";
                    }
                    .func_box{
                        position:relative;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: -moz-box;
                        display: flex;
                        -webkit-flex-direction:column;
                        flex-direction: column;
                        align-items: flex-end;
                        justify-content: center;
                        width:100%;
                        height: 0.88rem;
                    }
                    .swich{
                        position:relative;
                        width:0.8rem;
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
                `}</style>
            </div>
        )
    }
}
export default SetFunc
