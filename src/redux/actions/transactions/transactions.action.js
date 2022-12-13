import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { config } from '../../../config/config';


const fetchTransactionsStart = () => {
    return {
        type: actionTypes.FETCH_TRANSACTIONS_START
    };
};

const fetchTransactionsSuccess = (transactions) => {
    return {
        transactions,
        type: actionTypes.FETCH_TRANSACTIONS_SUCCESS
    }
};

const fetchTransactionsFailed = (err) => {
    return {
        err,
        type: actionTypes.FETCH_TRANSACTIONS_FAILED,
    }
};

export const onFetchTransactions = (page) => {
    return async dispatch => {
        await dispatch(fetchTransactionsStart());
        // console.log(page, 'page on action');
        try {
            const transactions = await axios.get(`${config.transactions}?perPage=25&page=${page}&sort=-created_at`, {
                mode: "cors",
                headers: {
                    "Authorization": "o1Jg74*2f0mI9-ZFMGkILQX$LEqMp%Vj",
                    "Content-Type": "application/json",
                }
            });
            await dispatch(fetchTransactionsSuccess(transactions.data.data));
            // console.log(transactions, 'txn on action')
        } catch (e) {
            console.error(e, e.response);
            await dispatch(fetchTransactionsFailed(e));
        }
    }
};

const fetchTransactionStart = () => {
    return {
        type: actionTypes.FETCH_TRANSACTION_START,
    }
};

const fetchTransactionSuccess = (transaction) => {
    return {
        transaction,
        type: actionTypes.FETCH_TRANSACTION_SUCCESS,
    }
};

const fetchTransactionFailed = (err) => {
    return {
        err,
        type: actionTypes.FETCH_TRANSACTION_FAILED,
    }
};

export const onFetchTransaction = (id) => {
    return async dispatch => {
        await dispatch(fetchTransactionStart());
        try {
            const transaction = await axios.get(`${config.transactions}/${id}`, {
                mode: "cors",
                headers: {
                    "Authorization": "o1Jg74*2f0mI9-ZFMGkILQX$LEqMp%Vj",
                    "Content-Type": "application/json",
                }
            });
   
              await  dispatch(fetchTransactionSuccess(transaction.data.data));
              await dispatch(onFetchTransactions(1));
             

        } catch (e) {
            console.error(e, e.response);
            
                await dispatch(fetchTransactionFailed(e));
          
        }
    }
};

const fetchRejectRemarksStart = () => {
    return {
        type: actionTypes.FETCH_REJECT_REMARKS_START
    }
};

const fetchRejectRemarksSuccess = (remarks) => {
    return {
        remarks,
        type: actionTypes.FETCH_REJECT_REMARKS_SUCCESS
    }
};

const fetchRejectRemarksFailed = (err) => {
    return {
        err,
        type: actionTypes.FETCH_REJECT_REMARKS_FAILED
    }
};

export const onFetchRejectRemarks = () => {
    return async dispatch => {
        await dispatch(fetchRejectRemarksStart());

        try {
            const remarks = await axios.get(`${config.transactions}/invalid-types`);
            await dispatch(fetchRejectRemarksSuccess(remarks.data.data));
        } catch (e) {
            console.log(e, e.response);
            await dispatch(fetchRejectRemarksFailed());
        }
    }
};

const approveIdStart = () => {
    return {
        type: actionTypes.APPROVE_ID_START
    }
};

const approveIdSuccess = (successMessage) => {
    return {
        successMessage,
        type: actionTypes.APPROVE_ID_SUCCESS
    }
};

const approveIdFailed = (errorMessage) => {
    return {
        errorMessage,
        type: actionTypes.APPROVE_ID_FAILED
    }
};

export const onApproveId = (transactionId, reqBody) => {
    return async dispatch => {
        await dispatch(approveIdStart());
        try {
            const approveId = await axios.post(`${config.transactions}/approve/${transactionId}`, reqBody, {
                mode: "cors",
                headers: {
                    "Authorization": "o1Jg74*2f0mI9-ZFMGkILQX$LEqMp%Vj",
                    "Content-Type": "application/json",
                }
            });
            
            await dispatch(onFetchTransaction(transactionId));
            await dispatch(approveIdSuccess("Successfully approved!"));
       
        } catch (e) {
            //  console.log(e.response.data, 'abcd');
            await dispatch(approveIdFailed(e.response.data.error[0].message));
        }
    }
};

const rejectIdStart = () => {
    return {
        type: actionTypes.REJECT_ID_START,
    }
};

const rejectIdSuccess = (successMessage) => {
    return {
        successMessage,
        type: actionTypes.REJECT_ID_SUCCESS
    }
};

const rejectIdFailed = (errorMessage) => {
    return {
        errorMessage,
        type: actionTypes.REJECT_ID_FAILED,
    }
};

