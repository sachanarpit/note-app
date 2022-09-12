import { SignupFormMol } from "../../../Molecules/Auth/Form/Form";
import { AuthHeaders } from "../../../Molecules/Auth/Header/AuthHeader";

export const SignUpOrg = () => {
  return (
    <>
      <AuthHeaders isLogin={false} />
      <SignupFormMol />
    </>
  );
};
