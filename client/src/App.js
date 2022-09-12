import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect, useRef } from "react";
import { RootContext } from "./Context/RootContext";
import { io } from "socket.io-client";
import { AuthTemp } from "./Components/Templates/Auth/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const socket = io.connect("");

function App() {
  // const { robby, setRobby } = useContext(RootContext);

  // const socket = useRef();

  useEffect(() => {
    // const socket = io("ws://localhost:5000", {
    //   reconnectionDelayMax: 10000,
    //   // auth: {
    //   //   token: "123",
    //   // },
    //   // query: {
    //   //   "my-key": "my-value",
    //   // },
    // });
  }, []);

  // const handleClick = () => {
  //   socket.current.emit("message", new Date().getTime());
  // };

  return (
    <div className="App">
      {/* <AuthTemp /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
