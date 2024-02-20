import React from 'react'
import { Link } from "react-router-dom";
import BaseComm from "../../commonInterface/BaseComm";

export const ManageListItem = (props) => {
    let listData = props.listData;
    return (
        <Link to={`/home/payManageAudit?${listData.PFI_ID}&${listData.PI_ID}&${props.listType}&${props.listData.PHStatus === '面签' ? '3' : '1'}&${listData.PFI_StatusName}&` + BaseComm.UrlVersion()
        }>
            <div className="list-itemB list-shadow">
                <div className="list_status">
                    <span className="itemCir" style={{
                        background: listData.PFI_StatusName === '进行中' ? '#1677FF' : listData.PFI_StatusName === '已结束' ? "#13BC84" :
                            listData.PFI_StatusName === '面签' ? '#FE933D' : listData.PFI_StatusName === '未开始' ? '#F35544' : '#F35544'
                    }}>
                        {listData.PFI_StatusName}
                    </span>
                </div>
                <div className="list_content">
                    <div className="listitem-note">{listData.PayReesion}</div>
                    <div className="listitem-item">{listData.PFI_Name}</div>
                    <div className="listitem-item">{listData.BankAccID}{listData.FundIndex ? `${listData.FundIndex}` : null}{listData.CreateDate ? `/${listData.CreateDate}` : null}</div>
                </div>
                <style>{`
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