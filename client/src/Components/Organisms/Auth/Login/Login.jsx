import { LoginFormMol } from "../../../Molecules/Auth/Form/Form";
import { AuthHeaders } from "../../../Molecules/Auth/Header/AuthHeader";

export const LoginOrg = () => {

  

  return (
    <>
      <AuthHeaders isLogin={true} />

      <LoginFormMol />
    </>
  );
};
