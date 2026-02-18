import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-secondary-gray flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[599px] bg-white rounded-[20px] px-6 sm:px-12 lg:px-20 py-8 sm:py-12 flex flex-col">
        <img
          src="https://api.builder.io/api/v1/image/assets/4aa8bcf0c86340a186e2a0fdf66e63cd/8ed352a7c2069e9b78136955ae18d6d9eef30b1f"
          alt="FAURG Logo"
          className="w-[157px] h-auto mx-auto object-contain"
          loading="lazy"
        />

        <h1 className="text-[#F8A617] text-xl font-medium text-center mt-5 mb-10">
          SISTEMA DE ALMOXARIFADO
        </h1>

        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-primary-blue text-[22px] font-normal mb-6"
            >
              E-MAIL
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[60px] rounded-lg bg-light-gray-bg border-0 text-base focus-visible:ring-1 focus-visible:ring-[#F8A617]"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-primary-blue text-[22px] font-normal mb-[18px]"
            >
              SENHA
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[60px] rounded-lg bg-light-gray-bg border-0 text-base focus-visible:ring-1 focus-visible:ring-[#F8A617]"
              required
            />
          </div>

          <div className="text-right mb-11">
            <button
              type="button"
              className="text-[#0E40A7] text-sm hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              ESQUECEU SUA SENHA?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full max-w-[347px] mx-auto flex bg-[#F8A617] hover:bg-[#E09615] text-white text-[22px] font-semibold h-auto py-[22px] rounded-lg transition-colors"
          >
            ACESSAR SISTEMA
          </Button>
        </form>

        <p className="text-[#0E40A7] text-sm text-center mt-12">
          © 2026 FAURG - Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
