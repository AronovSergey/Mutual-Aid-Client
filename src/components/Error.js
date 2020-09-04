
import React from 'react';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useStylesPaper } from './../theme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: "200%",
  },
  content: {
    margin: "1.5em",
  },
});

const Error = (props) => {
  const classes = useStyles();
  return (
    <Paper
      elevation={4}
      className={`${useStylesPaper().rootPaper} ${classes.root}`}
    >
      <Container className={classes.content}>{props.children}</Container>
    </Paper>
  );
};

export default Error;