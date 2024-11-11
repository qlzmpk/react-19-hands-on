// Client Componentにするためにはファイルの先頭に（import文などよりも先に）
// "use client";ディレクティブを記述する。
// ただしこのディレクティブの前にコメントを書くことはできます。
// https://ja.react.dev/reference/rsc/use-client
"use client";

import BothComponent from "./BothComponent";

export default function ClientComponent() {
  // このconsole.logはCSRまたはSSRでのみ表示される
  console.log("ClientComponent");

  return (
    <div>
      <p>ClientCompoent</p>
      <BothComponent env="client" />
    </div>
  );
}
