import { Button } from "@/components/ui/button";

interface MovimentacaoCardProps {
  iconSrc: string;
  title: string;
  buttonText: string;
  onClick: () => void;
}

export function MovimentacaoCard({
  iconSrc,
  title,
  buttonText,
  onClick,
}: MovimentacaoCardProps) {
  return (
    <div className="bg-white rounded-lg flex flex-col items-center py-[39px] px-[19px] w-full">
      <img
        src={iconSrc}
        alt={title}
        className="w-[50px] h-[50px] object-contain"
      />
      <h3 className="text-[28px] font-medium font-inter text-center text-primary-blue mt-[30px]">
        {title}
      </h3>
      <Button
        className="w-full mt-9 rounded-lg text-white text-lg font-medium font-inter bg-primary-blue hover:bg-primary-blue/90 py-4"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
}
