import React from "react";

export const AboutPeopleSection: React.FC = () => {
  return (
    <section
      id="quem-somos"
      className="relative pt-16 sm:pt-20 lg:pt-24 pb-28 sm:pb-36 lg:pb-40 px-6 sm:px-10 lg:px-16 bg-[#F3EBDD] overflow-hidden"
    >
      {/* Subtle editorial paper grain texture */}
      <div className="absolute inset-0 editorial-paper-texture pointer-events-none opacity-20" />

      {/* Transição suave em degradê para a seção escura seguinte (sem divisores) */}
      <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 bg-gradient-to-b from-transparent via-[#F3EBDD]/60 to-[#171713] pointer-events-none z-10" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        {/* ========================================================================= */}
        {/* PARTE 1 — CABEÇALHO EDITORIAL                                             */}
        {/* ========================================================================= */}
        <div className="pb-6 sm:pb-10">
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.75rem)] font-normal text-[#171713] leading-[1.08] tracking-[-0.025em]">
            Mas quem é a gente? :)
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* PARTE 2 & 3 — DUAS PEÇAS FOTOGRÁFICAS VIVAS COM RITMO EDITORIAL          */}
        {/* ========================================================================= */}
        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-start">
          
          {/* --------------------------------------------------------------------- */}
          {/* COLUNA ESQUERDA — MARCOS                                              */}
          {/* --------------------------------------------------------------------- */}
          <div className="flex flex-col space-y-6 group">
            {/* Fotografia grande, imersiva, com transição suave e cantos orgânicos */}
            <div className="relative aspect-[3/4] w-full rounded-[16px] overflow-hidden bg-[#20201B] shadow-[0_20px_45px_rgba(23,23,19,0.12)]">
              <img
                src="/portraits/marcos.webp"
                alt="Marcos — Fotógrafo e Designer"
                width={1080}
                height={1080}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center grayscale-[12%] group-hover:grayscale-0 transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171713]/70 via-transparent to-transparent pointer-events-none" />

              {/* Única tag em glass discreto sobre a fotografia */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-[8px] bg-[#171713]/40 backdrop-blur-md border border-[#FAF7F2]/10 text-[#FAF7F2] text-[11px] font-sans font-medium tracking-[0.18em] uppercase">
                Criação
              </div>

              {/* Nome sobre a fotografia com leitura contrastada e tipografia editorial (28-36px) */}
              <div className="absolute bottom-5 left-5 right-5 text-[#FAF7F2]">
                <div className="text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.18em] text-[#D8CEBE] uppercase leading-none pb-1.5">
                  FOTÓGRAFO &amp; DESIGNER
                </div>
                <h3 className="font-serif text-[28px] sm:text-[34px] lg:text-[36px] font-normal tracking-[-0.02em] leading-tight text-[#FAF7F2]">
                  Marcos
                </h3>
              </div>
            </div>

            {/* Descrição em diálogo harmonioso com o retrato (16-17.5px, 50-70 caracteres por linha) */}
            <div className="space-y-2 max-w-md px-1">
              <p className="font-sans text-[16px] sm:text-[17.5px] text-[#20201B]/85 leading-[1.6] font-normal">
                Fotógrafo, designer e{" "}
                <strong className="text-[#171713] font-semibold">muitooooooo criativo</strong>
                . Adora experimentar coisas diferentes e tá sempre procurando novas ideias.
              </p>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* COLUNA DIREITA — NADINE (Com offset vertical editorial no desktop)    */}
          {/* --------------------------------------------------------------------- */}
          <div className="flex flex-col space-y-6 md:pt-14 lg:pt-20 group">
            {/* Fotografia grande, imersiva, com transição suave e cantos orgânicos */}
            <div className="relative aspect-[3/4] w-full rounded-[16px] overflow-hidden bg-[#20201B] shadow-[0_20px_45px_rgba(23,23,19,0.12)]">
              <img
                src="/portraits/nadine.webp"
                alt="Nadine — Fotógrafa e Redatora"
                width={1080}
                height={1080}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center grayscale-[12%] group-hover:grayscale-0 transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171713]/70 via-transparent to-transparent pointer-events-none" />

              {/* Única tag em glass discreto sobre a fotografia */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-[8px] bg-[#171713]/40 backdrop-blur-md border border-[#FAF7F2]/10 text-[#FAF7F2] text-[11px] font-sans font-medium tracking-[0.18em] uppercase">
                Palavras
              </div>

              {/* Nome sobre a fotografia com leitura contrastada e tipografia editorial (28-36px) */}
              <div className="absolute bottom-5 left-5 right-5 text-[#FAF7F2]">
                <div className="text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.18em] text-[#D8CEBE] uppercase leading-none pb-1.5">
                  FOTÓGRAFA &amp; REDATORA
                </div>
                <h3 className="font-serif text-[28px] sm:text-[34px] lg:text-[36px] font-normal tracking-[-0.02em] leading-tight text-[#FAF7F2]">
                  Nadine
                </h3>
              </div>
            </div>

            {/* Descrição em diálogo harmonioso com o retrato (16-17.5px, 50-70 caracteres por linha) */}
            <div className="space-y-2 max-w-md px-1">
              <p className="font-sans text-[16px] sm:text-[17.5px] text-[#20201B]/85 leading-[1.6] font-normal">
                Fotógrafa, redatora,{" "}
                <strong className="text-[#171713] font-semibold">amaaaaa escrever</strong>{" "}
                e tá sempre em busca de um clique criativo.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
