import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: "2em",
    "&:hover": {
      backgroundColor: "##ea80fc",
      color: "#FFF",
    },
  },
}));

const PostButton = ({ disabled, buttonName, handleSubmit }) => {
  const classes = useStyles();

  return (
    <div>
      <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        size="medium"
        className={classes.margin}
        type="submit"
        onClick={handleSubmit}
      >
        {buttonName}
      </Button>
    </div>
  );
};

export default PostButton;