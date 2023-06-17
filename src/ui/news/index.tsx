import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/api";
import { NewsCardComponent } from "./components";

export default function NewsPage() {
  const { data: news, isLoading } = useQuery(["news"], () => getAllNews());

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {isLoading && <p>Loading...</p>}
      {news && news.map((newsItem) => <NewsCardComponent news={newsItem} />)}
    </div>
  );
}
