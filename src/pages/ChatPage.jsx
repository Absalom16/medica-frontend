import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
  Autocomplete,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/sidebar";
import { diagnose, getCurrentTime, getSymptoms } from "../helpers";
import SymptomsOverview from "../components/SymptomsOverview";
import { useSelector } from "react-redux";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [querySymptoms, setQuerySymptoms] = useState([]);

  const auth = useSelector((store) => store.user);
  console.log(auth);

  //fetching all available symptoms from server
  useEffect(() => {
    getSymptoms((data) => {
      setSymptoms(data.payload);
    });
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    const newMessage = { text: querySymptoms.join(", "), sender: "user" };
    setMessages([...messages, newMessage]);
    setInputText("");
    setQuerySymptoms([]);

    //sending message to server and getting response
    diagnose(
      {
        email: "testemail",
        symptoms: querySymptoms,
      },
      (data) => {
        const result = data.payload.closeMatch;
        const serverMessage = {
          name: result.item.illness,
          description: result.item.description,
          diagnosis: result.item.diagnosis,
          medication: result.item.medication,
          link: result.item.link,
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
              backgroundColor: "#F8FAFD",
            }}
          >
            {querySymptoms.length > 0 && (
              <SymptomsOverview
                querySymptoms={querySymptoms}
                handleSendMessage={handleSendMessage}
              />
            )}

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
                    bgcolor: message.sender === "bot" ? "#374151" : "#05445E",
                    color: "white",
                    maxWidth: 500,
                    height: "auto", // Adjust the height as needed
                    maxHeight: 200, // Maximum height before scroll appears
                    borderRadius: 4,
                    overflowY: "auto",
                    boxShadow: 5,
                  }}
                >
                  <CardContent>
                    {message.sender === "user" ? (
                      <div
                        style={{
                          maxWidth: "100%",
                          overflowWrap: "break-word",
                          position: "relative",
                        }}
                      >
                        <span>{message.text}</span>
                        <br />
                        <br />
                        <span
                          style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            fontSize: "smaller",
                          }}
                        >
                          {getCurrentTime()}
                        </span>
                      </div>
                    ) : (
                      <div
                        style={{
                          maxWidth: "100%",
                          overflowWrap: "break-word",
                          position: "relative",
                        }}
                      >
                        <strong>name:</strong> {message.name}
                        <br />
                        <strong>description:</strong> {message.description}
                        <br />
                        <strong>diagnosis:</strong> {message.diagnosis}
                        <br />
                        <a
                          href={`${message.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <u>learn more</u>
                        </a>
                        <br />
                        <span
                          style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            fontSize: "smaller",
                          }}
                        >
                          {getCurrentTime()}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </Paper>
          <div style={{ marginTop: "5px", display: "flex" }}>
            <Autocomplete
              fullWidth
              disablePortal
              clearOnBlur
              id="combo-box-demo"
              options={symptoms}
              sx={{ width: "100%", backgroundColor: "white" }}
              renderInput={(params) => (
                <TextField {...params} label="Symptoms" fullWidth />
              )}
              onChange={(event, value) => {
                setInputText(value);
                setQuerySymptoms([...querySymptoms, value]);
              }}
            />
            {/* <IconButton color="primary" onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} size="2x" />
            </IconButton> */}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatPage;
