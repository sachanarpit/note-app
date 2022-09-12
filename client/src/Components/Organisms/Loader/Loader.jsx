import { LottieComp } from "../../Molecules/LottiePlayer/LottiePlayer";
import LottieData from "../../../Assets/Lottie/loader.json";
import Styles from "./Loader.module.scss";

export const LoaderOrg = ({ status = true }) => {
  return (
    status && (
      <>
        <div className={Styles.LoaderOverlay}></div>
        <div className={Styles.LoaderContainer}>
          <LottieComp data={LottieData} />
        </div>
      </>
    )
  );
};
