import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    root: {
        margin: "5em",
        textAlign: "center",
    },
    loading: {
        margin: "0 auto",
        marginTop: "50px",
    },
  });

const CustomCircularProgress = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress
                className={classes.loading}
                size="200px"
                thickness={1}
            />
        </div>
    );
};

export default CustomCircularProgress;