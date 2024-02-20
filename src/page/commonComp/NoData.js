import React from 'react';
import {observer} from 'mobx-react';

@observer
class NoData extends React.Component{
    render(){
        return (
            <div className="no-data-block" style={{display:this.props.noData?'block':'none'}}>
                <img className="icon-noData" alt=""/><br/>
                <span>暂无数据</span>
                <style>{`
                    .no-data-block{
                        position: absolute;
                        text-align:center;
                        color:#C8C8C8;
                        font-size:0.24rem;
                        top:3rem;
                        left:0;right:0;
                    }
                `}</style>
            </div>
        );
    }
}

export default NoData;