import axios from "axios";
import {getNewItems} from "./moviesActions";

export const SET_RESULT = 'SET_RESULT';
export const SET_FETCHING = 'SET_FETCHING';

const setFetchingAC = (value) => {
    return {type: SET_FETCHING, value}
}
const setResultAC = (result) => {
    return {type: SET_RESULT, result}
}
export const setResultThunk = (id) => {
    return (dispatch, getState) => {

        axios.get(`${getState().login.urlApi}/movies/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().login.apiKey
            },
        })
            .then(({data}) => {
                dispatch(setResultAC(data.data));
            })
            .catch(err => console.log(err))

    }
}

export const deleteMovieThunk = (id) => {
    return (dispatch, getState) => {
        dispatch(setFetchingAC(true));
        axios.delete(`${getState().login.urlApi}/movies/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().login.apiKey
            },
        })
            .then(()=>{
                dispatch(setFetchingAC(false));
                dispatch(getNewItems())
            })
            .catch(err => console.log(err))
    }
}