import React from "react";
import HeaderWareHouse from "../page/ware-house/header/HeaderWareHouse";

type Props = {
  children: any;
};

export default function LayOutAdmin(props: Props) {
  return (
    <div className="container-warehouse">
      <HeaderWareHouse />
      {props.children}
    </div>
  );
}
