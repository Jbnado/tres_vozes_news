import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Checkbox, Form, Input, Modal, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UserCreateModel, UserModel } from "@/models";
import { createUser, deleteUser, getAllUsers, updateUser } from "@/api";
import { ButtonComponent, DateComponent } from "../components";

export default function UsersPage() {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [userToEdit, setUsertoEdit] = useState<string | null>(null);
  const [form] = Form.useForm();

  const { data: users, isLoading: isUsersLoading } = useQuery(
    ["users"],
    () => getAllUsers(),
    {
      keepPreviousData: true,
    }
  );

  const { mutate: createANewUser, isLoading: isCreatingLoading } = useMutation(
    (newUser: UserCreateModel) => createUser(newUser),
    {
      onSuccess: () => {
        setIsModalVisible(false);
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const { mutate: updateAUser, isLoading: isUpdatingLoading } = useMutation(
    (userToUpdate: UserModel) => updateUser(userToEdit as string, userToUpdate),
    {
      onSuccess: () => {
        setIsModalVisible(false);
        setUsertoEdit(null);
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const { mutate: deleteAUser, isLoading: isDeletingLoading } = useMutation(
    (id: string) => deleteUser(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const handleOk = (newUser: UserModel | UserCreateModel) => {
    if (userToEdit) {
      updateAUser(newUser as UserModel);
    } else {
      createANewUser(newUser as UserCreateModel);
    }
  };

  const handleDelete = (id: string) => {
    deleteAUser(id);
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "ADM",
      dataIndex: "admin",
      key: "admin",
      render: ({ admin }: { admin: boolean }) =>
        admin ? <span>Sim</span> : <span>Não</span>,
    },
    {
      title: "Nascimento",
      dataIndex: "birth_date",
      key: "birth_date",
      render: ({ birth_date }: { birth_date: string }) => (
        <DateComponent date={birth_date} />
      ),
    },
    {
      title: "Ações",
      key: "action",
      render: (record: UserModel) => (
        <div className="flex items-center gap-3">
          <button
            className="text-indigo-600 hover:text-indigo-900"
            onClick={() => {
              setUsertoEdit(record.id);
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
            Usuários
          </h2>
          <ButtonComponent
            buttonType="dark"
            onClick={() => {
              setUsertoEdit(null);
              setIsModalVisible(true);
              form.resetFields();
            }}
          >
            <PlusOutlined />
            Novo usuário
          </ButtonComponent>
        </header>
        <Table
          columns={columns}
          dataSource={users}
          loading={
            isUsersLoading ||
            isCreatingLoading ||
            isUpdatingLoading ||
            isDeletingLoading
          }
          rowKey="id"
        />
        <Modal
          title={userToEdit ? "Editar usuário" : "Novo usuário"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={() => form.submit()}
          confirmLoading={isCreatingLoading || isUpdatingLoading}
          okButtonProps={{
            className: "bg-indigo-600 hover:bg-indigo-700 text-white",
            htmlType: "submit",
          }}
        >
          <Form form={form} onFinish={handleOk}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o nome do usuário",
                },
              ]}
            >
              <Input type="text" placeholder="Nome" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o email do usuário",
                },
              ]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="cpf"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o CPF do usuário",
                },
              ]}
            >
              <Input type="number" maxLength={11} placeholder="CPF" />
            </Form.Item>
            <Form.Item
              name="birth_date"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a data de nascimento do usuário",
                },
              ]}
            >
              <Input type="date" placeholder="Data de nascimento" />
            </Form.Item>
            <Form.Item name="admin" valuePropName="admin" initialValue={false}>
              <Checkbox>Administrador</Checkbox>
            </Form.Item>
            {!userToEdit && (
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira a senha do usuário",
                  },
                ]}
              >
                <Input.Password placeholder="Senha" />
              </Form.Item>
            )}
          </Form>
        </Modal>
      </div>
    </section>
  );
}
