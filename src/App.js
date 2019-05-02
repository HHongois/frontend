import './App.css';

import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import React, { Component } from 'react';
import ListRoute from './ListRoute';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import { createHashHistory } from 'history';


export const history = createHashHistory();
console.log('app.js')
if(localStorage.jwtToken !== undefined) {
    console.log(localStorage.jwtToken)
    setAuthToken(localStorage.jwtToken);
    // const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(localStorage.jwtToken));

    const currentTime = Date.now() / 1000;
    if( localStorage.jwtToken.exp < currentTime) {
        store.dispatch(logoutUser(history));
        window.location.href = '/login'
    }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: [],
      primarySearchAppBar: []
    }
  }


  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  componentWillMount() {
    // var loginPage = [];
    // loginPage.push(<Loginscreen parentContext={this} />);
    // this.setState({
    //   loginPage: loginPage
    // })
  }
  render() {
    console.log('acceuil')

    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <PrimarySearchAppBar />
            <ListRoute />
          </Router>
          {/* {this.state.uploadScreen} */}
        </Provider>

      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;