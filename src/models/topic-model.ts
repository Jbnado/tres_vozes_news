type TopicModel = {
  id: string;
  topic: string;
  created_at: string;
  updated_at: string;
}

type TopicCreateModel = {
  topic: string;
}

export { type TopicModel, type TopicCreateModel }