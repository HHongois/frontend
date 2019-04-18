import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import { withStyles } from '@material-ui/core/styles';



import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },

});
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }

  handleSubmit(event){
    event.preventDefault();
    var apiBaseUrl = "http://localhost:4000/api";
    console.log("values",this.state.first_name,this.
    state.last_name,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload={
    "first_name": this.state.first_name,
    "last_name":this.state.last_name,
    "email":this.state.email,
    "password":this.state.password
    }
    axios.post(apiBaseUrl+'/connexion/signUp', payload)
   .then(function (response) {
     console.log(response);
     if(response.data.code == 200){
        console.log("registration successfull");
       var loginscreen=[];
       loginscreen.push(<Login parentContext={this}/>);
       var loginmessage = "Not Registered yet.Go to registration";
       self.props.parentContext.setState({loginscreen:loginscreen,
       loginmessage:loginmessage,
       buttonLabel:"Register",
       isLogin:true
        });
     }else if ( response.data.code == 400){
       console.log(response.data);
     }
   })
   .catch(function (error) {
     console.log(error.response.data.error );
     self.setState({email : error.response.data.error})
     console.log(self.state.email);
   });
  }

  handleChangeFirstName = event => {
    this.setState({
      first_name: event.target.value
    });
  }

  handleChangeLastName = event => {
    this.setState({
      last_name: event.target.value
    });
  }
  handleChangeMail = event => {
    this.setState({
      email: event.target.value
    });
  }

  handleChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    const { classes } = this.props;

    return (        

<div className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={(event) => this.handleSubmit(event)} >

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="fisrtName">First Name</InputLabel>
            <Input id="fisrtName" name="fisrtName" type="text" autoFocus value={this.state.first_name} onChange={this.handleChangeFirstName}/>
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input name="lastName" type="text" id="lastName"  autoFocus value={this.state.last_name} onChange={this.handleChangeLastName} />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus value={this.state.email} onChange={this.handleChangeMail}/>
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChangePassword}/>
          </FormControl>
          
          <Button type="submit"  fullWidth variant="contained" color="primary" className={classes.submit} value="Post">
            Sign Up
          </Button>
        </form>
      </Paper>
    </div>

    );
  }
}
Register.propTypes = {
  classes: PropTypes.object.isRequired,
};
const style = {
  margin: 15,
};
export default withStyles(styles)(Register);
