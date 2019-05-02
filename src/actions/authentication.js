// authentication.js

import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
axios.defaults.baseURL = "http://localhost:4000/api/";

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const loginUser = (user) => dispatch => {
    axios.post('connexion/signIn', user)
        .then((response) => {
            response.data.use._exp =  Date.now();
            const token  = JSON.stringify(response.data.user);

            localStorage.setItem('jwtToken', token);

            setAuthToken(token);
            console.log(token)
            // const decoded = jwt_decode(token);
            // console.log('decoded');
            // console.log(decoded)

            dispatch(setCurrentUser(token));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
    
                payload: err.message
            });
        });
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
};