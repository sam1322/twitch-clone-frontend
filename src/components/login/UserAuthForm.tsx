"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_API_URL, BASE_API_URL_V1 } from "@/constants/path";
import { cn } from "@/lib/utils";
import axios, { isAxiosError } from "axios";
import { Icons } from "../icons";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import GoogleLogin from "./Google/GoogleLogin";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isLogin: boolean;
}

type LoginCredentials = {
  loginProvider: "WEB" | "GOOGLE";
} & (
  | { loginProvider: "WEB"; email: string; password: string } // No "code" property for web login
  | { loginProvider: "GOOGLE"; code: string }
); // "code" required for Google login

const UserAuthForm = ({ className, isLogin, ...props }: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const onSubmit = async (payload: LoginCredentials) => {
    const loginUrl = isLogin
      ? "/api/v1/auth/authenticate"
      : "/api/v1/auth/register";

    try {
      setIsLoading(true);
      const result = await axios.post(BASE_API_URL + loginUrl, payload);
      if (result.status === 200) {
        console.log(result.data);
        const token = result.data.token;
        setCookie("token", token);
        toast.success(isLogin ? "Login successful" : "Signup successful");
        router.push("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("error:", error);
      if (isAxiosError(error)) {
        const errorStatus = error.response?.status;
        let errorMessage = error.response?.data?.message;
        if (errorStatus === 400 || errorStatus === 401) {
          if (errorMessage === "Bad credentials") {
            errorMessage = "Invalid email or password";
          }
          toast.error(errorMessage);
          // toast.error("Invalid email or password");
        } else {
          toast.error("Something went wrong");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitSignin = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await onSubmit({
      loginProvider: "WEB",
      email,
      password,
    });
  };

  const onGoogleSignin = async (code: string) => {
    await onSubmit({
      loginProvider: "GOOGLE",
      code,
    });
  };

  // async function onSubmit(event: React.SyntheticEvent) {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const result = await axios.post(
  //       BASE_API_URL + "/api/v1/auth/authenticate",
  //       {
  //         email: email,
  //         password: password,
  //         loginProvider: "WEB",
  //       }
  //     );
  //     if (result.status === 200) {
  //       console.log(result.data);
  //       const token = result.data.token;
  //       setCookie("token", token);
  //       toast.success("Login successful");
  //       router.push("/dashboard");
  //     } else {
  //       toast.error("Invalid email or password");
  //     }
  //   } catch (error) {
  //     console.log("error1:", error);
  //     if (isAxiosError(error)) {
  //       if (error.response?.status === 401) {
  //         toast.error("Invalid email or password");
  //       } else {
  //         toast.error("Something went wrong");
  //       }
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmitSignin}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLogin ? "Sign In" : "Sign Up"} with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleLogin isLoading={isLoading} onSignInCode={onGoogleSignin} />

      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
};
export default UserAuthForm;
