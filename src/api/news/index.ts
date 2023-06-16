import { NewsCreateModel, NewsModel } from "@/models";
import { handleError, instance } from "..";

export async function createNews(news: NewsCreateModel): Promise<NewsModel | undefined> {
  return instance
    .post("news/", news)
    .then(({ data }) => data)
    .catch(handleError);
}

export async function getNews(id: string): Promise<NewsModel | undefined> {
  return instance
    .get(`news/${id}`)
    .then(({ data }) => data)
    .catch(handleError);
}

export async function getAllNews(): Promise<NewsModel[] | undefined> {
  return instance
    .get("news/")
    .then(({ data }) => data)
    .catch(handleError);
}

export async function updateNews(id: string, news: NewsCreateModel): Promise<NewsModel | undefined> {
  return instance
    .patch(`news/${id}`, news)
    .then(({ data }) => data)
    .catch(handleError);
}

export async function deleteNews(id: string) {
  return instance.delete(`/news/${id}`).catch(handleError);
}
