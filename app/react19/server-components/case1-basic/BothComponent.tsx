// ディレクティブがない場合必ずSCになるのではなく呼び出し元によってSCかCCかが決まる

export default function BothComponent({ env }: { env: "client" | "server" }) {
  // SCから呼び出された場合はこのconsole.logはブラウザに表示されない
  console.log("BothComponent");

  return <p>Both Component: from {env}</p>;
}
