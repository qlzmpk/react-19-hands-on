export type ArticleApiResponse = {
  title: string;
  content: string;
};

export type CommentsApiResponse = {
  id: string;
  username: string;
  content: string;
  date: Date;
}[];
