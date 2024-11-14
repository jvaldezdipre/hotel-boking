import Button from "../button/Button";

import "./Form.css";

const Form = (props) => {
  const {
    children,
    title,
    onSubmit,
    className,
    text,
    error,
    errorMsg,
    noValidate,
  } = props;

  return (
    <form className="form" onSubmit={onSubmit} noValidate={noValidate}>
      <h1 className="title">{title}</h1>
      <div className="error-container">{error && <p>{errorMsg}</p>}</div>
      {children}
      <Button className={className}>{text}</Button>
    </form>
  );
};

export default Form;
