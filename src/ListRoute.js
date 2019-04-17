import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

class ListRoute extends Component {
 
 
  render() {
console.log('ici 6')
    return (
          <div>
            <Switch>
              <Route path='/signIn' component={Login} />
              <Route path='/signUp' component={Register} />
            </Switch>
          </div>



    );
  }
}

export default ListRoute;