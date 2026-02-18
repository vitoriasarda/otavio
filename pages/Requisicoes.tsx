import { useNavigate } from "react-router-dom";
import { CadastroCard } from "@/features/cadastros/components/CadastroCard";
import { Sidebar } from "@/components/shared/Sidebar";

const requisicaoItens = [
  {
    iconSrc: "/assets/icone-compra.svg",
    title: "Compra",
    buttonText: "Ir para Compra",
    path: "/compra",
  },
  {
    iconSrc: "/assets/icone-retirada.svg",
    title: "Retirada",
    buttonText: "Ir para Retirada",
    path: "/retirada",
  },
  {
    iconSrc: "/assets/icone-historico.svg",
    title: "Histórico de Requisições",
    buttonText: "Ir para Histórico",
    path: "/historico",
  },
];

export default function Requisicoes() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-secondary-gray">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center pt-8 md:pt-12 px-8">
        <div className="w-full mb-6 md:mb-8">
          <h1 className="text-4xl md:text-[36px] font-medium font-inter text-primary-blue">
            Requisições
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requisicaoItens.map((item) => (
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
