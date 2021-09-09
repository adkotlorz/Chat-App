import React, {useState} from 'react';
//Deps Imports
import axios from 'axios';
import Cookies from 'universal-cookie/es6';
//Assets Imports
import signInImage from '../assets/signup.jpg';


const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const {fullName, username, password, phoneNumber, avatarURL} = form;

        const URL = 'http://localhost:5000/auth';

        const {data: {token, userId, hashedPassword}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName, phoneNumber, avatarURL
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    };

    const toggleMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
    };

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign up' : 'Sign in'}</p>
                    <form onSubmit={submitHandler}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>
                                {isSignup ? 'Sign Up' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup ? 'Already have an account?' : 'Dont have an account?'}
                            <span onClick={toggleMode}>
                                {isSignup ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signInImage} alt="sign in"/>
            </div>
        </div>
    );
}

export default Auth;