import * as actionTypes from '../../actions/actionTypes';

const initState = { 
    hanepbuhayAuth: null,
    authLoading: false,
    authError: null,
}; 

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.HANEPBUHAY_AUTH_START:
            return {
                ...state,
                authLoading: true,
            }
        case actionTypes.HANEPBUHAY_AUTH_SUCCESS:
            return {
                ...state,
                authLoading: false,
                hanepbuhayAuth: action.auth,
            }
        case actionTypes.HANEPBUHAY_AUTH_FAILED:
            return {
                ...state,
                authLoading: false,
                authError: action.err
            }
        case actionTypes.HANEPBUHAY_AUTH_LOGOUT:
            return {
                ...state,
                hanepbuhayAuth: null,
            }
        default: return state;
    }
};

export default authReducer;