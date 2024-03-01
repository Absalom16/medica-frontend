import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Fab,
} from "@mui/material";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GridItemOne = ({
  setIsDrawerOpen,
  isDrawerOpen,
  handleNewChat,
  handleHistory,
}) => {
  return (
    <div>
      {/*menu icon for small screens */}
      <Fab
        onClick={() => setIsDrawerOpen(true)}
        sx={{ display: { md: "none" } }} // Hide for medium screens and up
        style={{
          position: "fixed",
          top: "70px",
          left: "1px",
          backgroundColor: "#212121",
          color: "white",
          boxShadow: 24,
        }}
        size="small"
      >
        <FontAwesomeIcon icon={faArrowAltCircleRight} />
      </Fab>

      {/* Drawer for small screens */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)} // Close drawer on outside click
      >
        {/* Drawer content */}
        <List>
          <ListItem button onClick={handleNewChat}>
            <ListItemText>New chat</ListItemText>
          </ListItem>
          <ListItem button onClick={handleHistory}>
            <ListItemText>History</ListItemText>
          </ListItem>
          {/* Add more items as needed */}
        </List>
      </Drawer>
      {/* Sidebar for large screens */}
      <Hidden mdDown>
        <Sidebar handleNewChat={handleNewChat} handleHistory={handleHistory} />
      </Hidden>
    </div>
  );
};

export default GridItemOne;
