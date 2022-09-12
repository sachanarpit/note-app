import { EnterBtn } from "../../../../Atoms/Buttons/Buttons";
import Styles from "./Header.module.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { useContext } from "react";
import { RootContext } from "../../../../../Context/RootContext";

export const HeaderRight = () => {
  const copyURL = () => {
    navigator.clipboard.writeText(getCurrentUrl());
    toast.success("you have copy url successfully");
  };

  const [shareShow, setShareShow] = useState(false);

  const { state, changePublicStatus } = useContext(RootContext);

  const { isPublic, _id } = state.Notes.selectedNote;

  const [option, setOption] = useState(isPublic || true);

  const getCurrentUrl = () => {
    let domain = window.location.protocol + "//" + window.location.host;
    return domain + "/share/" + _id;
  };

  const handleChangeOption = (ev) => {
    setOption(ev.target.value);
    // console.log("ev.target.value:", ev.target.value);
    changePublicStatus(ev.target.value);
  };

  return (
    <>
      <div className={Styles.HeaderRight}>
        <h4>Your Title will be displayed Here</h4>
        <div className={Styles.IconContainer}>
          <img src="https://img.icons8.com/sf-regular-filled/48/000000/add-user-male.png" />
          <img
            onClick={() => setShareShow(!shareShow)}
            src="https://img.icons8.com/external-anggara-glyph-anggara-putra/64/000000/external-share-basic-user-interface-anggara-glyph-anggara-putra-3.png"
          />
          <img src="https://img.icons8.com/ios-filled/50/000000/more.png" />
        </div>
      </div>

      <div
        className={Styles.ShareContainer}
        style={{ opacity: shareShow ? 1 : 0 }}
      >
        <div className={Styles.titleContainer}>
          <h4>Share</h4>
        </div>
        <div className={Styles.MainContainer}>
          <input type="text" value={getCurrentUrl()} />
          <button onClick={copyURL}>Copy Link</button>
        </div>

        <div className={Styles.OptionBar}>
          <select name="" id="" value={option} onChange={handleChangeOption}>
            <option selected value={true}>
              Anyone with the link can view
            </option>
            <option value={false}>Only View to me</option>
          </select>
        </div>
      </div>
      <div
        className={Styles.ShareContainer}
        style={{ opacity: shareShow ? 1 : 0 }}
      >
        <div className={Styles.titleContainer}>
          <h4>Invite</h4>
        </div>
        <div className={Styles.MainContainer}>
          <input type="text" value={getCurrentUrl()} />
          <button onClick={copyURL}>Send Link</button>
        </div>

        <div className={Styles.OptionBar}>
          <select name="" id="" value={option} onChange={handleChangeOption}>
            <option selected value={true}>
              Anyone with the link can view
            </option>
            <option value={false}>Only View to me</option>
          </select>
        </div>
      </div>
    </>
  );
};
