import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      navigate("/reset-password");
    }
  };

  return (
    <div className="min-h-screen bg-secondary-gray flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[599px] bg-white rounded-[20px] px-6 sm:px-12 lg:px-20 py-8 sm:py-12 lg:py-6 pb-[94px] flex flex-col items-center">
        <img
          src="https://api.builder.io/api/v1/image/assets/4aa8bcf0c86340a186e2a0fdf66e63cd/8ed352a7c2069e9b78136955ae18d6d9eef30b1f"
          alt="FAURG Logo"
          className="w-[157px] h-auto object-contain"
          loading="lazy"
        />

        <h1 className="text-[#F8A617] text-xl font-medium text-center mt-[22px]">
          SISTEMA DE ALMOXARIFADO
        </h1>

        <div className="bg-[rgba(248,166,23,0.11)] rounded-lg px-[15px] py-[27px] mt-[66px] w-full max-w-[310px] text-center">
          <p className="text-[#113274] text-base leading-relaxed">
            AS INSTRUÇÕES PARA REDEFINIR SUA SENHA FORAM ENVIADAS PARA O SEU
            E-MAIL. VERIFIQUE A CAIXA DE ENTRADA OU A CAIXA DE SPAM.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[413px] mt-[43px]"
        >
          <div className="mb-6">
            <label
              htmlFor="code"
              className="block text-primary-blue text-[22px] font-normal mb-[23px] text-center"
            >
              INSIRA O CÓDIGO:
            </label>
            <Input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[60px] rounded-lg bg-light-gray-bg border-0 text-base focus-visible:ring-1 focus-visible:ring-[#F8A617]"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#F8A617] hover:bg-[#E09615] text-white text-base font-semibold px-5 py-[9px] rounded-lg transition-colors h-auto"
            >
              CONFIRMAR
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
