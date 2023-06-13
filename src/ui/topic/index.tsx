import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import HeaderComponent from "../components/header";
import { getAllTopics } from "@/api";

export default function TopicPage() {
  const { isLoading, data: topics } = useQuery(
    ["topics"],
    () => getAllTopics(),
    {
      keepPreviousData: true,
    }
  );

  const columns = [
    {
      title: "Tópico",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Criado em",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Atualizado em",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ];

  return (
    <section>
      <HeaderComponent />
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Topics
          </h2>
        </header>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={topics}
          loading={isLoading}
        />
      </div>
    </section>
  );
}
