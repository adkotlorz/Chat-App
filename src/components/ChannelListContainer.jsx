import React from 'react';
//Deps Imports
import {ChannelList} from 'stream-chat-react';
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

const ChannelListContainer = () => {
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

    return (
        <>
            <SideBar logoutHandler={logoutHandler}/>
            <div className="channel-list__list__wrapper">
                <CompanyHeader/>
                <ChannelSearch/>
                <ChannelList
                    filter={{}}
                    channelRenderFilterFn={() => {
                    }}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="team"
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
                    filter={{}}
                    channelRenderFilterFn={() => {
                    }}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="messaging"
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

export default ChannelListContainer;