import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import UploadScreen from './UploadScreen';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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
  },
});

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  handleClick(event) {
    var apiBaseUrl = "http://localhost:4000/api/";
    var self = this;
    var payload = {
      "email": this.state.email,
      "password": this.state.password
    }
    // console.log(payload);
    axios.post(apiBaseUrl + 'connexion/signIn', payload).then(function (response) {
      // console.log(response.data);
      if (response.status == 200) {
        console.log("Login successfull");
        var uploadScreen = [];
        uploadScreen.push(<UploadScreen appContext={self.props.appContext} />)
        self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
      }
      else if (response.status == 204) {
        console.log("Username password do not match");
        alert("username password do not match")
      }
      else {
        console.log("Username does not exists");
        alert("Username does not exist");
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { classes } = this.props;

    console.log('connexion')
    return (
      <form className={classes.container} noValidate autoComplete="off">

        <div>
          <MuiThemeProvider>
            <div>
              {/* <AppBar
                 title="Login"
               /> */}
              {/* <TextField
                 hintText="Enter your Email"
                 floatingLabelText="Username"
                 onChange = {(event,newValue) => this.setState({email:newValue})}
                 /> */}

              <TextField
                id="outlined-email-input"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                onChange={(event, newValue) => this.setState({ email: newValue })}

              />
              <br />
              <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          onChange={(event, newValue) => this.setState({ password: newValue })}

        />
              <br />
              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />

            </div>
          </MuiThemeProvider>
        </div>
      </form>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};
const style = {
  margin: 15,
};
export default withStyles(styles)(Login);
