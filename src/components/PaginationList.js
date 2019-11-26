import React from 'react'
import PaginationItem from "./PaginationItem";

const PaginationList = (props) => {

    const paginationItems = props.pageInfo.map((currentPaginationItem, index) => {
        return <PaginationItem
            buttonIndex={index}
            startingIndex={currentPaginationItem.startingIndex}
            endingIndex={currentPaginationItem.endingIndex}
            handleOnClick={props.handleOnClick}
        />
    });

    return (
        <ul>{paginationItems}</ul>
    )


};

export default PaginationList;