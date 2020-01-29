import React from 'react'


const SavedContentItem = (props) => {
    return (
        <div className="columns">
            <div className="column is-one-quarter">
                <img src={props.thumbnail} alt="Thumbnail"/>
            </div>
            <div className="column">
                <h1><a href={props.url}>{props.title}</a></h1>
                <p><a href={'http://reddit.com/r/' + props.subreddit}>{props.subreddit}</a></p>
                <p><a href={'http://reddit.com/u/' + props.postedBy}>{props.postedBy}</a></p>
                <p>{props.postedDate}</p>
                <p>{props.nsfw}</p>
            </div>

        </div>
    )
};


export default SavedContentItem;