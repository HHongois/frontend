import './App.css';
import Loginscreen from './LoginScreen'
import PrimarySearchAppBar from './PrimarySearchAppBar'
import React, { Component } from 'react';
import ListRoute from './ListRoute';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


// import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[],
      primarySearchAppBar:[]
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
      loginPage:loginPage
    })
  }
  render() {
    console.log('acceuil')

    return (
      <div className="App">
      <Router>
      <PrimarySearchAppBar/>
      <ListRoute/>
      </Router>
        {this.state.uploadScreen}
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;