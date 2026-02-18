import { useNavigate } from "react-router-dom";
import { CadastroCard } from "@/features/cadastros/components/CadastroCard";
import { Sidebar } from "@/components/shared/Sidebar";

const movimentacaoItens = [
  {
    iconSrc: "/assets/seta-entrada.svg",
    title: "Entrada",
    buttonText: "Ir para Entrada",
    path: "/entrada",
  },
  {
    iconSrc: "/assets/seta-saida.svg",
    title: "Saída",
    buttonText: "Ir para Saída",
    path: "/saida",
  },
];

export default function Movimentacoes() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-secondary-gray">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center pt-8 md:pt-12 px-8">
        <div className="w-full mb-6 md:mb-8">
          <h1 className="text-4xl md:text-[36px] font-medium font-inter text-primary-blue">
            Movimentações
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {movimentacaoItens.map((item) => (
            <CadastroCard
              key={item.title}
              iconSrc={item.iconSrc}
              title={item.title}
              buttonText={item.buttonText}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
