import React from 'react'

const HomeFunc =(props)=>{
        return(
            <div className={props.isShow?"funcBox":"hide"} onClick={props.handleClick} id={props.id}>
                <div className={props.iconName} id={props.id}/>
                <span className={`funcName ${props.funcName.length>5?"funcSize":""}`} id={props.id}>{props.funcName}</span>
                <style>{`
                    .funcBox{
                        float: left;
                        width: 33%;
                        display: -webkit-flex;
                        display: flex;
                        -webkit-flex-direction:column;
                        flex-direction: column;
                        justify-content:center;
                        align-items:center; 
                        height: 1.3rem;
                        margin:0.22rem 0 0 0;
                        text-align: center;
                        font-size: 0.22rem;
                    }
                    .funcName{
                        display: inline-block;
                        width: 100%;
                        height: 0.6rem;
                        line-height: 0.6rem;
                    }
                    .funcSize{
                        font-size: 0.2rem;
                        
                    }
                `}</style>
            </div>
        )
    };
export default HomeFunc;