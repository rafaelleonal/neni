type StatusBarProps = {
  dark?: boolean;
  time?: string;
};

export function StatusBar({ dark = false, time = "9:41" }: StatusBarProps) {
  const color = dark ? "#fff" : "#000";

  return (
    <div
      className="flex items-center justify-between h-[44px] px-[24px] text-[15px] font-semibold font-sans"
      style={{ color }}
    >
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <path
            d="M1 7l2 2 3-4M6 9l2 2 7-8"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path
            d="M1 10l13-9M4 10l10-7M7 10l7-5M10 10l4-3"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
        <div
          className="w-[24px] h-[11px] border rounded-[3px] p-[1px]"
          style={{ borderColor: color }}
        >
          <div
            className="w-3/4 h-full rounded-[1px]"
            style={{ background: color }}
          />
        </div>
      </div>
    </div>
  );
}

export type HomeIndicatorPlacement = "flow" | "floating" | "floating-compact";

type HomeIndicatorProps = {
  dark?: boolean;
  placement?: HomeIndicatorPlacement;
};

export function HomeIndicator({
  dark = false,
  placement = "flow",
}: HomeIndicatorProps) {
  const isCompact = placement === "floating-compact";
  const isFloating = placement !== "flow";

  return (
    <div
      className={`grid place-items-center ${isCompact ? "h-[12px]" : "h-[34px]"} ${isFloating ? "absolute bottom-0 left-0 right-0" : ""}`}
    >
      <div
        className={`w-[134px] h-[5px] rounded-[3px] ${dark ? "bg-white" : "bg-[var(--td-ink)]"}`}
      />
    </div>
  );
}
