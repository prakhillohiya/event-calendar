import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

const Login = () => {
  const navigate = useNavigate({ from: "/" });

  const handleAuthorization = async (code: string) => {
    await toast.promise(
      axios.post(
        `${import.meta.env.VITE_BASE_URI}/auth/google`,
        { code },
        { withCredentials: true }
      ),
      {
        error: (err) => err.message,
        success: (data) => data.data.message,
        loading: "Loading",
      }
    );

    navigate({ to: "/calendar" });
  };

  const login = useGoogleLogin({
    onSuccess: ({ code }) => handleAuthorization(code),
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar openid email profile",
  });

  return (
    <Button
      variant="outlined"
      startIcon={<Icon icon="devicon:google" />}
      onClick={login}
    >
      Sign In
    </Button>
  );
};

export default Login;
