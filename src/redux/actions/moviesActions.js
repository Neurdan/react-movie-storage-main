import axios from "axios";
import {API_KEY} from "../../components/API/apiUrl";

export const SET_NEW_RESULT = 'SET_NEW_RESULT';
export const CHANGE_VALUE_MOVIE = 'CHANGE_VALUE_MOVIE';
export const SET_IS_FETCHING_MOVIE = 'SET_IS_FETCHING_MOVIE';
export const SET_IS_FETCHING_ADDING = 'SET_IS_FETCHING_ADDING';
export const SET_ERROR = 'SET_ERROR';
export const SET_NEW_FIND_RESULT = 'SET_NEW_FIND_RESULT';
export const SET_FIND_ERROR = 'SET_FIND_ERROR';
export const SET_TOTAL_RESULTS = 'SET_TOTAL_RESULTS';
export const CHANGE_CURRENT_PORTION_FOR_PAGE = 'CHANGE_CURRENT_PORTION_FOR_PAGE';
export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';

export const changeValueMovie = value => {
    return {type: CHANGE_VALUE_MOVIE, value}
}
const setIsFetchingMovie = (value) => {
    return {type: SET_IS_FETCHING_MOVIE, value}
}
const setIsFetchingAdding = (value) => {
    return {type: SET_IS_FETCHING_ADDING, value}
}

const changeCurrentPage = (value) => {
    return {type: CHANGE_CURRENT_PAGE, value}
}
export const changePortionPage = (portionPage) => {
    return {type: CHANGE_CURRENT_PORTION_FOR_PAGE, portionPage}
}
const setTotalResults = (value) => {
    return {type: SET_TOTAL_RESULTS, value}
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

export const getNewItems = (loader = true, currentPage = 1) => {
    return (dispatch, getState) => {
        let offset = currentPage === 1 ? 0 : ((currentPage * 20) - 20);
        if (loader) dispatch(setIsFetchingMovie(true))
        axios.get(`${getState().login.urlApi}/movies?sort=title&offset=${offset}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().login.apiKey
            },
        })
            .then(({data}) => {
                dispatch(setNewResult(data.data));
                dispatch(setTotalResults(data.meta.total))
                dispatch(changeCurrentPage(currentPage))
                dispatch(setIsFetchingMovie(false))
            })
            .catch(err => console.log(err))
    }
}

export const getFindResultThunk = (query) => {
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
                    dispatch(setIsFetchingAdding(false))
                } else {
                    dispatch(setError({}))
                    dispatch(setIsFetchingAdding(false))
                    dispatch(getNewItems())

                }

            })
            .catch(err => console.log(err))

    }
}