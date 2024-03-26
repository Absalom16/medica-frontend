import { useEffect, useRef } from "react";
import {
  Paper,
  TextField,
  Card,
  CardContent,
  Avatar,
  Autocomplete,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import SymptomsOverview from "./SymptomsOverview";
import HistoryTable from "./HistoryTable";
import { PulseLoader, FadeLoader } from "react-spinners";
import { getCurrentTime } from "../utilities/helpers";

export default function GridItemTwo({
  showHistory,
  historyLoading,
  querySymptoms,
  handleSendMessage,
  selectedChatHistory,
  messages,
  symptoms,
  loading,
  setInputText,
  setQuerySymptoms,
  setShowHistory,
  history,
}) {
  const chatContainerRef = useRef(null);

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  // Add a new message and scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      {!showHistory ? (
        <span>
          {!historyLoading ? (
            <>
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
                  paddingTop: "3%",
                }}
                ref={chatContainerRef}
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
                            <strong>accuracy:</strong> {`${message.accuracy}%`}
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
                <div style={{ marginLeft: "90%" }}>
                  <PulseLoader color="#374151" loading={loading} />
                </div>
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
              </div>
            </>
          ) : (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20%",
              }}
            >
              <FadeLoader color="#05445E" />
            </span>
          )}
        </span>
      ) : (
        <HistoryTable history={history} setShowHistory={setShowHistory} />
      )}
    </div>
  );
}
