import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RequisitionItem {
  id: number;
  product: string;
  quantity: number;
  reason: string;
}

interface RequisitionHistory {
  id: number;
  code: string;
  date: string;
  totalItems: number;
  costCenter: string;
  status: "APROVADA" | "REPROVADA" | "PENDENTE";
}

export default function Retirada() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: "",
    date: "",
    user: "",
    costCenter: "",
    productName: "",
    quantity: "",
    reason: "",
  });

  const [items, setItems] = useState<RequisitionItem[]>([]);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [history, setHistory] = useState<RequisitionHistory[]>([
    {
      id: 1,
      code: "RET001",
      date: "2024-01-15",
      totalItems: 3,
      costCenter: "TI",
      status: "APROVADA",
    },
    {
      id: 2,
      code: "RET002",
      date: "2024-01-14",
      totalItems: 2,
      costCenter: "RH",
      status: "PENDENTE",
    },
    {
      id: 3,
      code: "RET003",
      date: "2024-01-13",
      totalItems: 5,
      costCenter: "Financeiro",
      status: "REPROVADA",
    },
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, costCenter: value }));
  };

  const handleAddItem = () => {
    if (!formData.productName || !formData.quantity) {
      alert("Por favor, preencha o nome do produto e quantidade.");
      return;
    }

    if (editingItemId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItemId
            ? {
                ...item,
                product: formData.productName,
                quantity: parseInt(formData.quantity),
                reason: formData.reason,
              }
            : item
        )
      );
      setEditingItemId(null);
    } else {
      const newItem: RequisitionItem = {
        id: Date.now(),
        product: formData.productName,
        quantity: parseInt(formData.quantity),
        reason: formData.reason,
      };
      setItems((prev) => [newItem, ...prev]);
    }

    setFormData((prev) => ({
      ...prev,
      productName: "",
      quantity: "",
      reason: "",
    }));
  };

  const handleEditItem = (item: RequisitionItem) => {
    setFormData((prev) => ({
      ...prev,
      productName: item.product,
      quantity: item.quantity.toString(),
      reason: item.reason,
    }));
    setEditingItemId(item.id);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setFormData((prev) => ({
      ...prev,
      productName: "",
      quantity: "",
      reason: "",
    }));
  };

  const handleDeleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSendRequisition = () => {
    if (items.length === 0) {
      alert("Adicione pelo menos um item antes de enviar.");
      return;
    }

    const newRecord: RequisitionHistory = {
      id: Date.now(),
      code: formData.code || `RET${Date.now()}`,
      date: formData.date || new Date().toISOString().split('T')[0],
      totalItems: items.length,
      costCenter: formData.costCenter || "N/A",
      status: "PENDENTE",
    };

    setHistory((prev) => [newRecord, ...prev]);
    setItems([]);
    setFormData({
      code: "",
      date: "",
      user: "",
      costCenter: "",
      productName: "",
      quantity: "",
      reason: "",
    });
    alert("Requisição enviada com sucesso!");
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
            Requisição de Retirada
          </h1>
        </div>

        <div className="space-y-8">
          {/* Formulário de Requisição */}
          <div className="w-full bg-white rounded-lg p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="block text-[16px] font-medium font-inter mb-2 text-primary-blue">
                  CÓDIGO
                </Label>
                <Input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="w-full h-[31px] px-3 border-light-border rounded-lg"
                />
              </div>
              <div>
                <Label className="block text-[16px] font-medium font-inter mb-2 text-primary-blue">
                  DATA
                </Label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full h-[31px] px-3 border-light-border rounded-lg"
                />
              </div>
              <div>
                <Label className="block text-[16px] font-medium font-inter mb-2 text-primary-blue">
                  USUÁRIO
                </Label>
                <Input
                  type="text"
                  name="user"
                  value={formData.user}
                  onChange={handleInputChange}
                  className="w-full h-[31px] px-3 border-light-border rounded-lg"
                />
              </div>
              <div>
                <Label className="block text-[16px] font-medium font-inter mb-2 text-primary-blue">
                  CENTRO DE CUSTO
                </Label>
                <Select value={formData.costCenter} onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full h-[31px] px-3 border-light-border rounded-lg">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ti">TI</SelectItem>
                    <SelectItem value="rh">RH</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="block text-[16px] font-medium font-inter mb-2 text-primary-blue">
                  NOME DO PRODUTO
                </Label>
                <Input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full h-[31px] px-3 border-light-border rounded-lg"
                />
              </div>
              <div>
                <Label className="block text-[16px] font-medium font-inter mb-2 text-primary-blue">
                  QUANTIDADE SOLICITADA
                </Label>
                <Input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full h-[31px] px-3 border-light-border rounded-lg"
                />
              </div>
            </div>

            <div className="mb-6">
              <Label className="block text-[16px] font-medium font-inter mb-2 text-primary-blue">
                MOTIVO DA SOLICITAÇÃO
              </Label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className="w-full h-[73px] px-3 py-2 border border-light-border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                onClick={handleAddItem}
                className={`px-6 h-[43px] text-[16px] font-medium rounded-lg ${
                  editingItemId
                    ? "bg-[#69FF696B] text-[#178213] hover:bg-[#69FF69a0]"
                    : "bg-primary-blue text-white hover:bg-primary-blue/90"
                }`}
              >
                {editingItemId ? "CONFIRMAR" : "ADICIONAR"}
              </Button>
              {editingItemId && (
                <Button
                  onClick={handleCancelEdit}
                  className="px-6 h-[43px] bg-[#52658C] text-white text-[16px] font-medium rounded-lg hover:bg-[#52658C]/90"
                >
                  CANCELAR
                </Button>
              )}
            </div>
          </div>

          {/* Itens na Requisição */}
          <div className="w-full bg-white rounded-lg p-6 md:p-8">
            <h2 className="text-[24px] font-medium font-inter text-primary-blue mb-6">
              Itens na Requisição
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[16px] font-medium text-primary-blue">
                      PRODUTO
                    </TableHead>
                    <TableHead className="text-[16px] font-medium text-primary-blue">
                      QUANTIDADE
                    </TableHead>
                    <TableHead className="text-[16px] font-medium text-primary-blue">
                      MOTIVO
                    </TableHead>
                    <TableHead className="text-[16px] font-medium text-primary-blue">
                      AÇÕES
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length > 0 ? (
                    items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-[14px]">{item.product}</TableCell>
                        <TableCell className="text-[14px]">{item.quantity}</TableCell>
                        <TableCell className="text-[14px]">{item.reason}</TableCell>
                        <TableCell className="space-x-4">
                          <Button
                            variant="link"
                            onClick={() => handleEditItem(item)}
                            className="text-[#0859FF] hover:text-[#0859FF]/80 p-0 h-auto text-[14px] font-medium mr-4"
                          >
                            EDITAR
                          </Button>
                          <Button
                            variant="link"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-[#FF0808] hover:text-[#FF0808]/80 p-0 h-auto text-[14px] font-medium"
                          >
                            EXCLUIR
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        Nenhum item adicionado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={handleSendRequisition}
                className="px-6 h-[43px] bg-primary-blue text-white text-[16px] font-medium rounded-lg hover:bg-primary-blue/90"
              >
                ENVIAR REQUISIÇÃO
              </Button>
            </div>
          </div>

          {/* Histórico de Requisições */}
          <div className="w-full bg-white rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-[24px] font-medium font-inter text-primary-blue">
                Histórico de Requisições
              </h2>
              <div className="relative w-full md:w-[465px]">
                <Input
                  type="text"
                  placeholder="PESQUISAR EM HISTÓRICO DE REQUISIÇÕES DE RETIRADA"
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
                      STATUS
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="text-[14px]">{record.code}</TableCell>
                      <TableCell className="text-[14px]">{record.date}</TableCell>
                      <TableCell className="text-[14px]">{record.totalItems}</TableCell>
                      <TableCell className="text-[14px]">{record.costCenter}</TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-[14px] font-medium ${getStatusColor(
                            record.status
                          )}`}
                        >
                          {record.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
