import React from 'react';
import {observer} from "mobx-react";

@observer
export class AddProgressBar extends React.Component {

    render() {
        return (
            <div className="ppb_title">
                <div className="ppb_bar">
                    <div className="ppb_circleOver" onClick={this.props.onClickOne}>1</div>
                    <div className={this.props.secondOver ? 'ppb_lineOver' : 'ppb_line'}></div>
                    <div className={this.props.secondOver ? 'ppb_circleOver' : 'ppb_circle'}
                         onClick={this.props.onClickTwo}>2
                    </div>
                    <div className={this.props.thirdOver ? 'ppb_lineOver' : 'ppb_line'}></div>
                    <div className={this.props.thirdOver ? 'ppb_circleOver' : 'ppb_circle'}
                         onClick={this.props.onClickThree}>3
                    </div>
                    <div className={this.props.fourthOver ? 'ppb_lineOver' : 'ppb_line'}></div>
                    <div className={this.props.fourthOver ? 'ppb_circleOver' : 'ppb_circle'}
                         onClick={this.props.onClickFour}>4
                    </div>
                    <div className={this.props.fifthOver ? 'ppb_lineOver' : 'ppb_line'}></div>
                    <div className={this.props.fifthOver ? 'ppb_circleOver' : 'ppb_circle'}
                         onClick={this.props.onClickFive}>5
                    </div>

                </div>
                <div className="ppb_content">
                    <div className="ppb_text">项目明细</div>
                    <div className="ppb_text">账目明细</div>
                    <div className="ppb_text">其他信息</div>
                    <div className="ppb_text">上传附件</div>
                    <div className="ppb_text">申报完成</div>
                </div>
                <style>{`
                .ppb_title{
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    -webkit-flex-direction:column;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    min-height: 1.5rem;
                    background: #fff;
                    margin-bottom: 0.2rem;
                    padding: 0 0.28rem;
                }
                .ppb_bar{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    background: #fff;
                    -webkit-flex-direction:row;
                    flex-direction: row;
                }
                .ppb_content{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    width: 100%;
                    background: #fff;
                    -webkit-flex-direction:row;
                    flex-direction: row;
                }
                .ppb_text{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                }
                .ppb_circleOver{
                    float:left;
                    width: 0.36rem;
                    height: 0.36rem;
                    border-radius: 0.18rem;
                    background: #197efe;
                    color: #fff;
                    font-size: 0.22rem;
                    line-height: 0.36rem;
                    text-align: center;
                }
                .ppb_lineOver{
                    float:left;
                    width: 1rem;
                    height: 0.03rem;
                    background: #197efe;
                }
                .ppb_circle{
                    float:left;
                    width: 0.36rem;
                    height: 0.36rem;
                    border-radius: 0.18rem;
                    background: #197efe;
                    color: #fff;
                    font-size: 0.22rem;
                    line-height: 0.36rem;
                    text-align: center;
                    opacity: 0.1;
                }
                .ppb_line{
                    float:left;
                    width: 1rem;
                    height: 0.03rem;
                    background: #197efe;
                    opacity: 0.1;
                }
                `}</style>
            </div>
        )
    }
}

@observer
export class AddOtherProgressBar extends React.Component {

