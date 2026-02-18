import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "@/features/products/components/ProductForm";
import { ProductList } from "@/features/products/components/ProductList";
import { Sidebar } from "@/components/shared/Sidebar";
import { SuccessAlert } from "@/components/shared/SuccessAlert";

interface Product {
  id: number;
  description: string;
  quantity: number;
  category: string;
  storageLocation: string;
  minimumStock: number;
}

const initialProducts: Product[] = [
  {
    id: 1,
    description: "Produto exemplo 1",
    quantity: 50,
    category: "Categoria A",
    storageLocation: "Estoque A",
    minimumStock: 10,
  },
  {
    id: 2,
    description: "Produto exemplo 2",
    quantity: 25,
    category: "Categoria B",
    storageLocation: "Estoque B",
    minimumStock: 5,
  },
];

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    setProducts((currentProducts) => [
      { ...newProduct, id: Date.now() },
      ...currentProducts,
    ]);
    setIsSuccessOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = (
    id: number,
    updatedProduct: Omit<Product, "id">,
  ) => {
    setProducts((currentProducts) =>
      currentProducts.map((prod) =>
        prod.id === id ? { ...prod, ...updatedProduct } : prod,
      ),
    );
    setEditingProduct(null);
    setIsSuccessOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((currentProducts) =>
      currentProducts.filter((prod) => prod.id !== id),
    );
    setIsSuccessOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen bg-secondary-gray">
      <Sidebar />
      <main className="flex-1 p-4 md:p-12 pt-20 md:pt-12">
        <div className="mb-8">
          <button
            onClick={() => navigate("/cadastros")}
            className="flex items-center mb-4 text-back-nav-text hover:text-primary-blue transition-colors"
          >
            <svg
              className="w-9 h-4 mr-2"
              viewBox="0 0 37 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM37 8V7L1 7V8V9L37 9V8Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-[20px] font-medium font-inter">
              Voltar para Cadastros
            </span>
          </button>
        </div>

        <div className="space-y-8">
          {currentPage === 1 && (
            <ProductForm
              onAddProduct={handleAddProduct}
              editingProduct={editingProduct}
              onUpdateProduct={handleUpdateProduct}
              onCancelEdit={handleCancelEdit}
            />
          )}
          <ProductList
            products={products}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>
      </main>

      <SuccessAlert
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </div>
  );
}
