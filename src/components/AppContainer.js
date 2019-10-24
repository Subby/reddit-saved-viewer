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
            filterSearchValue: '',
            filterNSFWValue: this.NSFWValues.BOTH,
            filterSubmissionValue: this.SubmissionValues.BOTH
        };

        reddit.getMe().getSavedContent().then(value => this.saveSavedContentToState(value));
        this.handlePostFilterChange = this.handlePostFilterChange.bind(this);
    }

    saveSavedContentToState(retrievedContent) {
        this.setState({savedContent: retrievedContent, filteredContent: retrievedContent});
        console.log(retrievedContent)
    }

    handlePostFilterChange(event) {
        let savedContent = this.state.savedContent;
        let filteredContent = savedContent;
        switch(event.target.value) {
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
        this.setState({filteredContent: filteredContent, filterSubmissionValue: event.target.value});
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
                <select id="nsfwFilterSelection" value={this.state.filterNSFWValue}>
                    <option value={this.NSFWValues.BOTH}>Both</option>
                    <option value={this.NSFWValues.SFW_ONLY}>SFW only</option>
                    <option value={this.NSFWValues.NSFW_ONLY}>NSFW Only</option>
                </select>
                <input type="text" name="" value={this.state.filterSearchValue}/>
            </header>
            <section id="savedContent">
                <SavedContentList savedContent={this.state.filteredContent}/>
            </section>
        </div>
    }
}

export default AppContainer;