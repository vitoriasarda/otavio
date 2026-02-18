import { useNavigate } from "react-router-dom";
import { CadastroCard } from "@/features/cadastros/components/CadastroCard";
import { Sidebar } from "@/components/shared/Sidebar";

const cadastroItens = [
  {
    iconSrc: "/assets/icone-produtos.svg",
    title: "Produtos",
    buttonText: "Ir para Produtos",
    path: "/produtos",
  },
  {
    iconSrc: "/assets/icone-categorias.svg",
    title: "Categorias",
    buttonText: "Ir para Categorias",
    path: "/categorias",
  },
  {
    iconSrc: "/assets/icone-locais.svg",
    title: "Locais de Estoque",
    buttonText: "Ir para Locais",
    path: "/locais",
  },
  {
    iconSrc: "/assets/icone-usuarios.svg",
    title: "Usuários e Acessos",
    buttonText: "Ir para Usuários",
    path: "/usuarios",
  },
];

export default function Cadastros() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-secondary-gray">
      <Sidebar />
      <main className="flex-1 p-8 md:p-10">
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="mb-8 md:mb-10">
            <h1 className="text-4xl md:text-[36px] font-medium font-inter text-center md:text-left text-primary-blue">
              Cadastros
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cadastroItens.map((item) => (
              <CadastroCard
                key={item.title}
                iconSrc={item.iconSrc}
                title={item.title}
                buttonText={item.buttonText}
                onClick={() => navigate(item.path)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
