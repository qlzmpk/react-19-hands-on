"use client";

import { Suspense, useState } from "react";

export default function Page() {
  const [promise] = useState(() => {
    return new Promise<string>((resolve) =>
      setTimeout(() => resolve("Hello!"), 1000)
    );
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component promise={promise} />
    </Suspense>
  );
}

function Component({
  promise,
}: {
  // Promiseを同期的に扱えるようにするためにPromiseを拡張します。
  // デモ用の簡易的な型定義のためプロダクション環境では使用しないでください。
  promise: Promise<string> & { status?: "fulfilled"; value?: string };
}) {
  if (promise.status === "fulfilled") {
    return <div>{promise.value}</div>;
  }

  promise.then((value) => {
    // Promiseが解決された時に自身のPromiseオブジェクトに値を設定することで、
    // Promiseを同期的に扱えるようにします。
    promise.status = "fulfilled";
    promise.value = value;
  });

  // Promiseをthrowすることでレンダリングをサスペンド（suspend, 一時中断）できます。
  // この場合Suspenseのfallbackに渡されたコンポーネントが描画されます。
  // Promiseをthrowすることでサスペンドできるというのは内部実装で公式ドキュメントには明記されていません。
  // プロダクション環境では、Suspense対応のライブラリやフレームワークを使用してください。
  // https://ja.react.dev/reference/react/Suspense#displaying-a-fallback-while-content-is-loading
  throw promise;
}
