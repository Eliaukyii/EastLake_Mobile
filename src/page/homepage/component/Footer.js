import React from 'react'
import { observer } from 'mobx-react';
import FooterItem from "./FootItem";
import firsthome from '../../../img/icon/firsthome.svg'
import select_firsthome from '../../../img/icon/select_firsthome.svg'
import declarehome from '../../../img/icon/declarehome.svg'
import select_declarehome from '../../../img/icon/select_declarehome.svg'
import approvalhome from '../../../img/icon/approvalhome.svg'
import select_approvalhome from '../../../img/icon/select_approvalhome.svg'
import queryhome from '../../../img/icon/queryhome.svg'
import select_queryhome from '../../../img/icon/select_queryhome.svg'

@observer
class Footer extends React.Component {
    render() {
        let currentIndex = this.props.currentIndex;
        return (
            <div className="footBox">
                <FooterItem isShow={true} title="首页" iconName={currentIndex === "navHome" ? 'icon-homes' : 'icon-home'}
                    index="navHome" focused={currentIndex === "navHome"} handleClick={this.props.handleClick} />
                <FooterItem isShow={this.props.isShowDeclare} title="申报" iconName={currentIndex === "declare" ? 'icon-declares' : 'icon-declare'}
                    index="declare" focused={currentIndex === "declare"} handleClick={this.props.handleClick} />
                <FooterItem isShow={this.props.isShowApproval} title="审批" iconName={currentIndex === "approval" ? 'icon-approvals' : 'icon-approval'}
                    index="approval" focused={currentIndex === "approval"} handleClick={this.props.handleClick} />
                {/* <FooterItem isShow={this.props.isShowQuery} title="查询" iconName={currentIndex === "query" ? 'icon-querys' : 'icon-query'}
                    index="query" focused={currentIndex === "query"} handleClick={this.props.handleClick} /> */}
                <style>{`
                    .footBox{
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                        height: 0.88rem;
                        padding: 0 0.28rem; 
                        display: -webkit-flex;
                        display: flex;
                        background-color: #fff;  
                        z-index:99;
                        justify-content: center;
                        align-items: center;
                        border-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                        -moz-box-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                        -webkit-box-shadow: 0 -0.05rem 0.05rem #cdcdcd;
                    }
                    .indexTab{
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                        justify-content: center;
                        align-items: center;
                    }
                    .icon-home {
                        display: inline-block;
                        width: 0.28rem;
                        height: 0.28rem;
                        background: url('`+ firsthome + `') no-repeat;
                        background-size: 100% 100%;
                        -webkit-background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        -o-background-size: 100% 100%;
                    }

                    .icon-homes {
                        display: inline-block;
                        width: 0.28rem;
                        height: 0.28rem;
                        background: url('`+ select_firsthome + `') no-repeat;
                        background-size: 100% 100%;
                        -webkit-background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        -o-background-size: 100% 100%;
                    }

                    .icon-declare {
                        display: inline-block;
                        width: 0.28rem;
                        height: 0.28rem;
                        background: url('`+ declarehome + `') no-repeat;
                        background-size: 100% 100%;
                        -webkit-background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        -o-background-size: 100% 100%;
                    }
                    .icon-declares {
                        display: inline-block;
                        width: 0.28rem;
                        height: 0.28rem;
                        background: url('`+ select_declarehome + `') no-repeat;
                        background-size: 100% 100%;
                        -webkit-background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        -o-background-size: 100% 100%;
                    }
                    .icon-approval {
                        display: inline-block;
                        width: 0.28rem;
                        height: 0.28rem;
                        background: url('`+ approvalhome + `') no-repeat;
                        background-size: 100% 100%;
                        -webkit-background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        -o-background-size: 100% 100%;
                    }

                    .icon-approvals {
                        display: inline-block;
                        width: 0.28rem;
                        height: 0.28rem;
                        background: url('`+ select_approvalhome + `') no-repeat;
                        background-size: 100% 100%;
                        -webkit-background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        -o-background-size: 100% 100%;
                    }

                    .icon-query {
                        display: inline-block;
                        width: 0.28rem;
                        height: 0.28rem;
                        background: url('`+ queryhome + `') no-repeat;
                        background-size: 100% 100%;
                        -webkit-background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        -o-background-size: 100% 100%;
                    }

                    .icon-querys {
                        display: inline-block;
                        width: 0.28rem;
                        height: 0.28rem;
                        background: url('`+ select_queryhome + `') no-repeat;
                        background-size: 100% 100%;
                        -webkit-background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        -o-background-size: 100% 100%;
                    }
                    `}</style>
            </div>
        )
    }
}
export default Footer;