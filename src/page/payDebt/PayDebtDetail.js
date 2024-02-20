import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { HeadTitle } from "../commonComp/HeadTitle";
import { DetailBold } from "../commonComp/InputComp";
import { SubmitBtn } from "../commonComp/SubmitBtnComp";
import axios from "axios";
import URL from "../../../public/api/serverAPI.config";
import Tips from "../commonComp/TipsComp";
import BaseComm from "../commonInterface/BaseComm";

@observer
class PayBorrowAdd extends React.Component {
    @observable data = {
        userid: '',
        userInfo: [],
        type: 'AddAnysingle',
        money: '',
        msg: '',
        list: [],
        tipsText: '',
        isShowTips: false,
        fileArr: []
    };
    constructor(props) {
        super(props);
        this.state = {
            overflow: 'scroll'
        };
    }

    componentDidMount = async () => {
        this.data.userid = BaseComm.GetLoginID();
        this.data.userInfo = BaseComm.GetLoginInfo();
        //获取欠款详情
        axios({
            url: URL.histBorrow,
            params: {
                type: 'GetAnysingleOther',
                userid: this.data.userid
            },
            method: 'post'
        }).then(res => {
            var json;
            if (typeof (res.data) == "string") {
                json = JSON.parse(res.data);
            } else {
                json = res.data;
            }
            this.data.money = json.PayM;
            this.data.list = json.list;
            if (this.data.money > 0) {
                this.data.msg = "请及时还款";
            } else if (this.data.money == -1) {
                this.data.msg = "查询还款数据失败";
            } else {
                this.data.msg = "没有待还款";
            }
        }).catch(reason => {
            console.log(reason);
        });
    };


    handleClickBack = () => {
        this.props.history.go(-1);
    };

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-detail colorAddBG">
                    <Tips text={this.data.tipsText} isShow={this.data.isShowTips} />
                    <HeadTitle titleTxt="个人欠款查询" handleClickBack={this.handleClickBack} />
                    <div className="spaceG" />
                    <div className="content_mainS">
                        <div className="content_mainDetail">
                            <DetailBold label="查询人员" value={this.data.userInfo.userName} />
                            <DetailBold label="查询结果" value={this.data.msg} />
                            <DetailBold label="待还款" value={this.data.money} />
                        </div>
                    </div>
                    <div className="spaceG" />
                    <div className="content_mainS">
                        <div className="content_mainDetail">
                            {this.data.list ? this.data.list.map((e, i) => (
                                <div>
                                    <DetailBold label="对冲号" value={e.dch} />
                                    <DetailBold label="借款金额" value={e.AdvMoney} />
                                    <DetailBold label="已还金额" value={e.RepaySum} />
                                    <DetailBold label="待还金额" value={e.DebtMoney} />
                                    <DetailBold label={e.kjnd + '年' + e.kjnd + '月'} value={e.zy} />
                                </div>
                            )) : null}
                        </div>
                    </div>
                </div>
                <style>{`
                    body{
                        overflow-y:${this.state.overflow};
                    }
                    .main_closed{
                        height:0
                        overflow:hidden;
                    }
                    .main_opened{
                        height:auto;
                        overflow:initial;
                    }
                `}</style>
            </div>
        )
    }
}
export default PayBorrowAdd;