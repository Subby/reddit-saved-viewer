import React, {useState, useRef} from 'react'
import PaginationItem from "./PaginationItem";

// TODO: Change to component
const PaginationList = (props) => {

    const [previousPaginationItemRefIndex,setPreviousPaginationItemRefIndex] = useState(null);


    //function which goes through each paginationItem and updates selectedField
    const setPaginationItemAsActive = (e) => {
        const currentElement = e.target;
        setPreviousPaginationItemRefIndex(e);
    };
    const paginationItems = props.pageInfo.map((currentPaginationItem, index) => {
        return <PaginationItem
            key={index}
            buttonIndex={index}
            startingIndex={currentPaginationItem.startingIndex}
            endingIndex={currentPaginationItem.endingIndex}
            handleOnClick={props.handlePaginationItemClick}
            handleSetActive={setPaginationItemAsActive}
            isSelected={index===0}
        />
    });

    return (
        <div className="columns">
            <div className="column">
                <nav className="pagination" role="navigation" aria-label="pagination">
                    <ul className="pagination-list">{paginationItems}</ul>
                </nav>

            </div>
        </div>

    )


};

export default PaginationList;