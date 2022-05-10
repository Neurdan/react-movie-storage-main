import axios from "axios";
import {
    CHANGE_VALUE_MOVIE,
    SET_ERROR, SET_FIND_ERROR,
    SET_IS_FETCHING_ADDING,
    SET_IS_FETCHING_MOVIE,
    SET_NEW_FIND_RESULT,
    SET_NEW_RESULT
} from "../actions/moviesActions";

const initialState = {
    result: [],
    findResult:[],
    query: '',
    sought: '',
    error: {},
    errorFind:{},
    isFetchingMovie: false,
    isFetchingAdding: false,
}

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEW_RESULT : {
            return {
                ...state, result: [...action.result]
            }
        }
        case SET_NEW_FIND_RESULT: {
            return{
                ...state, findResult: [...action.result], query: action.query
            }
        }
        case CHANGE_VALUE_MOVIE : {
            return {
                ...state, query: action.value
            }
        }
        case SET_IS_FETCHING_MOVIE : {
            return {
                ...state, isFetchingMovie: action.value
            }
        }
        case SET_IS_FETCHING_ADDING : {
            return {
                ...state, isFetchingAdding: action.value
            }
        }
        case SET_ERROR: {
            return {
                ...state, error: action.obj
            }
        }
        case SET_FIND_ERROR: {
            return {
                ...state, errorFind: action.obj
            }
        }
        default : {
            return state;
        }
    }
}


export default moviesReducer;