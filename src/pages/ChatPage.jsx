import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  IconButton,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPlus,
  faHistory,
  faRobot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    const newMessage = { text: inputText, sender: "bot" };
    setMessages([...messages, newMessage]);
    setInputText("");
    // Here you can add logic to send the message to a server or perform any other actions.
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: "10px" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={3}
          style={{ display: "flex", flexDirection: "column", boxShadow: 20 }}
        >
          <Paper
            style={{
              height: "79vh",
              overflowY: "auto",
              backgroundColor: "#d1d5db",
            }}
          >
            {/* Sidebar content here */}
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ margin: "10px" }}>
                <Button variant="contained" style={{ width: "100%" }}>
                  <span style={{ padding: "10px" }}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ marginRight: "10px" }}
                    />{" "}
                    New Chat
                  </span>
                </Button>
              </Grid>
              <Grid item xs={12} style={{ margin: "10px" }}>
                <Button variant="contained" style={{ width: "100%" }}>
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
        </Grid>
        <Grid item xs={9}>
          <Paper
            style={{
              height: "70vh",
              overflowY: "auto",
              bgcolor: "#e7e5e4",
              scrollbarWidth: "none",
              /* Optional: for Firefox */
              "::-webkit-scrollbar": {
                display: "none",
              },
              backgroundColor: "#d1d5db",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection:
                    message.sender === "bot" ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    marginRight: 1,
                    boxShadow: 5,
                    marginLeft: 1,
                    backgroundColor: "#212121",
                  }}
                  alt="Avatar"
                >
                  {message.sender === "bot" ? (
                    <FontAwesomeIcon
                      icon={faRobot}
                      // style={{ marginRight: "10px" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser} //replace with image
                      // style={{ marginRight: "10px" }}
                    />
                  )}
                </Avatar>

                <Card
                  sx={{
                    marginBottom: 2,
                    bgcolor: message.sender === "bot" ? "blue" : "green",
                    color: "white",
                    maxWidth: 500,
                    height: "auto", // Adjust the height as needed
                    maxHeight: 200, // Maximum height before scroll appears
                    borderRadius: 8,
                    overflowY: "auto",
                    boxShadow: 5,
                  }}
                >
                  <CardContent>
                    <div
                      style={{ maxWidth: "100%", overflowWrap: "break-word" }}
                    >
                      {message.text}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Paper>
          <div style={{ marginTop: "5px", display: "flex" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <IconButton color="primary" onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} size="2x" />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatPage;
