import React from 'react'
import { Link } from "react-router-dom";
import BaseComm from "../../commonInterface/BaseComm";

export const AllocationListItem = (props) => {
    let listData = props.listData;
    return (
        <Link to={listData.Status === 0 ?
            `/home/payAllocationAdd?${listData.IA_ID}&` + BaseComm.UrlVersion() :
            `/home/payAllocationAudit?${listData.IA_ID}&${listData.Status}&` + BaseComm.UrlVersion()
        }>
            <div className="list-itemB">
                <div className="list_status">
                    <span className="itemCir" style={{ background: listData.Status === 1 ? '#1677FF' : listData.Status === 2 ? "#13BC84" : listData.Status === 0 ? '#F35544' : '#F35544' }}>
                        {listData.Status === 0 ? '未提交' : listData.Status === 1 ? '未审批' : listData.Status === 2 ? '已完成' : listData.Status}
                    </span>
                </div>
                <div className="list_content">
                    <div className="listitem-note">{listData.IA_Type === 0 ? '调整预算' : listData.IA_Type === 1 ? '年初预算' : listData.IA_Type === 2 ? '结转预算' : listData.IA_Type}({listData.IA_Num})</div>
                    <div className="listitem-item">{listData.IA_Note}</div>
                    <div className="listitem-item">{listData.AccountNum}</div>
                    <div className="listitem-item">{`${listData.IA_Money} 元`}{listData.CreateUser ? `/${listData.CreateUser}` : null}{listData.CreateTime ? `/${listData.CreateTime.slice(0, 10)}` : null}</div>
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