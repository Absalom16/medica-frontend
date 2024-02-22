import { IconButton, Card, CardContent } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const SymptomsOverview = ({ querySymptoms, handleSendMessage }) => {
  return (
    <Card
      sx={{
        color: "black",
        maxWidth: 500,
        height: "auto", // Adjust the height as needed
        width: "100",
        maxHeight: 200, // Maximum height before scroll appears
        borderRadius: 2,
        overflowY: "auto",
        boxShadow: 5,
        marginLeft: 20,
        position: "absolute",
      }}
    >
      <CardContent>
        <div style={{ maxWidth: "100%", overflowWrap: "break-word" }}>
          {querySymptoms.map((symptom, index) => (
            <h3 key={index}>{symptom}</h3>
          ))}
        </div>
        <IconButton color="primary" onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} size="1x" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default SymptomsOverview;
