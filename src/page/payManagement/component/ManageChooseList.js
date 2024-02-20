import React from 'react';
import {observer} from 'mobx-react';

@observer
class ManageChooseList extends React.Component{
    render(){
        const props = this.props;
        return (
            <div>
                <div className={`filter-list ${props.listClassName}`}>
                    <ul>
                        {props.list.map((list,index) => (
                            <li id={list.keyword}  key={index} onClick={props.handleClickName}>
                                {list.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <style jsx>{`
                    .filter-list{
                        position: fixed;
                        top: 0.87rem;
                        right: -74%;
                        bottom: 0;
                        width: 74%;
                        height: 100%;
                        background:#fff;
                        z-index:11;
                        overflow-y:auto;
                        transition: right linear .2s;
	                    -moz-transition: right linear .2s;
	                    -webkit-transition: right linear .2s;
	                    -o-transition: right linear .2s;
                    }
                `}</style>
            </div>
        );
    }
}

export default ManageChooseList;