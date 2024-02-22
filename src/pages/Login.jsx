import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { login } from "../helpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginData = {
    email: email,
    password: password,
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    login(loginData, (data) => {
      if (data.status === 400) {
        console.log("user does not exist");
      } else if (data.status === 200) {
        navigate("/chat");
      } else if (data.status === 403) {
        console.log("incorrect email or password!");
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card elevation={20}>
        <CardContent>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={""}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
