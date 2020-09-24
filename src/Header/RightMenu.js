import React from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './../redux/actions/authActions';
//MUI Stuff
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const RightMenu = (props) => {
    const dispatch = useDispatch();
    const isMenuOpen = Boolean(props.anchorEl);
    const { isAuth } = useSelector((state) => state.auth);


    const handleLogout = () => {
        props.handleProfileMenuClose();
        dispatch(logout());
    }
    
    return (
        <Menu
          anchorEl={props.anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={props.menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={props.handleProfileMenuClose}
        >
          {isAuth && (
            <MenuItem onClick={props.handleProfileMenuClose} component={Link} to="/profile">
              Profile
            </MenuItem>
          )}
          {isAuth && (
            <MenuItem onClick={handleLogout} component={Link} to="/">
              Logout
            </MenuItem>
          )}
          {!isAuth && (
            <MenuItem onClick={props.handleProfileMenuClose} component={Link} to="/login">
              Login
            </MenuItem>
          )}
          {!isAuth && (
            <MenuItem onClick={props.handleProfileMenuClose} component={Link} to="/signup">
              Signup
            </MenuItem>
          )}
        </Menu>
    )
}

export default RightMenu;
