"use client";

import { memo, useState, useTransition } from "react";

export default function Page() {
  const [
    // トランジション中かどうかを示すフラグ
    isPending,
    // トランジションを開始するための関数
    startTransition,
  ] = useTransition();
  const [isShow, setIsShow] = useState(false);

  // トランジション中は古いUIを表示させつつ、新しいUIを非同期でレンダリングするため
  // このconsole.logは2回表示される
  console.log(`isPending: ${isPending}`);

  return (
    <>
      <textarea
        // トランジション中の場合、UI操作がブロックされていないので
        // レンダリングの合間にこのイベントが発火する
        onChange={(event) => console.log(`text: ${event.target.value}`)}
      />

      <div>
        <button
          type="button"
          // このボタンで更新した場合UI操作がブロックされない
          onClick={() => startTransition(() => setIsShow(true))}
        >
          Show with Transition
        </button>
        <button
          type="button"
          // このボタンで更新した場合UI操作がブロックされる
          onClick={() => setIsShow(true)}
        >
          Show without Transition
        </button>
        <button
          type="button"
          // トランジション中にこのボタンを押すとレンダリングがキャンセルされる
          onClick={() => setIsShow(false)}
        >
          Hide
        </button>
      </div>
      <hr />
      <div>isPending: {isPending.toString()}</div>
      <hr />
      {isShow && <VerySlowComponent />}
    </>
  );
}

// このコンポーネントはレンダリングに5秒かかる
const VerySlowComponent = memo(function VerySlowComponent() {
  function SlowComponent({ count }: { count: number }) {
    if (count % 100 === 0) {
      console.log(`SlowComponent: ${count}`);
    }
    let startTime = performance.now();
    while (performance.now() - startTime < 1) {
      // 1ms以上かかる処理
    }

    return null;
  }

  let items = [];
  for (let i = 0; i < 5000; i++) {
    items.push(<SlowComponent key={i} count={i} />);
  }

  return (
    <>
      Very Slow Component
      {items}
    </>
  );
});
