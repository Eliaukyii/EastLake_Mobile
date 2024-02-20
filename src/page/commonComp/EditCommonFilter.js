import React from 'react';
import {observer} from 'mobx-react';

@observer
export class PreDeptFilter extends React.Component{
    render(){
        const self = this.props;
        return (
            <div className={`filter-list ${this.props.filterClassName}`}>
                <div className="list-searchD">
                    <div className="search-div">
                        <span className="icon-search"/>
                        <input name={self.name} type="text" className="listsearch-input"
                               placeholder={self.placeholder}
                               onChange={self.handleChangeInput}
                               onKeyPress={self.handleEnterSearch}
                               value={self.deptKey}
                        />
                        <span id={self.name} className={self.deptKey !== '' ? "icon-clearD" : "hide"} onClick={self.handleClickClear}/>
                    </div>
                </div>
                <ul>
                    {self.addPreList.map(item=>(
                        <li id={item.DeptCode} key={item.DeptCode}
                            onClick={self.handleChooseFilter}>{item.DeptName}</li>
                    ))}
                </ul>
                <style global jsx>{`
                .list-searchD{
                    position:relative;
                    width:100%;
                    height:0.82rem;
                    background:#e9e9e9;
                    padding:0.14rem 0.24rem;
                    z-index:9;
                    display:flex;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    align-items: center;
                }
                .search-div{
                    position:relative;
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    display:inline-block;
                }
                .listsearch-input{
                    position:relative;
                    width:100%;
                    background:#fff;
                    height:0.54rem;
                    line-height:0.3rem;
                    border:none;
                    font-size:0.24rem;
                    padding:0.12rem 0.4rem 0.12rem 0.6rem;
                    border-radius:0.06rem;-webkit-border-radius:0.06rem;
                    outline:none;
                }
                .list-search .icon-search{
                    position:absolute;
                    top: 0.12rem;
                    left: 0.1rem;
                    display:inline-block;
                    z-index:10;
                }
                .list-search .icon-clear{
                    position: absolute;
                    top: 0.12rem;
                    right: 0.1rem;
                    display: inline-block;
                    z-index: 10;
                }
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
@observer
export class PreApplicatFilter extends React.Component{
    render(){
        const self = this.props;
        return (
            <div className={`filter-list ${this.props.filterClassName}`}>
                <div className="list-searchD">
                    <div className="search-div">
                        <span className="icon-search"/>
                        <input name={self.name} type="text" className="listsearch-input"
                               placeholder={self.placeholder}
                               onChange={self.handleChangeInput}
                               onKeyPress={self.handleEnterSearch}
                               value={self.applicatKey}
                        />
                        <span id={self.name} className={self.applicatKey !== '' ? "icon-clearD" : "hide"} onClick={self.handleClickClear}/>
                    </div>
                </div>
                <ul>
                    {self.addPreList.map(item=>(
                        <li id={item.EmployeeCode} key={item.EmployeeCode} title={item.DeptCode}
                            onClick={self.handleChooseFilter}>{item.EmployeeName}</li>
                    ))}
                </ul>
                <style global jsx>{`
                .list-searchD{
                    position:relative;
                    width:100%;
                    height:0.82rem;
                    background:#e9e9e9;
                    padding:0.14rem 0.24rem;
                    z-index:9;
                    display:flex;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    align-items: center;
                }
                .search-div{
                    position:relative;
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    display:inline-block;
                }
                .listsearch-input{
                    position:relative;
                    width:100%;
                    background:#fff;
                    height:0.54rem;
                    line-height:0.3rem;
                    border:none;
                    font-size:0.24rem;
                    padding:0.12rem 0.4rem 0.12rem 0.6rem;
                    border-radius:0.06rem;-webkit-border-radius:0.06rem;
                    outline:none;
                }
                .list-search .icon-search{
                    position:absolute;
                    top: 0.12rem;
                    left: 0.1rem;
                    display:inline-block;
                    z-index:10;
                }
                .list-search .icon-clear{
                    position: absolute;
                    top: 0.12rem;
                    right: 0.1rem;
                    display: inline-block;
                    z-index: 10;
                }
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
@observer
export class PreAttnFilter extends React.Component{
    render(){
        const self = this.props;
        return (
            <div className={`filter-list ${this.props.filterClassName}`}>
                <div className="list-searchD">
                    <div className="search-div">
                        <span className="icon-search"/>
                        <input name={self.name} type="text" className="listsearch-input"
                               placeholder={self.placeholder}
                               onChange={self.handleChangeInput}
                               onKeyPress={self.handleEnterSearch}
                               value={self.attnKey}
                        />
                        <span id={self.name} className={self.attnKey !== '' ? "icon-clearD" : "hide"} onClick={self.handleClickClear}/>
                    </div>
                </div>
                <ul>
                    {self.addPreList.map(item=>(
                        <li id={item.EmployeeCode} key={item.EmployeeCode} title={item.DeptCode}
                            onClick={self.handleChooseFilter}>{item.EmployeeName}</li>
                    ))}
                </ul>
                <style global jsx>{`
                .list-searchD{
                    position:relative;
                    width:100%;
                    height:0.82rem;
                    background:#e9e9e9;
                    padding:0.14rem 0.24rem;
                    z-index:9;
                    display:flex;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    align-items: center;
                }
                .search-div{
                    position:relative;
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    display:inline-block;
                }
                .listsearch-input{
                    position:relative;
                    width:100%;
                    background:#fff;
                    height:0.54rem;
                    line-height:0.3rem;
                    border:none;
                    font-size:0.24rem;
                    padding:0.12rem 0.4rem 0.12rem 0.6rem;
                    border-radius:0.06rem;-webkit-border-radius:0.06rem;
                    outline:none;
                }
                .list-search .icon-search{
                    position:absolute;
                    top: 0.12rem;
                    left: 0.1rem;
                    display:inline-block;
                    z-index:10;
                }
                .list-search .icon-clear{
                    position: absolute;
                    top: 0.12rem;
                    right: 0.1rem;
                    display: inline-block;
                    z-index: 10;
                }
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
@observer
export class PreItemFilter extends React.Component{
    render(){
        const self = this.props;
        return (
            <div className={`filter-list ${this.props.filterClassName}`}>
                <div className="list-searchD">
                    <div className="search-div">
                        <span className="icon-search"/>
                        <input name={self.name} type="text" className="listsearch-input"
                               placeholder={self.placeholder}
                               onChange={self.handleChangeInput}
                               onKeyPress={self.handleEnterSearch}
                               value={self.itemKey}
                        />
                        <span id={self.name} className={self.itemKey !== '' ? "icon-clearD" : "hide"} onClick={self.handleClickClear}/>
                    </div>
                </div>
                <ul>
                    {self.addPreList.map(item=>(
                        <li id={item.ItemID} key={item.ItemCode}
                            onClick={self.handleChooseFilter}>{item.ItemName}</li>
                    ))}
                </ul>
                <style global jsx>{`
                .list-searchD{
                    position:relative;
                    width:100%;
                    height:0.82rem;
                    background:#e9e9e9;
                    padding:0.14rem 0.24rem;
                    z-index:9;
                    display:flex;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    align-items: center;
                }
                .search-div{
                    position:relative;
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    display:inline-block;
                }
                .listsearch-input{
                    position:relative;
                    width:100%;
                    background:#fff;
                    height:0.54rem;
                    line-height:0.3rem;
                    border:none;
                    font-size:0.24rem;
                    padding:0.12rem 0.4rem 0.12rem 0.6rem;
                    border-radius:0.06rem;-webkit-border-radius:0.06rem;
                    outline:none;
                }
                .list-search .icon-search{
                    position:absolute;
                    top: 0.12rem;
                    left: 0.1rem;
                    display:inline-block;
                    z-index:10;
                }
                .list-search .icon-clear{
                    position: absolute;
                    top: 0.12rem;
                    right: 0.1rem;
                    display: inline-block;
                    z-index: 10;
                }
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
@observer
export class PreZwdFilter extends React.Component{
    render(){
        const self = this.props;
        return (
            <div className={`filter-list ${this.props.filterClassName}`}>
                <div className="list-searchD">
                    <div className="search-div">
                        <span className="icon-search"/>
                        <input name={self.name} type="text" className="listsearch-input"
                               placeholder={self.placeholder}
                               onChange={self.handleChangeInput}
                               onKeyPress={self.handleEnterSearch}
                               value={self.itemKey}
                        />
                        <span id={self.name} className={self.itemKey !== '' ? "icon-clearD" : "hide"} onClick={self.handleClickClear}/>
                    </div>
                </div>
                <ul>
                    {self.addPreList.map(item=>(
                        <li id={item.FundsUseID} key={item.FundsUseID}
                            onClick={self.handleChooseFilter}>{item.FundsUse}</li>
                    ))}
                </ul>
                <style global jsx>{`
                .list-searchD{
                    position:relative;
                    width:100%;
                    height:0.82rem;
                    background:#e9e9e9;
                    padding:0.14rem 0.24rem;
                    z-index:9;
                    display:flex;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    align-items: center;
                }
                .search-div{
                    position:relative;
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    display:inline-block;
                }
                .listsearch-input{
                    position:relative;
                    width:100%;
                    background:#fff;
                    height:0.54rem;
                    line-height:0.3rem;
                    border:none;
                    font-size:0.24rem;
                    padding:0.12rem 0.4rem 0.12rem 0.6rem;
                    border-radius:0.06rem;-webkit-border-radius:0.06rem;
                    outline:none;
                }
                .list-search .icon-search{
                    position:absolute;
                    top: 0.12rem;
                    left: 0.1rem;
                    display:inline-block;
                    z-index:10;
                }
                .list-search .icon-clear{
                    position: absolute;
                    top: 0.12rem;
                    right: 0.1rem;
                    display: inline-block;
                    z-index: 10;
                }
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
@observer
export class PreBillFilter extends React.Component{
    render(){
        const self = this.props;
        return (
            <div className={`filter-list ${this.props.filterClassName}`}>
                <div className="list-searchD">
                    <div className="search-div">
                        <span className="icon-search"/>
                        <input name={self.name} type="text" className="listsearch-input"
                               placeholder={self.placeholder}
                               onChange={self.handleChangeInput}
                               onKeyPress={self.handleEnterSearch}
                               value={self.itemKey}
                        />
                        <span id={self.name} className={self.itemKey !== '' ? "icon-clearD" : "hide"} onClick={self.handleClickClear}/>
                    </div>
                </div>
                <ul>
                    {self.addPreList.map(item=>(
                        <li id={item.SubjectID} key={item.SubjectID}
                            onClick={self.handleChooseFilter}>{item.SubjectName}</li>
                    ))}
                </ul>
                <style global jsx>{`
                .list-searchD{
                    position:relative;
                    width:100%;
                    height:0.82rem;
                    background:#e9e9e9;
                    padding:0.14rem 0.24rem;
                    z-index:9;
                    display:flex;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    align-items: center;
                }
                .search-div{
                    position:relative;
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    display:inline-block;
                }
                .listsearch-input{
                    position:relative;
                    width:100%;
                    background:#fff;
                    height:0.54rem;
                    line-height:0.3rem;
                    border:none;
                    font-size:0.24rem;
                    padding:0.12rem 0.4rem 0.12rem 0.6rem;
                    border-radius:0.06rem;-webkit-border-radius:0.06rem;
                    outline:none;
                }
                .list-search .icon-search{
                    position:absolute;
                    top: 0.12rem;
                    left: 0.1rem;
                    display:inline-block;
                    z-index:10;
                }
                .list-search .icon-clear{
                    position: absolute;
                    top: 0.12rem;
                    right: 0.1rem;
                    display: inline-block;
                    z-index: 10;
                }
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
@observer
export class PreSalaryFilter extends React.Component{
    render(){
        const self = this.props;
        return (
            <div className={`filter-list ${this.props.filterClassName}`}>
                <ul>
                    {self.addPreList.map(item=>(
                        <li id={item.ColCode} key={item.ColCode}
                            onClick={()=>self.handleChooseFilter(item)}>{item.ColName}</li>
                    ))}
                </ul>
                <style global jsx>{`
                .list-search{
                    position:relative;
                    width:100%;
                    height:0.82rem;
                    background:#e9e9e9;
                    padding:0.14rem 0.24rem;
                    z-index:9;
                    display:flex;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    align-items: center;
                }
                .search-div{
                    position:relative;
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    display:inline-block;
                }
                .listsearch-input{
                    position:relative;
                    width:100%;
                    background:#fff;
                    height:0.54rem;
                    line-height:0.3rem;
                    border:none;
                    font-size:0.24rem;
                    padding:0.12rem 0.4rem 0.12rem 0.6rem;
                    border-radius:0.06rem;-webkit-border-radius:0.06rem;
                    outline:none;
                }
                .list-search .icon-search{
                    position:absolute;
                    top: 0.12rem;
                    left: 0.1rem;
                    display:inline-block;
                    z-index:10;
                }
                .list-search .icon-clear{
                    position: absolute;
                    top: 0.12rem;
                    right: 0.1rem;
                    display: inline-block;
                    z-index: 10;
                }
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