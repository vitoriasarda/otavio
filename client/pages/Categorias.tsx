import { Sidebar } from "@/components/shared/Sidebar";
import { CategoryForm } from "@/features/Categorias/components/CategoryForm";
import { CategoryList } from "@/features/Categorias/components/CategoryList";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Interface compatível com seus componentes
interface Category {
  id: number;
  description: string;
}

// --- GERANDO 40 DADOS AUTOMÁTICOS PARA TESTE ---
const INITIAL_DATA: Category[] = Array.from({ length: 40 }).map((_, index) => ({
  id: index + 1,
  description: `Categoria de Teste ${index + 1} - Exemplo de registro longo`,
}));
// -----------------------------------------------

export default function Categorias() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(INITIAL_DATA);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Adicionar Categoria
  const handleAddCategory = (newCategoryData: { description: string }) => {
    const newCategory: Category = {
      ...newCategoryData,
      id: Date.now(),
    };
    setCategories((current) => [newCategory, ...current]);
  };

  // Editar Categoria (Com rolagem suave para o topo)
  const handleEdit = (category: Category) => {
    setEditCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Atualizar Categoria
  const handleUpdateCategory = (
    id: number,
    updatedData: { description: string },
  ) => {
    setCategories((current) =>
      current.map((c) => (c.id === id ? { ...c, ...updatedData } : c)),
    );
    setEditCategory(null);
    alert("Categoria atualizada com sucesso (Localmente).");
  };

  // Mudar página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Opcional: Rolar para o topo da lista ao mudar de página
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen bg-secondary-gray">
      <Sidebar />
      <main className="flex-1 p-4 md:p-12 pt-8 md:pt-12">
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => navigate("/cadastros")}
            className="flex items-center gap-2 text-primary-blue hover:text-primary-blue/80 transition-colors mb-4 md:mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[20px] font-medium font-inter">
              Voltar para Cadastros
            </span>
          </button>
          <h1 className="text-4xl md:text-[36px] font-medium font-inter text-primary-blue">
            Cadastro de Categorias
          </h1>
        </div>

        <div className="space-y-8">
          <CategoryForm
            onAddCategory={handleAddCategory}
            editingCategory={editCategory}
            onUpdateCategory={handleUpdateCategory}
            onCancelEdit={() => setEditCategory(null)}
          />

          <CategoryList
            categories={categories}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onEditCategory={handleEdit}
          />
        </div>
      </main>
    </div>
  );
}
