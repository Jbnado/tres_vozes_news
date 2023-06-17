export default function AboutCreatorsPage(): JSX.Element {
  return (
    <section>
      <div
        className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
            <img
              alt="Sobre Nós"
              src="/men.svg"
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">Quem nós somos?</h2>

            <p className="mt-4 text-gray-600">
              Somos três alunos terminando o curso de ADS na Fatec de Ribeirão Preto
              Dougas S.
              Gabriel V.
              João B.

            </p>
          </div>
        </div>
      </div>
    </section>
  )
}