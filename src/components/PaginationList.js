import React, {createRef} from 'react'
import PaginationItem from "./PaginationItem";

// TODO: Change to component
const PaginationList = (props) => {

    let selectedPaginationItem = 0;

    //function which goes through each paginationItem and updates selectedField
    const setPaginationItemAsActive = (index) => {
        paginationItems[selectedPaginationItem].setState({isCurrentlySelected: false});
        selectedPaginationItem = index;
    };
    const paginationItems = props.pageInfo.map((currentPaginationItem, index) => {

        return <PaginationItem
            key={index}
            buttonIndex={index}
            startingIndex={currentPaginationItem.startingIndex}
            endingIndex={currentPaginationItem.endingIndex}
            handleOnClick={props.handlePaginationItemClick}
            currentlySelected={false}
            setActive={index === 0}
            handleSetActive={setPaginationItemAsActive}
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