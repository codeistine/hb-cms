import * as actionTypes from '../../actions/actionTypes';

const initState = {
    transactions: [],
    fetchTransactionsLoading: false,
    fetchTransactionsError: null,
    transaction: {},
    fetchTransactionLoading: false,
    fetchTransactionError: null,
    actionLoading: false,
    actionMessageSuccess: "",
    actionMessageFailed: "",
    rejectRemarks: [],
    rejectRemarksError: null,
};

const transactionReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TRANSACTIONS_START :
            return {
                ...state,
                fetchTransactionsLoading: true,
            }
        case actionTypes.FETCH_TRANSACTIONS_SUCCESS :
            return {
                ...state,
                fetchTransactionsLoading: false,
                transactions: action.transactions,
            }
        case actionTypes.FETCH_TRANSACTIONS_FAILED : 
            return {
                ...state,
                fetchTransactionsLoading: false,
                fetchTransactionsError: action.error,
            }
        case actionTypes.FILTER_TRANSACTIONS_START :
            return {
                ...state,
                fetchTransactionsLoading: true,
            }
        case actionTypes.FILTER_TRANSACTIONS_SUCCESS :
            return {
                ...state,
                fetchTransactionsLoading: false,
                transactions: action.filtered,
            }
        case actionTypes.FILTER_TRANSACTIONS_FAILED : 
            return {
                ...state,
                fetchTransactionsLoading: false,
                fetchTransactionsError: action.error,
            }
        case actionTypes.FETCH_TRANSACTION_START : 
            return {
                ...state,
                fetchTransactionLoading: true,
                actionMessageFailed: null,
                actionMessageSuccess: null,
            }
        case actionTypes.FETCH_TRANSACTION_SUCCESS :
            return {
                ...state,
                fetchTransactionLoading: false,
                transaction: {...action.transaction},
            }
        case actionTypes.FETCH_TRANSACTION_FAILED : 
            return {
                ...state,
                fetchTransactionLoading: false,
                fetchTransactionError: action.err
            }
        case actionTypes.APPROVE_ID_START :
            return {
                ...state,
                actionLoading: true,
                actionMessageFailed: null,
                actionMessageSuccess: null,
            }
        case actionTypes.APPROVE_ID_SUCCESS :
            return {
                ...state,
                actionLoading: false,
                actionMessageSuccess: action.successMessage,
            }
        case actionTypes.APPROVE_ID_FAILED :
            return {
                ...state,
                actionLoading: false,
                actionMessageFailed: action.errorMessage,
            }
        case actionTypes.REJECT_ID_START :
            return {
                ...state,
                actionLoading: true,
                actionMessageFailed: null,
                actionMessageSuccess: null,
            }
        case actionTypes.REJECT_ID_SUCCESS :
            return {
                ...state,
                actionLoading: false,
                actionMessageSuccess: action.successMessage,
            }
        case actionTypes.REJECT_ID_FAILED :
            return {
                ...state,
                actionLoading: false,
                actionMessageFailed: action.errorMessage,
            }
     
        case actionTypes.EDIT_TRANSACTION_START :
            return {
                ...state,
                actionLoading: true,
                actionMessageFailed: null,
                actionMessageSuccess: null,
            }
        case actionTypes.EDIT_TRANSACTION_SUCCESS :
            return {
                ...state,
                actionLoading: false,
                actionMessageSuccess: action.successMessage,
            }
        case actionTypes.EDIT_TRANSACTION_FAILED :
            return {
                ...state,
                actionLoading: false,
                actionMessageFailed: action.errorMessage,
            }
      
        case actionTypes.FRAUD_DETECT_SUCCESS :
            return {
                ...state,
                actionLoading: false,
                actionMessageSuccess: action.response,
            }
        case actionTypes.FRAUD_DETECT_FAILED :
            return {
                ...state,
                actionLoading: false,
                actionMessageFailed: action.err,
            }
        default: return state;
    }
};

export default transactionReducer;