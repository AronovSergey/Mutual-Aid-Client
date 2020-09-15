import makeStyles from '@material-ui/core/styles/makeStyles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#1e88e5" },
    secondary: { main: "#f50057" },
  }
});

export const useStylesPaper = makeStyles((theme) => ({
  rootPaper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "6em",
    borderRadius: 3,
    textAlign: "center",
    marginLeft: "50px",
  },
}));
