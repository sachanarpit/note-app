import { useContext } from "react";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import App from "../App";
import { AuthTemp } from "../Components/Templates/Auth/Index";

import { Notes } from "../Components/Templates/Notes/Index";
import { SharePage } from "../Components/Templates/SharePage/SharePage";
import { RootContext } from "../Context/RootContext";

export const RoutesWrapper = () => {
  const { state } = useContext(RootContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Notes />}></Route>
        <Route path="/note/:noteid" element={<Notes />}></Route>
        <Route path="/share/:shareid" element={<SharePage />}></Route>
        <Route path="/signin" element={<AuthTemp status={0} />}></Route>
        <Route path="/signup" element={<AuthTemp status={1} />}></Route>
        <Route path="/forgetpassword" element={<AuthTemp status={2} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
