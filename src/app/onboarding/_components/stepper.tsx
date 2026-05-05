import { BackButton } from "@/components/ui/back-button";

type StepperProps = {
  current: number;
  total: number;
  onBack: () => void;
};

export function Stepper({ current, total, onBack }: StepperProps) {
  return (
    <div className="flex items-center gap-3 px-5 pt-4 pb-2 md:px-6">
      <BackButton onClick={onBack} />
      <div className="bg-td-line h-1 flex-1 overflow-hidden rounded-full">
        <div
          className="bg-td-accent h-full transition-all duration-300"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
      <div className="text-td-mute font-mono text-xs">
        {current}/{total}
      </div>
    </div>
  );
}
