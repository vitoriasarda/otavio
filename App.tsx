import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Cadastros from "./pages/Cadastros";
import Products from "./pages/Products";
import Categorias from "./pages/Categorias";
import Locais from "./pages/Locais";
import Usuarios from "./pages/Usuarios";
import Requisicoes from "./pages/Requisicoes";
import Compra from "./pages/Compra";
import Retirada from "./pages/Retirada";
import Historico from "./pages/Historico";
import NotFound from "./pages/NotFound";
import Movimentacoes from "./pages/Movimentacoes";
import Entrada from "./pages/Entrada";
import Saida from "./pages/Saida";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import ResetPassword from "./pages/ResetPassword";
import Relatorios from "./pages/Relatorios";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    document.title = "FAURG — Almoxarifado";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/" element={<Index />} />
            <Route path="/cadastros" element={<Cadastros />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/locais" element={<Locais />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/requisicoes" element={<Requisicoes />} />
            <Route path="/compra" element={<Compra />} />
            <Route path="/retirada" element={<Retirada />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/movimentacoes" element={<Movimentacoes />} />
            <Route path="/entrada" element={<Entrada />} />
            <Route path="/saida" element={<Saida />} />
            <Route path="/relatorios" element={<Relatorios />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
