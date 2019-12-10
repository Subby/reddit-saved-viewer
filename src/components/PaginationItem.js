import React from 'react'


const PaginationItem = (props) => {
    return (
        <button onClick={() => props.handleOnClick(props.startingIndex, props.endingIndex)}>{props.buttonIndex + 1}</button>
    )
};


export default PaginationItem;