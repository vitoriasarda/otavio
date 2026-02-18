// client/components/shared/attentionAlert.tsx
import React from "react";

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomAlert({ isOpen, onClose }: CustomAlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-[500px] h-[250px] bg-[#D9D9D9] rounded-lg shadow-lg flex flex-col p-8 relative">
        <div className="flex items-center gap-3 mb-6">
          <img src="/assets/atenção.svg" alt="Atenção" className="w-8 h-8" />
          <span className="text-[#52658C] text-[24px] font-bold font-inter uppercase">
            ATENÇÃO!
          </span>
        </div>

        <p className="text-[#52658C] text-[18px] font-normal font-inter mb-auto pl-1">
          Por favor, preencha os campos obrigatórios.
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#F8A617] hover:bg-[#F8A617]/86 text-white font-bold py-2 px-8 rounded-lg text-[16px] font-inter transition-colors uppercase"
          >
            ENTENDI
          </button>
        </div>
      </div>
    </div>
  );
}
