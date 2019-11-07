import React from 'react'
import Snoowrap from 'snoowrap'
import SavedContentList from "./SavedContentList";

class AppContainer extends React.Component {

    NSFWValues = {
        NSFW_ONLY: 'nsfw_only',
        SFW_ONLY: 'sfw_only',
        BOTH: 'both'
    };

    SubmissionValues = {
        POSTS_ONLY: 'posts_only',
        SUBMISSIONS_ONLY: 'submissions_only',
        BOTH: 'both'
    };

    SearchFilterTypeValues = {
       SUBREDDIT: 'subreddit',
       POSTS_TITLES_AND_COMMENT_BODIES: 'post_titles_and_bodies'
    };

    constructor(props) {
        super(props);
        const reddit = new Snoowrap({
            userAgent: process.env.REACT_APP_USERAGENT,
            clientId: process.env.REACT_APP_CLIENTID,
            clientSecret: process.env.REACT_APP_CLIENTSECRET,
            username: process.env.REACT_APP_USERNAME,
            password: process.env.REACT_APP_PASSWORD
        });

        this.state = {
            savedContent: [],
            filteredContent: [],
            filterSearchValue: '',
            filterNSFWValue: this.NSFWValues.BOTH,
            filterSubmissionValue: this.SubmissionValues.BOTH,
            filterSearchTypeValue: this.SearchFilterTypeValues.SUBREDDIT
        };

        reddit.getMe().getSavedContent().then(value => this.saveSavedContentToState(value));
        this.handlePostFilterChange = this.handlePostFilterChange.bind(this);
        this.handleNsfwFilterChange = this.handleNsfwFilterChange.bind(this);
        this.handleSearchFilterChange = this.handleSearchFilterChange.bind(this);
        this.handleSearchFilterTypeChange = this.handleSearchFilterTypeChange.bind(this);
    }

    saveSavedContentToState(retrievedContent) {
        this.setState({savedContent: retrievedContent, filteredContent: retrievedContent});
        console.log(retrievedContent)
    }

    handlePostFilterChange(event) {
        this.setState({filterSubmissionValue: event.target.value});
        console.log("post filter val:" + this.state.filterSubmissionValue);
        this.filterContent();
    }

    handleNsfwFilterChange(event) {
        this.setState({filterNSFWValue: event.target.value});
        console.log("post filter val:" + this.state.filterNSFWValue);
    }

    handleSearchFilterChange(event) {
        this.setState({filterSearchValue: event.target.value});
    }

    handleSearchFilterTypeChange(event) {
        this.setState({filterSearchTypeValue: event.target.value});
    }

    filterContent() {
        let savedContent = this.state.savedContent;
        let filterSearchValue = this.state.filterSearchValue;
        let filterSearchTypeValue = this.state.filterSearchTypeValue;

        let filteredByNsfwContent = this.filterByNsfw(savedContent);
        let filteredSubmissionContent = this.filterBySubmissionType(filteredByNsfwContent);
        let filteredSearchedContent = this.filteredSearchContent(filteredSubmissionContent, filterSearchValue, filterSearchTypeValue);
        this.setState({filteredContent: filteredSearchedContent});
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

    filteredSearchContent(savedContent, filterSearchValue, filterSearchTypeValue) {
        if(filterSearchTypeValue === this.SearchFilterTypeValues.SUBREDDIT) {
            return savedContent.filter(function (currentPost) {
                const subredditName = currentPost.subreddit_name_prefixed.toLowerCase().substring(2);
                return (subredditName.includes(filterSearchValue));
            });
        } else if(filterSearchTypeValue === this.SearchFilterTypeValues.POSTS_TITLES_AND_COMMENT_BODIES) {
            return savedContent.filter(function (currentPost) {
                if (currentPost.constructor.name === 'Comment') {
                    return (currentPost.body.toLowerCase().includes(filterSearchValue));
                } else if (currentPost.constructor.name === 'Submission') {
                    return (currentPost.title.toLowerCase().includes(filterSearchValue));
                }
            });
        }
    }

    render() {
        return <div>
            <header>
                <p>Header</p>
                <select id="postFilterSelection" value={this.state.filterSubmissionValue} onChange={this.handlePostFilterChange}>
                    <option value={this.SubmissionValues.BOTH}>Both</option>
                    <option value={this.SubmissionValues.SUBMISSIONS_ONLY}>Submissions Only</option>
                    <option value={this.SubmissionValues.POSTS_ONLY}>Posts Only</option>
                </select>
                <select id="nsfwFilterSelection" value={this.state.filterNSFWValue} onChange={this.handleNsfwFilterChange}>
                    <option value={this.NSFWValues.BOTH}>Both</option>
                    <option value={this.NSFWValues.SFW_ONLY}>SFW only</option>
                    <option value={this.NSFWValues.NSFW_ONLY}>NSFW Only</option>
                </select>
                <input type="text" name="" value={this.state.filterSearchValue} onChange={this.handleSearchFilterChange} placeholder="/r/"/>
                <select id="searchFilterTypeSelection" value={this.state.filterSearchTypeValue} onChange={this.handleSearchFilterTypeChange}>
                    <option value={this.SearchFilterTypeValues.SUBREDDIT}>Subreddits</option>
                    <option value={this.SearchFilterTypeValues.POSTS_TITLES_AND_COMMENT_BODIES}>Post titles and comment bodies</option>
                </select>
            </header>
            <section id="savedContent">
                <SavedContentList savedContent={this.state.filteredContent}/>
            </section>
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
            || prevState.filterSearchValue !== this.state.filterSearchValue
            || prevState.filterSearchTypeValue !== this.state.filterSearchTypeValue;
    }
}

export default AppContainer;