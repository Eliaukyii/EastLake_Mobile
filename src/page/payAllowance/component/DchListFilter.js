import React from 'react';
import {observer} from 'mobx-react';
import {FilterBtn, FilterChoose} from "../../commonComp/FilterComponent";

@observer
class DchListFilter extends React.Component{
    render(){
        return (
            <div className={`filter ${this.props.filterClassName}`}>
                <div className="filter-box">
                    <FilterChoose label='暂存暂付' name="ZCZF"
                                  handleClick={this.props.handleClickChose}
                                  value={this.props.param.ZCZFName}

                    />
                    <FilterChoose label='领款部门' name="DeptCode"
                                  handleClick={this.props.handleClickChose}
                                 value={this.props.param.DeptCodeName}
                    />
                    <FilterChoose label='往来单位' name="DWBH"
                                  handleClick={this.props.handleClickChose}
                                  value={this.props.param.DWBHName}

                    />
                    <FilterChoose label='预算项目' name="ItemCode"
                                  handleClick={this.props.handleClickChose}
                                  value={this.props.param.ItemCodeName}

                    />
                </div>
                <FilterBtn reset={this.props.handleClickReset} confirm={this.props.handleClickConfirm}/>
            </div>
        );
    }
}

export default DchListFilter;