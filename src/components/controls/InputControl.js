import React from "react";
import * as PropTypes from "prop-types";

const InputControl = (props) => {
    return (
        <div className="field">
            <label className="label">{props.label}</label>
            <input className="input" type="text" name="" value={props.value}
                  onChange={props.onChange} placeholder={props.placeholder}/>
        </div>
                  );
};

InputControl.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func
};

export default InputControl;