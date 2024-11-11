"use client";

// CCからSCをインポートしてるためこのコメントを外すとエラーとなる
// import ServerComponent from "./ServerComponent";
// ServerComponent;

export default function ClientComponent({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p>ClientCompoent</p>
      {children}
    </div>
  );
}
