import React from 'react'
import { Link } from "react-router-dom";
import BaseComm from "../../commonInterface/BaseComm";

export const DelegateListItem = (props) => {
    let listData = props.listData;
    return (
        <Link to={listData.Status === 0 ?
            `/home/payDelegateAdd?${listData.IC_ID}&` + BaseComm.UrlVersion() :
            `/home/payDelegateAudit?${listData.IC_ID}&${listData.ItemID}&${listData.Status}&` + BaseComm.UrlVersion()
        }>
            <div className="list-itemB">
                <div className="list_status">
                    <span className="itemCir" style={{ background: listData.Status === 1 ? '#1677FF' : listData.Status === 2 ? "#13BC84" : listData.Status === 0 ? '#F35544' : '#F35544' }}>
                        {listData.Status === 0 ? '未提交' : listData.Status === 1 ? '未审批' : listData.Status === 2 ? '已完成' : listData.Status}
                    </span>
                </div>
                <div className="list_content">
                    <div className="listitem-note">{listData.IC_Type === 0 ? '调整预算' : listData.IC_Type === 1 ? '年初预算' : listData.IC_Type === 2 ? '结转预算' : listData.IC_Type}({listData.IC_Num})</div>
                    <div className="listitem-item">{listData.IC_Note}</div>
                    <div className="listitem-item">{`${listData.IC_Money} 元`}{listData.CreateUser ? `/${listData.CreateUser}` : null}{listData.CreateTime ? `/${listData.CreateTime.slice(0, 10)}` : null}</div>
                </div>
                <style>{`
                .pay-note{
                    font-size: 0.28rem;
                    color:#333;
                }
                .listitem-note{
                    font-size: 0.28rem;
                    color:#333;
                    margin-bottom: 0.1rem;
                }
                .listitem-item{
                    font-size: 0.24rem;
                    color:#9d9d9d;
                }
            `}</style>
            </div>
        </Link>
    )
};