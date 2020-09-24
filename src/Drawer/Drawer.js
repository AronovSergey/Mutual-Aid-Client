import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

//MUI Stuff
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import { drawerWidth } from '../utils/consts/drawerConsts';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { user_name } = useSelector((state) => state.users.userProfile);

  
  const labelsArray = ['Home', 'New Post', 'Your Page', 'Recommended'];
  const pathsArray = ['/', '/new_post', `/users/${user_name}`, '/recommended'];
  const iconsArray = [<HomeIcon />, <PostAddIcon />, <AssignmentIndIcon />, <TrendingUpIcon />];

  return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {/* Links */}
        <List>
          {labelsArray.map((text, index) => (
            <ListItem
              button 
              key={text}
              onClick={() => {
                history.push({pathname: `${pathsArray[index]}`});
              }}
            >
              <ListItemIcon>{iconsArray[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
  );
}
