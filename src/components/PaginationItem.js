import React, {useState} from 'react';


const PaginationItem = (props) => {
    const paginationPrefix = "pagination-link";
    return (
        <li>
            <a className=

                   {props.isSelected
                       ? paginationPrefix + "is-current"
                       : paginationPrefix
                   }
               onClick={(e) => {
                   props.handleSetActive(e);
                   props.handleOnClick(props.startingIndex, props.endingIndex)
               }
               }>
                {props.buttonIndex + 1}
            </a>
        </li>
    );
};

export default PaginationItem;