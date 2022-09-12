import GoogleIcon from "../../../Assets/images/googleIcon.png";
import Style from "./Buttons.module.scss";

export const GoogleSignInButton = (props) => {
  return (
    <>
      <button className={Style.GoogleButtonContainer} {...props}>
        <img src={GoogleIcon} alt="googleIcon" />
        {props.children}
      </button>
    </>
  );
};

export const EnterBtn = (props) => {
  return (
    <>
      <button className={Style.LoginBtn} {...props}>
        {props.children}
      </button>
    </>
  );
};

export const NewNoteBtn = (props) => {
  return (
    <>
      <button {...props} className={Style.newNoteBtn}>
        {" "}
        + {props.children}
      </button>
    </>
  );
};
