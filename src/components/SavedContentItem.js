import React from 'react'


const SavedContentItem = (props) => {
    return (
        <div className="box">
            <div className="media">
                <figure className="media-left">
                    <img loading="lazy" src={props.thumbnail} alt="Thumbnail"/>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <h1><a href={props.url}>{props.title}</a></h1>
                        <p><a href={'http://reddit.com/r/' + props.subreddit}>{props.subreddit}</a></p>
                        <p><a href={'http://reddit.com/u/' + props.postedBy}>{props.postedBy}</a></p>
                        <p>{props.postedDate}</p>
                        <p>{props.nsfw}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default SavedContentItem;