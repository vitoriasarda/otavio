import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CustomAlert } from "@/components/shared/attentionAlert";

interface NewProduct {
  description: string;
  quantity: number;
  category: string;
  storageLocation: string;
  minimumStock: number;
}

interface Product {
  id: number;
  description: string;
  quantity: number;
  category: string;
  storageLocation: string;
  minimumStock: number;
}

interface ProductFormProps {
  onAddProduct: (product: NewProduct) => void;
  editingProduct?: Product | null;
  onUpdateProduct?: (id: number, product: NewProduct) => void;
  onCancelEdit?: () => void;
}

export function ProductForm({
  onAddProduct,
  editingProduct,
  onUpdateProduct,
  onCancelEdit,
}: ProductFormProps) {
  const [description, setDescription] = useState(
    editingProduct?.description || "",
  );
  const [quantity, setQuantity] = useState(
    editingProduct?.quantity.toString() || "",
  );
  const [category, setCategory] = useState(editingProduct?.category || "");
  const [storageLocation, setStorageLocation] = useState(
    editingProduct?.storageLocation || "",
  );
  const [minimumStock, setMinimumStock] = useState(
    editingProduct?.minimumStock.toString() || "",
  );

  const [isAttentionOpen, setIsAttentionOpen] = useState(false);

  const isEditing = !!editingProduct;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !description ||
      !quantity ||
      !category ||
      !storageLocation ||
      !minimumStock
    ) {
      setIsAttentionOpen(true);
      return;
    }

    const newProduct = {
      description,
      quantity: Number(quantity),
      category,
      storageLocation,
      minimumStock: Number(minimumStock),
    };

    if (isEditing && editingProduct && onUpdateProduct) {
      onUpdateProduct(editingProduct.id, newProduct);
    } else {
      onAddProduct(newProduct);
    }

    setDescription("");
    setQuantity("");
    setCategory("");
    setStorageLocation("");
    setMinimumStock("");
  };

  const handleCancel = () => {
    setDescription("");
    setQuantity("");
    setCategory("");
    setStorageLocation("");
    setMinimumStock("");
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-6 md:p-8">
      <div className="flex items-center mb-8">
        <img
          src="/assets/icone-produtos.svg"
          alt="Produtos"
          className="w-11 h-12 mr-4"
        />
        <h2 className="text-[26px] font-medium font-inter text-primary-blue">
          {isEditing ? "Editar Produto" : "Adicionar Novo Produto"}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label
              htmlFor="description"
              className="block text-[16px] font-medium font-inter mb-2 text-primary-blue"
            >
              DESCRIÇÃO
            </Label>
            <Input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[31px] px-3 border-light-border"
            />
          </div>
          <div>
            <Label
              htmlFor="initial-quantity"
              className="block text-[16px] font-medium font-inter mb-2 text-primary-blue"
            >
              QUANTIDADE INICIAL
            </Label>
            <Input
              id="initial-quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full h-[31px] px-3 border-light-border"
            />
          </div>
          <div>
            <Label className="block text-[16px] font-medium font-inter mb-2 text-primary-blue">
              CATEGORIA
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full h-[31px] px-3 border-light-border">
                <SelectValue placeholder="Selecionar categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Categoria A">Categoria A</SelectItem>
                <SelectItem value="Categoria B">Categoria B</SelectItem>
                <SelectItem value="Categoria C">Categoria C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="storage-location"
              className="block text-[16px] font-medium font-inter mb-2 text-primary-blue"
            >
              LOCAL DE ARMAZENAMENTO
            </Label>
            <Select value={storageLocation} onValueChange={setStorageLocation}>
              <SelectTrigger className="w-full h-[31px] px-3 border-light-border">
                <SelectValue placeholder="Selecionar local" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Estoque A">Estoque A</SelectItem>
                <SelectItem value="Estoque B">Estoque B</SelectItem>
                <SelectItem value="Estoque C">Estoque C</SelectItem>
                <SelectItem value="Depósito Principal">
                  Depósito Principal
                </SelectItem>
                <SelectItem value="Depósito Secundário">
                  Depósito Secundário
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="minimum-stock"
              className="block text-[16px] font-medium font-inter mb-2 text-primary-blue"
            >
              ESTOQUE MÍNIMO
            </Label>
            <Input
              id="minimum-stock"
              type="number"
              value={minimumStock}
              onChange={(e) => setMinimumStock(e.target.value)}
              className="w-full h-[31px] px-3 border-light-border"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-4">
          <Button
            type="submit"
            className={`px-6 h-[43px] text-[16px] font-medium rounded-lg ${
              isEditing
                ? "bg-[#69FF696B] text-[#178213] hover:bg-[#69FF69a0]"
                : "bg-primary-blue text-white hover:bg-primary-blue/90"
            }`}
          >
            {isEditing ? "CONFIRMAR" : "ADICIONAR PRODUTO"}
          </Button>
          {isEditing && (
            <Button
              type="button"
              onClick={handleCancel}
              className="px-6 h-[43px] bg-[#52658C] text-white text-[16px] font-medium rounded-lg hover:bg-[#52658C]/90"
            >
              CANCELAR
            </Button>
          )}
        </div>
      </form>

      <CustomAlert
        isOpen={isAttentionOpen}
        onClose={() => setIsAttentionOpen(false)}
      />
    </div>
  );
}
