import React from 'react'
import DatePicker from "react-mobile-datepicker";
import {observer} from 'mobx-react';

@observer
class SelectYearBtn extends React.Component{
    render(){
        return (
            <div>
                <DatePicker theme='ios'
                            showHeader={false}
                            confirmText={this.props.confirmText||"完成"}
                            dateConfig={this.props.dateConfig}
                            value={new Date()}
                            max={this.props.timeParams.max?this.props.timeParams.max:(new Date())}
                            isOpen={this.props.timeParams.isOpen}
                            onSelect={(date) => this.props.handleSelectDate(date)}
                            onCancel={this.props.handleCancelDate}
                />
                {this.props.btnNum === 1?
                    <div className="btnBox">
                        <div className="btnBoxOne">
                            <input className="btnMonthList" readOnly={true} value={this.props.iptTxt} onClick={this.props.handleClickTime}/>
                        </div>
                        <div className="btnBoxTwo">
                            <input type="text" className="btnMonthList" readOnly={true} value="显示明细" onClick={this.props.handleClickDetail}/>
                        </div>
                    </div>:
                    this.props.btnNum === 2?
                        <input type="text" className="btnYearList" readOnly={true} value="显示明细" onClick={this.props.handleClickDetail}/>:
                        <input className="btnYearList" readOnly={true} value={this.props.iptTxt} onClick={this.props.handleClickTime}/>
                    }
                <style>{`
                .btnBox{
                    display: -webkit-flex;
                    display: flex;
                    width:100%;
                    height: 0.88rem;
                    position: relative;
                    border-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                    -moz-box-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                    -webkit-box-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                    align-items: center;
                    justify-content: center;
                    line-height: 0.88rem;
                    padding: 0 0.28rem;
                }
                .btnYearList{
                    width:100%;
                    position: relative;
                    text-align: center;
                    display:inline-block;
                    background:#197efe;
                    border: none;
                    outline: none;
                    color:#fff;
                    font-size: 0.28rem;
                    height: 0.88rem;
                    border-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                    -moz-box-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                    -webkit-box-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                }
                .btnBoxOne{
                    display: -webkit-flex;
                    display: flex;
                    align-items: center;
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    flex: 1;
                }
                .btnBoxTwo{
                    display: -webkit-flex;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    flex: 1;
                }
                .btnMonthList{
                    position: relative;
                    text-align: center;
                    background:#197efe;
                    border: none;
                    outline: none;
                    color:#fff;
                    width: 90%;
                    font-size: 0.28rem;
                    height: 0.6rem;
                }
            `}</style>
            </div>
        )
    }
}
export default SelectYearBtn;