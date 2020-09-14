import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#1a237e" },
  },
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
