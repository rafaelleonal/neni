type StepperProps = {
  current: number;
  total: number;
  onBack: () => void;
};

export function Stepper({ current, total, onBack }: StepperProps) {
  return (
    <div className="flex items-center gap-3 px-5 pt-4 pb-2 md:px-6">
      <button
        type="button"
        onClick={onBack}
        aria-label="Atrás"
        className="text-td-mute -ml-2 grid h-9 w-9 place-items-center rounded-full text-2xl leading-none"
      >
        ‹
      </button>
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
