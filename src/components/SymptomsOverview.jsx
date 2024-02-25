import { Button, Card, CardContent } from "@mui/material";

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
        zIndex: 1,
      }}
    >
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            maxWidth: "100%",
            overflowWrap: "break-word",
          }}
        >
          {querySymptoms.map((symptom, index) => (
            <h3 key={index}>{symptom}</h3>
          ))}
        </div>
        <Button
          onClick={handleSendMessage}
          style={{ backgroundColor: "#05445E", color: "white" }}
        >
          Send
        </Button>
      </CardContent>
    </Card>
  );
};

export default SymptomsOverview;
