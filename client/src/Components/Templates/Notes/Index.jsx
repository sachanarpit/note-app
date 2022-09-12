import { useContext, useEffect } from "react";
import { RootContext } from "../../../Context/RootContext";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderOrg } from "../../Organisms/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import Styles from "./Notes.module.scss";
import { NotesHeader } from "../../Organisms/Notes/Header/NotesHeader";
import { LeftContainer } from "../../Organisms/Notes/LeftContainer/LeftContainer";
import { RightContainer } from "../../Organisms/Notes/RightContainer/RightContainer";
import { Offline } from "react-detect-offline";

export const Notes = () => {
  const { state, SignIn } = useContext(RootContext);

  const navigate = useNavigate();

  let { noteid } = useParams();
  console.log("noteid:", noteid);

  useEffect(() => {
    let checkLocalStroage = localStorage.getItem("noteapp");
    if (checkLocalStroage) {
      let { email, password } = JSON.parse(checkLocalStroage);
      SignIn(email, password, (status) => {
        if (!status) {
          navigate("/signin");
        }
      });
    } else {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (state.Notes.selectedNote._id) {
      navigate(`/note/${state.Notes.selectedNote._id}`);
    }
  }, [state.Notes.selectedNote]);
  return (
    <>
      <LoaderOrg status={state.loader} />
      <ToastContainer />
      <div className={Styles.notesParent}>
        <Offline>
          <div className={Styles.OfflineAlert}>
            “You are not connected to the internet. Changes will not be save
          </div>
        </Offline>
        <NotesHeader />
        <div className={Styles.ContentContainer}>
          <div className={Styles.LeftContainer}>
            <LeftContainer />
          </div>
          <div className={Styles.rightContainer}>
            <RightContainer />
          </div>
          {/* <div></div> */}
        </div>
      </div>
    </>
  );
};
