"use client";

import { useActionState, useMemo, useOptimistic, useState } from "react";

export default function Page() {
  return (
    <>
      <Form1 />
      <hr />
      <Form2 />
      <hr />
      <Form3 />
    </>
  );
}

function Form1() {
  const action = async (previousState: number, formData: FormData) => {
    // トランジションまたはアクションの中でaddOptimisticを呼び出せる
    addOptimistic((prev) => prev + 1);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return previousState;
  };

  const [state, formAction, isPending] = useActionState(action, 10);

  // 初期状態ではstateとoptimisticStateは同じ値になる
  // トランジションの間だけaddOptimisticで更新した値がoptimisticStateに反映される
  // トランジションが終わるとoptimisticStateはstateと同じ値になる
  const [optimisticState, addOptimistic] = useOptimistic(state);

  return (
    <form action={formAction}>
      <div>Form1</div>
      <div>isPending: {isPending.toString()}</div>
      <div>state: {state}</div>
      <div>optimisticState: {optimisticState}</div>
      <button type="submit">Submit</button>
    </form>
  );
}

// useOptimisticに渡した値が更新された場合、addOptimisticに渡した関数が再度呼ばれる
function Form2() {
  const action = async (formData: FormData) => {
    addOptimistic((prev) => {
      console.log("addOptimistic 1");
      return prev + 1;
    });
    addOptimistic((prev) => {
      console.log("addOptimistic 2");
      return prev + 2;
    });
    addOptimistic((prev) => {
      console.log("addOptimistic 3");
      return prev + 3;
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const [count, setCount] = useState(0);
  const [optimisticState, addOptimistic] = useOptimistic(count);

  return (
    <form action={action}>
      <div>Form2</div>
      <div>optimisticState: {optimisticState}</div>
      <button type="submit">submit</button>
      <button type="button" onClick={() => setCount((prev) => prev + 1)}>
        onClick
      </button>
    </form>
  );
}

function Form3() {
  type Like = {
    count: number;
    isLiked: boolean;
  };

  const action = async (previousState: Like, formData: FormData) => {
    const nextState = previousState.isLiked
      ? {
          count: previousState.count - 1,
          isLiked: false,
        }
      : {
          count: previousState.count + 1,
          isLiked: true,
        };
    addOptimistic(nextState);

    console.log("before request");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("after request");

    return nextState;
  };

  const [state, formAction, isPending] = useActionState(action, {
    count: 100,
    isLiked: false,
  });

  const [optimisticState, addOptimistic] = useOptimistic(state);

  const likeState = isPending ? optimisticState : state;

  return (
    <form action={formAction}>
      <div>Form3</div>
      <button type="submit">
        {likeState.isLiked ? "❤" : "♡"} {likeState.count}
      </button>
    </form>
  );
}

// useOptimisticは以下のようなコードと同等のことを行なっている
function useOptimistic_<State>(originalState: State) {
  // Reactの内部コードの疑似コード
  function usePending(onTransitionEnd: () => void): boolean {
    return false;
  }

  type UpdateFunction = (pendingState: State) => State;

  const [updateFunctions, setUpdateFunctions] = useState<UpdateFunction[]>([]);
  const isPending = usePending(() => setUpdateFunctions([]));

  const addOptimistic = (updateFunction: UpdateFunction) => {
    setUpdateFunctions((prev) => [...prev, updateFunction]);
  };

  const optimisticState = useMemo(() => {
    return updateFunctions.reduce<State>(
      (previousState, updateFunction) => updateFunction(previousState),
      originalState
    );
  }, [updateFunctions, originalState]);

  return [isPending ? optimisticState : originalState, addOptimistic] as const;
}
