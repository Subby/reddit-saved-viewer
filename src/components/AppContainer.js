import React from 'react'
import Snoowrap from 'snoowrap'
import SavedContentList from "./SavedContentList";
import PaginationList from "./PaginationList";
import {Filters} from "./controls/Filters"
import 'bulma/css/bulma.css';

class AppContainer extends React.Component {

    NSFWValues = {
        NSFW_ONLY: 'NSFW Only',
        SFW_ONLY: 'SFW Only',
        BOTH: 'NSFW & SFW'
    };

    SubmissionValues = {
        POSTS_ONLY: 'Posts Only',
        SUBMISSIONS_ONLY: 'Submissions Only',
        BOTH: 'Posts & Submissions'
    };

    PageSizeValues = {
        FIVE: 5,
        FIFTEEN: 15,
        THIRTY_FIVE: 35,
        FIFTY_FIVE: 55
    };

    filterValues = {
        filterSubmissionTypeValues: this.SubmissionValues,
        NSFWValues: this.NSFWValues,
        pageSizeValues: this.PageSizeValues,
    };

    componentDidMount() {
        this.retrieveContentFromReddit();
        //this.deserialiseTestData();
    }

    setupPagination(content) {
        let pageInfo = this.sliceContentForPagination(parseInt(this.state.pageSize), content.length);
        this.setState({pageInfo: pageInfo}, this.setupDisplayedContent);
    }

    setupDisplayedContent() {
        let firstPageInfo = this.state.pageInfo[0];
        let slicedContent = [];
        if(firstPageInfo) {
            slicedContent = this.sliceContent(firstPageInfo.startingIndex, firstPageInfo.endingIndex)
        }
        this.setState({displayedContent: slicedContent});
    }

    retrieveContentFromReddit() {
        const reddit = new Snoowrap({
            userAgent: process.env.REACT_APP_USERAGENT,
            clientId: process.env.REACT_APP_CLIENTID,
            clientSecret: process.env.REACT_APP_CLIENTSECRET,
            username: process.env.REACT_APP_USERNAME,
            password: process.env.REACT_APP_PASSWORD
        });
        reddit.getMe().getSavedContent().fetchAll().then(retrievedContent => this.saveSavedContentToState(retrievedContent));
    }

    constructor(props) {
        super(props);

        this.state = {
            savedContent: [],
            filteredContent: [],
            displayedContent: [],
            filterSubredditSearchValue: '',
            filterPostBodyTitleValue: '',
            filterNSFWValue: this.NSFWValues.BOTH,
            filterSubmissionValue: this.SubmissionValues.BOTH,
            pageSize: this.PageSizeValues.FIFTEEN,
            currentPage : 0,
            pageInfo: [],
            currentlySelectedIndex: 0
        };


        this.handlePostFilterChange = this.handlePostFilterChange.bind(this);
        this.handleNsfwFilterChange = this.handleNsfwFilterChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.handleSubredditSearchFilterChange = this.handleSubredditSearchFilterChange.bind(this);
        this.handlePostBodyTitleFilterChange = this.handlePostBodyTitleFilterChange.bind(this);
        this.handlePaginationItemClick = this.handlePaginationItemClick.bind(this);
        this.setupPagination = this.setupPagination.bind(this);
        this.setupDisplayedContent = this.setupDisplayedContent.bind(this);
        this.sliceContent = this.sliceContent.bind(this);
    }

    saveSavedContentToState(retrievedContent) {
        this.setState({savedContent: retrievedContent, filteredContent: retrievedContent}, () => this.setupPagination(retrievedContent));
        console.log(retrievedContent)
    }

    handlePostFilterChange(event) {
        this.setState({filterSubmissionValue: event.target.value});
        this.filterContent();
    }

    handleNsfwFilterChange(event) {
        this.setState({filterNSFWValue: event.target.value});
    }

    handlePageSizeChange(event) {
        this.setState({pageSize: event.target.value});
    }

    handleSubredditSearchFilterChange(event) {
        this.setState({filterSubredditSearchValue: event.target.value});
    }

    handlePostBodyTitleFilterChange(event) {
        this.setState({filterPostBodyTitleValue: event.target.value});
    }

    filterContent() {
        let savedContent = this.state.savedContent;
        let filterSubredditSearchValue = this.state.filterSubredditSearchValue;
        let filterBodyTitleSearchValue = this.state.filterPostBodyTitleValue;

        let filteredByNsfwContent = this.filterByNsfw(savedContent);
        let filteredSubmissionContent = this.filterBySubmissionType(filteredByNsfwContent);
        let filteredSubredditContent = this.filteredSubredditSearchContent(filteredSubmissionContent, filterSubredditSearchValue);
        let filteredPostBodyTitleContent = this.filteredPostBodyTitleSearchContent(filteredSubredditContent, filterBodyTitleSearchValue);
        this.setState({filteredContent: filteredPostBodyTitleContent}, () => this.setupPagination(filteredPostBodyTitleContent));
    }

