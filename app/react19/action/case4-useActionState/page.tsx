"use client";

import { useActionState, useState, useTransition } from "react";

export default function Page() {
  const [state, formAction, isPending] = useActionState(
    // 第一引数にアクションとしての関数を渡す
    async (previousState: number, formData: FormData) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return previousState + 1;
    },
    // 第二引数に初期値を渡す
    0
  );

  return (
    <form action={formAction}>
      <div>state: {state}</div>
      <div>isPending: {isPending.toString()}</div>
      <button type="submit">Submit</button>
    </form>
  );
}

// useActionStateは以下のようなコードと同等のことを行なっている
function useActionState_<T>(
  action: (previousState: T, formData: FormData) => Promise<T>,
  initialState: T
) {
  const [state, setState] = useState(initialState);
  const [isPending, startTransition] = useTransition();

  const dispatch = (formData: FormData) => {
    startTransition(async () => {
      const nextState = await action(state, formData);
      setState(nextState);
    });
  };

  return [state, dispatch, isPending] as const;
}
