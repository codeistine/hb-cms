import React from 'react';
import './App.scss';
import Layout from './hoc/Layout';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import Transactions from './containers/Transactions/Transactions.container';
import Login from './containers/Login/Login.container';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.security';

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        The page is currently unavailable.
      </h3>
    </div>
  );
};

const App = () => {
  const location = useLocation();
  const hanepbuhayAuth = useSelector(state => state.hanepbuhayAuthenticator.hanepbuhayAuth || '');

  return (
    <Layout location={location} auth={hanepbuhayAuth}>
      <Switch>
        {/* <ProtectedRoute component={TransactionsView} path='/transactions/:id' exact auth={hanepbuhayAuth} /> */}
        <ProtectedRoute component={Transactions} path='/home' exact auth={hanepbuhayAuth} />
        <Route component={Login} path='/login' exact />
        <Route exact path='/'>
          {!hanepbuhayAuth ? <Redirect to='/login'/> : <Redirect to='/home'/>}
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Layout>
  )
};

export default App;
