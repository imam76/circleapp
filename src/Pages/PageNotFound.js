import React from "react";
import { Grid, Typography } from "@material-ui/core";
import imagePageNotFound from "../Assets/PageNotFound.svg";

const PageNotFound = () => {
  return (
    <Grid container alignItems="center" direction="column">
      <img src={imagePageNotFound} height={500} width={500} />
      <Grid item xs>
        <Typography component="span" variant="h4">
          Oops I'm Feeling lost
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography component="span" variant="caption">
          why don't you try one of this page instead
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
