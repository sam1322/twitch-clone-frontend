"use client";
import { googleClientId } from "@/constants/secrets";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FC } from "react";
import GoogleButton from "./GoogleButton";

interface GoogleLoginProps {
  isLoading: boolean;
  onSignInCode: (code: string) => void;
}

const GoogleLogin: FC<GoogleLoginProps> = ({ isLoading, onSignInCode }) => {
  return (
    <>
      <GoogleOAuthProvider clientId={googleClientId}>
        <GoogleButton isLoading={isLoading} onSignInCode={onSignInCode} />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLogin;
