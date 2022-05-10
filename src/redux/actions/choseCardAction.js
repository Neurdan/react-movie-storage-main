import axios from "axios";
import {API_KEY} from "../../components/API/apiUrl";

export const SET_RESULT = 'SET_RESULT';
export const SET_FETCHING = 'SET_FETCHING';

const setFetchingAC = () => {
    return {type: SET_FETCHING}
}
const setResultAC = (result) => {
    return {type: SET_RESULT, result}
}
export const setResultThunk = (id) => {
    return (dispatch, getState) => {
        dispatch(setFetchingAC(true));

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

        dispatch(setFetchingAC(false));
    }
}

export const deleteMovieThunk = (id) => {
    return (dispatch, getState) => {
        dispatch(setFetchingAC(true));
        axios.delete(`http://localhost:8001/api/v1/movies/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().login.apiKey
            },
        })
            .catch(err => console.log(err))
        dispatch(setFetchingAC(false));
    }
}