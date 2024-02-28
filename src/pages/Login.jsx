import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { getNewAccessToken, login } from "../utilities/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setAuthDetails, setNewAccessToken } from "../store/userSlice";
import { FadeLoader } from "react-spinners";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    refreshToken,
    isLoggedIn,
    email: userEmail,
  } = useSelector((store) => store.user.authDetails);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login process starts

    // Form validation
    const errors = {};
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

    const loginData = {
      email: email,
      password: password,
    };

    login(loginData, (data) => {
      setLoading(false); // Set loading to false when login process completes
      if (data.status === 400) {
        setServerError(data.message);
      } else if (data.status === 200) {
        dispatch(
          setAuthDetails({
            username: data.user.username,
            email: data.user.email,
            token: data.accessToken,
            refreshToken: data.refreshToken,
            isLoggedIn: true,
          })
        );

        navigate("/chat");
      } else if (data.status === 403 || data.status === 500) {
        setServerError(data.message);
      }
    });
  };

  // Use useEffect to fetch a new access token after expiry of the current token
  useEffect(() => {
    let refreshTokenInterval;
    if (isLoggedIn) {
      refreshTokenInterval = setInterval(() => {
        getNewAccessToken(
          {
            refreshToken: refreshToken,
            email: userEmail,
          },
          (result) => {
            dispatch(setNewAccessToken(result.newAccessToken));
          }
        );
      }, 3540000); // fetch after 59 minutes--token expires in 60 minutes
    }

    // Clear the interval when the component unmounts or when isLoggedIn becomes false
    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, [refreshToken, isLoggedIn, email, dispatch]);

  // Rerender the page when serverError changes
  useEffect(() => {
    // Force a rerender
    // This is just a dummy state update, it can be any state that changes
    setErrors((prevErrors) => ({ ...prevErrors }));
  }, [serverError]);

  return (
    <Container component="main" maxWidth="xs">
      <Card elevation={20}>
        <CardContent>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  email: "",
                }));
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
              error={!!errors.password}
              helperText={errors.password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  password: "",
                }));
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#05445E", color: "white" }}
              onClick={handleClick}
              disabled={loading} // Disable button when loading
            >
              {loading ? ( // Show loading indicator instead of text when loading
                <FadeLoader color="#ffffff" loading={loading} size={8} />
              ) : (
                "Sign In"
              )}
            </Button>
            <span
              style={{
                color: "red",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {serverError !== "" && serverError}
            </span>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
