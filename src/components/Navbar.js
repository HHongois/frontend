import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import NavbarLeftMenu from './NavbarLeftMenu';
import NavbarRightMenu from './NavbarRightMenu';
import { fade } from '@material-ui/core/styles/colorManipulator';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import GroupIcon from '@material-ui/icons/GroupAdd';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  flex: {
    // flexGrow: 1
  },
  logo: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '20px',
  },
  title: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '20px',
    marginRight:200,
  },
  link: {
    outline: 'none',
    textDecoration: 'none'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  aligner:{
  marginLeft:200
  },
  root: {
    flexGrow: 1
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 700,
    }

  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  rightMenu: {
    // flex: 1,
    float:'right'
  }
});

class Navbar extends Component {
  //   getInfo = () => {
  //     axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
  //         .then(({ data }) => {
  //             this.setState({
  //                 results: data.data  
  //             })
  //         })
  // }

  // handleInputChange = (e) => {
  //     this.setState({
  //         query: e.target.value
  //     }, () => {
  //         if (this.state.query && this.state.query.length > 1) {
  //             if (this.state.query.length % 2 === 0) {
  //                 this.getInfo()
  //             }
  //         }
  //     })
  // }
  render() {
    const { classes, logoutUser, user } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <NavbarLeftMenu user={user} />
            </IconButton> */}
            <Typography
              className={classes.flex}
              variant="title"
              color="inherit"
            >
              <Link className={classes.title} to="/">
                ChatGram
              </Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                ref={InputBase => this.search = InputBase}
              // onChange={this.handleInputChange}
              />
            </div>
            {/* <Typography className={classes.rightMenu}>
              <NavbarRightMenu  logoutUser={logoutUser} user={user} />
            </Typography> */}
            <Typography className={classes.aligner}>
            <Link className={classes.link} to={`/profile/${user.userId}`}>
            <ListItem button>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <MenuItem className={classes.logo} onClick={this.handleClose}>Profile</MenuItem>
            </ListItem>
          </Link>
          </Typography>
          <Typography>
          <Link className={classes.link} to={`/chat/${user.userId}`}>
            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <MenuItem className={classes.logo} onClick={this.handleClose}>Chat</MenuItem>
            </ListItem>
          </Link>
          </Typography>
          <Typography>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <MenuItem className={classes.logo} onClick={logoutUser}>Logout</MenuItem>
          </ListItem>
          </Typography>
          
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