export const onRejectId = (transactionId, reqBody) => {
    return async dispatch => {
        await dispatch(rejectIdStart());

        try {
            const rejectId = await axios.post(`${config.transactions}/reject/${transactionId}`, reqBody, {
                mode: "cors",
                headers: {
                    "Authorization": "o1Jg74*2f0mI9-ZFMGkILQX$LEqMp%Vj",
                    "Content-Type": "application/json",
                }
            });
            // console.log('rejectId', rejectId);
            await dispatch(onFetchTransaction(transactionId));
            await dispatch(rejectIdSuccess("Successfully rejected!"));
    
        } catch (e) {
            // console.log(e, e.response);
            await dispatch(rejectIdFailed(e.response.data.message));
        }
    }
};


const filterTransactionsStart = () => {
    return {
        type: actionTypes.FILTER_TRANSACTIONS_START
    }
};

const filterTransactionsSuccess = (filtered) => {
    return {
        filtered,
        type: actionTypes.FILTER_TRANSACTIONS_SUCCESS
    }
};

const filterTransactionsFailed = (err) => {
    return {
        err,
        type: actionTypes.FILTER_TRANSACTIONS_FAILED
    }
};

export const onFilterTransactions = (params) => {
    return async dispatch => {
        await dispatch(filterTransactionsStart());

        try {
            const filtered = await axios.get(`${config.transactions}?perPage=500&${params}`, {
                mode: "cors",
                headers: {
                    "Authorization": "o1Jg74*2f0mI9-ZFMGkILQX$LEqMp%Vj",
                    "Content-Type": "application/json",
                }
            })
            await dispatch(filterTransactionsSuccess(filtered.data.data));
        } catch (e) {
            // console.log(e, e.response);
            await dispatch(filterTransactionsFailed());
        }
    }
}

const discardTransactionStart = () => {
    return {
        type: actionTypes.DISCARD_TRANSACTION_START
    }
};

const discardTransactionSuccess = (response) => {
    return {
        response,
        type: actionTypes.DISCARD_TRANSACTION_SUCCESS
    }
}

const discardTransactionFailed = (err) => {
    return {
        err,
        type: actionTypes.DISCARD_TRANSACTION_FAILED,
    }
}

export const onDiscardTransaction = (transactionId, data) => {
    return async dispatch => {
        await dispatch(discardTransactionStart());

        try {
            const discard = await axios.post(`${config.transactions}/${transactionId}/discard`, data)
            console.log(discard);
            await dispatch(discardTransactionSuccess());
            await dispatch(onFetchTransaction(transactionId))
        } catch (e) {
            console.log(e, e.response)
            await dispatch(discardTransactionFailed(e.response.data.message));
        }
    }
}

const editTransactionStart = () => {
    return {
        type: actionTypes.EDIT_TRANSACTION_START
    }
};

const editTransactionSuccess = (successMessage) => {
    return {
        successMessage,
        type: actionTypes.EDIT_TRANSACTION_SUCCESS,
    }
};

const editTransactionFailed = (errorMessage) => {
    return {
        errorMessage,
        type: actionTypes.EDIT_TRANSACTION_FAILED
    }
};

export const onEditTransaction = (id, data) => {
    return async dispatch => {
        await dispatch(editTransactionStart());

        try {
            const edit = await axios.put(`${config.transactions}/${id}`, data);
            console.log(edit);
            await dispatch(editTransactionSuccess(edit.data.message));
            await dispatch(onFetchTransaction(id));
        } catch (e) {
            console.log(e, e.response);
            await dispatch(editTransactionFailed(e.response.data.message));
        }
    }
};

export const onFetchTransactionsByFbId = (fbid) => {
    return async dispatch => {
        await dispatch(fetchTransactionsStart());
        try {
            const transactions = await axios.get(`${config.transactions}?user=${fbid}&perPage=500`, {
                mode: "cors",
                headers: {
                    "Authorization": "o1Jg74*2f0mI9-ZFMGkILQX$LEqMp%Vj",
                    "Content-Type": "application/json",
                }
            });
            await dispatch(fetchTransactionsSuccess(transactions.data.data));
        } catch (e) {
            console.error(e, e.response);
            await dispatch(fetchTransactionsFailed(e));
        }
    }
}

const fraudDetectStart = () => {
    return {
        type: actionTypes.FRAUD_DETECT_START,
    }
};

const fraudDetectSuccess = (response) => {
    return {
        response,
        type: actionTypes.FRAUD_DETECT_SUCCESS,
    }
};

const fraudDetectFailed = (err) => {
    return {
        err,
        type: actionTypes.FRAUD_DETECT_FAILED,
    }
};

export const onFraudDetect = (data) => {
    return async dispatch => {
        await dispatch(fraudDetectStart());

        try {
            const detection = await axios.post(`${config.fraud}`, data);
            console.log(detection, 'detection');

            if (detection.data.data.exists === true) {
                await dispatch(fraudDetectFailed('RECEIPT DUPLICATE : FLAG AS INVALID'));
            } else {
                await dispatch(fraudDetectSuccess('RECEIPT HAS NO DUPLICATE'));
            }
        } catch (e) {
            console.log(e, e.response, e.response.data.message);

            await dispatch(fraudDetectFailed(e.response.data.message));
        }
    }
};

