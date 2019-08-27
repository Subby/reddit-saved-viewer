import React from 'react'
import Snoowrap from 'snoowrap'
import SavedContentList from "./SavedContentList";

class AppContainer extends React.Component {


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
            filteredContent: []
        };

        reddit.getMe().getSavedContent().then(value => this.saveSavedContentToState(value))
    }

    saveSavedContentToState(retrievedContent) {
        this.setState({savedContent: retrievedContent});
        console.log(retrievedContent)
    }

    render() {
        return <div>
            <header>
                <p>Header</p>
            </header>
            <section id="savedContent">
                <SavedContentList savedContent={this.state.savedContent}/>
            </section>
        </div>
    }
}

export default AppContainer;