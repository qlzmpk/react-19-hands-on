import Link from "next/link";

export default function Index() {
  return (
    <main>
      <ul>
        <List title="Basic">
          <ListLink href="/basic/what-is-react-element">
            React要素について
          </ListLink>
          <ListLink href="/basic/suspense">Suspense</ListLink>
          <ListLink href="/basic/transition">トランジション</ListLink>
          <ListLink href="/basic/transition-with-suspense">
            トランジションとSuspense
          </ListLink>
        </List>
        <List title="React 19 use">
          <ListLink href="/react19/use">use</ListLink>
        </List>
        <List title="React 19 Server Components">
          <ListLink href="/react19/server-components/case1-basic">
            サーバーコンポーネントの基本
          </ListLink>
          <ListLink href="/react19/server-components/case2-integration">
            CCとSCの統合
          </ListLink>
          <ListLink href="/react19/server-components/case3-async-component-with-suspense">
            SusupneseとSCの統合
          </ListLink>
          <ListLink href="/react19/server-components/case4-with-async-suspense-use">
            SCとuseとSuspenseを使ったデモ
          </ListLink>
        </List>
        <List title="React 19 アクション">
          <ListLink href="/react19/action/case1-improve-transition">
            非同期トランジション
          </ListLink>
          <ListLink href="/react19/action/case2-form-action">
            {"<form> アクション"}
          </ListLink>
          <ListLink href="/react19/action/case3-useFormStatus">
            useFormStatus
          </ListLink>
          <ListLink href="/react19/action/case4-useActionState">
            useActionState
          </ListLink>
          <ListLink href="/react19/action/case5-useOptimistic">
            useOptimistic
          </ListLink>
        </List>
        <List title="React 19 Server Actions">
          <ListLink href="/react19/server-action">サーバーアクション</ListLink>
        </List>
      </ul>
    </main>
  );
}

function List({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      {title}
      <ol>{children}</ol>
    </li>
  );
}

function ListLink({ href, children }: { href: string; children: string }) {
  return (
    <li>
      <Link href={href}>{children}</Link>
    </li>
  );
}
