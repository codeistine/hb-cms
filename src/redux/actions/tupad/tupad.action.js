import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { config } from '../../../config/config';

const fetchTupadStart = () => {
    return {
        type: actionTypes.FETCH_TUPAD_START
    }
}

const fetchTupadSuccess = (tupad) => {
    return {
        tupad,
        type: actionTypes.FETCH_TUPAD_SUCCESS
    }
}

const fetchTupadFailed = (err) => {
    return {
        err,
        type: actionTypes.FETCH_TUPAD_FAILED,
    }
}

export const onFetchTupad = (id) => {
    return async dispatch => {
        await dispatch(fetchTupadStart());
        try {
            const tupad = await axios.get(`${config.tupad}/${id}`, {
                mode: "cors",
                headers: {
                    "Authorization": "o1Jg74*2f0mI9-ZFMGkILQX$LEqMp%Vj",
                    "Content-Type": "application/json",
                }
            });

            await dispatch(fetchTupadSuccess(tupad.data.data));
            //console.log('onFetchTupad', tupad)
        } catch (e) {
            // console.error(e, e.response);
            await dispatch(fetchTupadFailed(e));

        }
    }
};

const saveStart = () => {
    return {
        type: actionTypes.SAVE_TUPAD_START
    }
}

const saveSuccess = (successMessage) => {
    return {
        successMessage,
        type: actionTypes.SAVE_TUPAD_SUCCESS
    }
}

const saveFailed = (errorMessage) => {
    return {
        errorMessage,
        type: actionTypes.SAVE_TUPAD_FAILED
    }
}

export const onSaveTupad = (id, reqBody) => {
    return async dispatch => {
        await dispatch(saveStart());
        try {
            const saveTupad = await axios.put(`${config.tupad}/${id}`, reqBody, {
                mode: "cors",
                headers: {
                    "Authorization": "o1Jg74*2f0mI9-ZFMGkILQX$LEqMp%Vj",
                    "Content-Type": "application/json",
                }
            });
            await dispatch(onFetchTupad(id));
            await dispatch(saveSuccess("Successfully updated!"));
        } catch (e) {
            // console.error(e, e.response.data.message);
            await dispatch(saveFailed(e.response.data.error[0].message));

        }
    }
}
