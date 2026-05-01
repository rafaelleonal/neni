import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function DCSection({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="border-td-line border-t px-[40px] py-[72px]">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-[32px]">
          <h2 className="m-0 text-[32px] font-semibold tracking-[-0.8px]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-td-mute mt-[8px] mr-0 mb-0 ml-0 max-w-[640px] text-[15px] leading-[1.5]">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-start gap-[48px]">{children}</div>
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
      <div className="text-td-mute font-mono text-[11px] font-semibold tracking-[1.2px] uppercase">
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
      <header className="border-td-line sticky top-0 z-10 flex items-center justify-between border-b bg-[rgba(255,255,255,0.6)] px-[40px] py-[24px] backdrop-blur-[12px]">
        <div className="text-[15px] font-semibold">{title}</div>
        <div className="text-td-mute font-mono text-[11px] tracking-[1.2px] uppercase">
          design canvas · v1
        </div>
      </header>
      {children}
    </div>
  );
}
