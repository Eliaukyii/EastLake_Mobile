import React from 'react'
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import DatePicker from 'react-mobile-datepicker';

@observer
export class FilterChoose extends React.Component {
    render() {
        const inputName = this.props.inputName;
        return (
            <div className={`filter-item ${this.props.hideItem?"hide":"show"}`}>
                <input name={this.props.name} className={inputName?"filter-item-input2":"filter-item-input"} type="text"
                       placeholder="请选择"
                       onClick={this.props.handleClick}
                       value={this.props.value}
                       readOnly/>
                <i className="filter-item-title">{this.props.label}</i>
                <span className="filter-item-right"/>
            </div>
        )
    }
}

@observer
export class FilterInput extends React.Component {
    render() {
        const inputName = this.props.inputName;
        return (
            <div className="filter-item">
                <input name={this.props.name} className={inputName?"filter-item-input2":"filter-item-input"} type="text"
                       placeholder="请输入"
                       onChange={this.props.handleChange}
                       value={this.props.value}
                />
                <i className="filter-item-title">{this.props.label}</i>
            </div>
        )
    }
}

@observer
export class FilterTimeHorizon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const inputDataName=this.props.inputDataName;
        return (
            <div>
                {/*<div className="filter-item filter-item-title2">*/}
                {/*    <i className="filter-item-title filter-item-title2">{this.props.label}</i>*/}
                {/*</div>*/}
                <div className="filter-date">
                    <div className="filter-item">
                        <input name="startTime" type="text" className="filter-date-select"
                               onClick={(e) => this.props.handleClickDate(e, 'startTime')}
                               value={this.props.param.startTime ? this.props.param.startTime : ""}
                               placeholder="请选择"
                               readOnly/>
                        <i className="filter-item-title">{this.props.sTimeLabel}</i>
                        <span className="filter-item-right"></span>
                    </div>
                    <DatePicker
                        theme='ios'
                        showHeader={false}
                        value={new Date()}
                        max={this.props.timeParams.max}
                        min={this.props.timeParams.min}
                        isOpen={this.props.timeParams.isOpen}
                        onSelect={(date) => this.props.handleSelectDate(date)}
                        onCancel={this.props.handleCancelDate}/>
                    <div className="filter-item">
                        <input name="endTime" type="text"
                               className={inputDataName?"filter-item-input2":"filter-date-select"}
                               onClick={(e) => this.props.handleClickDate(e, 'endTime')}
                               value={this.props.param.endTime ? this.props.param.endTime : ''}
                               placeholder="请选择"
                               readOnly/>
                        <i className="filter-item-title">{this.props.eTimeLabel}</i>
                        <span className="filter-item-right"></span>
                    </div>
                </div>
            </div>
        )
    }
}

@observer
export class FilterBtn extends React.Component {
    render() {
        return (
            <div className="filter-btns">
                <button onClick={this.props.reset}>重置</button>
                <button onClick={this.props.confirm}>确认</button>
                <style>{`
                    .filter-btns button{
                        flex:1;
                        border:none;
                        height:0.7rem;
                        line-height:0.7rem;
                        background:#e8e8e8;
                        font-size:0.26rem;
                        padding:0;margin:0;
                        outline:none;
                    }
                    .filter-btns button:last-child{
                        background:#0084ff;
                        color:#fff;
                    }
                `}</style>
            </div>

        )
    }
}
