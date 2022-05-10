import axios from "axios";
import {API_KEY} from "../../components/API/apiUrl";

export const SET_NEW_RESULT = 'SET_NEW_RESULT';
export const CHANGE_VALUE_MOVIE = 'CHANGE_VALUE_MOVIE';
export const SET_IS_FETCHING_MOVIE = 'SET_IS_FETCHING_MOVIE';
export const SET_IS_FETCHING_ADDING = 'SET_IS_FETCHING_ADDING';
export const SET_ERROR = 'SET_ERROR';
export const SET_NEW_FIND_RESULT = 'SET_NEW_FIND_RESULT';
export const SET_FIND_ERROR = 'SET_FIND_ERROR';

export const changeValueMovie = value => {
    return {type: CHANGE_VALUE_MOVIE, value}
}
const setIsFetchingMovie = (value) => {
    return {type: SET_IS_FETCHING_MOVIE, value}
}
const setIsFetchingAdding = (value) => {
    return {type: SET_IS_FETCHING_ADDING, value}
}
const setError = (obj) => {
    return {type: SET_ERROR, obj}
}
const setFindError = (obj) => {
    return {type: SET_FIND_ERROR, obj}
}
const setNewResult = (result, query = "") => {
    return {type: SET_NEW_RESULT, result, query}
}

const setNewFindResult = (result, query) => {
    return {type: SET_NEW_FIND_RESULT, result, query}
}

export const getNewItems = (loader = true) => {
    return (dispatch, getState) => {
        if (loader) dispatch(setIsFetchingMovie(true))
        axios.get(`${getState().login.urlApi}/movies?sort=title`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().login.apiKey
            },
        })
            .then(({data}) => {
                dispatch(setNewResult(data.data));
                dispatch(setIsFetchingMovie(false))
            })
            .catch(err => console.log(err))
    }
}

export const getFindResultThunk= (query) => {
    return (dispatch, getState) => {
        dispatch(setIsFetchingMovie(true))
        axios.get(`${getState().login.urlApi}/movies?search=${query}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().login.apiKey
            },
        })
            .then(({data}) => {
                if (data.error) {
                    dispatch(setFindError(data.error))
                } else {
                    dispatch(setNewFindResult(data.data, query));
                    dispatch(setFindError({}))
                }
                dispatch(setIsFetchingMovie(false))
            })
            .catch(err => console.log(err))
    }
}

export const addMovieThunk = (obj) => {
    return (dispatch, getState) => {
        dispatch(setIsFetchingAdding(true))
        axios.post(`${getState().login.urlApi}/movies`, obj, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().login.apiKey
            },
        })
            .then(data => {
                if (data.data.error) {
                    dispatch(setError(data.data.error))
                } else {
                    dispatch(setError({}))
                }
                dispatch(setIsFetchingAdding(false))
            })
            .catch(err => console.log(err))

    }
}