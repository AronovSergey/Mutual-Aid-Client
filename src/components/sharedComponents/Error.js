
import React from 'react';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: "200%",
  },
  content: {
    margin: "1.5em",
  },
  rootPaper: theme.rootPaper
}));

const Error = (props) => {
  const classes = useStyles();
  return (
    <Paper
      elevation={4}
      className={`${classes.rootPaper} ${classes.root}`}
    >
      <Container className={classes.content}>{props.children}</Container>
    </Paper>
  );
};

export default Error;