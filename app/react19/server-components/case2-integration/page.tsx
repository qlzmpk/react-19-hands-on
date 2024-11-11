import ClientComponent from "./ClientComponent";
import ServerComponent from "./ServerComponent";

export default function Page() {
  console.log("\nFirst Load.");

  return (
    <main>
      <h1>Page</h1>
      <ClientComponent {...props}>
        {/* 
          CCの子要素にSCを渡すことができます。
          これはインポートとは無関係であること、また子要素はchildrenというpropsを
          渡してるに過ぎないため、SCからCCに渡せるpropsのルールにも反しません。
         */}
        <ServerComponent />
      </ClientComponent>
      {/* 上記の書き方は以下の書き方と全く変わらない */}
      <ClientComponent {...props} children={<ServerComponent />} />
    </main>
  );
}

// SCからCCに渡すprops
// https://ja.react.dev/reference/rsc/use-client#serializable-types
const props = {
  string: "string",
  number: 1,
  bigint: 1n,
  boolean: true,
  null: null,
  undefined: undefined,
  symbolGlobal: Symbol.for("symbol"),
  array: [1, 2, 3],
  map: new Map([["key", "value"]]),
  set: new Set([1, 2, 3]),
  date: new Date(),
  object: { key: "value" },
  jsx: <div />,
  // なんとPromiseも渡せる！
  promise: new Promise<void>((resolve) => resolve()),

  // 配列になってしまうので非推奨
  stringObject: new String("string"),
  typedArray: new Int8Array(8),

  // buffer: new ArrayBuffer(8),

  // symbol: Symbol("symbol"),
  // class: new URL("https://example.com"),
  // function: () => {},
  // ServerComponent
};
