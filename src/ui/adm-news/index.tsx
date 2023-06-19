import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, Select, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  createNews,
  deleteNews,
  getAllNews,
  getAllTopics,
  updateNews,
} from "@/api";
import { NewsCreateModel, NewsModel } from "@/models";
import { ButtonComponent } from "../components";
import { useAuth } from "@/hooks";

interface FormValues {
  title: string;
  content: string;
  topic: {
    id: string;
  };
}

export default function AdminNewsPage() {
  const { user } = useAuth();
  const author_id = user?.id as string;
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newsToEdit, setNewsToEdit] = useState<string | null>(null);
  const [form] = Form.useForm();

  const { isLoading, data: news } = useQuery(["news"], () => getAllNews(), {
    keepPreviousData: true,
  });

  const { data: topics } = useQuery(["topics"], () => getAllTopics(), {
    keepPreviousData: true,
  });

  const { mutate: createANewNews, isLoading: isCreatingLoading } = useMutation(
    (newNews: NewsCreateModel) => createNews(newNews),
    {
      onSuccess: () => {
        setIsModalVisible(false);
        queryClient.invalidateQueries(["news"]);
      },
    }
  );

  const { mutate: updateANews, isLoading: isUpdatingLoading } = useMutation(
    (newsToUpdate: NewsCreateModel) =>
      updateNews(newsToEdit as string, newsToUpdate),
    {
      onSuccess: () => {
        setIsModalVisible(false);
        setNewsToEdit(null);
        queryClient.invalidateQueries(["news"]);
      },
    }
  );

  const { mutate: deleteANews, isLoading: isDeletingLoading } = useMutation(
    (id: string) => deleteNews(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["news"]);
      },
    }
  );

  const handleOk = (newNews: FormValues) => {
    const newsToUpdate = {
      title: newNews.title,
      content: newNews.content,
      topic_id: newNews.topic.id,
      author_id,
    };
    if (newsToEdit) {
      updateANews(newsToUpdate);
    } else {
      createANewNews(newsToUpdate);
    }
  };

  const handleDelete = (id: string) => {
    deleteANews(id);
  };

  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Autor",
      key: "author_name",
      render: ({ author: { name } }: { author: { name: string } }) => name,
    },
    {
      title: "Tópico",
      key: "topic_name",
      render: ({ topic: { topic } }: { topic: { topic: string } }) => topic,
    },
    {
      title: "Data de criação",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Ações",
      key: "action",
      render: (record: NewsModel) => (
        <div className="flex items-center gap-3">
          <button
            className="text-indigo-600 hover:text-indigo-900"
            onClick={() => {
              setNewsToEdit(record.id);
              setIsModalVisible(true);
              form.setFieldsValue(record);
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:text-red-900"
            onClick={() => handleDelete(record.id)}
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="flex justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Nóticias
          </h2>
          <ButtonComponent
            buttonType="dark"
            onClick={() => {
              setNewsToEdit(null);
              setIsModalVisible(true);
              form.resetFields();
            }}
          >
            <PlusOutlined />
            Criar notícia
          </ButtonComponent>
        </header>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={news}
          loading={
            isLoading ||
            isCreatingLoading ||
            isUpdatingLoading ||
            isDeletingLoading
          }
        />
        <Modal
          title={newsToEdit ? "Editar notícia" : "Criar notícia"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={() => form.submit()}
          okText={newsToEdit ? "Editar" : "Criar"}
          cancelText="Cancelar"
          confirmLoading={isCreatingLoading || isUpdatingLoading}
          okButtonProps={{
            className: "bg-indigo-600 hover:bg-indigo-700 text-white",
            htmlType: "submit",
          }}
        >
          <Form form={form} onFinish={handleOk}>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input placeholder="Título" />
            </Form.Item>
            <Form.Item
              name="content"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input.TextArea placeholder="Conteúdo" />
            </Form.Item>
            <Form.Item
              name={["topic", "id"]}
              fieldId="topic_id"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Select placeholder="Tópico">
                {topics?.map(({ id, topic }) => (
                  <Select.Option key={id} value={id}>
                    {topic}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </section>
  );
}
