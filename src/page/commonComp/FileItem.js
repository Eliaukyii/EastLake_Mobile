import React from 'react'
import {observer} from 'mobx-react'

@observer
class FileItem extends React.Component{
    render(){
        return (
            <div className='fileBox'>
                <img className='file_img' id='file_img' src={this.props.src} alt=""/>
                <div className="deleteFile">
                    删除
                </div>
            </div>
        )
    }
}
export default FileItem;