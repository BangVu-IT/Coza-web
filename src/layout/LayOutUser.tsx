import React from "react";
import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";

type Props = {
  children: any;
};

export default function LayOutUser(props: Props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
