import React from 'react'


const PaginationItem = (props) => {
    const paginationPrefix = "pagination-link";
    return (
        <li>
            <a className=
                   {props.isCurrentlySelected
                       ? paginationPrefix + " is-current"
                       : paginationPrefix
                   }
               onClick={() => {props.handleOnClick(props.buttonIndex, props.startingIndex, props.endingIndex)}}>
                {props.buttonIndex + 1}
            </a>
        </li>
    )
};


export default PaginationItem;