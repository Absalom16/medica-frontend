import { AppBar, Toolbar, Typography } from "@mui/material";

function Footer() {
  return (
    <AppBar position="static" style={{ backgroundColor: "#212121" }}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} medica. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
