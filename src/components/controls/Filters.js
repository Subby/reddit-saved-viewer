import FilterSelectControl from "./FilterSelectControl"
import InputControl from "./InputControl";
import * as PropTypes from "prop-types";
import React from "react";

export function Filters(props) {
    const filterValues = props.filterValues;
    return <section id="filters">
        <div className="columns">
            <div className="column">
                <FilterSelectControl value={props.filterSubmissionTypeValue}
                                     onChange={props.handleSubmissionTypeChange}
                                     optionValues={filterValues.filterSubmissionTypeValues}
                                     label={"Filter by submission type"}/>
            </div>
            <div className="column">
                <FilterSelectControl value={props.filterNSFWValue}
                                     onChange={props.handleNSFWFilterChange}
                                     optionValues={filterValues.NSFWValues}
                                     label={"Filter by NSFW"}/>
            </div>
            <div className="column">
                <FilterSelectControl value={props.filterPageSizeValue}
                                     onChange={filterValues.handlePageSizeFilterChange}
                                     optionValues={filterValues.pageSizeValues}
                                     label={"Number of posts to display"}/>
            </div>
        </div>
        <div className="columns is-vcentered">
            <div className="column">
                <InputControl value={props.filterSubredditSearchValue}
                              onChange={props.handleSubredditSearchFilterChange}
                              placeholder={"/r/"}
                              label={"Filter by subreddit"}/>
            </div>
            <div className="column">
                <InputControl value={props.filterPostBodyTitleValue}
                              onChange={filterValues.handlePostBodyTitleFilterChange}
                              placeholder={"Search for titles and comment content"}
                              label={"Filter by post titles or bodies"}/>
            </div>
        </div>
    </section>;
}

/*
Filters.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    optionValues: PropTypes.shape({
        SUBMISSIONS_ONLY: PropTypes.string,
        POSTS_ONLY: PropTypes.string,
        BOTH: PropTypes.string
    }),
    value1: PropTypes.any,
    onChange1: PropTypes.func,
    optionValues1: PropTypes.shape({NSFW_ONLY: PropTypes.string, SFW_ONLY: PropTypes.string, BOTH: PropTypes.string}),
    value2: PropTypes.any,
    onChange2: PropTypes.func,
    optionValues2: PropTypes.shape({
        FIVE: PropTypes.number,
        THIRTY_FIVE: PropTypes.number,
        FIFTY_FIVE: PropTypes.number,
        FIFTEEN: PropTypes.number
    }),
    value3: PropTypes.any,
    onChange3: PropTypes.func,
    value4: PropTypes.any,
    onChange4: PropTypes.func
};*/
