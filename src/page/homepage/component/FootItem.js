import React from 'react';
import {observer} from 'mobx-react';

@observer
class FooterItem extends React.Component {
    render() {
        return (
            <div className={this.props.isShow?"footer-content":"hide"} onClick={()=>this.props.handleClick(this.props.index,this.props.title,this.props.right)}>
                <span className={`${this.props.iconName}`}></span><br/>
                <span className={this.props.focused ? 'selected' : ''}>{this.props.title}</span>
                <style global jsx>{`
                    .footer-content{
                        float:left;
                        text-align:center;
                        color:#BDBDBD;
                        font-size:0.24rem;
                        flex:1;
                    }
                    .footer-icon{
                        width:0.35rem;
                        height:0.35rem;
                        margin:auto;
                    }

                    .selected{
                        color: #517CF8 !important;
                    }
                `}</style>
            </div>
        )
    }
}

export default FooterItem;