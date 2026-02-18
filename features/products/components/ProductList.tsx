import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmAlert } from "@/components/shared/ComfirmAlert";

interface Product {
  id: number;
  description: string;
  quantity: number;
  category: string;
  storageLocation: string;
}

interface ProductListProps {
  products: Product[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
}

const ITEMS_PER_PAGE = 5;

export function ProductList({
  products,
  currentPage,
  onPageChange,
  onEditProduct,
  onDeleteProduct,
}: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const filteredProducts = products.filter(
    (product) =>
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.storageLocation.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete !== null) {
      onDeleteProduct(productToDelete);
      setProductToDelete(null);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center flex-shrink-0">
          {currentPage > 1 && (
            <img
              src="/assets/icone-produtos.svg"
              alt="Produtos"
              className="w-11 h-12 mr-4 flex-shrink-0"
            />
          )}
          <h2
            className={`${currentPage > 1 ? "text-[36px]" : "text-[26px]"} font-medium font-inter text-primary-blue whitespace-nowrap`}
          >
            Produtos Cadastrados
          </h2>
        </div>

        <div className="relative flex items-center w-full md:w-[406px]">
          <svg
            width="406"
            height="32"
            viewBox="0 0 406 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 pointer-events-none"
          >
            <g opacity="0.8">
              <path
                d="M0 8C0 3.58172 3.58172 0 8 0H398C402.418 0 406 3.58172 406 8V24C406 28.4183 402.418 32 398 32H8.00001C3.58173 32 0 28.4183 0 24V8Z"
                fill="white"
              />
              <path
                d="M8 0.5H398C402.142 0.5 405.5 3.85787 405.5 8V24C405.5 28.1421 402.142 31.5 398 31.5H8C3.85786 31.5 0.5 28.1421 0.5 24V8C0.5 3.85786 3.85786 0.5 8 0.5Z"
                stroke="#858383"
                strokeOpacity="0.59"
              />
            </g>
          </svg>
          <Input
            type="text"
            placeholder="PESQUISAR EM PRODUTOS CADASTRADOS"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-8 px-4 border-0 rounded-lg text-xs placeholder:text-xs placeholder:italic bg-transparent relative z-10 text-primary-blue placeholder:text-gray-500"
          />
          <button
            onClick={() => {}}
            className="absolute right-3 z-20 flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.4444 20L11.4444 13C10.8889 13.4444 10.25 13.7963 9.52778 14.0556C8.80556 14.3148 8.03704 14.4444 7.22222 14.4444C5.2037 14.4444 3.49537 13.7454 2.09722 12.3472C0.699074 10.9491 0 9.24074 0 7.22222C0 5.2037 0.699074 3.49537 2.09722 2.09722C3.49537 0.699074 5.2037 0 7.22222 0C9.24074 0 10.9491 0.699074 12.3472 2.09722C13.7454 3.49537 14.4444 5.2037 14.4444 7.22222C14.4444 8.03704 14.3148 8.80556 14.0556 9.52778C13.7963 10.25 13.4444 10.8889 13 11.4444L20 18.4444L18.4444 20ZM7.22222 12.2222C8.61111 12.2222 9.79167 11.7361 10.7639 10.7639C11.7361 9.79167 12.2222 8.61111 12.2222 7.22222C12.2222 5.83333 11.7361 4.65278 10.7639 3.68056C9.79167 2.70833 8.61111 2.22222 7.22222 2.22222C5.83333 2.22222 4.65278 2.70833 3.68056 3.68056C2.70833 4.65278 2.22222 5.83333 2.22222 7.22222C2.22222 8.61111 2.70833 9.79167 3.68056 10.7639C4.65278 11.7361 5.83333 12.2222 7.22222 12.2222Z"
                fill="#52658C"
                fillOpacity="0.49"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[16px] font-medium text-primary-blue">
                DESCRIÇÃO
              </TableHead>
              <TableHead className="text-[16px] font-medium text-primary-blue">
                QUANTIDADE
              </TableHead>
              <TableHead className="text-[16px] font-medium text-primary-blue">
                CATEGORIA
              </TableHead>
              <TableHead className="text-[16px] font-medium text-primary-blue">
                LOCAL
              </TableHead>
              <TableHead className="text-[16px] font-medium text-primary-blue">
                AÇÕES
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.storageLocation}</TableCell>
                  <TableCell className="text-left space-x-4">
                    <Button
                      variant="link"
                      onClick={() => onEditProduct(product)}
                      className="text-[#0859FF] hover:text-[#0859FF]/80 p-0 h-auto text-[14px] font-medium"
                    >
                      EDITAR
                    </Button>
                    <Button
                      variant="link"
                      className="text-[#FF9C08] hover:text-[#FF9C08]/80 p-0 h-auto text-[14px] font-medium"
                    >
                      INATIVAR
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleDeleteClick(product.id)}
                      className="text-[#FF0808] hover:text-[#FF0808]/80 p-0 h-auto text-[14px] font-medium"
                    >
                      EXCLUIR
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center gap-3 mt-8 pt-4">
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            className="flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6L6 10L10 14L11.4 12.6L9.8 11H14V9H9.8L11.4 7.4L10 6ZM10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0ZM10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2Z"
                fill="#52658C"
              />
            </svg>
          </button>
        )}

        <div className="relative flex items-center justify-center w-[52px] h-8">
          <svg
            width="52"
            height="32"
            viewBox="0 0 52 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
          >
            <g opacity="0.8">
              <path
                d="M0 8C0 3.58172 3.58172 0 8 0H44C48.4183 0 52 3.58172 52 8V24C52 28.4183 48.4183 32 44 32H8C3.58172 32 0 28.4183 0 24V8Z"
                fill="#858383"
                fillOpacity="0.09"
              />
              <path
                d="M8 0.5H44C48.1421 0.5 51.5 3.85786 51.5 8V24C51.5 28.1421 48.1421 31.5 44 31.5H8C3.85786 31.5 0.5 28.1421 0.5 24V8C0.5 3.85786 3.85786 0.5 8 0.5Z"
                stroke="#858383"
                strokeOpacity="0.59"
              />
            </g>
          </svg>
          <span className="text-base font-medium text-gray-700 relative z-10">
            {currentPage}
          </span>
        </div>

        {(currentPage === 1 || currentPage < totalPages) && (
          <button
            onClick={handleNextPage}
            className="flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 14L14 10L10 6L8.6 7.4L10.2 9H6V11H10.2L8.6 12.6L10 14ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                fill="#52658C"
              />
            </svg>
          </button>
        )}
      </div>

      <ConfirmAlert
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
