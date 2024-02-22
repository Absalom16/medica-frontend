import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const isLoggedIn = true;
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ textAlign: "center", paddingTop: "40px" }}
    >
      <div>
        <Typography variant="h4" gutterBottom>
          Welcome to Medica! Your #1 trusted medical consultant.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget
          aliquam nunc. Vestibulum id lorem id lorem dictum efficitur eu eget
          purus. Vestibulum eget lacinia mauris, vel dapibus lectus. Aenean quis
          arcu orci. Nullam fringilla vestibulum lectus in pharetra.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Go to the app
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;
