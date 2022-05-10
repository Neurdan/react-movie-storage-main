import axios from "axios";
import {SET_API_KEY, SET_ERROR_LOGIN, SET_IS_FETCHING_LOGIN, SET_URL_API} from "../actions/loginAction";

const initialState = {
    apiKey:'',
    errorLogin:{},
    isFetchingLogin: {},
    urlApi:'',
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_API_KEY : {
            return {
                ...state, apiKey: action.value
            }
        }
        case SET_URL_API : {
            return {
                ...state, urlApi: action.value
            }
        }
        case SET_IS_FETCHING_LOGIN : {
            return {
                ...state, isFetchingLogin: action.value
            }
        }
        case SET_ERROR_LOGIN: {
            return {
                ...state, error: action.obj
            }
        }
        default : {
            return state;
        }
    }
}


export default loginReducer;