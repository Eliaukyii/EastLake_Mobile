import React from 'react'

const SingleInput = (props) =>{
    return <label className="checkBox">
        {props.levelName}
        <input
                name={props.name}
                type="checkbox"
                checked={props.isChecked}
                onChange={props.handleChange} />
        <style>{`
            .checkBox{
                margin-right: 0.2rem;
                color: #FFF;
                height:0.82rem;
                line-height: 0.82rem;
            }
            .checkBox input{
                -webkit-appearance:checkbox;
            }
        `}</style>
    </label>
}
export default SingleInput;