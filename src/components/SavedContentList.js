import React from 'react'
import SavedContentItem from "./SavedContentItem";

const SavedContentList = (props) => {

    const savedContentItems = props.savedContent.map((currentSavedContentItem) => {
        return <SavedContentItem
            key={currentSavedContentItem.id}
            url={currentSavedContentItem.url}
            title={currentSavedContentItem.title}
            subreddit={currentSavedContentItem.subreddit_name_prefixed}
            postedBy={currentSavedContentItem.author.name}
            postedDate={currentSavedContentItem.created}
            isNsfw={currentSavedContentItem.over_18}
        />
    });

    return (
       <div id="buttons">{savedContentItems}</div>
    )


};

export default SavedContentList;