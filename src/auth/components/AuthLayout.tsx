import React, { use, useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const AuthLayout = () => {
  const [mode, setMode] = useState("signin");
  const isSignUp = mode === "signup";

  const toggleMode = () => {
    setMode(isSignUp ? "signin" : "signup");
  };
  return (
    <>
      {isSignUp ? <SignUpForm /> : <SignInForm />}
      <button onClick={toggleMode}>
        {isSignUp ? "Already have an account? Sign in" : "New here? Sign up"}
      </button>
    </>
  );
};

export default AuthLayout;
