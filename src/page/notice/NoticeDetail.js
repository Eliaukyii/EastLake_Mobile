import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import axios from "axios";
import Tips from "../commonComp/TipsComp";
import { DetailNormal } from "../commonComp/InputComp";
import URL from "../../../public/api/serverAPI.config";
import BaseComm from "../commonInterface/BaseComm";

@observer
class NoticeDetail extends React.Component {
    @observable data = {
        type: 'ArticleDetail',
        userid: '',
        params: {
            aid: ''
        },
        noticeDetail: [],
        isShowFilter: false,
        tipsText: '',
        isShowTips: false
    };

    constructor(props) {
        super(props);
        this.state = {
            overflow: 'scroll'
        };
    }

    componentDidMount() {
        this.data.userid = BaseComm.GetLoginID();
        let code = this.props.location.search;
        code = code.slice(1);
        this.getDetail(code);
    }

    handleClickBack = () => {
        window.history.go(-1);
    };
    //获取详情
    getDetail = (aid) => {
        let json = {
            aid: aid
        };
        axios({
            url: URL.histLogin,
            params: {
                type: this.data.type,
                userid: this.data.userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'post'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            if (obj.status === '00') {
                this.data.noticeDetail = obj.data;
                this.input.innerHTML = this.data.noticeDetail.Contents || "";
            } else {
                this.data.tipsText = obj.msg;
                this.data.isShowTips = true;
                setTimeout(() => {
                    this.data.isShowTips = false;
                    this.data.tipsText = '';
                }, 1000);
            }
        }).catch(reason => {
            console.log(reason);
        });
    };


    render() {
        const detail = this.data.noticeDetail;
        return (
            <div className="wrapper">
                <div className="wrapper-detail">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <HeadTitle titleTxt="公告详情" handleClickBack={this.handleClickBack} />
                    <div className="content_main">
                        <DetailNormal label="标题" value={detail.Titles} />
                        <DetailNormal label="关键字" value={detail.KeyWards} />
                        <div className='detail-div'>
                            <label className="detail-key">内容:</label>
                            <div ref={input => { this.input = input }}>
                            </div>
                        </div>
                        <div className='detailBorder borderTop'>
                            <DetailNormal className='detailMarTop' classNameS={true} label="作者" value={detail.Authors} />
                            <DetailNormal classNameS={true} label="来源" value={detail.Froms} />
                            <DetailNormal classNameS={true} label="创建时间" value={detail.CreateDate} />
                        </div>
                    </div>
                </div>
                <style>{`
                    body{
                        overflow-y:${this.state.overflow};
                    }
                    .detail-key,.detail-valueS{
                        color:#888888;
                        font-size: 0.22rem;
                        min-height: 0.4rem;
                    }
                `}</style>
            </div>
        )
    }
}
export default NoticeDetail;