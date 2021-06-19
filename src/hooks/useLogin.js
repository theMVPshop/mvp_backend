import axios from "axios";
import { useState } from "react";
import { useGlobal } from "../contexts/GlobalProvider";

export default (history) => {
  const { setUser, setIsMod } = useGlobal();

  let cachedUser = localStorage.getItem("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("Login");
  const [showSignup, setshowSignup] = useState(false);

  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
  });

  const toggleForm = () => setshowSignup(!showSignup);

  const handleChange = (e) =>
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  // if someone is logged in, this will check to see if they are a moderator and store it in a useState hook as a boolean
  const checkModPrivilege = async (username, authHeader) => {
    try {
      let response = await axios.get("/users", authHeader);
      let users = await response.data;
      let hasPrivilege =
        users.find((x) => x.username === username)?.isModerator === 1;
      setIsMod(hasPrivilege ? true : false);
    } catch (error) {
      console.error("failed to retrieve moderator status", error);
    }
  };
  const login = async (event) => {
    event?.preventDefault();
    setLoading(true);
    try {
      let response = await axios.post("/auth/login", input);
      if (response.status === 200) {
        let lowercasedUsername = input.username.toLowerCase();
        let token = response.data.token;
        let authHeader = { headers: { Authorization: `Bearer ${token}` } };
        localStorage.setItem("user", lowercasedUsername);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedIn", true);
        setUser(lowercasedUsername);
        checkModPrivilege(lowercasedUsername, authHeader);
        history.push("/projects");
      }
    } catch (error) {
      setError(
        error.response.status == 404
          ? "User Not Found"
          : error.response.status == 400
          ? "Wrong Password"
          : "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    let userObject = {
      username: input.username,
      isModerator: 0,
    };
    try {
      let response = await axios.post("/auth/signup", input);
      if (response.status === 200) {
        await axios.post("/users", userObject);
        login();
      }
    } catch (error) {
      console.error("failed to create user", error);
      setError(
        error.response.status == 409 ? "User Already Exists" : "Login Failed"
      );
      setLoading(false);
    }
  };

  return {
    input,
    cachedUser,
    error,
    toggleForm,
    loading,
    showSignup,
    login,
    handleChange,
    signup,
  };
};
