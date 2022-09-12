import { ForgetPasswordOrg } from "../../Organisms/Auth/ForgetPassoword/ForgetPassword";
import { LoginOrg } from "../../Organisms/Auth/Login/Login";
import { SignUpOrg } from "../../Organisms/Auth/Signup/Signup";
import { LoaderOrg } from "../../Organisms/Loader/Loader";
import Styles from "./Auth.module.scss";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { RootContext } from "../../../Context/RootContext";

export const AuthTemp = ({ status = 0 }) => {
  const { state } = useContext(RootContext);
  return (
    <>
      <div className={Styles.AuthTempContainer}>
        <LoaderOrg status={state.loader} />
        <div className={Styles.CenterPopup}>
          <div className={Styles.ContentContainer}>
            {status == 1 ? (
              <SignUpOrg />
            ) : status == 2 ? (
              <ForgetPasswordOrg />
            ) : (
              <LoginOrg />
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
