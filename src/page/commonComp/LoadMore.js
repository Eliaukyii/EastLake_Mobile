import React from 'react';

class LoadMore extends React.Component{
    render(){
        return (
            <div className="loadmore">
                {this.props.text}
            </div>
        );
    }
}

export default LoadMore;