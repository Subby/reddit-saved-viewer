import React, {useState} from 'react';


const PaginationItem = (props) => {
    const [isCurrentlySelected, setIsCurrentlySelected] = useState(false);
    const setInactive = () => {setIsCurrentlySelected(false)};
    this.setState({props: setInactive})
    const paginationPrefix = "pagination-link";
    return (
        <li>
            <a className=
                   {isCurrentlySelected
                       ? paginationPrefix + "is-current"
                       : paginationPrefix
                   }
               onClick={() => {
                   setIsCurrentlySelected(true);
                   props.handleSetActive(props.buttonIndex);
                   props.handleOnClick(props.startingIndex, props.endingIndex)
               }
               }>
                {props.buttonIndex + 1}
            </a>
        </li>
    );
};

export default PaginationItem;