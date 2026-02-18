import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/shared/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface RelatorioConsumoData {
  item: string;
  entradas: number;
  saidas: number;
}

const Relatorios = () => {
  const [chartData, setChartData] = useState<RelatorioConsumoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    dataInicio: "",
    dataFim: "",
    setor: "",
    item: "",
  });

  const fetchRelatorio = async (filtrosAtivos?: typeof filters) => {
    try {
      setIsLoading(true);

      console.log(
        "Buscando dados com filtros:",
        filtrosAtivos || "Sem filtros",
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const dadosSimulados: RelatorioConsumoData[] = [
        { item: "Item 1", entradas: 305, saidas: 228 },
        { item: "Item 2", entradas: 269, saidas: 116 },
        { item: "Item 3", entradas: 181, saidas: 252 },
        { item: "Item 4", entradas: 91, saidas: 130 },
        { item: "Item 5", entradas: 300, saidas: 232 },
        { item: "Item 6", entradas: 200, saidas: 130 },
        { item: "Item 7", entradas: 178, saidas: 241 },
        { item: "Item 8", entradas: 265, saidas: 127 },
        { item: "Item 9", entradas: 178, saidas: 249 },
      ];

      setChartData(dadosSimulados);
    } catch (error) {
      console.error("Erro ao carregar relatório:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatorio();
  }, []);

  const handleFiltrar = () => {
    fetchRelatorio(filters);
  };

  const handleExportExcel = () => {
    console.log("Exportando Excel com filtros:", filters);

    alert("back.");
  };

  const handleExportPDF = () => {
    console.log("Exportando PDF com filtros:", filters);

    alert(" back.");
  };

  return (
    <div className="flex min-h-screen bg-secondary-gray">
      <Sidebar />

      <main className="flex-1 p-8 md:p-10 overflow-y-auto">
        <div className="w-full max-w-screen-xl mx-auto space-y-6">
          <h1 className="text-4xl font-medium text-[#52658c] font-inter mb-8">
            Relatórios
          </h1>

          <Card className="bg-white/90 border-[#00000078]/20 shadow-sm">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="space-y-2">
                  <Label
                    htmlFor="periodo-inicial"
                    className="text-[#52658c] font-medium text-sm"
                  >
                    PERÍODO INICIAL
                  </Label>
                  <Input
                    id="periodo-inicial"
                    type="date"
                    className="bg-white border-[#00000078]"
                    value={filters.dataInicio}
                    onChange={(e) =>
                      setFilters({ ...filters, dataInicio: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="periodo-final"
                    className="text-[#52658c] font-medium text-sm"
                  >
                    PERÍODO FINAL
                  </Label>
                  <Input
                    id="periodo-final"
                    type="date"
                    className="bg-white border-[#00000078]"
                    value={filters.dataFim}
                    onChange={(e) =>
                      setFilters({ ...filters, dataFim: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="setor"
                    className="text-[#52658c] font-medium text-sm"
                  >
                    SETOR
                  </Label>
                  <Select
                    value={filters.setor}
                    onValueChange={(val) =>
                      setFilters({ ...filters, setor: val })
                    }
                  >
                    <SelectTrigger className="bg-white border-[#00000078]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="almoxarifi">Financeiro</SelectItem>
                      <SelectItem value="p">Compras</SelectItem>
                      <SelectItem value="adm">Contabilidade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="item"
                    className="text-[#52658c] font-medium text-sm"
                  >
                    ITEM
                  </Label>
                  <Input
                    id="item"
                    placeholder="Nome do item..."
                    className="bg-white border-[#00000078]"
                    value={filters.item}
                    onChange={(e) =>
                      setFilters({ ...filters, item: e.target.value })
                    }
                  />
                </div>

                <Button
                  onClick={handleFiltrar}
                  className="bg-[#52658c] hover:bg-[#52658c]/90 text-white font-medium w-full"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  FILTRAR DADOS
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* EXPORTAÇÃO */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-medium text-[#52658c] font-inter">
                  EXPORTAR RELATÓRIO
                </h2>
                <p className="text-[#52658c] font-light text-lg mt-1">
                  Baixar planilha completa com base nos filtros selecionados
                  acima.
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleExportExcel}
                  className="bg-[#3d8a5833] hover:bg-[#3d8a5844] text-[#3d8a58] h-14 px-8 text-lg font-bold"
                >
                  <img
                    src="/assets/icone-excel.svg"
                    alt="Excel"
                    className="w-6 h-6 mr-2"
                  />
                  EXCEL
                </Button>

                <Button
                  onClick={handleExportPDF}
                  className="bg-[#c25b3333] hover:bg-[#c25b3344] text-[#c25b33] h-14 px-8 text-lg font-bold"
                >
                  <img
                    src="/assets/icone-pdf.svg"
                    alt="PDF"
                    className="w-6 h-6 mr-2"
                  />
                  PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* GRÁFICO */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-[#52658c] text-center font-inter">
                CONSUMO DE ITENS POR PERÍODO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full mt-4 flex items-center justify-center">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-2 text-[#52658c]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Carregando dados...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      barGap={0}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e5e7eb"
                      />
                      <XAxis
                        dataKey="item"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#52658c", fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#52658c", fontSize: 12 }}
                      />
                      <Tooltip
                        cursor={{ fill: "#f3f4f6" }}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="square"
                        wrapperStyle={{ paddingBottom: "20px" }}
                      />
                      <Bar
                        dataKey="entradas"
                        name="ENTRADAS"
                        fill="#beeb9c"
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                      />
                      <Bar
                        dataKey="saidas"
                        name="SAÍDAS"
                        fill="#eda7a7"
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Relatorios;
