import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Profil from './components/Profil';
import Register from './components/Register';
import Home from './components/Home';

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