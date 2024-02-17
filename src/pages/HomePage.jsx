import { Container, Typography, Button } from "@mui/material";

const HomePage = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ textAlign: "center", paddingTop: "40px" }}>
      <div>
        <Typography variant="h4" gutterBottom>
          Welcome to our website!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget aliquam nunc.
          Vestibulum id lorem id lorem dictum efficitur eu eget purus. Vestibulum eget lacinia
          mauris, vel dapibus lectus. Aenean quis arcu orci. Nullam fringilla vestibulum lectus
          in pharetra.
        </Typography>
        <Button variant="contained" color="primary">
          Learn More
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;
