"use client";

import { startTransition, Suspense, useState } from "react";

// https://ja.react.dev/blog/2024/04/25/react-19#actions
export default function Page() {
  const [state, setState] = useState(0);
  console.log(`state: ${state}`);

  const [promise, setPromise] = useState<Promise<string> | null>(null);
  console.log(promise);

  return (
    <form
      // React19からは、actionに関数を渡せるようになった。
      action={async (formData: FormData) => {
        console.log("Submit(Default)");
        console.log(formData);

        // トランジションなのでこの更新は即座に反映されない
        setState((prev) => prev + 1);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setState((prev) => prev + 1);
      }}
      // onSubmit属性に関数を指定した場合、action属性に渡した関数は無視される
      // onSubmit={(event) => {
      //   event.preventDefault();
      //   console.log("onSubmit");
      // }}
    >
      <div>state: {state}</div>
      {/* submitイベントでaction属性に渡した関数が実行される。 */}
      <button type="submit">Submit(Default)</button>
      <button
        type="submit"
        // formAction属性に関数を指定した場合、<form>要素のaction属性をオーバーライドする挙動となる。
        formAction={async (formData: FormData) => {
          console.log("Submit(Alternative)");
          console.log(formData);

          await new Promise((resolve) => setTimeout(resolve, 1000));
          setState((prev) => prev + 10);
        }}
      >
        Submit(Alternative)
      </button>
      <hr />
      <button
        type="submit"
        formAction={() => {
          console.log("setPromise with Action");
          const promise = new Promise<string>((resolve) =>
            setTimeout(() => resolve("Hello!"), 1000)
          );
          setPromise(promise);
        }}
      >
        setPromise with Action
      </button>
      <button
        type="button"
        onClick={() => {
          console.log("setPromise without Action");
          const promise = new Promise<string>((resolve) =>
            setTimeout(() => resolve("Hello!"), 1000)
          );
          setPromise(promise);
        }}
      >
        setPromise without Action
      </button>
      <button type="button" onClick={() => setPromise(null)}>
        setPromise(null)
      </button>
      <hr />
      <Suspense fallback={<Loading />}>
        {promise && <Sleep promise={promise} />}
      </Suspense>
    </form>
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

// action属性の関数は以下のようなコードと同等のことを行なっている
const convertFormProps = ({
  onSubmit,
  action,
  ...rest
}: JSX.IntrinsicElements["form"]): JSX.IntrinsicElements["form"] => {
  if (onSubmit === undefined && typeof action === "function") {
    return {
      onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
          return action(formData);
        });
      },
      ...rest,
    };
  }

  return { onSubmit, action, ...rest };
};
