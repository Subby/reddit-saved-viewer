import React from "react";

class FilterSelectControl extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const optionValues = Object.entries(props.optionValues).map((item) => (
            <option value={item}>{item}</option>
        ));
        return <div className="select">
            <select id="postFilterSelection" value={props.value} onChange={props.onChange}>
                {optionValues}
            </select>
        </div>;
    }
}