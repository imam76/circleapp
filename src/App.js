import { createMuiTheme, Grid, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
//import Pages
import DenseAppBar from "./Pages/Appbar/AppBar";
import CreateBook from "./Pages/Book/CreateBook";
import ReadBook from "./Pages/Book/ReadBook";
import Home from "./Pages/Home/HomePage";
import PageNotFound from "./Pages/PageNotFound";

const theme = createMuiTheme({
  palette: {
    divider: "rgb(63 81 181 / 27%)",
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

function App() {
  const location = useLocation();
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container justify="space-around">
        <Grid item xs>
          <DenseAppBar />
        </Grid>
      </Grid>
      <Switch location={location}>
        <Route exact path="/" component={Home} />
        <Route path="/create-book" component={CreateBook} />
        <Route path="/read-book/:id" component={ReadBook} />
        <Route component={PageNotFound} />
      </Switch>
      <Grid container justify="center" alignItems="center">
        ©Asep Imam Nawawi & Team
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
