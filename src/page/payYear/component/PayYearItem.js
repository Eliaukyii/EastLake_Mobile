import React from 'react'
import { observer } from 'mobx-react'
import { number_format } from '../../config/commonCheck'
import { DetailBold } from "../../commonComp/InputComp";

export const YearDetailItem = (props) => {
    const item = props.item;
    return (
        <div className="wrapper">
        <div className="wrapper-detail colorAddBG">
            <div className="spaceG" />
            <div className="content_mainS">
            
                <div className="content_mainDetail">
                <DetailBold label="计算口径1"/>
                    <DetailBold label="工资(含津贴、补贴)" value={number_format(item.PayM1, 2)}/>
                    <DetailBold label="奖金" value={number_format(item.PayM2, 2)}/>
                    <DetailBold label="其他" value={number_format(item.PayM3, 2)}/>
                    <DetailBold label="合计" value={number_format(item.Total, 2)}/>
                </div>
            </div>
            <div className="spaceG" />
            <div className="content_mainS">
           
            <div className="content_mainDetail">
            <DetailBold label="计算口径2"/>
                    <DetailBold label="年个人应发工资" value={number_format(item.PayM4, 2)}/>
                    <DetailBold label="年个人实发工资" value={number_format(item.PayM5, 2)}/>
                    <DetailBold label="公积金(单位+个人)" value={number_format(item.PayM3, 2)}/>
                </div>
            </div>
        </div>
        <style>{`
                    .detail-keyB{
                        width:2.5rem;
                    }
                    .detail-valueB{
                        width:calc(100% - 2.5rem);
                    }
                `}</style>
    </div>
    )
};

@observer
export class MonthDetailItem extends React.Component {
    render() {
        const item = this.props.item;
        const childShow = this.props.childShow;
        return (
            <div className="list-itemB">
                <div className="list-tab">
                    <div className="listTab">
                        <div>{item.ColName}</div>
                        <span>{item.PayM}</span>
                    </div>
                    {item.Child ? item.Child.map(item => {
                        return <div key={item.ColCode} className={`listTabTit ${childShow ? 'show' : 'hide'}`}>
                            <div>{item.ColName}</div>
                            <span>{item.PayM}</span>
                        </div>
                    }) : null}
                    {item.Child ? item.Child.map(itemB => (
                        itemB.Child ? itemB.Child.map(item => {
                            return <div key={item.ColCode} className={`listsTabTit ${childShow ? 'show' : 'hide'}`}>
                                <div>{item.ColName}</div>
                                <span>{item.PayM}</span>
                            </div>
                        }) : null
                    )) : null}
                </div>
                <style>{`
                    .list-tab{
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        width:100%;
                        font-size: 0.28rem;
                        -webkit-flex-direction:column;
                        flex-direction: column;
                    }
                    .listTab{
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                    }
                    .listTab div{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        height: 0.28rem;
                        align-items: center;
                    }
                    .listTabTit{
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                        color: #E79627;
                    }
                    .listsTabTit{
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                        color: #197efe;
                    }
                    .listTabTit div{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        height: 0.8rem;
                        align-items: center;
                    }
                    .listsTabTit div{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        height: 0.5rem;
                        align-items: center;
                    }
                    .listTabTit span{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        height: 0.8rem;
                        align-items: center;
                        justify-content: flex-end;
                    }
                    .listsTabTit span{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        height: 0.5rem;
                        align-items: center;
                        justify-content: flex-end;
                    }
                    .detail-btn{
                        outline:none;
                        border: none;
                        width:80%;
                        height: 0.6rem;
                        line-height: 0.6rem;
                        background: lightgreen;
                        color: #fff;
                        border-radius:3px;
                    }
                `}</style>
            </div>
        )
    }
}

@observer
export class MonthDetailsItem extends React.Component {
    render() {
        const item1 = this.props.item;
        const childShow = this.props.childShow;
        return (
            <div className="list-itemB">
                <div className="list-tabs">
                    <div className="listTab">
                        <div>{item1.ColName}</div>
                        <span>{item1.PayM}</span>
                    </div>
                    {item1.Child ? item1.Child.map(item => {
                        return <div key={item.ColCode} className={`listTabTit ${childShow ? 'show' : 'hide'}`}>
                            <div>{item.ColName}</div>
                            <span>{item.PayM}</span>
                        </div>
                    }) : null}
                    {item1.Child ? item1.Child.map(itemB => (
                        itemB.Child ? itemB.Child.map(item => {
                            return <div key={item.ColCode} className={`listsTabTit ${childShow ? 'show' : 'hide'}`}>
                                <div>{item.ColName}</div>
                                <span>{item.PayM}</span>
                            </div>
                        }) : null
                    )) : null}
                </div>
                <style>{`
                    .list-tab{
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        width:100%;
                        font-size: 0.28rem;
                        -webkit-flex-direction:column;
                        flex-direction: column;
                    }
                    .list-tabs{
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-flex: 2;
                        -webkit-flex: 2;
                        flex: 2;
                        width:100%;
                        font-size: 0.28rem;
                        -webkit-flex-direction:column;
                        flex-direction: column;
                    }
                    .listTab{
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                    }
                    .listTabTit{
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                        color: #E79627;
                    }
                    .listsTabTit{
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                        color: #197efe;
                    }
                    .listTab div{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        min-height: 0.8rem;
                        align-items: center;
                    }
                    .listTabTit div{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        min-height: 0.8rem;
                        align-items: center;
                    }
                    .listsTabTit div{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        min-height: 0.5rem;
                        align-items: center;
                    }
                    .listTabTit span{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        height: 0.8rem;
                        align-items: center;
                        justify-content: flex-end;
                    }
                    .listsTabTit span{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        height: 0.5rem;
                        align-items: center;
                        justify-content: flex-end;
                    }
                    .detail-btn{
                        outline:none;
                        border: none;
                        width:80%;
                        height: 0.6rem;
                        line-height: 0.6rem;
                        background: lightgreen;
                        color: #fff;
                        border-radius:3px;
                    }
                `}</style>
            </div>
        )
    }
}

@observer
export class AllowanceItem extends React.Component {
    render() {
        const item1 = this.props;
        return (
            <div>
                <div className="listTab">
                    <div>{item1.Title}</div>
                    <div>{item1.DeptName}</div>
                    <div>{item1.ColName}</div>
                    <div>{item1.Money}</div>
                </div>
                <style>{`
                    .listTab{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                        width:100%;
                        height: 1.5rem;
                        padding: 0.28rem;
                        border-bottom: 1px solid #cdcdcd;
                        background: #fff;
                        align-items: center;
                    }
                    .listTab div{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        font-size: 0.22rem;
                        align-items: center;
                        padding-left: 0.1rem;
                        justify-content: flex-end;
                    }
                `}</style>
            </div>
        )
    }
}
