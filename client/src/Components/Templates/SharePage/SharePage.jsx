import { NotesHeader } from "../../Organisms/Notes/Header/NotesHeader";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicNote } from "../../../Apis/GET";
import { useContext } from "react";
import { RootContext } from "../../../Context/RootContext";
import { useState } from "react";
import { useEffect } from "react";
import { Editor } from "draft-js";
import Styles from "./Share.module.scss";

export const SharePage = () => {
  const { shareid } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(RootContext);

  const [fetchData, setFetchData] = useState("");

  const datafetching = async () => {
    let data = await getPublicNote(state.api, shareid);

    setFetchData(data.data.data);
  };

  useEffect(() => {
    datafetching();
  }, []);

  return (
    <>
      <NotesHeader />

      {fetchData && fetchData.isPublic ? (
        <div className={Styles.MainContainer}>
          <div className={Styles.heading}>
            <h2>{fetchData.title || ""}</h2>
          </div>

          <div
            className={Styles.Content}
            dangerouslySetInnerHTML={{ __html: fetchData.note || "" }}
          />
        </div>
      ) : (
        <>
          <div className={Styles.messagebox}>
            <h2>Note not found go to login to access the app</h2>
            <button onClick={() => navigate("/")}>Go to App</button>
          </div>
        </>
      )}
    </>
  );
};
