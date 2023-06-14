import { useContext } from "react";
import { Form, Input } from "antd";
import { AuthContext } from "@/context/auth-context";
import { ButtonComponent } from "../components";

export default function LoginPage(): JSX.Element {
  const { signIn } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    signIn({ email, password });
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Faça Login Agora!</h1>

          <p className="mt-4 text-gray-500">
            Entre em sua conta e curta todas as suas notícias favoritas.
          </p>
        </div>

        <Form
          form={form}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          onFinish={handleSubmit}
        >
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
              placeholder="Email"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
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
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            />
          </Form.Item>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Não tem uma conta?{" "}
              <a className="underline" href="">
                Cadastrar
              </a>
            </p>

            <ButtonComponent buttonType="dark" props={{ type: "submit" }}>
              Entrar
            </ButtonComponent>
          </div>
        </Form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src="/login.svg"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </section>
  );
}
