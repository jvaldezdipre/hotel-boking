import Button from "../button/Button";

const Form = (props) => {
  const { children, title, onSubmit, className, text } = props;

  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="title">{title}</h1>
      {children}
      <Button className={className}>{text}</Button>
    </form>
  );
};

export default Form;
