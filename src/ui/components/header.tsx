import { ThunderboltTwoTone } from "@ant-design/icons";
import { useAuth } from "@/hooks";
import { ButtonComponent } from ".";
import { Link } from "react-router-dom";

export default function HeaderComponent() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {user ? (
            <>
              <div className="flex items-center gap-4">
                <Link to="/">
                  <ThunderboltTwoTone
                    twoToneColor="rgb(79 70 229)"
                    style={{ fontSize: 32 }}
                  />
                </Link>
                <h1 className="text-2xl font-bold text-white sm:text-1xl">
                  Bem vindo, {user.name}!
                </h1>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                {user.admin && (
                  <>
                    <ButtonComponent link to="/adm-news" buttonType="primary">
                      Criar nova notícia
                    </ButtonComponent>
                    <ButtonComponent link to="/topics" buttonType="secondary">
                      Tópicos
                    </ButtonComponent>
                    <ButtonComponent link to="/users" buttonType="primary">
                      Usuários
                    </ButtonComponent>
                  </>
                )}
                <ButtonComponent link to="/news" buttonType="primary">
                  Notícias
                </ButtonComponent>

                <ButtonComponent buttonType="purple" onClick={handleLogout}>
                  Sair
                </ButtonComponent>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <Link to="/">
                  <ThunderboltTwoTone
                    twoToneColor="rgb(79 70 229)"
                    style={{ fontSize: 32 }}
                  />
                </Link>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  Três Vozes!
                </h1>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <ButtonComponent link to="/news" buttonType="primary">
                  Notícias
                </ButtonComponent>
                <ButtonComponent link to="/login" buttonType="primary">
                  Entrar
                </ButtonComponent>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
