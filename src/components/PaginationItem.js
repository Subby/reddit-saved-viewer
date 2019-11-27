import React from 'react'


const PaginationItem = (props) => {
    const startingIndex = props.startingIndex;
    const endingIndex = props.endingIndex;
    return (
        <button onClick={() => props.handleOnClick(startingIndex, props.endingIndex)}>{props.buttonIndex}</button>
    )
};


export default PaginationItem;