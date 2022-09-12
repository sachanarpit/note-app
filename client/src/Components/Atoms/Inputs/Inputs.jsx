import Styles from "./Inputs.module.scss";
export const Input = (props) => {
  return (
    <>
      <input {...props} className={Styles.InputForm} />
    </>
  );
};
