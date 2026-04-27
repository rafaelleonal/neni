import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function DCSection({ id, title, subtitle, children }: SectionProps) {
  return (
    <section
      id={id}
      className="border-t border-td-line py-[72px] px-[40px]"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-[32px]">
          <h2 className="text-[32px] font-semibold m-0 tracking-[-0.8px]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-td-mute text-[15px] mt-[8px] mr-0 mb-0 ml-0 max-w-[640px] leading-[1.5]">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-start gap-[48px]">
          {children}
        </div>
      </div>
    </section>
  );
}

type ArtboardProps = {
  label: string;
  children: ReactNode;
};

export function DCArtboard({ label, children }: ArtboardProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="text-td-mute text-[11px] font-mono tracking-[1.2px] uppercase font-semibold">
        {label}
      </div>
      {children}
    </div>
  );
}

type CanvasProps = {
  title: string;
  children: ReactNode;
};

export function DesignCanvas({ title, children }: CanvasProps) {
  return (
    <div className="bg-td-canvas">
      <header className="flex items-center justify-between border-b border-td-line py-[24px] px-[40px] bg-[rgba(255,255,255,0.6)] backdrop-blur-[12px] sticky top-0 z-10">
        <div className="text-[15px] font-semibold">{title}</div>
        <div className="text-td-mute text-[11px] font-mono tracking-[1.2px] uppercase">
          design canvas · v1
        </div>
      </header>
      {children}
    </div>
  );
}
