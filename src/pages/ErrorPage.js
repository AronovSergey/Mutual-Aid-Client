import React from 'react';
import { Typography } from '@material-ui/core';
import Error from "../components/Error";

const notFoundContent = (
  <div>
    <Typography variant="h2">Error</Typography>
    <Typography variant="h5">
      Oops..something went wrong! Please try again later.
    </Typography>
  </div>
);

const NotFoundPage = () => <Error>{notFoundContent} </Error>;

export default NotFoundPage;