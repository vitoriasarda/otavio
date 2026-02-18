import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/shared/Sidebar";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RequisitionRecord {
  id: number;
  code: string;
  date: string;
  totalItems: number;
  costCenter: string;
  reason: string;
  type: "Compra" | "Retirada";
  status: "APROVADA" | "REPROVADA" | "PENDENTE";
}

const ITEMS_PER_PAGE = 5;

export default function Historico() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState<RequisitionRecord[]>([
    {
      id: 1,
      code: "REQ001",
      date: "2024-01-15",
      totalItems: 3,
      costCenter: "TI",
      reason: "Manutenção de equipamentos",
      type: "Compra",
      status: "APROVADA",
    },
    {
      id: 2,
      code: "RET001",
      date: "2024-01-14",
      totalItems: 2,
      costCenter: "RH",
      reason: "Retirada de materiais",
      type: "Retirada",
      status: "PENDENTE",
    },
    {
      id: 3,
      code: "REQ002",
      date: "2024-01-13",
      totalItems: 5,
      costCenter: "Financeiro",
      reason: "Compra de suprimentos",
      type: "Compra",
      status: "REPROVADA",
    },
    {
      id: 4,
      code: "RET002",
      date: "2024-01-12",
      totalItems: 1,
      costCenter: "TI",
      reason: "Devolução de equipamento",
      type: "Retirada",
      status: "APROVADA",
    },
  ]);

  const toggleRowExpand = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleApprove = (id: number) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, status: "APROVADA" } : record
      )
    );
  };

  const handleReject = (id: number) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, status: "REPROVADA" } : record
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APROVADA":
        return "bg-[rgba(105,255,105,0.42)] text-[#178213]";
      case "REPROVADA":
        return "bg-[rgba(255,0,0,0.45)] text-[#821315]";
      case "PENDENTE":
        return "bg-[#FFFB0073] text-[#D2CE0D]";
      default:
        return "";
    }
  };

  const filteredRecords = records.filter(
    (record) =>
      record.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.costCenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-secondary-gray">
      <Sidebar />
      <main className="flex-1 p-4 md:p-12 pt-8 md:pt-12">
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => navigate("/requisicoes")}
            className="flex items-center gap-2 text-back-nav-text hover:text-back-nav-text/80 transition-colors mb-4 md:mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[20px] font-medium font-inter">
              Voltar para Requisições
            </span>
          </button>
          <h1 className="text-4xl md:text-[36px] font-medium font-inter text-primary-blue">
            Histórico de Requisições
          </h1>
        </div>

        <div className="w-full bg-white rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-[24px] font-medium font-inter text-primary-blue">
              Histórico de Requisições
            </h2>
            <div className="relative w-full md:w-[465px]">
              <Input
                type="text"
                placeholder="PESQUISAR EM HISTÓRICO DE REQUISIÇÕES"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-8 px-4 pr-12 border-light-border rounded-lg text-xs placeholder:text-xs placeholder:italic placeholder:text-[#8583839C]"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:opacity-70 transition-opacity flex items-center justify-center"
                onClick={() => {}}
              >
                <svg
                  className="w-5 h-5 text-primary-blue/50"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.4444 20L11.4444 13C10.8889 13.4444 10.25 13.7963 9.52778 14.0556C8.80556 14.3148 8.03704 14.4444 7.22222 14.4444C5.2037 14.4444 3.49537 13.7454 2.09722 12.3472C0.699074 10.9491 0 9.24074 0 7.22222C0 5.2037 0.699074 3.49537 2.09722 2.09722C3.49537 0.699074 5.2037 0 7.22222 0C9.24074 0 10.9491 0.699074 12.3472 2.09722C13.7454 3.49537 14.4444 5.2037 14.4444 7.22222C14.4444 8.03704 14.3148 8.80556 14.0556 9.52778C13.7963 10.25 13.4444 10.8889 13 11.4444L20 18.4444L18.4444 20ZM7.22222 12.2222C8.61111 12.2222 9.79167 11.7361 10.7639 10.7639C11.7361 9.79167 12.2222 8.61111 12.2222 7.22222C12.2222 5.83333 11.7361 4.65278 10.7639 3.68056C9.79167 2.70833 8.61111 2.22222 7.22222 2.22222C5.83333 2.22222 4.65278 2.70833 3.68056 3.68056C2.70833 4.65278 2.22222 5.83333 2.22222 7.22222C2.22222 8.61111 2.70833 9.79167 3.68056 10.7639C4.65278 11.7361 5.83333 12.2222 7.22222 12.2222Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[16px] font-medium text-primary-blue">
                    CÓDIGO
                  </TableHead>
                  <TableHead className="text-[16px] font-medium text-primary-blue">
                    DATA
                  </TableHead>
                  <TableHead className="text-[16px] font-medium text-primary-blue">
                    TOTAL DE ITENS
                  </TableHead>
                  <TableHead className="text-[16px] font-medium text-primary-blue">
                    CENTRO DE CUSTO
                  </TableHead>
                  <TableHead className="text-[16px] font-medium text-primary-blue">
                    MOTIVO
                  </TableHead>
                  <TableHead className="text-[16px] font-medium text-primary-blue">
                    TIPO
                  </TableHead>
                  <TableHead className="text-[16px] font-medium text-primary-blue">
                    AÇÕES
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRecords.length > 0 ? (
                  paginatedRecords.map((record) => (
                    <React.Fragment key={record.id}>
                      <TableRow>
                        <TableCell className="text-[14px]">{record.code}</TableCell>
                        <TableCell className="text-[14px]">{record.date}</TableCell>
                        <TableCell className="text-[14px]">{record.totalItems}</TableCell>
                        <TableCell className="text-[14px]">{record.costCenter}</TableCell>
                        <TableCell className="text-[14px]">{record.reason}</TableCell>
                        <TableCell className="text-[14px]">{record.type}</TableCell>
                        <TableCell className="flex items-center gap-4">
                          <div className="flex flex-col gap-2">
                            {record.status === "PENDENTE" ? (
                              <>
                                <Button
                                  onClick={() => handleApprove(record.id)}
                                  className="px-6 h-7 text-[14px] font-medium rounded-full bg-[rgba(105,255,105,0.42)] text-[#178213] hover:bg-[#69FF69a0] border-[#69FF69]"
                                >
                                  APROVAR
                                </Button>
                                <Button
                                  onClick={() => handleReject(record.id)}
                                  className="px-6 h-7 text-[14px] font-medium rounded-full bg-[rgba(255,0,0,0.45)] text-[#821315] hover:bg-[rgba(255,0,0,0.65)] border-[#FF6969]"
                                >
                                  REPROVAR
                                </Button>
                              </>
                            ) : (
                              <span
                                className={`px-6 py-1 rounded-full text-[14px] font-medium ${getStatusColor(
                                  record.status
                                )}`}
                              >
                                {record.status}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => toggleRowExpand(record.id)}
                            className="p-1 hover:opacity-70 transition-opacity flex-shrink-0"
                          >
                            <svg
                              className={`w-3 h-3 text-primary-blue/75 transition-transform ${
                                expandedRows.includes(record.id) ? "rotate-180" : ""
                              }`}
                              viewBox="0 0 12 7"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 7L0 0H12L6 7Z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        </TableCell>
                      </TableRow>
                      {expandedRows.includes(record.id) && (
                        <TableRow className="bg-gray-50">
                          <TableCell colSpan={7} className="py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                              <div>
                                <Label className="block text-[14px] font-medium text-primary-blue mb-2">
                                  NOME DO PRODUTO
                                </Label>
                                <Input
                                  type="text"
                                  value={record.reason}
                                  readOnly
                                  className="w-full h-[31px] px-3 border-light-border rounded-lg bg-white"
                                />
                              </div>
                              <div>
                                <Label className="block text-[14px] font-medium text-primary-blue mb-2">
                                  QUANTIDADE SOLICITADA
                                </Label>
                                <Input
                                  type="number"
                                  value={record.totalItems}
                                  readOnly
                                  className="w-full h-[31px] px-3 border-light-border rounded-lg bg-white"
                                />
                              </div>
                              <div>
                                <Label className="block text-[14px] font-medium text-primary-blue mb-2">
                                  USUÁRIO SOLICITANTE
                                </Label>
                                <Input
                                  type="text"
                                  value="Usuário"
                                  readOnly
                                  className="w-full h-[31px] px-3 border-light-border rounded-lg bg-white"
                                />
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Nenhuma requisição encontrada
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
              <span className="text-base font-medium text-gray-700 relative z-10">{currentPage}</span>
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
        </div>
      </main>
    </div>
  );
}
