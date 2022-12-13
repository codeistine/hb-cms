import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { config } from '../../../config/config';

export const hanepbuhayAuthStart = () => {
    return {
        type: actionTypes.HANEPBUHAY_AUTH_START
    }
};

export const hanepbuhayAuthSuccess = (auth) => {
    return {
        auth,
        type: actionTypes.HANEPBUHAY_AUTH_SUCCESS
    }
};

export const hanepbuhayAuthFailed = (err) => {
    return {
        err,
        type: actionTypes.HANEPBUHAY_AUTH_FAILED
    }
};

export const onHanepbuhayAuth = (credentials) => {
    let axiosConfig = {
        headers: {
            "Authorization": "x3LtGQ3*5X35%3xzf2-alVIbDXo(goR$",
            "Content-Type": "application/json",
        }
      };

    return async dispatch => {
        await dispatch(hanepbuhayAuthStart());

        try {
            const authentication = await axios.post(`${config.login}`, credentials, axiosConfig);
            // console.log('aaa', authentication);
            await dispatch(hanepbuhayAuthSuccess(authentication.data));
        } catch (e) {
            // console.log(e, e.response)
            await dispatch(hanepbuhayAuthFailed());
        }
    }   
};

const hanepbuhayAuthLogout = () => {
    return {
        type: actionTypes.HANEPBUHAY_AUTH_LOGOUT,
    }
};

export const onAuthLogout = () => {
    return async dispatch => {
        await dispatch(hanepbuhayAuthLogout());       
    }
};