import { SET_FETCHING, SET_RESULT} from "../actions/choseCardAction";


const initialState = {
    result: {},
    isFetching: false
}

const choseCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESULT : {
            return {...state, result: action.result}
        }
        case SET_FETCHING : {
            return {
                ...state, isFetching: action.value
            }
        }
        default : {
            return state;
        }
    }
}


export default choseCardReducer;