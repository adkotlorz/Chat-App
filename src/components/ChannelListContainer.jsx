import React from 'react';
//Deps Imports
import {ChannelList, useChatContext} from 'stream-chat-react';
//Components Imports
import {ChannelSearch, TeamChannelList, TeamChannelPreview} from './';
//Assets Import
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';


const SideBar = () => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HospitalIcon} alt='Hospital' width='30'/>
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner">
                <img src={LogoutIcon} alt='Logout' width='30'/>
            </div>
        </div>
    </div>
);

const ChannelListContainer = () => {
    return (
        <>
            <SideBar/>
        </>
    );
}

export default ChannelListContainer;