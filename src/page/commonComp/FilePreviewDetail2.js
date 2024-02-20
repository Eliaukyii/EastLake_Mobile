import React, { Component } from 'react';
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "./HeadTitle";
import Tips from "./TipsComp";

@observer
class FilePreviewDetail2 extends Component {
    @observable data = {
        file: '',
        title: '文件预览',
        isShowTips: false,
        tipsText: ''
    };
    state = {
        numPages: null,
        pageNumber: 1
    };

    componentDidMount = () => {
        let file = localStorage.getItem("fileUrl");
        if (file) {
            localStorage.removeItem("fileUrl");
            this.data.file = file;
        }
    };

    handleClickBack = () => {
        let backUrl = localStorage.getItem("backUrl");
        if (backUrl) {
            localStorage.removeItem("backUrl");
            window.location.href = backUrl;
        } else {
            this.props.history.go(-1);
        }
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <HeadTitle titleTxt={this.data.title} handleClickBack={this.handleClickBack} />
                    <div className="content_main">
                        <img alt="附件预览" src={this.data.file}></img>
                    </div>
                </div>
            </div>
        );
    }
}
export default FilePreviewDetail2;