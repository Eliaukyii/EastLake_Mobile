import React from 'react'

export class FilePreviewList extends React.Component{

    render() {
        return(
            <div className={`filePreBox borderTop ${this.props.FileList.length > 0?'show':'hide'}`}>
                <div className="boxTitle">附件预览:</div>
                <div className="boxContent">
                {this.props.FileList.map((item,index)=>(
                        <div className="fileItem"  key={item.At_ID}>
                            <textarea className="itemCenter" value={`${index+1}.${item.F_Name}`} readOnly={true}/>
                            <div className="itemRight"><div className="readBtn" id={item.At_ID} onClick={()=>this.props.handleClick(item)}>预览</div></div>
                        </div>
                    )
                )}
                </div>
                <style>{`
                    .filePreBox{
                        position:relation;
                        width:100%;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        -webkit-flex-direction:column;
                        flex-direction: column;
                        padding-top:0.2rem;
                    }
                    .boxTitle{
                        position:relation;
                        width:100%;
                        fontsize:0.26rem;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                    }
                    .boxContent{
                        position:relation;
                        width:100%;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                    }
                    .fileItem{
                        position:relation;
                        width:100%;
                        height:0.6rem;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                        margin-bottom: 0.1rem;
                    }
                    .itemLeft{
                        position:relation;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                    }
                    .itemCenter{
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        -webkit-flex-direction:column;
                        flex-direction: column;
                        position:relation;
                        -webkit-box-flex: 3;
                        -webkit-flex: 3;
                        flex:3;
                        font-size: 0.22rem;
                        justify-content: center;
                        align-items: flex-start;
                        border: none;
                    }
                    .itemC-name{
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                    }
                    .itemC-type{
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                    }    
                    .itemRight{
                        position:relation;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                        justify-content: flex-end;
                        align-items: flex-start;
                    }
                    .readBtn{
                        position:relation;
                        display: -webkit-box;
                        display:-webkit-flex;
                        display:flex;
                        width: 70%;
                        height: 80%;
                        font-size: 0.24rem;
                        color: #fff;
                        background-color:#197efe;
                        justify-content: center;
                        align-items: center;
                        border: 1px solid #197efe;
                        border-radius: 0.2rem;
                    }
                `}</style>
            </div>
        )
    }
}