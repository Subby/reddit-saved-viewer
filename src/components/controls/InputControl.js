import React from "react";
import * as PropTypes from "prop-types";

const InputControl = (props) => {
    return (
        <input className="input" type="text" name="" value={props.value}
                  onChange={props.onChange} placeholder={props.placeholder}/>
                  );
};

InputControl.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func
};

export default InputControl;