import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NewLocal {
  description: string;
  address: string;
}

interface Local {
  id: number;
  description: string;
  address: string;
}

interface LocalFormProps {
  onAddLocal: (local: NewLocal) => void;
  editingLocal?: Local | null;
  onUpdateLocal?: (id: number, local: NewLocal) => void;
  onCancelEdit?: () => void;
}

export function LocalForm({ onAddLocal, editingLocal, onUpdateLocal, onCancelEdit }: LocalFormProps) {
  const [description, setDescription] = useState(editingLocal?.description || "");
  const [address, setAddress] = useState(editingLocal?.address || "");

  const isEditing = !!editingLocal;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!description || !address) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newLocal = {
      description,
      address,
    };

    if (isEditing && editingLocal && onUpdateLocal) {
      onUpdateLocal(editingLocal.id, newLocal);
    } else {
      onAddLocal(newLocal);
    }

    setDescription("");
    setAddress("");
  };

  const handleCancel = () => {
    setDescription("");
    setAddress("");
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-6 md:p-8">
      <div className="flex items-center mb-8">
        <svg
          className="w-12 h-12 mr-4 flex-shrink-0 text-primary-blue"
          viewBox="0 0 49 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_locais)">
            <path
              d="M24.5 4.25L13.2708 23.375H35.7292L24.5 4.25Z"
              fill="currentColor"
            />
            <path
              d="M35.7292 46.75C40.8033 46.75 44.9167 42.4687 44.9167 37.1875C44.9167 31.9063 40.8033 27.625 35.7292 27.625C30.655 27.625 26.5417 31.9063 26.5417 37.1875C26.5417 42.4687 30.655 46.75 35.7292 46.75Z"
              fill="currentColor"
            />
            <path
              d="M6.125 28.6875H22.4583V45.6875H6.125V28.6875Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_locais">
              <rect width="49" height="51" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h2 className="text-[26px] font-medium font-inter text-primary-blue">
          {isEditing ? "Editar Local de Estoque" : "Adicionar Novo Local de Estoque"}
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end"
      >
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
            className="w-full h-[31px] px-3 border-light-border rounded-lg"
          />
        </div>
        <div>
          <Label
            htmlFor="address"
            className="block text-[16px] font-medium font-inter mb-2 text-primary-blue"
          >
            ENDEREÇO/LOCALIZAÇÃO
          </Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-[31px] px-3 border-light-border rounded-lg"
          />
        </div>
        <div className="md:col-span-2 mt-6 flex justify-end gap-4">
          <Button
            type="submit"
            className={`px-6 h-[43px] text-[16px] font-medium rounded-lg ${
              isEditing
                ? "bg-[#69FF696B] text-[#178213] hover:bg-[#69FF69a0]"
                : "bg-primary-blue text-white hover:bg-primary-blue/90"
            }`}
          >
            {isEditing ? "CONFIRMAR" : "ADICIONAR LOCAL"}
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
    </div>
  );
}
