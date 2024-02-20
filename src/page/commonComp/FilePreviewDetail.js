import React, { Component, Fragment, useState ,useRef } from 'react';
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "./HeadTitle";
import Tips from "./TipsComp";

// import { Document, Page } from 'react-pdf';
// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//本地加载
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

import axios from "axios";
import URL from "../../../public/api/serverAPI.config";

import drag from './drag'

import { View, Image } from 'react-native';

@observer
class FilePreviewDetail extends Component {
    @observable data = {
        file: '',
        title: '文件预览',
        isShowTips: false,
        tipsText: ''
    };
    state = {
        numPages: null,
        pageNumber: 1,
        scale: 1,
        nextColor: '#999',
        prevColor: '#999',
    };

    componentDidMount = () => {
        drag('#imgid')
        let file = localStorage.getItem("fileUrl");
        let count = localStorage.getItem('count')
        if (file) {
            this.data.file = file;
            this.setState({
                numPages: count
            })
            if (count > 1) {
                this.setState({
                    nextColor: '#197efe'
                })
            }
        }
    };
    //下一页
    nextPage = () => {
        // debugger
        if (this.state.pageNumber < this.state.numPages) {
            this.setState({
                nextColor: '#197efe',
                prevColor: '#197efe'
            })
            const idx = this.state.pageNumber + 1
            this.setState({
                pageNumber: idx
            })
            let json = {
                At_ID: localStorage.getItem('At_ID'),
                Search: idx
            }
            localStorage.setItem('idx', json.Search)
            axios({
                url: URL.histCommon1,
                params: {
                    type: 'GetFilePreview',
                    Search: idx,
                    json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json)))),
                },
                method: 'get'
            }).then(res => {
                let data = decodeURIComponent(escape(window.atob(res.data)));
                let obj = eval('(' + data + ')');
                this.data.file = obj.data
            })
        } else {
            if (this.state.pageNumber === 1) {
                this.setState({
                    prevColor: '#999',
                    nextColor: '#999',
                })
            } else {
                this.setState({
                    prevColor: '#197efe',
                    nextColor: '#999',
                })
            }
            this.data.isShowTips = true;
            this.data.tipsText = '当前是最后一页！';
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
        }
    }
    //  //上一页
    previousPage = () => {
        // debugger
        if (this.state.pageNumber > 1) {
            this.setState({
                prevColor: '#197efe',
                nextColor: '#197efe'
            })
            const idx = this.state.pageNumber - 1
            this.setState({ pageNumber: idx })
            let json = {
                At_ID: localStorage.getItem('At_ID'),
                Search: idx
            };
            localStorage.setItem('idx', json.Search)
            if (idx === 1) {
                json.Search = ''
            }
            axios({
                url: URL.histCommon1,
                params: {
                    type: 'GetFilePreview',
                    Search: json.Search,
                    json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json)))),
                },
                method: 'get'
            }).then(res => {
                let data = decodeURIComponent(escape(window.atob(res.data)));
                let obj = eval('(' + data + ')');
                this.data.file = obj.data
            })
        } else {
            if (this.state.pageNumber === 1) {
                this.setState({
                    prevColor: '#999',
                    nextColor: '#999'
                })
                if (this.state.numPages > 1) {
                    this.setState({
                        prevColor: '#999',
                        nextColor: '#197efe'
                    })
                }
            }
            this.data.isShowTips = true;
            this.data.tipsText = '当前是第一页！';
            setTimeout(() => {
                this.data.isShowTips = false;
                this.data.tipsText = '';
            }, 1000);
        }
    }
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
        const { numPages, pageNumber } = this.state;
        return (
            <div className="wrapper">
                <script type="text/javascript" src="./hammer.min.js"></script>
                
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <HeadTitle titleTxt={this.data.title} handleClickBack={this.handleClickBack} />
                    <div className="content_main" onClick={this.handleClick}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}>
                        <Image
                            ref={this.myRef}
                            draggable='true'
                            source={this.data.file}
                            id="imgid" 
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            resizeMode='contain' />
                    </div>
                </div>
                <div className='submitBox'>
                    <div className="pageEnd">
                        第 {pageNumber || (numPages ? 1 : '--')} 至 {numPages || '--'}页
                    </div>
                    <input type="text" name="audit" className="submitBtn btn-marginR"
                        value="上一页" readOnly={true}
                        onClick={this.previousPage}
                        style={{
                            backgroundColor: this.state.prevColor
                        }}
                    />
                    <input type="text" className="submitBtn"
                        value="下一页" readOnly={true}
                        onClick={this.nextPage}
                        style={{
                            backgroundColor: this.state.nextColor
                        }}
                    />
                </div>
                <style>{`
                    .submitBox{
                        display: -webkit-flex;
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
                        position: relative;
                        text-align: center;
                        background:#999;
                        border: none;
                        outline: none;
                        color:#fff;
                        width: 90%;
                        font-size: 0.28rem;
                        height: 0.6rem;
                    }
                    .btn-marginR{
                        margin-right: 0.28rem;
                    }
                    .pageEnd{
                        position: relation;
                        bottom:0;
                        width:100%;
                        text-align: center;
                        color:#197efe;
                    }
                `}</style>
            </div>
        );
    }
}
export default FilePreviewDetail;