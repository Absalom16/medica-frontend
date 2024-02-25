import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { signup } from "../utilities/helpers";
import { FadeLoader } from "react-spinners";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // State to track registration success
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login process starts

    // Form validation
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false); // Set loading to false when validation fails
      return;
    }

    const signupData = {
      username: username,
      email: email,
      password: password,
    };

    signup(signupData, (data) => {
      setLoading(false); // Set loading to false when login process completes
      if (data.status === 400) {
        setServerError(data.message);
      } else if (data.status === 200) {
        setIsRegistered(true); // Set registration success
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setServerError(data.message);
      }
    });
  };

  // Rerender the page when serverError or isRegistered changes
  useEffect(() => {
    // Force a rerender
    // This is just a dummy state update, it can be any state that changes
    setErrors((prevErrors) => ({ ...prevErrors }));
  }, [serverError, isRegistered]);

  return (
    <Container component="main" maxWidth="xs">
      <Card elevation={20}>
        <CardContent>
          <Typography component="h1" variant="h5" align="center">
            Sign up
          </Typography>
          {!isRegistered ? ( // Show signup form if not registered
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    error={errors.username}
                    helperText={errors.username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        username: "",
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={errors.email}
                    helperText={errors.email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: "",
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={errors.password}
                    helperText={errors.password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        password: "",
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#05445E", color: "white" }}
                onClick={handleClick}
                disabled={loading}
              >
                {loading ? ( // Show loading indicator instead of text when loading
                  <FadeLoader color="#ffffff" loading={loading} size={8} />
                ) : (
                  "Sign Up"
                )}
              </Button>
              <span
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {serverError && serverError}
              </span>
            </form>
          ) : (
            // Show success message if registered
            <Typography align="center" color="primary">
              Registration successful! You can now Login.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
