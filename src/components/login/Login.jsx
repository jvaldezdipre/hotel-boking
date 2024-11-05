import { useState } from "react";

import Form from "../form/Form";
import Input from "../input/Input";

const Login = () => {
  const [email, setEmail] = useState({
    value: "",
    error: false,
  });

  const [password, setPassword] = useState({
    value: "",
    error: false,
  });

  const submitHandler = () => {};
  return (
    <div className="login">
      <Form
        title="Login"
        onSubmit={submitHandler}
        btnClass="login-btn"
        text="Login"
      >
        <Input
          name="Email"
          type="email"
          value={email.value}
          error={email.error}
        />
        <Input
          name="Password"
          type="password"
          value={password.value}
          error={password.error}
        />
      </Form>
    </div>
  );
};

export default Login;
