import React from 'react'

const ListSearch = (props) =>{
    return (
        <div className="list-search">
            <div className="search-div">
                <span className={props.iconSearch?'':"icon-search"}/>
                <input name={props.name} type="text" className="listsearch-input"
                       placeholder={props.placeholder} readOnly={props.readOnly}
                       onChange={props.handleChangeInput}
                       onKeyPress={props.handleEnterSearch}
                       value={props.keyword}
                />
                <span className={props.iconRight?"":"list-search-right"} id="TermType" onClick={props.handleClick}/>
                <span className={props.keyword !== '' ? "icon-clear" : "hide"} id={props.name} onClick={props.handleClickClear}/>
            </div>
            {(()=>{
                const display = props.isShowFilter;
                if (display === undefined || display === true) {
                    return <div className="listsearch-sort" onClick={props.handleClickFilter}>
                        <span className="icon-sort"></span>
                        <i className="listsearch-txt">筛选</i>
                    </div>
                }
            })()}
            <style>{`
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
                    padding:0.12rem 0.4rem 0.12rem 0.5rem;
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
                    right: 0.4rem;
                    display: inline-block;
                    z-index: 10;
                }
                .list-search .listsearch-sort{
                        position:relative;
                        display:inline-block;
                        text-align:center;
                        margin-top:0.14rem;
                        margin-left:0.18rem;
                    }
                    .listsearch-txt{
                        position:relative;
                        top:-0.1rem;
                        display:block;
                        font-style:normal;
                        font-size:0.18rem;
                        color:#a4a4a5;
                    }
            `}</style>
        </div>
    )
};
export default ListSearch;