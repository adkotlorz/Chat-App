import React, {useState} from 'react';
import {SearchIcon} from '../assets';
//Deps Imports

const ChannelSearch = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const getChannels = async (text) => {
        try {
            //TODO: fetch channels
        } catch (error) {
            setQuery('');
        }
    }


    const onSearchHandler = (e) => {
        e.preventDefault();

        setLoading(true);
        setQuery(e.target.value);
        getChannels(e.target.value);
    }

    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon/>
                </div>
                <input
                    className="channel-search__input__text"
                    placeholder="Search"
                    type="text"
                    value={query}
                    onChange={onSearchHandler}/>
            </div>
        </div>
    );
}

export default ChannelSearch;