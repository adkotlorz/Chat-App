import React from 'react';
//Deps Imports
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
//Components Imports
import {ChannelContainer, ChannelListContainer} from './components';


const apiKey = process.env.REACT_APP_API_KEY;

const client = StreamChat.getInstance(apiKey);

const App = () => {
    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer/>
                <ChannelContainer/>
            </Chat>
        </div>
    );
}

export default App;