import React from 'react'
import { Link } from "react-router-dom";
import BaseComm from "../../commonInterface/BaseComm";

export const AllowanceListItem = (props) => {
    let listData = props.listData;
    return (
        <Link to={listData.PFI_StatusName === '未开始' ?
            `/home/payAllowanceAdd?${listData.PFI_ID}` :
            `/home/payAllowanceAudit?${listData.PFI_ID}&${listData.PI_ID}&${props.listType}&${props.listData.PHStatus === '面签' ? '3' : '1'}&${listData.PFI_StatusName}&`+ BaseComm.UrlVersion()
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
                    <div className="listitem-note">{listData.Anyreason}</div>
                    <div className="listitem-item">{listData.PFI_Name}</div>
                    <div className="listitem-item">{listData.Unit}{listData.AllCourse ? `/${listData.AllCourse}` : null}{listData.YearDate ? `/${listData.YearDate}` : null}</div>
                </div>
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
        </Link>
    )
};
export const DchListItem = (props) => {
    let listData = props.listData;
    return (
        <div className="list-item list-shadow" onClick={() => props.handleClick(listData)}>
            <div className="listitem-p borderBottom">
                <label>对冲号：</label><i className="item-text">{listData.dch}</i>
            </div>
            <div className="listitem-p">
                <label>摘要：</label><i className="item-pay">{listData.zy}</i><br />
                <label>部门：</label><i className="item-pay">{listData.bmmc}</i><br />
                <label>项目：</label><i className="item-pay">{listData.xmmc}</i><br />
                <label>科目：</label><i className="item-pay">{listData.kmmc}</i><br />
                <label>单位：</label><i className="item-pay">{listData.dwmc}</i><br />
            </div>
            <div className="listitem-p borderTop">
                <label>借款金额：</label><i className="item-pay item-textMar">{listData.jje}</i>
                <label>贷款金额：</label><i className="item-pay item-textMar">{listData.dje}</i>
                <label>金额：</label><i className="item-pay">{listData.payM}</i><br />
            </div>
            <style>{`
                .item-pay{
                    position: relative;
                    line-height: 0.22rem;
                    display:inline-block;
                    vertical-align: middle;
                    color:#197efe;
                }
                .item-right{
                    position: relative;
                    float: right;
                }
                .item-textMar{
                    margin-right: 0.25rem;
                }
                .list-shadow{
                margin-bottom: 0.16rem;
                border-shadow: 0.06rem 0.06rem 0.05rem #999999;
                -moz-box-shadow: 0.06rem   0.06rem 0.05rem #999999;
                -webkit-box-shadow: 0.06rem 0.06rem 0.05rem #999999;
                }
            `}</style>
        </div>
    )
};