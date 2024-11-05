import Button from "../button/Button";

const Form = (props) => {
  const { children, title, onSubmit, className, text, error, errorMsg } = props;

  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="title">{title}</h1>
      <div className="error-container">{error && <p>{errorMsg}</p>}</div>
      {children}
      <Button className={className}>{text}</Button>
    </form>
  );
};

export default Form;
