import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getNews } from "@/api";

export default function ReadNewsPage() {
  const { newsId } = useParams<{ newsId: string }>();

  const { data: news, isLoading } = useQuery(["oneNews"], () =>
    getNews(newsId as string)
  );

  return (
    <section>
      <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <Link
          className="group relative inline-flex items-center overflow-hidden rounded px-8 py-3 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 mb-6"
          to="/news"
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <ArrowLeftOutlined className="mb-2 rtl:rotate-180" />
          </span>

          <span className="text-md font-medium transition-all group-hover:ms-4">
            Voltar
          </span>
        </Link>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {news?.title}
            </h2>

            <p className="mt-8 text-gray-800">{news?.content}</p>
          </div>
        )}
      </div>
    </section>
  );
}
