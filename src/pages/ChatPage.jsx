import { useState, useEffect} from "react";
import { Container, Grid, Alert } from "@mui/material";

import {
  diagnose,
  getChatHistory,
  getCurrentTime,
  getSymptoms,
  saveChatHistory,
} from "../utilities/helpers";

import GridItemOne from "../components/GridItemOne";
import GridItemTwo from "../components/GridItemTwo";
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
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
 
  const [openAlert, setOpenAlert] = useState(true);

  const { email, token } = useSelector((store) => store.user.authDetails);
  const chatHistory = useSelector((store) => store.chatHistory.currentChats);
  const selectedChatHistory = useSelector(
    (store) => store.chatHistory.historyChats
  );
  const dispatch = useDispatch();

  //fetching all available symptoms from server
  useEffect(() => {
    getSymptoms((data) => {
      const refinedSymptoms = [];
      data.payload.forEach((el) => {
        el.replace(",", "").replace(".", "");
        if (refinedSymptoms.includes(el)) {
          return;
        } else {
          refinedSymptoms.push(el);
        }
      });
      setSymptoms(refinedSymptoms);
    });
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    setLoading(true);
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
        token: token,
      },
      (data) => {
        const result = data.payload.closeMatch;
        const serverMessage = {
          name: result.item.illness,
          description: result.item.description,
          diagnosis: result.item.diagnosis,
          medication: result.item.medication,
          link: result.item.link,
          accuracy: result.accuracy,
          sender: "bot",
          time: getCurrentTime(),
        };
        setMessages([...messages, newMessage, serverMessage]);
        setLoading(false);
        dispatch(saveCurrentChats([...messages, newMessage, serverMessage]));
      }
    );
  };

  

  //function to save chats incase of a page reload
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      saveChatHistory(
        { email: email, chats: chatHistory, token: token },
        (data) => {
          console.log(data);
        }
      );

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
  }, [email, chatHistory, dispatch, token]); // Include email and chatHistory in the dependency array

  //function to handle new chat
  const handleNewChat = () => {
    setMessages([]);

    saveChatHistory({ email: email, chats: chatHistory, token: token });

    setShowHistory(false);
    dispatch(deleteHistoryChat());

    setTimeout(() => {
      dispatch(clearChatHistory());
    }, 100);

    setIsDrawerOpen(false);
  };

  //function to handle history
  const handleHistory = () => {
    setHistoryLoading(true);
    getChatHistory({ email: email, token: token }, (data) => {
      setShowHistory(true);
      setHistory(data);
      setHistoryLoading(false);
    });
    setIsDrawerOpen(false);

    // saveChatHistory({ email: email, chats: chatHistory, token: token }, (data) => {
    //   console.log(data);
    // });

    // setTimeout(() => {
    //   dispatch(clearChatHistory());
    // }, 100);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: "10px" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={3}
          style={{ display: "flex", flexDirection: "column", boxShadow: 20 }}
        >
          <GridItemOne
            setIsDrawerOpen={setIsDrawerOpen}
            isDrawerOpen={isDrawerOpen}
            handleNewChat={handleNewChat}
            handleHistory={handleHistory}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "40%",
              right: "0%",
            }}
          >
            {openAlert && (
              <div
                style={{
                  display: "flex",
                }}
              >
                <Alert
                  severity="info"
                  onClose={handleCloseAlert}
                  sx={{
                    textAlign: "center",
                    zIndex: 1,
                  }}
                >
                  Select symptoms from the drop-down list provided below and
                  send.
                </Alert>
              </div>
            )}
          </div>
          <GridItemTwo
            showHistory={showHistory}
            
            historyLoading={historyLoading}
            querySymptoms={querySymptoms}
            handleSendMessage={handleSendMessage}
            selectedChatHistory={selectedChatHistory}
            messages={messages}
            symptoms={symptoms}
            loading={loading}
            setInputText={setInputText}
            setQuerySymptoms={setQuerySymptoms}
            setShowHistory={setShowHistory}
            history={history}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatPage;
