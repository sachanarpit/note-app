import { useContext } from "react";
import { RootContext } from "../../../../Context/RootContext";
import { NewNoteBtn } from "../../../Atoms/Buttons/Buttons";
import Styles from "./HeaderLeft.module.scss";

export const HeaderLeft = () => {
  const { AddNote } = useContext(RootContext);
  return (
    <>
      <div className={Styles.HeaderLeftContainer}>
        <h3>My Notes</h3>
        <NewNoteBtn onClick={() => AddNote()}>New Note</NewNoteBtn>
      </div>
    </>
  );
};
