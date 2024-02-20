const url = "http://localhost:8000/api";

//function to sign up users
export function signup(data, callback) {
  fetch(`${url}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      callback(result);
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

//function to login users
export function login(data, callback) {
  fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      callback(result);
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

//function to fetch diagnosis data from server
export function diagnose(data) {
  console.log(data);
}

//functions to fetch specific illness data from server
export function getIllness(data) {
  console.log(data);
}

//function to fetch symptoms data from server
export function getSymptoms(data) {
  console.log(data);
}

//function to fetch chat history from server
export function fetchHistory(data) {
  console.log(data);
}
