import React from "react";

const FilterSelectControl = (props) => {


    const optionValues = Object.values(props.optionValues).map((option) => (
        <option value={option}>{option}</option>
    ));

    return (
        <div className="field">
            <label className="label">{props.label}</label>
            <div className="select">
                <select id="postFilterSelection" value={props.value} onChange={props.onChange}>
                    {optionValues}
                </select>
            </div>
        </div>
    )
};

export default FilterSelectControl;