import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { isValidEmail, isValidPassword } from "../../utils/validation";
import { LOGIN_URL } from "../../api/endpoints";

import Form from "../form/Form";
import Input from "../input/Input";
import axios from "../../api/axios";

const Login = ({ login, userRoleHandler }) => {
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
      try {
        const response = await axios.post(LOGIN_URL, {
          email,
          password,
        });

        if (response.status === 200) {
          const token = response.data.token;
          sessionStorage.setItem("token", token);
          login();
          userRoleHandler(token);
          navigate("/reservations");

          setEmail("");
          setPassword("");
          console.log("logged in!");
        }
      } catch (err) {
        console.log(err);
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
        errorMsg="Invalid email or password"
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
