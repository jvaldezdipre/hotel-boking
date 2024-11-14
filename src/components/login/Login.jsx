import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { isValidEmail, isValidPassword } from "../../utils/validation";
import { LOGIN_URL } from "../../api/endpoints";

import Form from "../form/Form";
import Input from "../form/Input";
import axios from "../../api/axios";

import "./Login.css";

const Login = ({ login }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

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

    if (!isValidEmail(email) || !isValidPassword(password)) {
      formError = true;
      setError(true);
    }

    if (!formError) {
      axios
        .post(LOGIN_URL, { email, password })
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.token;
            sessionStorage.setItem("token", token);
            login();

            navigate("/reservations");

            setEmail("");
            setPassword("");
            console.log("logged in!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-image">
          <h3>Welcome Back</h3>
          <p>Sign in to your account to continue</p>
        </div>
        <Form
          title="LOGIN"
          btnClass="login-btn"
          text="Log in"
          error={error}
          errorMsg="Invalid email or password"
          onSubmit={submitHandler}
          noValidate
        >
          <Input
            name="Email"
            type="email"
            value={email}
            onChange={inputHandler}
            error={error}
          />
          <Input
            name="Password"
            type="password"
            value={password}
            onChange={inputHandler}
            error={error}
          />
        </Form>
      </div>
    </div>
  );
};

export default Login;
