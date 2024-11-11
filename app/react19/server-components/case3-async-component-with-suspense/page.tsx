import { Suspense } from "react";

export default async function Page() {
  console.log("Page");

  // SCはSuspenseと深く統合されています。
  // Suspnnseの子要素が非同期コンポーネントの場合、
  // そのPromiseが解決されるまでサスペンドするようになっています。

  return (
    <main>
      <h1>Main</h1>
      <Suspense fallback={<div>loading...</div>}>
        <Sleep />
      </Suspense>
    </main>
  );
}

async function Sleep() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("ServerComponent: Sleep");

  return <p>Sleep</p>;
}
