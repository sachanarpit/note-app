import GoogleIcon from "../../../../Assets/images/googleIcon.png";
import { GoogleSignInButton } from "../../../Atoms/Buttons/Buttons";
import Style from "./AuthHeader.module.scss";

export const AuthHeaders = ({ isLogin = true }) => {
  return (
    <>
      <div className={Style.Header}>
        {isLogin ? (
          <>
            <h1>Log In</h1>
            <GoogleSignInButton>Log in with Google</GoogleSignInButton>
            <p>or use your email to log in</p>
          </>
        ) : (
          <h1>Sign Up</h1>
        )}
      </div>
    </>
  );
};
