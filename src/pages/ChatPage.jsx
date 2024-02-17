import { useState } from "react";
import { Container, Paper, TextField, IconButton, Divider, Grid } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    const newMessage = { text: inputText, sender: "user" };
    setMessages([...messages, newMessage]);
    setInputText("");
    // Here you can add logic to send the message to a server or perform any other actions.
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: "10px" }}>
      <Grid container spacing={2}>
        <Grid item xs={3} style={{ display: "flex", flexDirection: "column" }}>
          <Paper style={{ height: "79vh", overflowY: "auto" }}>
            {/* Sidebar content here */}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper style={{ height: "70vh", overflowY: "auto" }}>
            {messages.map((message, index) => (
              <div key={index}>
                <div style={{ textAlign: message.sender === "bot" ? "left" : "right" }}>
                  {message.text}
                </div>
                <Divider style={{ margin: "10px 0" }} />
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
              {/* <SendIcon /> */}
              send
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatPage;
