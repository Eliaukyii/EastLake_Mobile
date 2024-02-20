import React from 'react';

export const LoginInput = (props) => {
    return (
        <div className={`inputBox ${props.title ? '' : 'inputMar'}`}>
            <span className={props.iconName} style={{ display: props.iconName ? 'block' : 'none' }}></span>
            <div className='inputTit' style={{ display: props.title ? 'block' : 'none' }}>{props.title}</div>
            <input name={props.name}
                type={props.type} disabled={props.disabled}
                className={`${props.className ? props.className : ''} ${props.title ? 'inputRead' : null}`}
                placeholder={props.placeholder}
                readOnly={props.readOnly} onInput={props.handleChange}
                onClick={props.handleClick} value={props.value || ''}
                onFocus={props.handleFocus} />
            <span className={props.value !== '' && props.needClear ? "icon-clear" : "hide"} id={props.id} onClick={props.handleClickClear}></span>
            <style>{`
                    .inputBox{
                        position: relative;
                        width:100%;
                        height:0.88rem;
                    }
                    .inputMar{
                        margin-bottom: 0.2rem;
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
                        z-index:5;
                    }
                    .inputBox input{
                        width:100%;
                        position: relative;
                        display:inline-block;
                        background:#fff;
                        border: none;
                        outline: none;
                        color:#ababab;
                        font-size: 0.24rem;
                        height: 0.88rem;
                        padding-left:0.88rem;
                        padding-right: 0.28rem;
                    }
                    .inputRead{
                        text-align: end;
                        border-bottom: 1px solid #f5f5f5 !important;
                    }
                `}</style>
        </div>
    )
};

export class DetailNormal extends React.Component {
    render() {
        return (
            <div className={`detail-div ${this.props.className || ''}`}>
                <label className="detail-key">{this.props.label}</label>
                <span className={this.props.classNameS ? 'detail-valueS' : 'detail-value'}>{this.props.value}</span>
            </div>
        )
    }
}

export class DetailBold extends React.Component {
    render() {
        return (
            <div className='detail-div' style={{ display: this.props.isHide ? 'none' : 'block' }}>
                <label className="detail-keyB">{this.props.label}</label>
                <span className="detail-valueB">{this.props.value}</span>
            </div>
        )
    }
}

