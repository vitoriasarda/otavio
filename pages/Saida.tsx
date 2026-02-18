import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/shared/Sidebar";
import { Input } from "@/components/ui/input";

interface Produto {
  nome: string;
  quantidade: string;
}

interface SaidaHistorico {
  id: number;
  data: string;
  requisicao: string;
  destino: string;
  usuario: string;
  produtos: Produto[];
  status: {
    aRetirar: boolean;
    retirado: boolean;
  };
}
//teste
const ITEMS_PER_PAGE = 5;
const INITIAL_DATA: SaidaHistorico[] = [
  {
    id: 1,
    data: "08/01/2026",
    requisicao: "REQ - 01080126-02",
    destino: "RH",
    usuario: "EDUARDA",
    produtos: [
      { nome: "CANETA AZUL", quantidade: "5" },
      { nome: "FOLHA A4", quantidade: "500" },
    ],
    status: { aRetirar: true, retirado: false },
  },
  {
    id: 2,
    data: "09/01/2026",
    requisicao: "REQ - 01080126-03",
    destino: "TI",
    usuario: "JOÃO",
    produtos: [{ nome: "MOUSE", quantidade: "1" }],
    status: { aRetirar: false, retirado: true },
  },
  {
    id: 3,
    data: "10/01/2026",
    requisicao: "REQ - 01080126-04",
    destino: "FINANCEIRO",
    usuario: "MARIA",
    produtos: [{ nome: "GRAMPEADOR", quantidade: "2" }],
    status: { aRetirar: true, retirado: false },
  },
  {
    id: 4,
    data: "11/01/2026",
    requisicao: "REQ - 01080126-05",
    destino: "MECÂNICA",
    usuario: "PEDRO",
    produtos: [{ nome: "LUVA DE PROTEÇÃO", quantidade: "10" }],
    status: { aRetirar: false, retirado: true },
  },
  {
    id: 5,
    data: "12/01/2026",
    requisicao: "REQ - 01080126-06",
    destino: "PRODUÇÃO",
    usuario: "ANA",
    produtos: [{ nome: "CAPACETE", quantidade: "1" }],
    status: { aRetirar: true, retirado: false },
  },
  {
    id: 6,
    data: "13/01/2026",
    requisicao: "REQ - 01080126-07",
    destino: "LOGÍSTICA",
    usuario: "CARLOS",
    produtos: [{ nome: "FITA ADESIVA", quantidade: "5" }],
    status: { aRetirar: false, retirado: true },
  },
];

