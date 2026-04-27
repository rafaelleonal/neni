import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  h?: number;
  className?: string;
};

export function PhoneFrame({ children, h = 844, className }: Props) {
  return (
    <div
      className={`w-[390px] rounded-[44px] overflow-hidden border-[10px] border-[#1A1A1A] bg-black shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.04)] ${className ?? ""}`}
      style={{ height: h }}
    >
      <div
        className="bg-td-bg w-[390px] overflow-auto"
        style={{ height: h }}
      >
        {children}
      </div>
    </div>
  );
}
