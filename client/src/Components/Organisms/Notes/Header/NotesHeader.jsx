import { Offline, Online, OnlineState } from "react-detect-offline";
import { ProfilePic } from "../../../Atoms/Icons/Icons";
import Style from "./NotesHeader.module.scss";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const NotesHeader = () => {
  useEffect(() => {}, []);

  return (
    <>
      <div className={Style.Header}>
        <h1>NOTES</h1>
        <div className={Style.RightContainer}>
          <ProfilePic />
          <img
            className={Style.icons}
            src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/000000/external-bell-date-and-time-tanah-basah-basic-outline-tanah-basah-2.png"
          />
          <img
            className={Style.icons}
            src="https://img.icons8.com/fluency-systems-regular/48/000000/user.png"
          />
          <Online>
            <div style={{ color: "green", fontWeight: 600 }}>ONLINE</div>
          </Online>
          <Offline>
            <div style={{ color: "red", fontWeight: 600 }}>OFFLINE</div>
          </Offline>
        </div>
      </div>
    </>
  );
};