export default function Saida() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<Produto[]>([
    { nome: "", quantidade: "" },
    { nome: "", quantidade: "" },
  ]);
  const [data, setData] = useState("");
  const [usuario, setUsuario] = useState("");
  const [destino, setDestino] = useState("");
  const [requisicao, setRequisicao] = useState("");
  const [showReqDropdown, setShowReqDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [destinoNovo, setDestinoNovo] = useState("");
  const [showDestinoDropdown, setShowDestinoDropdown] = useState(false);
  const [motivo, setMotivo] = useState("");

  const [historico, setHistorico] = useState<SaidaHistorico[]>(INITIAL_DATA);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRetirarEstoque = () => {
    if (!destino || !requisicao) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }
    const novaSaida: SaidaHistorico = {
      id: Date.now(),
      data: data || new Date().toLocaleDateString("pt-BR"),
      requisicao,
      destino,
      usuario: usuario || "N/A",
      produtos: produtos.filter((p) => p.nome),
      status: { aRetirar: true, retirado: false },
    };
    setHistorico([novaSaida, ...historico]);
    setDestino("");
    setRequisicao("");
    setProdutos([
      { nome: "", quantidade: "" },
      { nome: "", quantidade: "" },
    ]);
  };

  const handleRetirarNovo = () => {
    if (!nomeProduto || !quantidade) {
      alert("Por favor, preencha o nome do produto e quantidade");
      return;
    }
    alert(`Retirada registrada: ${nomeProduto} - ${quantidade} unidades`);

    setNomeProduto("");
    setQuantidade("");
    setDestinoNovo("");
    setMotivo("");
  };

  const updateProduto = (
    index: number,
    field: keyof Produto,
    value: string
  ) => {
    const newProdutos = [...produtos];
    newProdutos[index][field] = value;
    setProdutos(newProdutos);
  };

  const handleStatusToggle = (
    id: number,
    statusType: keyof SaidaHistorico["status"]
  ) => {
    setHistorico((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isActive = item.status[statusType];
          return {
            ...item,
            status: {
              aRetirar: !isActive && statusType === "aRetirar",
              retirado: !isActive && statusType === "retirado",
            },
          };
        }
        return item;
      })
    );
  };

  const filteredHistorico = historico.filter(
    (record) =>
      record.requisicao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.usuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredHistorico.length / ITEMS_PER_PAGE)
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredHistorico.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div className="flex min-h-screen bg-[#EFEFF0] font-inter">
      <Sidebar />

      <main className="flex-1 p-4 md:p-12 pt-8 md:pt-12 overflow-x-hidden">
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => navigate("/movimentacoes")}
            className="flex items-center gap-2 text-[#8697BA] hover:text-[#8697BA]/80 transition-colors mb-4 md:mb-6"
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
              Voltar para Movimentações
            </span>
          </button>
          <h1 className="text-4xl md:text-[36px] font-medium font-inter text-[#52658C]">
            Movimentação de Saída
          </h1>
        </div>

        <div className="space-y-8">
          <div className="w-full bg-white rounded-lg p-6 md:p-8 shadow-sm">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4">
              <h2 className="text-[20px] font-medium text-[#52658C] uppercase">
                RETIRAR ITENS DO ESTOQUE
              </h2>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[16px] font-medium text-[#52658C]">
                    DATA
                  </span>
                  <div className="w-[141px] h-[31px] border border-[rgba(0,0,0,0.47)] rounded-lg flex items-center justify-center bg-white">
                    <input
                      type="text"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                      className="w-full h-full text-center text-[#1E1E1E] bg-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[16px] font-medium text-[#52658C]">
                    USUÁRIO
                  </span>
                  <div className="w-[124px] h-[31px] border border-[rgba(0,0,0,0.47)] rounded-lg flex items-center justify-center bg-white">
                    <input
                      type="text"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      className="w-full h-full text-center text-[#1E1E1E] bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 xl:gap-20">
              <div className="flex-1 space-y-6">
                <div className="relative">
                  <label className="text-[16px] font-medium text-[#52658C] block mb-2">
                    REQUISIÇÃO
                  </label>
                  <button
                    onClick={() => setShowReqDropdown(!showReqDropdown)}
                    className="w-full md:w-[222px] h-[31px] border border-[rgba(0,0,0,0.47)] rounded-lg px-3 flex justify-between items-center bg-white text-[#1E1E1E]"
                  >
                    <span className="truncate">
                      {requisicao || "Selecione"}
                    </span>
                    <span className="text-[#52658C]/70 text-xs">▼</span>
                  </button>
                  {showReqDropdown && (
                    <div className="absolute top-full left-0 w-full md:w-[222px] bg-white border border-[rgba(0,0,0,0.47)] rounded-lg mt-1 z-20 shadow-lg">
                      <div
                        onClick={() => {
                          setRequisicao("REQ - 01080126-02");
                          setShowReqDropdown(false);
                        }}
                        className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        REQ - 01080126-02
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[16px] font-medium text-[#52658C] block mb-2">
                      NOME DO PRODUTO
                    </label>
                    <input
                      type="text"
                      value={produtos[0].nome}
                      onChange={(e) => updateProduto(0, "nome", e.target.value)}
                      className="w-full h-[31px] border border-[rgba(0,0,0,0.47)] rounded-lg px-3 bg-white text-[#1E1E1E] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[16px] font-medium text-[#52658C] block mb-2">
                      NOME DO PRODUTO
                    </label>
                    <input
                      type="text"
                      value={produtos[1].nome}
                      onChange={(e) => updateProduto(1, "nome", e.target.value)}
                      className="w-full h-[31px] border border-[rgba(0,0,0,0.47)] rounded-lg px-3 bg-white text-[#1E1E1E] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="w-full mb-6">
                  <label className="text-[16px] font-medium text-[#52658C] block mb-2 xl:text-right">
                    DESTINO (SETOR/BAIXA)
                  </label>
                  <input
                    type="text"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    className="w-full md:w-[222px] h-[31px] border border-[rgba(0,0,0,0.47)] rounded-lg px-3 xl:ml-auto block bg-white text-[#1E1E1E] outline-none"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-10 items-end justify-start xl:justify-end mt-auto">
                  <div className="space-y-4 w-full md:w-auto">
                    <div>
                      <label className="text-[16px] font-medium text-[#52658C] block mb-2 text-center">
                        QUANTIDADE SOLICITADA
                      </label>
                      <input
                        type="text"
                        value={produtos[0].quantidade}
                        onChange={(e) =>
                          updateProduto(0, "quantidade", e.target.value)
                        }
                        className="w-full md:w-[118px] h-[31px] border border-[rgba(0,0,0,0.47)] rounded-lg text-center bg-white text-[#1E1E1E] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[16px] font-medium text-[#52658C] block mb-2 text-center">
                        QUANTIDADE SOLICITADA
                      </label>
                      <input
                        type="text"
                        value={produtos[1].quantidade}
                        onChange={(e) =>
                          updateProduto(1, "quantidade", e.target.value)
                        }
                        className="w-full md:w-[118px] h-[31px] border border-[rgba(0,0,0,0.47)] rounded-lg text-center bg-white text-[#1E1E1E] outline-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleRetirarEstoque}
                    className="w-full md:w-[133px] h-[43px] bg-[#52658C] text-white rounded-lg font-medium text-[16px] hover:bg-[#52658C]/90 transition-colors mb-[2px]"
                  >
                    RETIRAR
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white rounded-lg px-[35px] py-[20px] flex gap-5 flex-wrap items-end justify-between shadow-sm">
            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-[#52658C] block mb-2">
                NOME DO PRODUTO
              </label>
              <div className="bg-white border border-[rgba(0,0,0,0.47)] rounded-lg h-[31px] w-[200px] px-3 flex items-center">
                <input
                  type="text"
                  value={nomeProduto}
                  onChange={(e) => setNomeProduto(e.target.value)}
                  className="w-full text-[16px] text-[#1E1E1E] outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-[#52658C] block mb-2">
                QUANTIDADE
              </label>
              <div className="bg-white border border-[rgba(0,0,0,0.47)] rounded-lg h-[31px] w-[150px] px-3 flex items-center">
                <input
                  type="text"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  className="w-full text-[16px] text-[#1E1E1E] outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-[#52658C] block mb-2">
                DESTINO (SETOR/BAIXA)
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowDestinoDropdown(!showDestinoDropdown)}
                  className="bg-white border border-[rgba(0,0,0,0.47)] rounded-lg h-[31px] w-[200px] px-3 flex items-center justify-between text-[16px] text-[#1E1E1E]"
                >
                  <span className="truncate">{destinoNovo || ""}</span>
                  <span className="text-[#52658C]/70 text-xs">▼</span>
                </button>
                {showDestinoDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-[rgba(0,0,0,0.47)] rounded-lg mt-1 z-10">
                    <button
                      onClick={() => {
                        setDestinoNovo("FAURG");
                        setShowDestinoDropdown(false);
                      }}
                      className="w-full px-[12px] py-[9px] text-left text-[16px] text-[#1E1E1E] hover:bg-gray-50"
                    >
                      FAURG
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-[#52658C] block mb-2">
                MOTIVO
              </label>
              <div className="bg-white border border-[rgba(0,0,0,0.47)] rounded-lg h-[49px] w-[250px] px-3 flex items-center">
                <textarea
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full h-full text-[16px] text-[#1E1E1E] outline-none bg-transparent resize-none py-2"
                />
              </div>
            </div>

            <button
              onClick={handleRetirarNovo}
              className="bg-[#52658C] border border-[#52658C] rounded-lg px-[34px] py-[16px] text-[16px] text-white font-medium hover:opacity-90"
            >
              RETIRAR
            </button>
          </div>

          <div className="w-full bg-white rounded-lg p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-[24px] font-medium text-[#52658C]">
                Histórico de Saídas
              </h2>
              <div className="relative w-full md:w-[406px]">
                <Input
                  placeholder="PESQUISAR EM HISTÓRICO DE SAÍDAS"
                  className="w-full h-[32px] border border-[rgba(133,131,131,0.59)] rounded-lg px-4 italic text-[12px] placeholder:text-[rgba(133,131,131,0.61)] outline-none"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <div className="h-[32px] bg-white border border-[rgba(0,0,0,0.47)] rounded-lg mb-4 flex items-center px-4 md:px-8 text-[16px] font-medium text-[#52658C] opacity-80">
                  <div className="w-[15%]">DATA</div>
                  <div className="w-[25%]">REQUISIÇÃO</div>
                  <div className="w-[30%]">DESTINO (SETOR/BAIXA)</div>
                  <div className="w-[15%]">USUÁRIO</div>
                  <div className="w-[15%] text-center">STATUS</div>
                </div>

                {paginatedData.map((saida) => {
                  const anyActive =
                    saida.status.aRetirar || saida.status.retirado;
                  return (
                    <div
                      key={saida.id}
                      className="mb-8 border-b border-gray-100 pb-8 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center px-4 md:px-8 mb-4">
                        <div className="w-[15%] text-[#1E1E1E] font-medium text-[16px]">
                          {saida.data}
                        </div>
                        <div className="w-[25%]">
                          <div className="w-full max-w-[170px] h-[23px] flex items-center text-[#1E1E1E] text-[16px] font-medium">
                            {saida.requisicao}
                          </div>
                        </div>
                        <div className="w-[30%] text-[#1E1E1E] font-medium text-[16px]">
                          {saida.destino}
                        </div>
                        <div className="w-[15%] text-[#1E1E1E] font-medium text-[16px]">
                          {saida.usuario}
                        </div>

                        <div className="w-[15%] flex flex-col gap-2 items-center">
                          {(!anyActive || saida.status.aRetirar) && (
                            <button
                              onClick={() =>
                                handleStatusToggle(saida.id, "aRetirar")
                              }
                              className={`w-[92px] h-[27px] rounded-[48px] text-[13px] font-medium transition-all flex items-center justify-center border border-[#FF860C]
                              ${
                                saida.status.aRetirar
                                  ? "bg-[#FF860C] text-white"
                                  : "bg-[rgba(255,134,12,0.42)] text-[#FF860C] hover:bg-[#FF860C] hover:text-white"
                              }`}
                            >
                              A RETIRAR
                            </button>
                          )}

                          {(!anyActive || saida.status.retirado) && (
                            <button
                              onClick={() =>
                                handleStatusToggle(saida.id, "retirado")
                              }
                              className={`w-[92px] h-[27px] rounded-[48px] text-[13px] font-medium transition-all flex items-center justify-center border border-[#0E7D0E]
                              ${
                                saida.status.retirado
                                  ? "bg-[#0E7D0E] text-white"
                                  : "bg-[rgba(14,125,14,0.42)] text-[#178213] hover:bg-[#0E7D0E] hover:text-white"
                              }`}
                            >
                              RETIRADO
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="ml-0 md:ml-[29px] w-full md:w-[617px] bg-[rgba(133,131,131,0.19)] rounded-lg p-5">
                        {saida.produtos.map((p, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row gap-4 sm:gap-10 mb-4 last:mb-0"
                          >
                            <div className="flex-1">
                              <span className="text-[15px] font-medium text-[#52658C] block mb-1">
                                NOME DO PRODUTO
                              </span>
                              <div className="w-full h-[31px] bg-white border border-[rgba(0,0,0,0.47)] rounded-lg px-3 flex items-center text-[#1E1E1E] opacity-80 text-[16px]">
                                {p.nome}
                              </div>
                            </div>
                            <div>
                              <span className="text-[15px] font-medium text-[#52658C] block mb-1">
                                QUANTIDADE SOLICITADA
                              </span>
                              <div className="w-full sm:w-[118px] h-[31px] bg-white border border-[rgba(0,0,0,0.47)] rounded-lg px-3 flex items-center justify-center text-[#1E1E1E] opacity-80 text-[16px]">
                                {p.quantidade}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
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
                      d="M10 14L14 10L10 6L8.6 7.4L10.2 9H6V11H10.2L8.6 12.6L10 14ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z"
                      fill="#52658C"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
