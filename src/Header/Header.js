import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { drawerWidth } from '../utils/consts/drawerConsts';
import RightMenu from './RightMenu';
//MUI Stuff
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = React.useState(null);

  

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
      <div className={classes.grow}>
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: props.open,
            })}
        >
            <Toolbar>
              {/* Drawer */}
              <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={props.open ? props.handleDrawerClose : props.handleDrawerOpen}
              >
                  <MenuIcon />
              </IconButton>
              {/* Logo */}
              <Typography 
                component={Link} 
                to="/"
                className={classes.title} 
                variant="h6" 
                noWrap
                color="inherit"
              >
                  Mutual Aid
              </Typography>
              {/* Search */}
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
                  inputProps={{ 'aria-label': 'search' }}
                  />
              </div>
              {/* Profile */}
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>

                  <RightMenu
                    anchorEl={anchorEl}
                    menuId={menuId}
                    handleProfileMenuClose={handleProfileMenuClose}
                  />
              </div>
            </Toolbar>
        </AppBar>
      </div>
  );
}
