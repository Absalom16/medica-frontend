import { useState, useEffect, useRef } from "react";
import {
  Container,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
  Autocomplete,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Fab,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faUser,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/sidebar";
import {
  diagnose,
  getChatHistory,
  getCurrentTime,
  getSymptoms,
  saveChatHistory,
} from "../utilities/helpers";
import SymptomsOverview from "../components/SymptomsOverview";
import HistoryTable from "../components/HistoryTable";
import { useSelector, useDispatch } from "react-redux";
import {
  clearChatHistory,
  deleteHistoryChat,
  saveCurrentChats,
} from "../store/chatHistorySlice";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [querySymptoms, setQuerySymptoms] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const chatContainerRef = useRef(null);

  const { email } = useSelector((store) => store.user.authDetails);
  const chatHistory = useSelector((store) => store.chatHistory.currentChats);
  const selectedChatHistory = useSelector(
    (store) => store.chatHistory.historyChats
  );
  const dispatch = useDispatch();

  //fetching all available symptoms from server
  useEffect(() => {
    getSymptoms((data) => {
      setSymptoms(data.payload);
    });
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    const newMessage = {
      text: querySymptoms.join(", "),
      sender: "user",
      time: getCurrentTime(),
    };
    setMessages([...messages, newMessage]);
    setInputText("");
    setQuerySymptoms([]);

    //sending message to server and getting response
    diagnose(
      {
        email: email,
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
          time: getCurrentTime(),
        };
        setMessages([...messages, newMessage, serverMessage]);
        dispatch(saveCurrentChats([...messages, newMessage, serverMessage]));
      }
    );
  };

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  // Add a new message and scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //function to save chats incase of a page reload
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      saveChatHistory({ email: email, chats: chatHistory }, (data) => {
        console.log(data);
      });

      setTimeout(() => {
        dispatch(clearChatHistory());
      }, 100);

      // Optionally, you can prompt the user before leaving
      event.returnValue = "prompt";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Cleanup: remove the event listener when the component unmounts
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [email, chatHistory, dispatch]); // Include email and chatHistory in the dependency array

  //function to handle new chat
  const handleNewChat = () => {
    setMessages([]);

    saveChatHistory({ email: email, chats: chatHistory }, (data) => {
      console.log(data);
    });

    setShowHistory(false);
    dispatch(deleteHistoryChat());

    setTimeout(() => {
      dispatch(clearChatHistory());
    }, 100);

    setIsDrawerOpen(false);
  };

  //function to handle history
  const handleHistory = () => {
    getChatHistory({ email: email }, (data) => {
      setShowHistory(true);
      setHistory(data);
    });
    setIsDrawerOpen(false);

    // saveChatHistory({ email: email, chats: chatHistory }, (data) => {
    //   console.log(data);
    // });

    // setTimeout(() => {
    //   dispatch(clearChatHistory());
    // }, 100);
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: "10px" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={3}
          style={{ display: "flex", flexDirection: "column", boxShadow: 20 }}
        >
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
            <Sidebar
              handleNewChat={handleNewChat}
              handleHistory={handleHistory}
            />
          </Hidden>
        </Grid>
        <Grid item xs={12} md={9}>
          {!showHistory ? (
            <>
              <Paper
                ref={chatContainerRef}
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

                {(selectedChatHistory.length < 1
                  ? messages
                  : selectedChatHistory
                ).map((message, index) => (
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
                        bgcolor:
                          message.sender === "bot" ? "#374151" : "#05445E",
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
                              {message.time}
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
            </>
          ) : (
            <HistoryTable history={history} setShowHistory={setShowHistory} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatPage;
