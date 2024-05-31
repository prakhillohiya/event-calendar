import { useState } from "react";
import "./App.css";
import Calendar from "./calendar/Calendar";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import Login from "./Login";
import { DialogProvider } from "@/context/DialogProvider";

function App() {
  return (
    <DialogProvider>
      <GoogleOAuthProvider clientId="145004996705-0b7ghbv9dfrncr71fhr78fhtecfcqnrr.apps.googleusercontent.com">
        <Login />
        <Toaster />
      </GoogleOAuthProvider>
    </DialogProvider>
  );
}

export default App;
