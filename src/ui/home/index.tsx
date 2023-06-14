import { ButtonComponent } from "../components";

export default function HomePage(): JSX.Element {
  return (
    <section className="bg-gray-900 text-white h-full">
      <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Três Vozes News
            <span className="sm:block"> O melhor portal de notícias. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Acompanhe todas as notícias relevantes do Brasil e do mundo.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonComponent buttonType="primary" link to="/news">
              Ler Notícias
            </ButtonComponent>

            <ButtonComponent buttonType="secondary" link to="/about-us">
              Sobre Nós
            </ButtonComponent>
          </div>
        </div>
      </div>
    </section>
  );
}
