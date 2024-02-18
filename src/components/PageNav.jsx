import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faHome,
  faUserPlus,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";

function PageNav() {
  return (
    <AppBar position="static" elevation={15}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <span>
            <FontAwesomeIcon icon={faHeartbeat} size="2x"/> <strong>medica</strong>
          </span>
        </Typography>
        <Button color="inherit">
          <span>
            <FontAwesomeIcon icon={faHome} /> <NavLink to="/">Home</NavLink>
          </span>
        </Button>
        <Button color="inherit">
          <span>
            <FontAwesomeIcon icon={faUserPlus} />{" "}
            <NavLink to="/signup">Signup</NavLink>
          </span>
        </Button>
        <Button color="inherit">
          <span>
            <FontAwesomeIcon icon={faSignIn} />{" "}
            <NavLink to="/login">Login</NavLink>
          </span>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default PageNav;
