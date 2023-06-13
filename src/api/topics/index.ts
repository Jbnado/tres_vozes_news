import { TopicCreateModel, TopicModel } from "@/models";
import { handleError, instance } from "..";

export async function createTopic(topic: TopicCreateModel): Promise<TopicModel | undefined> {
    return instance.post("/topic", topic).then(({data}) => data).catch(handleError);
}

export async function getTopic(id: string): Promise<TopicModel | undefined> {
    return instance.get(`/topic/${id}`).then(({data}) => data).catch(handleError);
}

export async function getAllTopics(): Promise<TopicModel[] | undefined> {
  return instance.get("/topic").then(({data}) => data).catch(handleError);
}

export async function updateTopic(id: string, topic: TopicCreateModel): Promise<TopicModel | undefined> {
  return instance.put(`/topic/${id}`, topic).then(({data}) => data).catch(handleError);
}

export async function deleteTopic(id: string): Promise<void> {
  instance.delete(`/topic/${id}`).catch(handleError);
}
