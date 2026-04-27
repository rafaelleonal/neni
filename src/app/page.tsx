import Link from "next/link";
import { LandingDesktop } from "@/components/screens/landing-desktop";

export default function HomePage() {
  return (
    <main>
      <div className="flex items-center justify-center bg-td-bg">
        <div className="origin-top scale-100 md:scale-100 overflow-x-auto">
          <LandingDesktop />
        </div>
      </div>
      <nav
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      >
        <Link
          href="/showcase"
          className="rounded-full bg-td-ink px-4 py-2 text-xs font-medium text-td-bg shadow-lg hover:brightness-110"
        >
          Ver todas las pantallas →
        </Link>
      </nav>
    </main>
  );
}
