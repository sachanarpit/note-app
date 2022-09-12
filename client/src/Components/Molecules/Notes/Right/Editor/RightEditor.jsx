import {
  EditorState,
  convertFromHTML,
  convertToRaw,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import { useState } from "react";
import Styles from "./RightEditor.module.scss";
import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { RootContext } from "../../../../../Context/RootContext";
import { ProfilePic } from "../../../../Atoms/Icons/Icons";
import { useParams } from "react-router-dom";

export const EditorMain = () => {
  const editorRef = useRef(null);
  const titleRef = useRef(null);

  const { updatePost, state, changeTitle } = useContext(RootContext);

  const { noteid } = useParams();

  let timeout = useRef();
  //   let debounce = function (func, delay) {
  //     clearTimeout(timeout.current);

  //     timeout.current = setTimeout(func, delay);

  //   };

  const [title, setTitle] = useState("");

  const [noteState, setNoteState] = useState("");

  const [time, setTime] = useState(0);

  useEffect(() => {}, [state.Notes.selectedNote]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const sendData = () => {};
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
    debounce();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    // console.log(currentContentAsHTML);
    setConvertedContent(currentContentAsHTML);
  };

  useEffect(() => {
    if (state.Notes.selectedNote._id) {
      setTitle(state.Notes.selectedNote.title || "");
      setTime(state.Notes.selectedNote.updatedAt || 0);
      console.log(
        "state.Notes.selectedNote.title.updatedAt:",
        state.Notes.selectedNote.updatedAt
      );
      let contentBlocks = htmlToDraft(state.Notes.selectedNote.note || "");

      const contentState = ContentState.createFromBlockArray(contentBlocks);
      const rawHtml = convertToRaw(contentState);
      setNoteState(rawHtml);

      //   setEditorState(data);
    }
  }, [state.Notes.selectedNote]);

  const debounce = function () {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      console.log("trigger");
      updatePost({ note: convertedContent, title, noteid });
    }, 2500);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <div className={Styles.MainContainer}>
        <div className={Styles.TitlContainer}>
          <input
            contentEditable={true}
            placeholder={"Your Title"}
            onChange={(e) => {
              //   console.log("e:", e.target.value);
              setTitle(e.target.value);
              changeTitle(e.target.value);
            }}
            value={title}
            ref={titleRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                editorRef.current.focusEditor();
              }
            }}
          />
        </div>

        <div className={Styles.middleContainer}>
          <div className={Styles.flexRow}>
            <div className={Styles.HeadingTag}>Collborator</div>
            <div className={Styles.profile}>
              <ProfilePic /> Julia Hugesd
            </div>
          </div>
          <div className={Styles.flexRow}>
            <div className={Styles.HeadingTag}>Last Updated</div>
            <div>{`${new Date(time).getDate()} ${new Date(time).toLocaleString(
              "default",
              { month: "long" }
            )} at ${new Date(time).getHours()}:${new Date(
              time
            ).getMinutes()}`}</div>
          </div>
        </div>

        <div className={Styles.EditorContainer}>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            ref={editorRef}
            contentState={noteState}
          />
        </div>
      </div>
    </>
  );
};

//yarn add react-draft-wysiwyg@1.14.5 draft-js@0.11.7 draft-convert@2.1.10 dompurify@2.2.6
