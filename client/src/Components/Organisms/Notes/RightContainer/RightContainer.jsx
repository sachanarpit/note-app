import { EditorMain } from "../../../Molecules/Notes/Right/Editor/RightEditor";
import { HeaderRight } from "../../../Molecules/Notes/Right/Header/HeaderRight";

export const RightContainer = () => {
  return (
    <>
      <div style={{ overflow: "scroll", height: "100%" }}>
        <HeaderRight />

        <EditorMain />
      </div>
    </>
  );
};
