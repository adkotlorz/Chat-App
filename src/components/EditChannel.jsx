import React, {useState} from 'react';
//Deps Import
import {useChatContext} from 'stream-chat-react';
//Components Import
import {UserList} from './';
//Assets Import
import {CloseCreateChannel} from '../assets';

const ChannelNameInput = ({channelName = '', setChannelName}) => {

    const changeHandler = (e) => {
        e.preventDefault();

        setChannelName(e.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={changeHandler} placeholder="Channel Name"/>
            <p>Add Members</p>
        </div>
    );
}

const EditChannel = ({setIsEditing}) => {
    const {channel} = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name)
    const [selectedUsers, setSelectedUsers] = useState([]);

    const updateChannel = async (e) => {
        e.preventDefault();

        const nameChanged = channelName !== (channel.data.name || channel.data.id);

        if (nameChanged) {
            await channel.update({name: channelName}, {text: `Channel name changed to ${channelName}`});
        }

        if (selectedUsers.length) {
            await channel.addMembers(selectedUsers);
        }

        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);
    }

    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing}/>
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
            <UserList setSelectedUsers={setSelectedUsers}/>
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save Changes</p>
            </div>
        </div>
    );
}

export default EditChannel;