    render() {
        return (
            <div className="ppb_title">
                <div className="ppb_bar">
                    <div className="ppb_circleOver" onClick={this.props.onClickOne}>1</div>
                    <div className={this.props.secondOver ? 'ppb_lineOver' : 'ppb_line'}></div>
                    <div className={this.props.secondOver ? 'ppb_circleOver' : 'ppb_circle'}
                         onClick={this.props.onClickTwo}>2
                    </div>
                    <div className={this.props.thirdOver ? 'ppb_lineOver' : 'ppb_line'}></div>
                    <div className={this.props.thirdOver ? 'ppb_circleOver' : 'ppb_circle'}
                         onClick={this.props.onClickThree}>3
                    </div>
                    <div className={this.props.fourthOver ? 'ppb_lineOver' : 'ppb_line'}></div>
                    <div className={this.props.fourthOver ? 'ppb_circleOver' : 'ppb_circle'}
                         onClick={this.props.onClickFour}>4
                    </div>
                </div>
                <div className="ppb_content">
                    <div className="ppb_text">{this.props.oneTit}</div>
                    <div className="ppb_texts">{this.props.twoTit}</div>
                    <div className="ppb_text_e">{this.props.threeTit}</div>
                    <div className="ppb_text_e">{this.props.fourTit}</div>
                </div>
                <style>{`
                .ppb_title{
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    -webkit-flex-direction:column;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    min-height: 1.5rem;
                    background: #fff;
                    margin-bottom: 0.2rem;
                    padding: 0 0.28rem;
                }
                .ppb_bar{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    background: #fff;
                    -webkit-flex-direction:row;
                    flex-direction: row;
                }
                .ppb_content{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    width: 100%;
                    background: #fff;
                    -webkit-flex-direction:row;
                    flex-direction: row;
                }
                .ppb_text{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                }
                .ppb_texts{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .ppb_text_e{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }
                .ppb_circleOver{
                    float:left;
                    width: 0.36rem;
                    height: 0.36rem;
                    border-radius: 0.18rem;
                    background: #197efe;
                    color: #fff;
                    font-size: 0.22rem;
                    line-height: 0.36rem;
                    text-align: center;
                }
                .ppb_lineOver{
                    float:left;
                    width: 1.6rem;
                    height: 0.03rem;
                    background: #197efe;
                }
                .ppb_circle{
                    float:left;
                    width: 0.36rem;
                    height: 0.36rem;
                    border-radius: 0.18rem;
                    background: #197efe;
                    color: #fff;
                    font-size: 0.22rem;
                    line-height: 0.36rem;
                    text-align: center;
                    opacity: 0.1;
                }
                .ppb_line{
                    float:left;
                    width: 1.6rem;
                    height: 0.03rem;
                    background: #197efe;
                    opacity: 0.1;
                }
                `}</style>
            </div>
        )
    }
}

@observer
export class AddBudgetProgressBar extends React.Component {

    render() {
        return (
            <div className="ppb_title">
                <div className="ppb_bar">
                    <div className="ppb_circleOver" onClick={this.props.onClickOne}>1</div>
                    <div className={this.props.secondOver ? 'ppb_lineOver' : 'ppb_line'}></div>
                    <div className={this.props.secondOver ? 'ppb_circleOver' : 'ppb_circle'}
                         onClick={this.props.onClickTwo}>2
                    </div>
                    <div className={this.props.thirdOver ? 'ppb_lineOver' : 'ppb_line'}></div>
                    <div className={this.props.thirdOver ? 'ppb_circleOver' : 'ppb_circle'}
                         onClick={this.props.onClickThree}>3
                    </div>
                </div>
                <div className="ppb_content">
                    <div className="ppb_text">{this.props.oneTit}</div>
                    <div className="ppb_texts">{this.props.twoTit}</div>
                    <div className="ppb_text_e">{this.props.threeTit}</div>
                </div>
                <style>{`
                .ppb_title{
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    -webkit-flex-direction:column;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    min-height: 1.5rem;
                    background: #fff;
                    margin-bottom: 0.2rem;
                    padding: 0 0.28rem;
                }
                .ppb_bar{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    background: #fff;
                    -webkit-flex-direction:row;
                    flex-direction: row;
                }
                .ppb_content{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    width: 100%;
                    background: #fff;
                    -webkit-flex-direction:row;
                    flex-direction: row;
                }
                .ppb_text{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                }
                .ppb_texts{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .ppb_text_e{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: -moz-box;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }
                .ppb_circleOver{
                    float:left;
                    width: 0.36rem;
                    height: 0.36rem;
                    border-radius: 0.18rem;
                    background: #197efe;
                    color: #fff;
                    font-size: 0.22rem;
                    line-height: 0.36rem;
                    text-align: center;
                }
                .ppb_lineOver{
                    float:left;
                    width: 2.2rem;
                    height: 0.03rem;
                    background: #197efe;
                }
                .ppb_circle{
                    float:left;
                    width: 0.36rem;
                    height: 0.36rem;
                    border-radius: 0.18rem;
                    background: #197efe;
                    color: #fff;
                    font-size: 0.22rem;
                    line-height: 0.36rem;
                    text-align: center;
                    opacity: 0.1;
                }
                .ppb_line{
                    float:left;
                    width: 2.2rem;
                    height: 0.03rem;
                    background: #197efe;
                    opacity: 0.1;
                }
                `}</style>
            </div>
        )
    }
}