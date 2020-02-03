import React from 'react'
import SavedContentItem from "./SavedContentItem";

const SavedContentList = (props) => {

    const determineThumbnailImage = (thumbnail) => {
        if(thumbnail === "self") {
            return "https://www.reddit.com/static/self_default2.png";
        } else if(thumbnail === "default" || thumbnail === "image" || !thumbnail) {
            return "https://www.reddit.com/static/noimage.png";
        } else if(thumbnail === "nsfw") {
            return "https://www.reddit.com/static/nsfw2.png";
        } else {
            return thumbnail;
        }
    };

    const savedContentItems = props.savedContent.map((currentSavedContentItem) => {
        return <SavedContentItem
            key={currentSavedContentItem.id}
            url={currentSavedContentItem.url}
            title={currentSavedContentItem.title}
            thumbnail={determineThumbnailImage(currentSavedContentItem.thumbnail)}
            subreddit={currentSavedContentItem.subreddit_name_prefixed}
            postedBy={currentSavedContentItem.author.name}
            postedDate={currentSavedContentItem.created}
            isNsfw={currentSavedContentItem.over_18}
        />
    });

    if(savedContentItems.length === 0) {
        return (
            <div className="columns">
                <div className="column is-centered is-vcentered">
                    <progress className="progress is-small is-info" max="100">15%</progress>
                </div>
            </div>
        )
    } else {
        return (
            <div id="buttons">
                {savedContentItems}
            </div>
        )
    }



};

export default SavedContentList;