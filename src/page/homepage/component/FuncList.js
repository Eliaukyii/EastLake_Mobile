import React from 'react'
import {Link} from "react-router-dom";

const FuncList =(props)=> {
    let listData = props.listData;
    let date,tim,url;
    if (listData.CreateDate){
        let num = listData.CreateDate.indexOf("T");
        date = listData.CreateDate.slice(0,10);
        tim = listData.CreateDate.slice(11);
    }
    let itemTypeBorrow = parseInt(listData.PFI_Name.indexOf("借支"));
    let itemTypeExpense = parseInt(listData.PFI_Name.indexOf("报销"));
    let itemTypeAllowance = parseInt(listData.PFI_Name.indexOf("往来"));
    let itemTypePay = parseInt(listData.PFI_Name.indexOf("薪酬"));
    let itemTypeTxt,itemTypeColor;
    if (itemTypeBorrow > -1) {
        itemTypeTxt = listData.PFI_Name.slice(itemTypeBorrow,itemTypeBorrow+2);
        itemTypeColor = 'borrowCol';
        url = `/home/payBorrowAudit?${listData.PFI_ID}&${listData.PI_ID}&3`;
    }
    if (itemTypeExpense > -1) {
        itemTypeColor = 'expenseCol';
        itemTypeTxt = listData.PFI_Name.slice(itemTypeExpense,itemTypeExpense+2);
        url = `/home/payExpenseAudit?${listData.PFI_ID}&${listData.PI_ID}&3`;
    }
    if (itemTypeAllowance > -1) {
        itemTypeColor = 'allowanceCol';
        itemTypeTxt = listData.PFI_Name.slice(itemTypeAllowance,itemTypeAllowance+2);
        url = `/home/payAllowanceAudit?${listData.PFI_ID}&${listData.PI_ID}&3`;
    }
    if (itemTypePay > -1) {
        itemTypeColor = 'payCol';
        itemTypeTxt = listData.PFI_Name.slice(itemTypePay,itemTypePay+2);
        url = `/home/payManageAudit?${listData.PFI_ID}&${listData.PI_ID}&3`;
    }
        return(
            <Link to={url}>
                <div className="funcList">
                    <div className="list_status">
                        <div className={`itemCir ${itemTypeColor}`}>
                            {itemTypeTxt}
                        </div>
                    </div>
                    <div className="list_content">
                        <div className="listitem-note">{listData.PFI_Name}</div>
                        <div className="listitem-item">{date + "  " +tim}</div>
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
                    .borrowCol{
                        background-color: #1677FF;
                    }
                    .expenseCol{
                        background-color: #FE933D;
                    }
                    .allowanceCol{
                        background-color: #13BC84;
                    }
                    .payCol{
                        background-color: #F35544;
                    }
                    .funcList{
                        width: 100%;
                        min-height: 0.88rem;
                        background: #fff;
                        border-bottom: 1px solid #f5f5f5;
                        padding: 0.28rem;
                        display: -webkit-flex;
                        display: flex;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                    }
                    .titMar{
                        margin-right: 0.3rem;
                        color: #333333;
                    }
                `}</style>
            </Link>
        )
    }
export default FuncList;