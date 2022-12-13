import * as actionTypes from '../../actions/actionTypes';

const initState = {
    tupad: {},
    fetchTupadLoading: false,
    fetchTupadError: null,
    actionLoading: false,
    actionMessageSuccess: "",
    actionMessageFailed: "",
}

const tupadReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TUPAD_START:
            return {
                ...state,
                fetchTupadLoading: true,
            }
        case actionTypes.FETCH_TUPAD_SUCCESS:
            return {
                ...state,
                fetchTupadLoading: false,
                tupad: action.tupad,
            }

        case actionTypes.FETCH_TUPAD_FAILED:
            return {
                ...state,
                fetchTupadLoading: false,
                fetchTupadError: action.error
            }

        case actionTypes.SAVE_TUPAD_START : 
            return {
                ...state, 
                actionLoading: true,
                actionMessageFailed: null,
                actionMessageSuccess: null,
            }

            case actionTypes.SAVE_TUPAD_SUCCESS :
                return {
                    ...state,
                    actionLoading: false,
                    actionMessageSuccess: action.successMessage
                }
            case actionTypes.SAVE_TUPAD_FAILED: 
            return {
                ...state,
                actionLoading: false,
                actionMessageFailed: action.errorMessage,
            }
        default: return state;
    }
}

export default tupadReducer;

