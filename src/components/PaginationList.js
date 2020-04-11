import React, {useState, useEffect} from 'react'
import PaginationItem from "./PaginationItem";

const PaginationList = (props) => {

    let handlePaginationItemClick = (buttonIndex, startingIndex, endingIndex) => {
        setPaginationItems(setupPaginationItems(buttonIndex));
        props.handlePaginationItemClick(startingIndex, endingIndex);
    };

    let setupPaginationItems = (defaultSelectedIndex) => {
        return props.pageInfo.map((currentPaginationItem, index) => {
            return <PaginationItem
                key={index}
                buttonIndex={index}
                startingIndex={currentPaginationItem.startingIndex}
                endingIndex={currentPaginationItem.endingIndex}
                handleOnClick={handlePaginationItemClick}
                isCurrentlySelected={index === defaultSelectedIndex}
            />;
        });
    };

    let initialPaginationItems = setupPaginationItems(0);

    useEffect(() => {
        setPaginationItems(initialPaginationItems);
    }, [props.pageInfo]);



    const [paginationItems, setPaginationItems] = useState(initialPaginationItems);


    return (
        <div className="columns">
            <div className="column">
                <nav className="pagination" role="navigation" aria-label="pagination">
                    <ul className="pagination-list">{paginationItems}</ul>
                </nav>

            </div>
        </div>
    );

};




export default PaginationList;