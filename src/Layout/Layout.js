import React from 'react';
import clsx from 'clsx';
import Header from './../Header/Header';
import Drawer from './../Drawer/Drawer';
import { drawerWidth } from '../utils/consts/drawerConsts';

//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    content: {
      marginTop: theme.spacing(4),
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentShift: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
  }));
  
export default function (props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };

	return (
    <Grid container>
        <Grid item container direction="column" spacing={3} height={1024}>
            <Grid item>      
                <Header
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                />
            </Grid> 
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <Grid item container>
                    <Grid item xs={false} sm={1}/>
                    <Grid item xs={12} sm={10}>
                        {props.children}
                    </Grid>        
                    <Grid item xs={false} sm={1}/>            
                </Grid>
            </main>
        </Grid>	
        <Grid item>      
            <Drawer
                open={open}
                handleDrawerClose={handleDrawerClose}
            />   
        </Grid>
    </Grid>
	);
}