export class ContentInputs extends React.Component {
    render() {
        const display = this.props.display;
        const title = this.props.title;
        const divName = this.props.divName;
        const titleName = this.props.titleName;
        return (
            <div>
                <div className={`${divName ? 'ipt_other' : 'ipt_content'} ${this.props.borderBot ? '' : 'icon_conBorder'}`} style={{ display: this.props.isHide ? 'none' : 'block' }}>
                    <div className={titleName ? 'ipt_titles' : 'ipt_title'} onClick={this.props.handleShow}>
                        <span className="star" style={{ display: display }}>*</span>
                        {title}
                    </div>
                    <input id={this.props.id} name={this.props.name}
                        type={this.props.type} disabled={this.props.disabled}
                        className={`${this.props.className ? this.props.className : ''}${this.props.type === 'file' ? 'fileHide' : ''} ${this.props.inputColor ? this.props.inputColor : ''}`} placeholder={this.props.placeholder}
                        readOnly={this.props.readOnly} onChange={this.props.handleChange} onBlur={this.props.handleBlur}
                        onClick={this.props.handleClick} value={this.props.value || ''} accept={this.props.accept}
                        onFocus={this.props.handleFocus} multiple={this.props.multiple} />
                    <div className={this.props.iconName}>{this.props.price}</div>
                    <div className={this.props.type === 'file' ? 'selectBtn' : 'hide'}>请上传文件</div>
                </div>
                <div className="prompt" style={{ display: this.props.isShowPrompt ? 'block' : 'none' }}>
                    {this.props.prompt}
                </div>
                <style global jsx>{`
                    .prompt{
                        display:inline-block;
                        min-height:0.64rem;
                        background:#fff7f7;
                        position: relative;
                        top:-0.04rem;
                        width:100%;
                        line-height: 0.64rem;
                        text-align: center;
                        color:#ea5854;
                        font-size:0.24rem;
                    }
                    .ipt_content{
                        position:relative;
                        width:100%;
                        min-height:0.88rem;
                        font-size:0.3rem;
                    }
                    .icon_conBorder{
                        border-bottom: 0.01rem solid #dfdfdf;
                    }
                    .redColor{
                        color:red!important;
                    }
                    .ipt_title{
                        display:inline-block;
                        width:2rem;
                        color:#252525;
                        font-size:0.26rem;
                        // vertical-align: top;
                        height:0.88rem;
                        padding:0.18rem 0 0.18rem 0.16rem;
                    }
                    .ipt_titles{
                        display:inline-block;
                        width: 2rem;
                        height:0.88rem;
                        font-size:0.26rem;
                        padding:0.17rem 0;
                        vertical-align: top;
                        font-size:0.26rem;
                    }
                    .star{
                        position:absolute;
                        top:0.24rem;
                        left:0;
                        color:#ea5854;
                    }
                    .fileHide{
                        opacity: 0;
                    }
                    .selectBtn{
                        position: absolute;
                        left: 2rem;
                        bottom: 0;
                        height:0.88rem;
                        display:inline-block;
                        width:calc(100% - 2rem);
                        line-height:0.28rem;
                        padding:0.18rem 0;
                        color:#197efe;
                        border-radius:0;
                        font-size:0.26rem;
                        z-index:1;
                    }
                    input{
                        position: relative;
                        display:inline-block;
                        width:calc(100% - 2rem);
                        height:0.88rem;
                        padding:0.18rem 0;
                        color:#252525;
                        border: none;
                        background:none;
                        outline: none;
                        border-radius:0;
                        font-size:0.26rem;
                        vertical-align: middle;
                        z-index:5;
                    }
                    input:disabled{
                        background:#fff;
                        opacity: 1;
                    }
                    input::-webkit-input-placeholder,
                    textarea::-webkit-input-placeholder{
                        color:#cacaca;
                        line-height:normal;
                        font-size:0.26rem;
                    }
                    .icon-search{
                        position:absolute;
                        right: 0.34rem;
                        top: 0.26rem;
                        width: 0.3rem;
                        height: 0.3rem;
                        background: url(/static/img/icons/list/rn_search@2x.png) no-repeat;
                        background-size: 0.3rem 0.3rem;
                        }
                    .icon-select{
                        position:absolute;
                        right: 0.36rem;
                        top: 0.28rem;
                        width: 0.14rem;
                        height: 0.24rem;
                        font-size: 0.26rem;
                    }
                `}</style>
            </div>
        )
    }
}
export class ContentTextarea extends React.Component {
    render() {
        const display = this.props.display;
        const title = this.props.title;
        const divName = this.props.divName;
        const titleName = this.props.titleName;
        return (
            <div>
                <div className={`${divName ? 'ipt_other' : 'ipt_content'} ${this.props.borderBot ? '' : 'icon_conBorder'}`}>
                    <div className={titleName ? 'ipt_titles' : 'ipt_titleT'}>
                        <span className="star" style={{ display: display }}>*</span>
                        {title}
                    </div>
                    <textarea id={this.props.id} name={this.props.name} disabled={this.props.disabled}
                        className={this.props.className} placeholder={this.props.placeholder}
                        readOnly={this.props.readOnly} onChange={this.props.handleChange}
                        onClick={this.props.handleClick} value={this.props.value ? this.props.value : ''} />
                    <div className={this.props.iconName}></div>
                </div>
                <div className="prompt" style={{ display: this.props.isShowPrompt ? 'block' : 'none' }}>
                    {this.props.prompt}
                </div>
                <style global jsx>{`
                    .ipt_titleT{
                        display:inline-block;
                        width:2rem;
                        color:#252525;
                        font-size:0.26rem;
                        vertical-align: top;
                        min-height:1.76rem;
                        padding:0.18rem 0 0.18rem 0.16rem;
                    }
                    textarea{
                        position:relative;
                        background:none;
                        display:inline-block;
                        outline:none;
                        resize:none;
                        border:none;
                        -webkit-appearance:none;
                        width:calc(100% - 2rem);
                        min-height:1.66rem;
                        padding-top:0.18rem;
                        padding-right: 0.4rem;
                        color:#252525;
                        font-size:0.26rem;
                    }
                `}</style>
            </div>)
    }
}