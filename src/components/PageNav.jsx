import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Hidden, // Import Hidden component
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faHome,
  faUserPlus,
  faSignIn,
  faBars,
  faSignOut,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setAuthDetails } from "../store/userSlice";
import { saveChatHistory } from "../utilities/helpers";

function PageNav() {
  const { email, username, isLoggedIn } = useSelector(
    (store) => store.user.authDetails
  );
  const chatHistory = useSelector((store) => store.chatHistory.currentChats);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor element
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element when avatar is clicked
  };

  const handleClose = () => {
    setAnchorEl(null); // Close menu
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true); // Open drawer
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false); // Close drawer
  };

  const logout = () => {
    dispatch(
      setAuthDetails({
        username: "",
        email: "",
        token: "",
        isLoggedIn: false,
      })
    );

    saveChatHistory({ email: email, chats: chatHistory }, (data) => {
      console.log(data);
    });
    setAnchorEl(null); // Close menu
  };

  return (
    <AppBar
      position="static"
      elevation={15}
      sx={{ backgroundColor: "#05445E" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <span>
            <NavLink to="/">
              <span style={{ display: "inline-flex" }}>
                <FontAwesomeIcon icon={faHeartbeat} size="2x" />{" "}
                <strong>medica</strong>
              </span>
            </NavLink>
          </span>
        </Typography>

        {/* Hamburger menu for small screens */}
        <Hidden smUp>
          {" "}
          {/* Hide for screen sizes sm and up */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen} // Open drawer on click
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        </Hidden>

        {/* Buttons for larger screens */}
        {!isSmallScreen && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <NavLink to="/">
              <Button
                color="inherit"
                sx={{ "&:hover": { backgroundColor: "#212121" } }}
              >
                <span>
                  <FontAwesomeIcon icon={faHome} />
                  Home
                </span>
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button
                color="inherit"
                sx={{ "&:hover": { backgroundColor: "#212121" } }}
              >
                <span>
                  <FontAwesomeIcon icon={faUserPlus} /> Signup
                </span>
              </Button>
            </NavLink>

            {!isLoggedIn ? (
              <NavLink to="/login">
                <Button
                  color="inherit"
                  sx={{ "&:hover": { backgroundColor: "#212121" } }}
                >
                  <span>
                    <FontAwesomeIcon icon={faSignIn} /> Login
                  </span>
                </Button>
              </NavLink>
            ) : (
              <>
                <Avatar
                  alt={username.toUpperCase()}
                  src="/path_to_avatar.jpg"
                  sx={{
                    boxShadow: 5,
                    marginLeft: 1,
                    backgroundColor: "#212121",
                    "&:hover": { cursor: "pointer" },
                  }}
                  onClick={handleClick} // Open menu on click
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#212121",
                      color: "white",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <FontAwesomeIcon icon={faCogs} /> Settings
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <FontAwesomeIcon icon={faSignOut} /> Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        )}

        {/* Drawer for small screens */}
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={handleDrawerClose} // Close drawer on outside click
        >
          <List>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText>
                <FontAwesomeIcon icon={faHome} /> <NavLink to="/">Home</NavLink>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText>
                <FontAwesomeIcon icon={faUserPlus} />{" "}
                <NavLink to="/signup">Signup</NavLink>
              </ListItemText>
            </ListItem>
            {isLoggedIn && (
              <ListItem button onClick={handleDrawerClose}>
                <ListItemText>
                  <FontAwesomeIcon icon={faSignIn} />{" "}
                  <NavLink to="/login">Login</NavLink>
                </ListItemText>
              </ListItem>
            )}
            {isLoggedIn && (
              <ListItem button onClick={handleDrawerClose}>
                <ListItemText>Settings</ListItemText>
              </ListItem>
            )}
            {isLoggedIn && (
              <ListItem button onClick={handleDrawerClose}>
                <ListItemText>Logout</ListItemText>
              </ListItem>
            )}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default PageNav;
