import { Paper, Grid, Button } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHistory } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  return (
    <Paper
      style={{
        height: "79vh",
        overflowY: "auto",
        backgroundColor: "#F8FAFD",
      }}
    >
      {/* Sidebar content here */}
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ margin: "10px" }}>
          <Button
            variant="contained"
            style={{ width: "100%", backgroundColor: "#374151" }}
          >
            <span style={{ padding: "10px" }}>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />{" "}
              New Chat
            </span>
          </Button>
        </Grid>
        <Grid item xs={12} style={{ margin: "10px" }}>
          <Button
            variant="contained"
            style={{ width: "100%", backgroundColor: "#374151" }}
          >
            <span style={{ padding: "10px" }}>
              <FontAwesomeIcon
                icon={faHistory}
                style={{ marginRight: "10px" }}
              />{" "}
              History
            </span>
          </Button>
        </Grid>
        {/* Add more Grid items for additional buttons */}
      </Grid>
    </Paper>
  );
}
