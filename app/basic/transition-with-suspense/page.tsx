"use client";

import { Suspense, useState, useTransition } from "react";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const [promise, setPromise] = useState<Promise<string> | null>(null);

  console.log(`isPending: ${isPending}`);

  return (
    <>
      <div>
        <button
          type="button"
          // トランジションによって更新されたコンポーネントがサスペンドした場合、
          // fallbackが表示されない（裏側でレンダリングはされる）
          onClick={() => {
            startTransition(() => {
              const promise = new Promise<string>((resolve) =>
                setTimeout(() => resolve("Hello!"), 1000)
              );
              setPromise(promise);
            });
          }}
        >
          with Transition
        </button>
        <button
          type="button"
          // このボタンで更新した場合、fallbackが表示される
          onClick={() => {
            const promise = new Promise<string>((resolve) =>
              setTimeout(() => resolve("Hello!"), 1000)
            );
            setPromise(promise);
          }}
        >
          without Transition
        </button>
        <button type="button" onClick={() => setPromise(null)}>
          Reset
        </button>
      </div>
      <hr />
      <div>isPending: {isPending.toString()}</div>
      <Suspense fallback={<Loading />}>
        {promise && <Sleep promise={promise} />}
      </Suspense>
    </>
  );
}

function Sleep({
  promise,
}: {
  promise: Promise<string> & { status?: "fulfilled"; value?: string };
}) {
  if (promise.status === "fulfilled") {
    return <div>{promise.value}</div>;
  }

  promise.then((value) => {
    promise.status = "fulfilled";
    promise.value = value;
  });

  throw promise;
}

function Loading() {
  console.log("Loading");
  return <div>Loading...</div>;
}
