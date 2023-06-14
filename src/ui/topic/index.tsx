import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createTopic, deleteTopic, getAllTopics, updateTopic } from "@/api";
import { useState } from "react";
import { ButtonComponent, DateComponent } from "../components";

export default function TopicPage(): JSX.Element {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [topicToEdit, setTopicToEdit] = useState<string | null>(null);
  const [form] = Form.useForm();

  const { isLoading, data: topics } = useQuery(
    ["topics"],
    () => getAllTopics(),
    {
      keepPreviousData: true,
    }
  );

  const { mutate: createANewTopic, isLoading: isCreatingLoading } = useMutation(
    (topic: string) => createTopic(topic),
    {
      onSuccess: () => {
        setIsModalVisible(false);
        queryClient.invalidateQueries(["topics"]);
      },
    }
  );

  const { mutate: updateATopic, isLoading: isUpdatingLoading } = useMutation(
    (topic: string) => updateTopic(topicToEdit as string, topic),
    {
      onSuccess: () => {
        setIsModalVisible(false);
        setTopicToEdit(null);
        queryClient.invalidateQueries(["topics"]);
      },
    }
  );

  const { mutate: deleteATopic, isLoading: isDeletingLoading } = useMutation(
    (id: string) => deleteTopic(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["topics"]);
      },
    }
  );

  const handleOk = ({ topic }: { topic: string }) => {
    if (topicToEdit) {
      updateATopic(topic);
    } else {
      createANewTopic(topic);
    }
  };

  const handleDelete = (id: string) => {
    deleteATopic(id);
  };

  const columns = [
    {
      title: "Tópico",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Criado em",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => <DateComponent date={date} />,
    },
    {
      title: "Atualizado em",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date: string) => <DateComponent date={date} />,
    },
    {
      title: "Ações",
      key: "action",
      render: ({ id, topic }: { id: string; topic: string }) => (
        <div className="flex items-center gap-3">
          <button
            className="text-indigo-600 hover:text-indigo-900"
            onClick={() => {
              setTopicToEdit(id);
              setIsModalVisible(true);
              form.setFieldsValue({ topic });
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:text-red-900"
            onClick={() => handleDelete(id)}
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
            Tópicos
          </h2>
          <ButtonComponent
            buttonType="dark"
            onClick={() => {
              setTopicToEdit(null);
              setIsModalVisible(true);
              form.resetFields();
            }}
          >
            <PlusOutlined />
            Criar tópico
          </ButtonComponent>
        </header>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={topics}
          loading={
            isLoading ||
            isCreatingLoading ||
            isUpdatingLoading ||
            isDeletingLoading
          }
        />
        <Modal
          title={topicToEdit ? "Editar tópico" : "Criar tópico"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={() => form.submit()}
          okText={topicToEdit ? "Editar" : "Criar"}
          cancelText="Cancelar"
          confirmLoading={isCreatingLoading || isUpdatingLoading}
          okButtonProps={{
            className: "bg-indigo-600 hover:bg-indigo-700 text-white",
            htmlType: "submit",
          }}
        >
          <Form form={form} onFinish={handleOk}>
            <Form.Item
              name="topic"
              rules={[
                {
                  required: true,
                  message: "Por favor, informe o tópico",
                },
              ]}
            >
              <Input placeholder="Tópico" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </section>
  );
}
