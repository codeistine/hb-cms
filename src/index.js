import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

//redux imports
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose} from 'redux';

//middleware for async actions 
import thunk from 'redux-thunk';

//redux state persistor 
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

//reducers
import authReducer from './redux/reducers/auth/auth.reducer';
import transactionReducer from './redux/reducers/transactions/transaction.reducer';
import tupadReducer from './redux/reducers/tupad/tupad.reducer';

//redux devtools composer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//persist config for auth
const persistConfig = {
  key: 'hanepbuhay-authetication-glyph',
  storage,
  whitelist: ['hanepbuhayAuth'],
};

//root reducer combining multiple reducers
const rootReducer = combineReducers({
  hanepbuhayAuthenticator: persistReducer(persistConfig, authReducer),
  hanepbuhayTransactions: transactionReducer,
  hanepbuhayTupad: tupadReducer
});

//redux store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

//persistor persisting redux store
export const persistor = persistStore(store);
// persistor.purge();

const app = (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
