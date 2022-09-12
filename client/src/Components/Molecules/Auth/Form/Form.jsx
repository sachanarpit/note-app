import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootContext } from "../../../../Context/RootContext";
import { EnterBtn } from "../../../Atoms/Buttons/Buttons";
import { Input } from "../../../Atoms/Inputs/Inputs";
import Styles from "./Form.module.scss";

export const LoginFormMol = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { SignIn } = useContext(RootContext);
  const navigate = useNavigate();
  const submitData = (e) => {
    e.preventDefault();
    SignIn(email, password, (status) => {
      if (status) {
        navigate("/");
      }
    });
    console.log("email", email, password);
  };
  return (
    <>
      <form className={Styles.MainContainers} onSubmit={submitData}>
        <div className={Styles.InputContainer}>
          <Input
            placeholder="Email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            placeholder="Password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
        </div>
        <div className={Styles.alignLeft}>
          <Link to={"/forgetpassword"}>I forget my password</Link>
        </div>

        <div className={Styles.ButtonWrapper}>
          <EnterBtn type="submit">Log in</EnterBtn>
          <Link to={"/signup"}>Sign Up</Link>
        </div>
      </form>
    </>
  );
};

export const SignupFormMol = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { SignUp } = useContext(RootContext);

  const navigate = useNavigate();
  const submitData = (e) => {
    e.preventDefault();
    SignUp(email, password, name, (status) => {
      if (status) {
        navigate("/");
      }
    });
    console.log("email", email, password);
  };
  return (
    <>
      <form className={Styles.MainContainers} onSubmit={submitData}>
        <div className={Styles.InputContainer}>
          <Input
            placeholder="Name"
            required={true}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            placeholder="Email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            placeholder="Password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
        </div>

        <div className={Styles.ButtonWrapper}>
          <EnterBtn type="submit">Sign up</EnterBtn>
          <Link to={"/signin"}>Already have an account? Sign in here</Link>
        </div>
      </form>
    </>
  );
};

export const ForgetPasswodMol = () => {
  const { ForgetPassword } = useContext(RootContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    ForgetPassword(email, (status) => {
      if (status) {
        navigate("/signin");
      }
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={Styles.MainContainers}>
        <div className={Styles.InputContainer}>
          <Input
            placeholder="Email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={Styles.ButtonWrapper}>
          <EnterBtn>Forget Password</EnterBtn>
          <Link to={"/signin"}>Go to SignIn</Link>
        </div>
      </form>
    </>
  );
};
