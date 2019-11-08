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
            filterSubredditSearchValue: '',
            filterPostBodyTitleValue: '',
            filterNSFWValue: this.NSFWValues.BOTH,
            filterSubmissionValue: this.SubmissionValues.BOTH
        };

        reddit.getMe().getSavedContent().then(value => this.saveSavedContentToState(value));
        this.handlePostFilterChange = this.handlePostFilterChange.bind(this);
        this.handleNsfwFilterChange = this.handleNsfwFilterChange.bind(this);
        this.handleSubredditSearchFilterChange = this.handleSubredditSearchFilterChange.bind(this);
        this.handlePostBodyTitleFilterChange = this.handlePostBodyTitleFilterChange.bind(this);
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
        this.setState({filteredContent: filteredPostBodyTitleContent});
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
        return savedContent.filter(function (currentPost) {
            if (currentPost.constructor.name === 'Comment') {
                return (currentPost.body.toLowerCase().includes(filterSearchValue));
            } else if (currentPost.constructor.name === 'Submission') {
                return (currentPost.title.toLowerCase().includes(filterSearchValue));
            }
        });
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
                <input type="text" name="" value={this.state.filterSubredditSearchValue} onChange={this.handleSubredditSearchFilterChange} placeholder="/r/"/>
                <input type="text" name="" value={this.state.filterPostBodyTitleValue} onChange={this.handlePostBodyTitleFilterChange} placeholder="Search for titles and comment content"/>
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
            || prevState.filterSubredditSearchValue !== this.state.filterSubredditSearchValue
            || prevState.filterPostBodyTitleValue !== this.state.filterPostBodyTitleValue;
    }
}

export default AppContainer;