import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import Profil from './Profil';
import Register from './Register';
import  Home  from './Home';

class ListRoute extends Component {
 
 
  render() {
console.log('ici 6')
    return (
          <div>
            <Switch>
            <Route path='/home' component={Home} />
              <Route path='/signIn' component={Login} />
              <Route path='/signUp' component={Register} />
              <Route path='/Profil' component={Profil} />
            </Switch>
          </div>



    );
  }
}

export default ListRoute;