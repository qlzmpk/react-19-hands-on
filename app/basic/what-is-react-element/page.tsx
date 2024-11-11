"use client";

import { createElement } from "react";
import { jsx } from "react/jsx-runtime";

export default function Page() {
  console.log(<div />);
  console.log(createElement("div"));
  console.log(jsx("div", {}));

  console.log(<></>);

  // これはcreateElementしてるだけなので
  // 内部のconsole.log("Component")はこの時点では実行されない
  console.log(<Component />);

  return null;
}

function Component() {
  console.log("Component");

  return <div />;
}
