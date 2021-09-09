import React from "react";

// UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// STYLE
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
    height: 50,
    width: 80,
  },
  title: {
    flexGrow: 1,
  },
}));

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  // NAVIGATION
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img
            src={
              "https://www.pngfind.com/pngs/m/274-2742979_nba-logo-logotipo-de-la-nba-hd-png.png"
            }
            alt={"logo"}
            className={classes.icon}
          />
          <Typography variant="h6" className={classes.title}>
            NBA Task
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

Header.defaultProps = {};
