import { TopicModel, UserModel } from ".";

type NewsModel = {
  id: string;
  title: string;
  content: string;
  likes: number;
  created_at: string;
  updated_at: string;
  author: UserModel;
  topic: TopicModel
};

type NewsCreateModel = {
  title: string;
  content: string;
  topic_id: string;
  author_id: string;
};

export {type NewsModel, type NewsCreateModel};
