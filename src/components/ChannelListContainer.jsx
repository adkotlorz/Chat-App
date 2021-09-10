import React, {useState} from 'react';
//Deps Imports
import {ChannelList, useChatContext} from 'stream-chat-react';
import Cookies from 'universal-cookie/es6';
//Components Imports
import {ChannelSearch, TeamChannelList, TeamChannelPreview} from './';
//Assets Import
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar = ({logoutHandler}) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HospitalIcon} alt="Hospital" width="30"/>
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logoutHandler}>
                <img src={LogoutIcon} alt="Logout" width="30"/>
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">
            Medical Pager
        </p>
    </div>
);

const customChannelTeam = (channels) => {
    return channels.filter(channel => channel.type === 'team')
};

const customChannelMessaging = (channels) => {
    return channels.filter(channel => channel.type === 'messaging')
};

const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing}) => {
    const {client} = useChatContext();

    const logoutHandler = () => {
        cookies.remove('token');
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    const filters = {members: {$in: [client.userID]}}

    return (
        <>
            <SideBar logoutHandler={logoutHandler}/>
            <div className="channel-list__list__wrapper">
                <CompanyHeader/>
                <ChannelSearch/>
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelTeam}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="team"
                        />
                    )}
                />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelMessaging}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    );
}

const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
            </div>
            <div className="channel-list__container-responsive"
                 style={{left: toggleContainer ? '0%' : '-89%', backgroundColor: '#005fff'}}
            >
                <div className="channel-list__container-toggle"
                     onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>

                </div>
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            </div>
        </>
    )
}

export default ChannelListContainer;