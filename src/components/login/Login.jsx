import { useState } from "react";
import { isValidEmail, isValidPassword } from "../../utils/validation";

import Form from "../form/Form";
import Input from "../input/Input";

const Login = () => {
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

  const submitHandler = (event) => {
    event.preventDefault();
    // variable to track if our form is valid
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
      setEmail("");
      setPassword("");
    }
    console.log(formError);
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
