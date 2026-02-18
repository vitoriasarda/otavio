import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserForm } from "@/features/usuarios/components/UserForm";
import { UserList } from "@/features/usuarios/components/UserList";
import { Sidebar } from "@/components/shared/Sidebar";
import { ArrowLeft } from "lucide-react";

interface User {
  id: number;
  fullName: string;
  email: string;
  sector: string;
  profile: string;
}

const initialUsers: User[] = [
  {
    id: 1,
    fullName: "João Silva",
    email: "joao@example.com",
    sector: "TI",
    profile: "Administrador",
  },
  {
    id: 2,
    fullName: "Maria Santos",
    email: "maria@example.com",
    sector: "RH",
    profile: "Operacional",
  },
];

export default function Usuarios() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = (newUser: Omit<User, "id">) => {
    setUsers((currentUsers) => [
      { ...newUser, id: Date.now() },
      ...currentUsers,
    ]);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (id: number, updatedUser: Omit<User, "id">) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
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
          {currentPage === 1 && (
            <h1 className="text-4xl md:text-[36px] font-medium font-inter text-primary-blue">
              Cadastro de Usuários
            </h1>
          )}
        </div>

        <div className="space-y-8">
          {currentPage === 1 && (
            <UserForm
              onAddUser={handleAddUser}
              editingUser={editingUser}
              onUpdateUser={handleUpdateUser}
              onCancelEdit={handleCancelEdit}
            />
          )}
          {/* Lista de usuários */}
          <UserList
            users={users}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        </div>
      </main>
    </div>
  );
}
