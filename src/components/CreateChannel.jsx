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

const CreateChannel = ({createType, setIsCreating}) => {
    const [channelName, setChannelName] = useState('');
    const {client, setActiveChannel} = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);

    const createChannelHandler = async (e) => {
        e.preventDefault();

        try {
            const newChannel = await client.channel(createType, channelName, {
                name: channelName,
                members: selectedUsers,
            });

            await newChannel.watch();

            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === 'team' ? 'Create new channel' : 'Send a direct message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating}/>
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList setSelectedUsers={setSelectedUsers}/>
            <div className="create-channel__button-wrapper" onClick={createChannelHandler}>
                <p>{createType === 'team' ? 'Create new channel' : 'Create message group'}</p>
            </div>
        </div>
    );
}

export default CreateChannel;