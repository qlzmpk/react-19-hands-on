import { Suspense } from "react";
import { Article, Comments, Skeleton } from "./ClientComponents";
import { articleApi, commentsApi } from "./api";

export default async function Page() {
  const articleApiPromise = articleApi();
  const commentsApiPromise = commentsApi();

  // const articleApiPromise = await articleApi();
  // const commentsApiPromise = commentsApi();

  // const articleApiPromise = articleApi();
  // const commentsApiPromise = commentsApi();
  // await articleApiPromise;

  return (
    <main>
      <div style={{ width: 800, height: 300 }}>
        <Suspense fallback={<Skeleton />}>
          <Article articleOrPromise={articleApiPromise} />
        </Suspense>
      </div>
      <div style={{ width: 800, height: 30 }}></div>
      <div style={{ width: 800, height: 300 }}>
        <Suspense fallback={<Skeleton />}>
          <Comments commentsOrPromise={commentsApiPromise} />
        </Suspense>
      </div>
    </main>
  );
}
