import { useEffect, useReducer } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { getAllPosts } from "../Apis/GET";
import {
  CreateNoteReq,
  forgetPasswordReq,
  SignInReq,
  SignUpReq,
} from "../Apis/POST";
import { UpdatePost, UpdateStatus } from "../Apis/PUT/Index";

export const RootContext = createContext();

const ActionType = {
  ADD_DATA: "ADD_DATA",
  SET_USER_DATA: "SET_USER_DATA",
  SET_LOADER_STATUS: "SET_LOADER_STATUS",
  SET_ALL_NOTES: "SET_ALL_NOTES",
  SET_SELECTED_CARD: "SET_SELECTED_CARD",
  ADD_NOTE: "ADD_NOTE",
  UPDATE_NOTE: "UPDATE_NOTE",
};

const initalState = {
  api: "http://localhost:5000",
  data: "",
  isLogin: false,
  UserData: {},
  loader: false,
  Notes: {
    allNotes: [],
    selectedNote: {},
  },
};

const reducer = (state, action) => {
  let { type, payload } = action;
  // console.log("type", type);

  switch (type) {
    case ActionType.ADD_DATA:
      return {
        ...state,
        data: payload,
      };
    case ActionType.SET_USER_DATA:
      return {
        ...state,
        UserData: payload,
        isLogin: true,
        loader: false,
      };

    case ActionType.SET_LOADER_STATUS:
      return {
        ...state,
        loader: payload,
      };

    case ActionType.SET_ALL_NOTES:
      return {
        ...state,
        Notes: {
          ...state.Notes,
          allNotes: payload,
          selectedNote: payload[0],
        },
      };

    case ActionType.SET_SELECTED_CARD:
      return {
        ...state,
        Notes: {
          ...state.Notes,
          selectedNote: payload,
        },
      };

    case ActionType.ADD_NOTE:
      return {
        ...state,
        Notes: {
          ...state.Notes,
          allNotes: [payload, ...state.Notes.allNotes],
          selectedNote: payload,
        },
      };

    case ActionType.UPDATE_NOTE:
      let index = state.Notes.allNotes.findIndex(
        (x) => x._id == state.Notes.selectedNote._id
      );
      state.Notes.allNotes[index] = {
        ...state.Notes.allNotes[index],
        title: payload,
      };
      return {
        ...state,
        Notes: {
          ...state.Notes,
          allNotes: [...state.Notes.allNotes],
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export const RootContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  let SignIn = async (email, password, callback) => {
    dispatch({ type: ActionType.SET_LOADER_STATUS, payload: true });
    try {
      let data = await SignInReq(state.api, email, password);
      let storageData = { email, password };
      dispatch({
        type: ActionType.SET_USER_DATA,
        payload: storageData,
      });

      localStorage.setItem("noteapp", JSON.stringify(storageData));
      toast.success(data.data.message);
      console.log("data:", data);
      callback(true);
    } catch (err) {
      console.log("err:", err);
      toast.error(err.response.data.message);
      dispatch({ type: ActionType.SET_LOADER_STATUS, payload: false });
      callback(false);
    }
  };
  let SignUp = async (email, password, name, callback) => {
    dispatch({ type: ActionType.SET_LOADER_STATUS, payload: true });
    try {
      let data = await SignUpReq(state.api, email, password, name);
      let storageData = { email, password, name };
      dispatch({
        type: ActionType.SET_USER_DATA,
        payload: storageData,
      });

      localStorage.setItem("noteapp", JSON.stringify(storageData));
      toast.success(data.data.message);
      console.log("data:", data);
      callback(true);
    } catch (err) {
      console.log("err:", err);
      toast.error(err.response.data.message);
      dispatch({ type: ActionType.SET_LOADER_STATUS, payload: false });
      callback(false);
    }
  };

  let ForgetPassword = async (email, callback) => {
    dispatch({ type: ActionType.SET_LOADER_STATUS, payload: true });
    try {
      let data = await forgetPasswordReq(state.api, email);

      // localStorage.setItem("noteapp", JSON.stringify(storageData));
      toast.success(data.data.message);
      dispatch({ type: ActionType.SET_LOADER_STATUS, payload: false });

      callback(true);
    } catch (err) {
      console.log("err:", err);
      toast.error(err.response.data.message);
      dispatch({ type: ActionType.SET_LOADER_STATUS, payload: false });
      callback(false);
    }
  };

  //notes function
  const updatePost = async ({
    note = "",
    title = "",
    noteid = "631de483dc5a511a4c9fec8e",
    isPublic = false,
  }) => {
    try {
      let data = await UpdatePost(
        state.api,
        note,
        title,
        state.UserData.email || "",
        noteid,
        isPublic
      );
      toast.success(data.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const getSinglePost = () => {};

  const getAllPostofUser = async () => {
    dispatch({ type: ActionType.SET_LOADER_STATUS, payload: true });
    let allpost = await getAllPosts(state.api, state.UserData.email || "");
    let { data } = allpost.data;
    dispatch({ type: ActionType.SET_ALL_NOTES, payload: data });
    dispatch({ type: ActionType.SET_LOADER_STATUS, payload: false });
    // console.log("allpost:", allpost);
  };

  const CardClick = (data) => {
    dispatch({ type: ActionType.SET_SELECTED_CARD, payload: data });
  };

  const AddNote = async () => {
    dispatch({ type: ActionType.SET_LOADER_STATUS, payload: true });
    try {
      let allpost = await CreateNoteReq(state.api, state.UserData.email || "");
      let { data } = allpost.data;
      dispatch({ type: ActionType.ADD_NOTE, payload: data });
      dispatch({ type: ActionType.SET_LOADER_STATUS, payload: false });
      toast.success("note is create successfully");
    } catch (err) {
      dispatch({ type: ActionType.SET_LOADER_STATUS, payload: false });
      toast.error("note is not created");
    }
  };

  const changeTitle = (data) => {
    dispatch({ type: ActionType.UPDATE_NOTE, payload: data });
  };

  const changePublicStatus = async (status) => {
    console.log("status:", status);
    try {
      await UpdateStatus(state.api, state.Notes.selectedNote._id, status);
      toast.success("status is updated succesfully");
    } catch (err) {
      toast.error("status is not updated");
    }
  };

  useEffect(() => {
    if (state.UserData.email) {
      getAllPostofUser();
    }
  }, [state.UserData]);

  return (
    <RootContext.Provider
      value={{
        state,
        SignIn,
        SignUp,
        ForgetPassword,
        updatePost,
        CardClick,
        AddNote,
        changeTitle,
        changePublicStatus,
      }}
    >
      {props.children}
    </RootContext.Provider>
  );
};
