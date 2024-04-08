import { FC } from "react";
// import GoogleIcon from "public/google.svg";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";

interface GoogleButtonProps {
  isLoading: boolean;
  onSignInCode?: (code: string) => void;
}

const GoogleButton: FC<GoogleButtonProps> = ({
  isLoading = false,
  onSignInCode,
}) => {
  const onImplicitSuccess = async (response: any) => {
    console.log("Implicit", response);
    onSignInCode(response.code);
  };

  const signIn = useGoogleLogin({
    onSuccess: onImplicitSuccess,
    flow: "auth-code",
  });

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => signIn()}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </>
  );
};

export default GoogleButton;
