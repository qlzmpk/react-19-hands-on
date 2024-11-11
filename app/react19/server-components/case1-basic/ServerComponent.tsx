// サーバーコンポーネントが有効な環境ではサーバーコンポーネントがデフォルトです。
// サーバーコンポーネントを宣言するためのディレクティブはありません。
// https://ja.react.dev/reference/rsc/server-components#adding-interactivity-to-server-components

import fs from "node:fs/promises";
import { useState } from "react";
import BothComponent from "./BothComponent";

// SCではPromiseを返すことができる。(=async関数が使える)
export default async function ServerComponent() {
  // このconsole.logはサーバーでのみ表示される
  // ブラウザに表示されることはない
  console.log("ServerComponent");

  // ブラウザAPIは使えないため、このコメントを外すとエラーとなる
  // console.log(navigator.userAgentData);

  // SCでhooksは使えないため、このコメントを外すとエラーとなる
  // const [state, setState] = useState(0);

  // コンポーネント内でファイルシステムへのアクセスやネットワークリクエストを行うことができる
  const file = await fs.readFile("LICENSE", "utf-8");
  // https://jsonplaceholder.typicode.com
  const json = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (response) => response.json()
  );

  console.log(json);
  console.log(file);

  return (
    <div>
      <p
      // SCでイベントハンドラは定義できないため。このコメントを外すとランタイムエラーとなる
      // onClick={() => console.log("ServerComponent")}
      >
        Server Component
      </p>
      <BothComponent env="server" />
    </div>
  );
}
