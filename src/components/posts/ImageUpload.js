import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ImageUpload = ({ handleImageChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="default"
          component="span"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
        >
          Upload an image
        </Button>
      </label>
    </div>
  );
};

export default ImageUpload