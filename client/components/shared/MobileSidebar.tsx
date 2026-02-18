import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar"; // Importa sua Sidebar original
import { useState } from "react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {/* Botão Hambúrguer (Só aparece no Mobile) */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-sm border border-gray-200"
        >
          <Menu className="h-6 w-6 text-[#52658c]" />
        </Button>
      </SheetTrigger>

      {/* Conteúdo do Menu (Abre sua Sidebar original aqui dentro) */}
      <SheetContent side="left" className="p-0 w-[23.3rem] border-r-0">
        <div className="h-full overflow-y-auto" onClick={() => setOpen(false)}>
          {/* Aqui renderizamos sua Sidebar original sem mexer nela */}
          <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
}
