import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  IconButton,
  Grid,
  Card,
  CardContent,
  Avatar,
  Autocomplete,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faRobot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/sidebar";
import { diagnose, getSymptoms } from "../helpers";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    getSymptoms((data) => {
      setSymptoms(data.payload);
      console.log(data);
    });
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    const newMessage = { text: inputText, sender: "user" };
    setMessages([...messages, newMessage]);
    setInputText("");

    // Here you can add logic to send the message to a server or perform any other actions.
    diagnose(
      {
        email: "testemail",
        symptoms: [
          "fever",
          " chills",
          " headache",
          " muscle aches",
          " fatigue",
          " nausea",
          " and vomiting.",
        ],
      },
      (data) => {
        const serverMessage = {
          text: data.payload.closeMatch.item.illness,
          sender: "bot",
        };

        setMessages([...messages, newMessage, serverMessage]);
      }
    );
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: "10px" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={3}
          style={{ display: "flex", flexDirection: "column", boxShadow: 20 }}
        >
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <Paper
            style={{
              height: "70vh",
              overflowY: "auto",
              bgcolor: "#e7e5e4",
              scrollbarWidth: "none",
              /* Optional: for Firefox */
              "::WebkitScrollbar": {
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
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={symptoms}
              sx={{ width: "100%", backgroundColor: "white" }}
              renderInput={(params) => (
                <TextField {...params} label="Symptoms" fullWidth />
              )}
              onChange={(event, value) => {
                setInputText(value);
              }}
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
