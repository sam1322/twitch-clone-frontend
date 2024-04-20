import { FC } from "react";
import Signin from "../_components/signin";

interface SignupPageProps {}

const SignupPage: FC<SignupPageProps> = ({}) => {
  return <Signin isLogin={false} />;
};

export default SignupPage;
