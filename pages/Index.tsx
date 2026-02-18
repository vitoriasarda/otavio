// frontend/client/pages/Index.tsx

import { Sidebar } from "@/components/shared/Sidebar";

const lowStockItemsData = [];

export default function Index() {
  return (
    <div className="flex min-h-screen bg-secondary-gray">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8">
        <div className="w-full max-w-5xl mx-auto">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="w-full h-[9.7rem] bg-white rounded-lg flex flex-col justify-center items-center p-4">
              <h3 className="text-lg md:text-[24px] font-medium font-inter text-center mb-2 text-primary-blue">
                Total de itens
              </h3>
              <span className="text-4xl font-bold text-primary-blue">0</span>
            </div>
            <div className="w-full h-[9.7rem] bg-white rounded-lg flex flex-col justify-center items-center p-4">
              <h3 className="text-lg md:text-[24px] font-medium font-inter text-center mb-2 text-primary-blue">
                Requisições pendentes
              </h3>
              <span className="text-4xl font-bold text-primary-blue">0</span>
            </div>
            <div className="w-full h-[9.7rem] bg-white rounded-lg flex flex-col justify-center items-center p-4">
              <h3 className="text-lg md:text-[24px] font-medium font-inter text-center mb-2 text-primary-blue">
                Itens com estoque baixo
              </h3>
              <span className="text-4xl font-bold text-primary-blue">0</span>
            </div>
          </div>

          {/* Tabelas de Dados  */}
          <div className="space-y-6">
            <div className="w-full bg-white rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-[24px] font-medium font-inter mb-4 text-primary-blue">
                Itens com estoque baixo
              </h2>
              <div className="w-full h-10 rounded-lg flex items-center px-4 bg-gray-200 bg-opacity-50 mb-2">
                <div className="text-sm md:text-[16px] font-medium font-inter text-primary-blue w-1/2">
                  PRODUTO
                </div>
                <div className="text-sm md:text-[16px] font-medium font-inter text-primary-blue w-1/2">
                  QUANTIDADE
                </div>
              </div>
              <p className="text-center text-gray-500 py-4">
                Nenhum item com estoque baixo.
              </p>
            </div>
            <div className="w-full bg-white rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-[24px] font-medium font-inter mb-4 text-primary-blue">
                Requisições pendentes
              </h2>
              <div className="w-full h-10 rounded-lg flex items-center px-4 bg-gray-200 bg-opacity-50 mb-2">
                <div className="text-sm md:text-[16px] font-medium font-inter text-primary-blue w-1/3">
                  PRODUTO
                </div>
                <div className="text-sm md:text-[16px] font-medium font-inter text-primary-blue w-1/3">
                  QUANTIDADE
                </div>
                <div className="text-sm md:text-[16px] font-medium font-inter text-primary-blue w-1/3">
                  STATUS
                </div>
              </div>
              <p className="text-center text-gray-500 py-4">
                Nenhuma requisição pendente.
              </p>
            </div>
            <div className="w-full bg-white rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-[24px] font-medium font-inter mb-4 text-primary-blue">
                Últimas movimentações
              </h2>
              <div className="w-full h-10 rounded-lg flex items-center px-4 bg-gray-200 bg-opacity-50 mb-2">
                <div className="text-sm md:text-[16px] font-medium font-inter text-primary-blue w-1/4">
                  TIPO
                </div>
                <div className="text-sm md:text-[16px] font-medium font-inter text-primary-blue w-1/4">
                  PRODUTO
                </div>
                <div className="text-sm md:text-[16px] font-medium font-inter text-primary-blue w-1/4">
                  QUANTIDADE
                </div>
                <div className="text-sm md:text-[16px] font-medium font-inter text-primary-blue w-1/4">
                  DATA
                </div>
              </div>
              <p className="text-center text-gray-500 py-4">
                Nenhuma movimentação recente.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
