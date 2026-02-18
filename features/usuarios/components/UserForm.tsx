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

interface NewUser {
  fullName: string;
  email: string;
  sector: string;
  profile: string;
}

interface User {
  id: number;
  fullName: string;
  email: string;
  sector: string;
  profile: string;
}

interface UserFormProps {
  onAddUser: (user: NewUser) => void;
  editingUser?: User | null;
  onUpdateUser?: (id: number, user: NewUser) => void;
  onCancelEdit?: () => void;
}

const profileOptions = ["Administrador", "Aprovador", "Operacional"];

export function UserForm({
  onAddUser,
  editingUser,
  onUpdateUser,
  onCancelEdit,
}: UserFormProps) {
  const [fullName, setFullName] = useState(editingUser?.fullName || "");
  const [email, setEmail] = useState(editingUser?.email || "");
  const [sector, setSector] = useState(editingUser?.sector || "");
  const [profile, setProfile] = useState(editingUser?.profile || "");

  const isEditing = !!editingUser;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!fullName || !email || !sector || !profile) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newUser = { fullName, email, sector, profile };

    if (isEditing && editingUser && onUpdateUser) {
      onUpdateUser(editingUser.id, newUser);
    } else {
      onAddUser(newUser);
    }

    setFullName("");
    setEmail("");
    setSector("");
    setProfile("");
  };

  const handleCancel = () => {
    setFullName("");
    setEmail("");
    setSector("");
    setProfile("");
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-6 md:p-8">
      <div className="flex items-center mb-8">
        <svg
          className="w-12 h-12 mr-4 flex-shrink-0 text-primary-blue"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_4025_298)">
            <path
              d="M38 6H10C7.8 6 6 7.8 6 10V38C6 40.2 7.8 42 10 42H38C40.2 42 42 40.2 42 38V10C42 7.8 40.2 6 38 6ZM24 12C27.86 12 31 15.14 31 19C31 22.86 27.86 26 24 26C20.14 26 17 22.86 17 19C17 15.14 20.14 12 24 12ZM38 38H10V37.54C10 36.3 10.56 35.14 11.52 34.38C14.94 31.64 19.28 30 24 30C28.72 30 33.06 31.64 36.48 34.38C37.44 35.14 38 36.32 38 37.54V38Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_4025_298">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h2 className="text-[26px] font-medium font-inter text-primary-blue">
          {isEditing ? "Editar Usuário" : "Adicionar Novo Usuário"}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="fullName"
              className="block text-[16px] font-medium font-inter mb-2 text-primary-blue"
            >
              NOME COMPLETO
            </Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-[31px] px-3 border-light-border rounded-lg"
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="block text-[16px] font-medium font-inter mb-2 text-primary-blue"
            >
              E-MAIL
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[31px] px-3 border-light-border rounded-lg"
            />
          </div>
          <div>
            <Label
              htmlFor="sector"
              className="block text-[16px] font-medium font-inter mb-2 text-primary-blue"
            >
              SETOR
            </Label>
            <Input
              id="sector"
              type="text"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full h-[31px] px-3 border-light-border rounded-lg"
            />
          </div>
          <div>
            <Label
              htmlFor="profile"
              className="block text-[16px] font-medium font-inter mb-2 text-primary-blue"
            >
              PERFIL
            </Label>
            <Select value={profile} onValueChange={setProfile}>
              <SelectTrigger className="w-full h-[31px] px-3 border-light-border rounded-lg">
                <SelectValue placeholder="Selecionar Perfil" />
              </SelectTrigger>
              <SelectContent>
                {profileOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-4">
          <Button
            type="submit"
            className={`px-6 h-[43px] text-[16px] font-medium rounded-lg ${
              isEditing
                ? "bg-[#69FF696B] text-[#178213] hover:bg-[#69FF69a0]"
                : "bg-primary-blue text-white hover:bg-primary-blue/90"
            }`}
          >
            {isEditing ? "CONFIRMAR" : "ADICIONAR USUÁRIO"}
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
