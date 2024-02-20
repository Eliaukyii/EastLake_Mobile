import React from 'react'

export const HeadTitle = (props) => {
    return (
        <div className="headBox">
            <span className={`icon-headBack ${props.showBackBtn ? 'hide' : 'show'}`} onClick={props.handleClickBack} />
            <span className="headTit">{props.titleTxt}</span>
            {props.btnSelect ?
                <span className={`headAdd ${props.showDelBtn ? 'show' : 'hide'}`} onClick={props.handleClickDel}>删除</span> :
                <span className={`headAdd ${props.showAddBtn ? 'show' : 'hide'}`} onClick={props.handleClickAdd}>新增</span>}
            <style>{`
                    .headBox{
                        position: relation;
                        width: 100%;
                        height:0.88rem;
                        z-index: 50;
                        text-align: center;
                        background: #197EFE;
                    }
                    .headTit{
                        line-height: 0.88rem;
                        height: 0.88rem;
                        font-size: 0.32rem;
                        color: #fff;
                    }
                    .headAdd{
                        position: absolute;
                        top: 0;
                        right: 0.36rem;
                        line-height: 0.88rem;
                        height: 0.88rem;
                        font-size: 0.26rem;
                        color: #fff;
                    }
                `}</style>
        </div>
    )
};

export class ContentHead extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className="content-head" onClick={this.props.handleClickBack}>
                <div className="content-head-text">{this.props.title}
                    <div id={this.props.iconNameh} />
                </div>
                <style jsx>{`
                .content-head{
                    position:relative;
                    width:100%;
                    height:0.72rem;
                    line-height:0.72rem;
                    background:#f5f5f5;
                    color:#252525;
                    padding:0 0.34rem;
                    font-weight:550;
                    font-size:0.32rem;
                }
                .content-head-text{
                    font-weight:550;
                }
                #icon-back2{
                    position:absolute;
                    right:0.3rem;
                    top: 0.3rem;
                    width: 0.3rem;
                    height: 0.3rem;
                    background: url(/src/img/list/rn_window_back2@2x.png) no-repeat;
                    background-size: 0.2rem 0.12rem;
                }
                #icon-back3{
                    position:absolute;
                    right:0.3rem;
                    top: 0.24rem;
                    width: 0.3rem;
                    height: 0.3rem;
                    background: url(/src/img/list/rn_window_back3@2x.png) no-repeat;
                    background-size: 0.2rem 0.12rem;
                }
            `}</style>
            </div>
        )
    }
}