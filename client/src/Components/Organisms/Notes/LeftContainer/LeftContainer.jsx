import { HeaderLeft } from "../../../Molecules/Notes/Left/HeaderLeft";
import { CardLeft } from "../../../Molecules/Notes/Left/CardLeft";
import Styles from "./LeftContainer.module.scss";
import { useContext } from "react";
import { RootContext } from "../../../../Context/RootContext";

export const LeftContainer = () => {
  const { state } = useContext(RootContext);
  return (
    <>
      <HeaderLeft />
      <div className={Styles.ScrollContainer}>
        {state.Notes.allNotes.map((elem) => {
          return (
            <>
              <CardLeft data={elem} />
            </>
          );
        })}
      </div>
    </>
  );
};
