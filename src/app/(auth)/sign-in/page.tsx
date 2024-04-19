
import { FC } from "react";
import Signin from "../_components/signin";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {


  return (
    <Signin isLogin={true}/>
  );
};

export default Page;
