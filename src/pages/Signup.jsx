import { useState } from "react";
import { useNavigate } from "react-router-dom";
//1. import { useDispatch } from "react-redux";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
//2. import { setSignUpDetails } from "../store/userSlice";
import { signup } from "../helpers";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupData = {
    username: username,
    email: email,
    password: password,
  };

  //3. const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    if (!username || !email || !password) return;
    //4. dispatch(setSignUpDetails(signupData));

    //call function to send data to server
    signup(signupData, (data) => {
      if (data.status === 400) {
        console.log("user already exists!");
      } else if (data.status === 200) {
        navigate("/login");
      } else {
        console.log("server error!");
      }
      // console.log(data);
    });
  };

  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <Card elevation={20}>
        <CardContent>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={""}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
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
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
