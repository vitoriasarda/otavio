import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

const navItems = [
  {
    name: "Início",
    path: "/",
    icon: "/assets/icone-inicio.svg",
  },
  {
    name: "Cadastros",
    path: "/cadastros",
    icon: "/assets/icone-cadastros.svg",
  },
  {
    name: "Movimentações",
    path: "/movimentacoes",
    icon: "/assets/icone-movimentacoes.svg",
  },
  {
    name: "Requisições",
    path: "/requisicoes",
    icon: "/assets/icone-requisicoes.svg",
  },
  {
    name: "Relatórios",
    path: "/relatorios",
    icon: "/assets/icone-relatorios.svg",
  },
];

// --- SEPARAMOS O CONTEÚDO PARA USAR NO MOBILE ---
interface SidebarContentProps {
  onLinkClick?: () => void;
}

export function SidebarContent({ onLinkClick }: SidebarContentProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    console.log("Logout realizado");
    navigate("/login");
    if (onLinkClick) onLinkClick();
  };

  return (
    <div className="flex flex-col h-full bg-white text-left">
      <div className="flex items-center justify-center py-8 px-6">
        {/* Mantido o caminho original */}
        <img
          src="/assets/faurg-logo.png"
          alt="FAURG Logo"
          className="w-48 h-auto"
        />
      </div>

      <nav className="px-4 space-y-3 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.name}
              className={cn(
                "flex items-center px-4 py-4 rounded-lg hover:bg-gray-100 hover:bg-opacity-60 cursor-pointer transition-colors",
                isActive && "bg-light-gray-bg",
              )}
              onClick={() => {
                navigate(item.path);
                if (onLinkClick) onLinkClick();
              }}
            >
              {/* Mantido o caminho original */}
              <img
                src={item.icon}
                alt={item.name}
                className="w-8 h-8 md:w-10 md:h-10 mr-4 md:mr-6 flex-shrink-0"
              />
              <span className="text-xl md:text-[28px] font-medium font-inter text-primary-blue">
                {item.name}
              </span>
            </div>
          );
        })}
      </nav>

      <div className="pb-11 flex justify-center w-full mt-8 md:mt-32">
        <button
          onClick={handleLogout}
          className="w-[60px] h-[60px] md:w-[81px] md:h-[81px] bg-[#eeeffe] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#d8d9da] transition-colors shadow-sm group"
          title="Sair"
        >
          <LogOut className="w-[30px] h-[30px] md:w-[42px] md:h-[42px] text-[#52658c] group-hover:text-red-500 transition-colors ml-1" />
        </button>
      </div>
    </div>
  );
}

// --- COMPONENTE DESKTOP ---
export function Sidebar() {
  return (
    <aside className="w-[23.3rem] bg-white flex flex-col min-h-screen border-r border-gray-200 relative shrink-0">
      <SidebarContent />
    </aside>
  );
}
