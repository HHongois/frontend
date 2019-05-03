import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import GroupIcon from '@material-ui/icons/GroupAdd';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
const styles = {
  link: {
    outline: 'none',
    textDecoration: 'none'
  },
  menuButton: {
    color: '#fff',
    fontSize: '18px',
    marginRight: '-15px',
    textTransform: 'none',


  }
};

class NavbarRightMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, logoutUser, user } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'right-menu' : null}
          aria-haspopup="true"
          className={classes.menuButton}
          onClick={this.handleClick}
        >
          {user.name}
        </Button>
        <Menu
          id="right-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link className={classes.link} to={`/profile/${user.userId}`}>
            <ListItem button>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            </ListItem>
          </Link>
          <Link className={classes.link} to="/discover">
            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <MenuItem onClick={this.handleClose}>Discover</MenuItem>
            </ListItem>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/following">
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <MenuItem onClick={this.handleClose}>Following</MenuItem>
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </ListItem>
        </Menu>
      </div>
    );
  }
}

NavbarRightMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(NavbarRightMenu);
