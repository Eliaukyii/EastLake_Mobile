import React from 'react';
import {Link} from "react-router-dom";

export const NoticeListItem =(props)=>{
    let listData = props.listData;
    if (listData.content !== undefined){
        if (listData.content.length>100){
            listData.content = listData.content.slice(0,100)+'......';
        }
    }
        return(
            <Link to={`/home/noticeDetail?${listData.aid}`}>
                <div className="list-item">
                    <div className="listitem boldTxt">{listData.title}</div>
                    <div className={listData.content?'listitem-p item-text':'hide'}>
                        {listData.content}
                    </div>
                    <style>{`
                    .listitem{
                        color:#555;
                        position:relative;
                        font-size:0.26rem;
                        padding:0.1rem 0.3rem;
                    }
                    .item-text{
                        color:#9d9d9d;
                    }
            `}</style>
                </div>
            </Link>
        )
};