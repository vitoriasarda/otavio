// client/components/shared/ComfirmAlert.tsx
interface ConfirmAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmAlert({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmAlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-[600px] h-[250px] bg-[#D9D9D9] rounded-lg shadow-lg flex flex-col p-8 relative">
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/assets/certeza.svg"
            alt="Tem certeza?"
            className="w-8 h-8"
          />
          <span className="text-[#52658C] text-[24px] font-bold font-inter uppercase">
            TEM CERTEZA?
          </span>
        </div>

        <p className="text-[#52658C] text-[18px] font-normal font-inter mb-auto pl-1">
          Você tem certeza que deseja continuar? Essa ação <br /> não pode ser
          desfeita.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-2 px-6 rounded-lg text-[16px] font-inter transition-colors uppercase"
          >
            CANCELAR
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-[#F8A617] hover:bg-[#F8A617]/90 text-white font-bold py-2 px-6 rounded-lg text-[16px] font-inter transition-colors uppercase"
          >
            CONFIRMAR
          </button>
        </div>
      </div>
    </div>
  );
}
