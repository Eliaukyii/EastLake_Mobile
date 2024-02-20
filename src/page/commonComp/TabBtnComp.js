import React from 'react';
import { observer } from 'mobx-react'

@observer
class ListTab extends React.Component {
    render() {
        return (
            <div className={`list-tab ${this.props.showTab ? 'hide' : 'show'}`}>
                <ul>
                    {this.props.tabData.map((tab, index) => (
                        <li key={tab.tabIndex} id={tab.id} tabIndex={tab.tabIndex}
                            className={this.props.currentIndex == tab.tabIndex ? 'active' : ''}
                            onClick={this.props.handleClickTab}>
                            {tab.tabName}
                            {/*<i tabIndex={tab.tabIndex} id={tab.id}>({tab.count})</i>*/}
                        </li>
                    ))}
                </ul>

                <style jsx>{`
                    .list-tab{
                        position:relative;
                        width:100%;
                        height:0.7rem;
                        // border-bottom:0.01rem solid #ccc;
                        background:#fff;
                        z-index:9;
                    }
                    .list-tab:after {
                        position: absolute;
                        content: '';
                        width: 100%;
                        left: 0;
                        bottom: 0;
                        height: 1px;
                        background-color: #ccc;
                        -webkit-transform: scale(1,.5);
                        transform: scale(1,.5);
                        -webkit-transform-origin: center bottom;
                        transform-origin: center bottom;
                    }
                    .list-tab ul{
                        position:relative;
                        width:100%;
                        height:0.7rem;
                        display: flex;
                        text-align:center;
                    }
                    .list-tab ul li{
                        flex:1;
                        font-size:0.28rem;
                        outline: none;
                        line-height: 0.7rem;
                        padding-top:0.02rem;
                        -webkit-tap-highlight-color:transparent;
                    }
                    .list-tab ul li i{
                        position: relative;
                        top: -0.04rem;
                        display:block;
                        font-style:normal;
                        outline: none;
                    }
                    .list-tab ul li.active,.list-tab ul li:active,.list-tab ul li:hover{
                        border-bottom:0.04rem solid #0084ff;
                        color:#0084ff;
                    }
                `}</style>
            </div>
        )
    }
}
export default ListTab;