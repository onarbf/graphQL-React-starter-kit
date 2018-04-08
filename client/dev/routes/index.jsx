import React from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './home';
import Signin from './signin';
import Login from './login';

const Routes = ()=>{
  return(
    <Router>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/signin' exact component={Signin}/>
        <Route path='/login' exact component={Login}/>
      </Switch>
    </Router>
  )
}

export default Routes;
