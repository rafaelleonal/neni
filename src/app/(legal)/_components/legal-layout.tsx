import Link from "next/link";

import { NeniLogo } from "@/components/neni-logo";

type LegalLayoutProps = {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
};

export function LegalLayout({ title, updatedAt, children }: LegalLayoutProps) {
  return (
    <main className="bg-td-bg min-h-dvh">
      <header className="border-b-td-line border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5 md:px-8">
          <Link href="/" aria-label="Volver al inicio">
            <NeniLogo size={28} />
          </Link>
          <Link
            href="/"
            className="text-td-mute hover:text-td-ink text-sm transition-colors"
          >
            Inicio
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 pt-10 pb-20 md:px-8 lg:pt-14">
        <div className="text-td-mute mb-3 text-[11px] font-semibold tracking-[1.5px] uppercase">
          Legal
        </div>
        <h1 className="text-3xl font-semibold tracking-[-1px] md:text-4xl lg:text-[44px] lg:tracking-[-1.5px]">
          {title}
        </h1>
        <p className="text-td-mute mt-2 text-sm">
          Última actualización: {updatedAt}
        </p>

        <div className="legal-prose mt-10">{children}</div>

        <footer className="border-t-td-line mt-16 border-t pt-8">
          <div className="text-td-mute flex flex-col gap-2 text-sm md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} neni.mx — Todos los derechos reservados.</div>
            <div className="flex gap-4">
              <Link
                href="/privacidad"
                className="hover:text-td-ink transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="hover:text-td-ink transition-colors"
              >
                Términos
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
