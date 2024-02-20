import React from 'react'

class ManagePersonItem extends React.Component{

    render(){
        let item = this.props.item;
        let index = this.props.index;
        return(
            <div className='personBox'>
                <div className='personItem'>
                    <div className='itemContent'>工号:<input type="text" readOnly={true} value={item.EmployeeCode}/></div>
                </div>
                <div className='personItem'>
                    <div className='itemContent'>姓名:<input type="text" readOnly={true} value={item.EmployeeName}/></div>
                    <div className='itemContent'>部门:<input type="text" readOnly={true} value={item.DeptName}/></div>
                </div>
                <div className='personItem'>
                    <div className='itemContent'>金额:<input type="text" readOnly={true} value={item.Money}/></div>
                    <div className='itemContent'>数量:<input type="number" name='Num' onChange={(e)=>this.props.handleChange(e,index)} value={item.Num}/></div>
                </div>
                <div className='personItem'>
                    <div className='itemContent'>单位:<input type="text" readOnly={true} value={item.Unit}/></div>
                    <div className='itemContent'>标准:<input type="text" name='Standard' onChange={(e)=>this.props.handleChange(e,index)} value={item.Standard}/></div>
                </div>
                <div className='personItem'>
                    <div className='itemContent'>备注:<input type="text" name='Note' onChange={(e)=>this.props.handleChange(e,index)} value={item.Note}/></div>
                    <div className='itemContentR'><div className='delBtn' id={item.EmployeeCode} onClick={()=>this.props.handleClick(index)}>删除</div></div>
                </div>
                <style>{`
                    .personBox{
                        position:relative;
                        width:100%;
                        min-height: 1.5rem;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-flex-direction:column;
                        flex-direction: column;
                        border-top: 1px solid #dfdfdf;
                        border-bottom: 1px solid #dfdfdf;
                        margin: 0.18rem 0;
                    }
                    .personItem{
                        position:relative;
                        width:100%;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-flex-direction:row;
                        flex-direction: row;
                    }
                    .itemContent{
                        position:relative;
                        width:100%;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex:1;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        padding: 0 0.09rem;
                    }
                    .itemContent input{
                        position:relative;
                        width:100%;
                        min-height:0.5rem;
                    }
                    .itemContent + .itemContent{
                        border-left: 1px solid #dfdfdf;
                    }
                    .personItem + .personItem{
                        border-top: 1px solid #dfdfdf;
                    }
                    .itemContentR{
                        position:relative;
                        width:100%;
                        -webkit-box-flex: 0.5;
                        -webkit-flex: 0.5;
                        flex:0.5;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                    }
                    .delBtn{
                        position:relative;
                        width:80%;
                        height:100%;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color:#fff;
                        background-color: #197efe;
                    }
                `}</style>
            </div>
        )
    }
}
export default ManagePersonItem;