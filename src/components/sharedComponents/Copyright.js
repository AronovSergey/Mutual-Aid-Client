import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Copyright = () => {
  return (
    <Box mt={8}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        {"MutualAid "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Copyright;