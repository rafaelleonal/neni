import type { ReactNode } from "react";

export type TabItem = {
  label: string;
  icon: ReactNode;
  active?: boolean;
};

type BottomTabBarProps = {
  items: TabItem[];
};

export function BottomTabBar({ items }: BottomTabBarProps) {
  return (
    <div className="border-td-line absolute right-0 bottom-0 left-0 flex justify-around border-t bg-white px-[20px] pt-[10px] pb-[28px]">
      {items.map((t) => (
        <div
          key={t.label}
          className={`flex flex-col items-center gap-1 ${t.active ? "text-[var(--td-ink)]" : "text-[var(--td-mute)]"}`}
        >
          {t.icon}
          <div
            className={`text-[10.5px] ${t.active ? "font-semibold" : "font-medium"}`}
          >
            {t.label}
          </div>
        </div>
      ))}
    </div>
  );
}
