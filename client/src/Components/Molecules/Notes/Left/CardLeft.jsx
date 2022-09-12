import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { RootContext } from "../../../../Context/RootContext";
import Styles from "./CardLeft.module.scss";

export const CardLeft = (props) => {
  // const {
  //   date = "MAY 5",
  //   title = "Visual Inspiration",
  //   description = "Let's collect Inspiration for our truck and menu",
  // } = props;
  const {
    title = "this is dummy title",
    tags,
    createdAt,
    updatedAt,
    note,
    _id,
  } = props.data;

  const { state, CardClick } = useContext(RootContext);
  let description = "Let's collect Inspiration for our truck and menu";
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (state.Notes.selectedNote._id) {
      if (state.Notes.selectedNote._id === _id) {
        setActive(true);
      } else {
        setActive(false);
      }
    } else {
      setActive(false);
    }
  }, [state.Notes.selectedNote]);

  const HandleCardClick = () => {
    CardClick(props.data);
  };

  return (
    <>
      <div
        {...props}
        className={Styles.CardConatainer}
        onClick={HandleCardClick}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        style={{
          paddingBottom: hover && "1.5rem",
          backgroundColor: active
            ? "#32a06023"
            : hover
            ? "rgba(0, 0, 0, 0.1)"
            : "transparent",
        }}
      >
        <div>
          <p>{`${new Date(updatedAt).getDate()} ${new Date(
            updatedAt
          ).toLocaleString("default", { month: "long" })}`}</p>
        </div>
        <div>
          <h4>{title}</h4>
        </div>
        <div>
          <p>{description}</p>
        </div>
        {hover && (
          <div className={Styles.TagContainer}>
            <div>#hello</div>
            <div>#hello</div>
            <div>#hello</div>
            <div>#hello</div>
          </div>
        )}
      </div>
    </>
  );
};
