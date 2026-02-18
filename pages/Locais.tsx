import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalForm } from "../features/locais/components/LocalForm";
import { LocalList } from "../features/locais/components/LocalList";
import { Sidebar } from "@/components/shared/Sidebar";
import { ArrowLeft } from "lucide-react";

interface Local {
  id: number;
  description: string;
  address: string;
}

const initialLocais: Local[] = [];

export default function Locais() {
  const navigate = useNavigate();
  const [locais, setLocais] = useState(initialLocais);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingLocal, setEditingLocal] = useState<Local | null>(null);

  const handleAddLocal = (newLocal: Omit<Local, "id">) => {
    setLocais((currentLocais) => [
      { ...newLocal, id: Date.now() },
      ...currentLocais,
    ]);
  };

  const handleEditLocal = (local: Local) => {
    setEditingLocal(local);
  };

  const handleUpdateLocal = (id: number, updatedLocal: Omit<Local, "id">) => {
    setLocais((currentLocais) =>
      currentLocais.map((loc) =>
        loc.id === id ? { ...loc, ...updatedLocal } : loc
      )
    );
    setEditingLocal(null);
  };

  const handleCancelEdit = () => {
    setEditingLocal(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen bg-secondary-gray">
      <Sidebar />
      <main className="flex-1 p-4 md:p-12 pt-8 md:pt-12">
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => navigate("/cadastros")}
            className="flex items-center gap-2 text-back-nav-text hover:text-back-nav-text/80 transition-colors mb-4 md:mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[20px] font-medium font-inter">
              Voltar para Cadastros
            </span>
          </button>
        </div>

        <div className="space-y-8">
          {currentPage === 1 && (
            <LocalForm
              onAddLocal={handleAddLocal}
              editingLocal={editingLocal}
              onUpdateLocal={handleUpdateLocal}
              onCancelEdit={handleCancelEdit}
            />
          )}
          {/* Lista de locais */}
          <LocalList
            locais={locais}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onEditLocal={handleEditLocal}
          />
        </div>
      </main>
    </div>
  );
}
