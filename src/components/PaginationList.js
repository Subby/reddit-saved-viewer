import React from 'react'
import PaginationItem from "./PaginationItem";

const PaginationList = (props) => {

    const paginationItems = props.pageInfo.map((currentPaginationItem, index) => {
        return <PaginationItem
            key={index}
            buttonIndex={index}
            startingIndex={currentPaginationItem.startingIndex}
            endingIndex={currentPaginationItem.endingIndex}
            handleOnClick={props.handlePaginationItemClick}
        />
    });

    return (
        <div className="columns">
            <div className="column">
                <ul>{paginationItems}</ul>
            </div>
        </div>

    )


};

export default PaginationList;