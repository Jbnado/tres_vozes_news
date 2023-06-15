import { Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api";
import { UserCreateModel } from "@/models";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../components";

export default function SignUp() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { mutate: createUserMutate } = useMutation(
    (userData: UserCreateModel) => createUser(userData),
    {
      onSuccess: () => {
        navigate("/login");
      },
    }
  );

  const handleSubmit = (userData: UserCreateModel) => {
    createUserMutate(userData);
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Pattern"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Bem vindo ao{" "}
              <span className="text-indigo-600">Três Vozes News</span>
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Cadastre-se e salve suas notícias favoritas para ler mais tarde.
            </p>

            <Form
              form={form}
              className="mt-8 grid grid-cols-6 gap-6"
              onFinish={handleSubmit}
            >
              <div className="col-span-6 sm:col-span-3">
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, entre com seu nome",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Nome"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </Form.Item>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, entre com seu email",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    placeholder="Email"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, entre com sua senha",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Senha"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </Form.Item>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Form.Item
                  name="cpf"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, entre com seu CPF",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    max="11"
                    placeholder="CPF"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </Form.Item>
                <Form.Item
                  name="birth_date"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, entre com sua data de nascimento",
                    },
                  ]}
                >
                  <Input
                    type="date"
                    placeholder="Data de nascimento"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </Form.Item>
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <ButtonComponent buttonType="dark" props={{ type: "submit" }}>
                  Cadastrar
                </ButtonComponent>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Já tem conta?
                  <a href="/login" className="text-gray-700 underline">
                    Entrar
                  </a>
                  .
                </p>
              </div>
            </Form>
          </div>
        </main>
      </div>
    </section>
  );
}
