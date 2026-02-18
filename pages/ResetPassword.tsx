import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      alert("Senha redefinida com sucesso!");
      navigate("/login");
    } else {
      alert("As senhas não coincidem");
    }
  };

  return (
    <div className="min-h-screen bg-secondary-gray flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[599px] bg-white rounded-[20px] px-6 sm:px-12 lg:px-[61px] py-8 sm:py-12 lg:py-6 pb-[79px] flex flex-col">
        <img
          src="https://api.builder.io/api/v1/image/assets/4aa8bcf0c86340a186e2a0fdf66e63cd/8ed352a7c2069e9b78136955ae18d6d9eef30b1f"
          alt="FAURG Logo"
          className="w-[157px] h-auto mx-auto object-contain"
          loading="lazy"
        />

        <h1 className="text-[#F8A617] text-xl font-medium text-center mt-[22px] mb-[58px]">
          SISTEMA DE ALMOXARIFADO
        </h1>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-9">
            <label
              htmlFor="newPassword"
              className="block text-primary-blue text-[22px] font-normal mb-6 text-left"
            >
              SENHA NOVA
            </label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-[60px] rounded-lg bg-light-gray-bg border-0 text-base focus-visible:ring-1 focus-visible:ring-[#F8A617]"
              required
            />
          </div>

          <div className="mb-[58px]">
            <label
              htmlFor="confirmPassword"
              className="block text-primary-blue text-[22px] font-normal mb-[18px] text-left"
            >
              REPETIR SENHA NOVA
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-[60px] rounded-lg bg-light-gray-bg border-0 text-base focus-visible:ring-1 focus-visible:ring-[#F8A617]"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full max-w-[199px] mx-auto flex bg-[#F8A617] hover:bg-[#E09615] text-white text-[22px] font-semibold h-auto py-[22px] rounded-lg transition-colors"
          >
            CONFIRMAR
          </Button>
        </form>
      </div>
    </div>
  );
}