    filterByNsfw(savedContent) {
        let filteredContent = savedContent;
        switch(this.state.filterNSFWValue) {
            case this.NSFWValues.SFW_ONLY:
                filteredContent = savedContent.filter(function(currentPost) {
                    return !currentPost.over_18;
                });
                break;
            case this.NSFWValues.NSFW_ONLY:
                filteredContent = savedContent.filter(function(currentPost) {
                    return currentPost.over_18;
                });
                break;
            default:
                break;
        }
        return filteredContent;
    }


    filterBySubmissionType(savedContent) {
        let filteredContent = savedContent;
        switch(this.state.filterSubmissionValue) {
            case this.SubmissionValues.SUBMISSIONS_ONLY:
                filteredContent = savedContent.filter(function(currentPost) {
                    return (currentPost.constructor.name === 'Submission');
                });
                break;
            case this.SubmissionValues.POSTS_ONLY:
                filteredContent = savedContent.filter(function(currentPost) {
                    return (currentPost.constructor.name === 'Comment');
                });
                break;
            default:
                break;
        }
        return filteredContent;
    }

    filteredSubredditSearchContent(savedContent, filterSearchValue, filterSearchTypeValue) {
        return savedContent.filter(function (currentPost) {
            const subredditName = currentPost.subreddit_name_prefixed.toLowerCase().substring(2);
            return (subredditName.includes(filterSearchValue));
        });
    }

    filteredPostBodyTitleSearchContent(savedContent, filterSearchValue) {
        if(!filterSearchValue) {
            return savedContent;
        }
        return savedContent.filter(function (currentPost) {
            if (currentPost.constructor.name === 'Comment') {
                return (currentPost.body.toLowerCase().includes(filterSearchValue));
            } else if (currentPost.constructor.name === 'Submission') {
                return (currentPost.title.toLowerCase().includes(filterSearchValue));
            }
        });
    }

    sliceContentForPagination(pageSize, savedContentSize) {
        let slices = Math.ceil(savedContentSize / pageSize);
        let currentStartingIndex = 0;
        let pageInfo = [];
        for(let i = 0; i < slices; i++) {
            let currentPageInfo = {
                startingIndex: currentStartingIndex,
                endingIndex: ((currentStartingIndex + pageSize) - 1)
            };
            pageInfo.push(currentPageInfo);
            currentStartingIndex += pageSize;
        }
        return pageInfo;
    }

    handlePaginationItemClick(startingIndex, endingIndex) {
        let slicedContent = this.sliceContent(startingIndex, endingIndex);
        this.setState({displayedContent: slicedContent, currentlySelectedIndex: startingIndex});
    }

    sliceContent(startingIndex, endingIndex) {
        return this.state.filteredContent.slice(startingIndex, endingIndex);
    }



    render() {
        return <div className="container">
            <header className="has-text-centered">
                <div className="columns">
                    <div className="column">
                        <h2 className="title is-2">Reddit Saved Viewer</h2>
                    </div>
                </div>
                <Filters filterValues={this.filterValues}
                         filterSubmissionTypeValue={this.state.filterSubmissionValue}
                         handleSubmissionTypeChange={this.handlePostFilterChange}
                         filterNSFWValue={this.state.filterNSFWValue}
                         handleNSFWFilterChange={this.handleNsfwFilterChange}
                         filterPageSizeValue={this.state.pageSize}
                         handlePageSizeFilterChange={this.handlePageSizeChange}
                         filterSubredditSearchValue={this.state.filterSubredditSearchValue}
                         handleSubredditSearchFilterChange={this.handleSubredditSearchFilterChange}
                         filterPostBodyTitleValue={this.state.filterPostBodyTitleValue}
                         handlePostBodyTitleFilterChange={this.handlePostBodyTitleFilterChange}
                />
            </header>
            <section id="savedContent">
                <SavedContentList savedContent={this.state.displayedContent}/>
            </section>
            <footer>
                <section id="pagination">
                    <PaginationList
                        pageInfo={this.state.pageInfo}
                        handlePaginationItemClick={this.handlePaginationItemClick}
                    />
                </section>
            </footer>
        </div>
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.componentIsReadyForUpdate(prevState)) {
            this.filterContent();
        }
    }

    componentIsReadyForUpdate(prevState) {
        return prevState.filterNSFWValue !== this.state.filterNSFWValue
            || prevState.filterSubmissionValue !== this.state.filterSubmissionValue
            || prevState.filterSubredditSearchValue !== this.state.filterSubredditSearchValue
            || prevState.filterPostBodyTitleValue !== this.state.filterPostBodyTitleValue
            || prevState.pageSize !== this.state.pageSize;
    }
}

export default AppContainer;