import { FC } from "react";
import UserAuthForm from "@/components/auth/UserAuthForm";
import Link from "next/link";
interface SigninProps {
  isLogin: boolean;
}

const Signin: FC<SigninProps> = ({ isLogin }) => {
  return (
    <div className="p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isLogin ? "Sign in to your account" : "Create an account"}
          </h1>
          <p className="white text-sm text-muted-foreground">
            Enter your email below to {isLogin ? "sign into" : "create"} your
            account
          </p>
        </div>
        <UserAuthForm isLogin={isLogin} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          {isLogin ? "Not a member ? " : "Already have an account ? "}
          <Link
            href={isLogin ? "/sign-up" : "/sign-in"}
            className="underline underline-offset-4 hover:text-primary"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </Link>
        </p>
        {!isLogin && (
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default Signin;
