"use client";

import { Suspense, use, useState } from "react";

export default function Page() {
  const [promise, setPromise] = useState<Promise<string> | null>(null);

  console.log("Page");

  return (
    <>
      <button
        onClick={() => {
          const promise = new Promise<string>((resolve) => {
            setTimeout(() => {
              console.log("Resolve!");
              resolve("Hello!");
            }, 1000);
          });
          setPromise(promise);
        }}
      >
        Click me!
      </button>
      <hr />
      <Suspense fallback={<div>Loading...</div>}>
        {promise && <Component promise={promise} />}
      </Suspense>
    </>
  );
}

function Component({ promise }: { promise: Promise<string> }) {
  console.log("before use");

  const value = use(promise);

  console.log("after use");

  return <div>{value}</div>;
}
