"use client";

import { use } from "react";
import { ArticleApiResponse, CommentsApiResponse } from "./api";

import "./skeleton.css";

export function Article({
  articleOrPromise,
}: {
  articleOrPromise: ArticleApiResponse | Promise<ArticleApiResponse>;
}) {
  const article =
    articleOrPromise instanceof Promise
      ? use(articleOrPromise)
      : articleOrPromise;

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </article>
  );
}

export function Comments({
  commentsOrPromise,
}: {
  commentsOrPromise: CommentsApiResponse | Promise<CommentsApiResponse>;
}) {
  const comments =
    commentsOrPromise instanceof Promise
      ? use(commentsOrPromise)
      : commentsOrPromise;

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} style={{ border: "solid 2px black", margin: 5 }}>
          <div>
            {comment.username} - {comment.date.toLocaleDateString()}
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}

export function Skeleton() {
  return <div className="skeleton" />;
}
