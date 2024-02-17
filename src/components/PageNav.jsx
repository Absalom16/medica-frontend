import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function PageNav() {
  return (
    <AppBar position="static" elevation={15}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <strong>medica</strong>
        </Typography>
        <Button color="inherit">
          <NavLink to="/">Home</NavLink>
        </Button>
        <Button color="inherit">
          <NavLink to="/signup">Signup</NavLink>
        </Button>
        <Button color="inherit">
          <NavLink to="/login">Login</NavLink>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default PageNav;
