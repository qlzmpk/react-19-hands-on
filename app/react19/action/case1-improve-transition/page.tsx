"use client";

import { useState, useTransition } from "react";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // React19からは、startTransitionに非同期関数を渡せるようになった。
    // 非同期関数の戻り値のPromiseがresolveされるまで、isPendingはtrueのままとなる
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setState((prev) => prev + 1);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>state: {state}</div>
      <div>isPending: {isPending.toString()}</div>
      <button type="submit">Submit</button>
    </form>
  );
}
