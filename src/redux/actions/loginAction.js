import axios from "axios";
import {API_KEY} from "../../components/API/apiUrl";

export const SET_API_KEY = 'SET_API_KEY';
export const SET_IS_FETCHING_LOGIN = 'SET_IS_FETCHING_LOGIN';
export const SET_ERROR_LOGIN = 'SET_ERROR_LOGIN';
export const SET_URL_API = 'SET_URL_API';

const setApiKey = (value) => {
    return {type: SET_API_KEY, value}
}
const setUrlApi = (value) => {
    return {type: SET_URL_API, value}
}
const setIsFetchingLogin= (value) => {
    return {type: SET_IS_FETCHING_LOGIN, value}
}
const setErrorLogin = (obj) => {
    return {type: SET_ERROR_LOGIN, obj}
}

export const createSessionThunk =  (url) =>{
    return async dispatch => {
        dispatch(setUrlApi(url))
        await axios.post(`${url}/users`,{
            "email": "petro@gmail.com",
            "name": "Petrov Petro",
            "password": "super-password",
            "confirmPassword": "super-password"
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        axios.post(`${url}/sessions`,{
            "email": "petro@gmail.com",
            "password": "super-password",
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(({data}) => {
                dispatch(setApiKey(data.token))
            })
            .catch((error) => Promise.reject(error));
    }
}