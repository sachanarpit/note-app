import Lottie from "lottie-react";
import JosnData from "../../../Assets/Lottie/loader.json";

export const LottieComp = ({ data = JosnData }) => {
  return <Lottie animationData={data} />;
};
