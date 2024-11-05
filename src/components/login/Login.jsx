import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../../utils/validation";

import Form from "../form/Form";
import Input from "../input/Input";
import axios from "../../api/axios";

import { LOGIN_URL } from "../../api/endpoints";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrmsg] = useState("");

  useEffect(() => {});

  const inputHandler = (event) => {
    switch (event.target.name) {
      case "Email":
        setEmail(event.target.value);
        break;
      case "Password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let formError = false;

    if (!isValidEmail(email)) {
      formError = true;
      setError(true);
    }

    if (!isValidPassword(password)) {
      formError = true;
      setError(true);
    }

    if (!formError) {
      try {
        const response = await axios.post(LOGIN_URL, {
          email,
          password,
        });

        if (response.status === 200) {
          navigate("/reservations");
          setEmail("");
          setPassword("");
        }
      } catch (err) {
        setError(true);
        setErrmsg("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="login">
      <Form
        title="Login"
        btnClass="login-btn"
        text="Login"
        error={error}
        onSubmit={submitHandler}
      >
        <Input
          name="Email"
          type="email"
          value={email}
          onChange={inputHandler}
        />
        <Input
          name="Password"
          type="password"
          value={password}
          onChange={inputHandler}
        />
      </Form>
    </div>
  );
};

export default Login;
