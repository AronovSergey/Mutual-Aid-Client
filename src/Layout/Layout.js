import React from 'react';

import Grid from '@material-ui/core/Grid';

import Header from './../Header/Header';


const layout = (props) => {
	return (
    <Grid container direction="column" spacing={3} height={1024}>
      <Grid item>      
        <Header/>
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={1}/>
        <Grid item xs={12} sm={10}>
          {props.children}
        </Grid>        
        <Grid item xs={false} sm={1}/>            
      </Grid>
    </Grid>	
	);
}

export default layout;