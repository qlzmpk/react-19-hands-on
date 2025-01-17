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

export const articleApi = async (): Promise<ArticleApiResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    title: "吾輩は猫である",
    content: `　吾輩わがはいは猫である。名前はまだ無い。
  　どこで生れたかとんと見当けんとうがつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪どうあくな種族であったそうだ。この書生というのは時々我々を捕つかまえて煮にて食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌てのひらに載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始みはじめであろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶やかんだ。その後ご猫にもだいぶ逢あったがこんな片輪かたわには一度も出会でくわした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙けむりを吹く。どうも咽むせぽくて実に弱った。これが人間の飲む煙草たばこというものである事はようやくこの頃知った。`,
  };
};

export const commentsApi = async (): Promise<CommentsApiResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      id: "1",
      username: "user1",
      content: "コメント",
      date: new Date(),
    },
    {
      id: "2",
      username: "user2",
      content: "コメント",
      date: new Date(),
    },
  ];
};
