import React from 'react';
import {observer} from 'mobx-react';
import {FilterBtn, FilterChoose,FilterInput, FilterTimeHorizon} from "../../commonComp/FilterComponent";

@observer
class ExpenseListFilter extends React.Component{
    render(){
        return (
            <div className={`filter ${this.props.filterClassName}`}>
                <div className="filter-box">
                    {/*<FilterChoose label='搜索条件' name="TermType"*/}
                    {/*              handleClick={this.props.handleClickChose}*/}
                    {/*              value={this.props.param.TermTypeName}*/}

                    {/*/>*/}
                    <FilterChoose label='部门单位' name="Dept"
                                 handleClick={this.props.handleClickChose}
                                 value={this.props.param.DeptName}
                    />
                    <FilterChoose label='类型' name="act" hideItem={this.props.hideItem}
                                     handleClick={this.props.handleClickChose}
                                     value={this.props.param.actName}

                    />
                    <FilterChoose label='状态' name="isOver" hideItem={this.props.hideStatus}
                                  handleClick={this.props.handleClickChose}
                                  value={this.props.param.isOverName}

                    />
                    <FilterTimeHorizon param={this.props.param}
                                       sTimeLabel='申报日期' eTimeLabel='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至'
                                       timeParams={this.props.timeParams}
                                       handleSelectDate={this.props.handleSelectDate}
                                       handleCancelDate={this.props.handleCancelDate}
                                       handleClickDate={this.props.handleClickDate}
                    />
                </div>
                <FilterBtn reset={this.props.handleClickReset} confirm={this.props.handleClickConfirm}/>
            </div>
        );
    }
}

export default ExpenseListFilter;