import { Button } from "@/components/ui/button";

interface CadastroCardProps {
  iconSrc: string;
  title: string;
  buttonText: string;
  onClick: () => void;
  onDelete?: () => void;
}

export function CadastroCard({
  iconSrc,
  title,
  buttonText,
  onClick,
  onDelete,
}: CadastroCardProps) {
  return (
    <div className="w-[14.25rem] h-[16.375rem] bg-white rounded-lg flex flex-col items-center justify-between p-6 mx-auto relative group shadow-sm hover:shadow-md transition-shadow">
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-3 right-3 text-[#52658C]/50 hover:text-red-500 transition-colors p-1"
          title="Excluir item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      )}

      <div className="flex flex-col items-center flex-1 justify-center mt-2">
        <img src={iconSrc} alt={title} className="w-12 h-12 mb-6" />
        <h3 className="text-[1.75rem] font-medium font-inter text-center mb-4 text-primary-blue">
          {title}
        </h3>
      </div>
      <Button
        className="w-full h-12 rounded-lg text-white text-[1.125rem] font-medium font-inter bg-primary-blue hover:bg-primary-blue/90"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
}
