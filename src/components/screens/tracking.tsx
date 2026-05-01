import { TRACKING_STEPS } from "@/lib/mocks";

import { CheckIcon, PhoneIcon, WaIcon } from "@/components/neni-icons";
import { PhoneScreen } from "@/components/phone-screen";

export function Tracking() {
  return (
    <PhoneScreen>
      <div className="flex items-center gap-3 px-[20px] pt-[4px] pb-[8px]">
        <div className="text-td-mute text-[22px]">‹</div>
        <div className="flex-1 text-[17px] font-semibold">Pedido #4821</div>
      </div>

      <div className="px-[16px] py-[12px]">
        <div className="relative h-[240px] overflow-hidden rounded-[16px] bg-[#E9E3D4]">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 360 240"
            className="absolute inset-0"
          >
            <path d="M0 60 L360 80" stroke="#D6CCB6" strokeWidth="10" />
            <path d="M0 140 L360 160" stroke="#D6CCB6" strokeWidth="14" />
            <path d="M80 0 L100 240" stroke="#D6CCB6" strokeWidth="10" />
            <path d="M260 0 L240 240" stroke="#D6CCB6" strokeWidth="10" />
            <path
              d="M90 180 Q150 160 180 140 Q220 120 250 80"
              stroke="#141311"
              strokeWidth="3"
              strokeDasharray="4 4"
              fill="none"
            />
            <circle cx="250" cy="80" r="8" fill="#141311" />
            <circle cx="250" cy="80" r="3" fill="#FAF8F4" />
            <circle cx="90" cy="180" r="10" fill="var(--td-accent)" />
          </svg>
          <div className="bg-td-accent absolute top-[130px] left-[170px] grid h-[36px] w-[36px] place-items-center rounded-full border-[3px] border-white text-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
            🛵
          </div>
          <div className="absolute top-[14px] right-[14px] rounded-full bg-[rgba(20,19,17,0.92)] px-[12px] py-[8px] text-[12px] font-semibold text-white">
            Llega en <span className="text-td-accent">13 min</span>
          </div>
        </div>
      </div>

      <div className="px-[20px] pt-[16px]">
        <div className="text-td-mute mb-[6px] text-[12px] tracking-[1.3px] uppercase">
          Tu pedido
        </div>
        <div className="text-[26px] font-semibold tracking-[-0.8px]">
          Va en camino
        </div>
        <div className="text-td-mute mt-[4px] text-[13.5px]">
          Ramón está a 13 min de tu ubicación
        </div>
      </div>

      <div className="px-[20px] pt-[22px]">
        <div className="border-td-line rounded-[16px] border bg-white px-[18px] py-[8px]">
          {TRACKING_STEPS.map((step, i) => (
            <div
              key={i}
              className="relative flex items-start gap-3.5 py-[14px]"
              style={{
                borderBottom:
                  i < TRACKING_STEPS.length - 1
                    ? "1px solid var(--td-line)"
                    : "none",
              }}
            >
              <div
                className="mt-[2px] grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full"
                style={{
                  background: step.done ? "var(--td-accent)" : "var(--td-line)",
                  boxShadow: step.active
                    ? "0 0 0 4px rgba(31,170,89,0.2)"
                    : "none",
                }}
              >
                {step.done && <CheckIcon size={12} stroke="#fff" sw={3} />}
              </div>
              <div className="flex-1">
                <div
                  className="text-[14.5px]"
                  style={{
                    fontWeight: step.active ? 600 : 500,
                    color: step.done ? "var(--td-ink)" : "var(--td-mute)",
                  }}
                >
                  {step.title}
                </div>
                <div className="text-td-mute mt-[2px] text-[12px]">
                  {step.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-[20px] pt-[16px] pb-[40px]">
        <div className="border-td-line flex items-center gap-3 rounded-[16px] border bg-white p-[14px]">
          <div className="grid h-[44px] w-[44px] place-items-center rounded-full bg-[#E9E3D4] font-mono text-[14px] font-semibold">
            R
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-semibold">Ramón · Repartidor</div>
            <div className="text-td-mute text-[11.5px]">Moto · ⭐ 4.9</div>
          </div>
          <div className="bg-td-accent grid h-[40px] w-[40px] place-items-center rounded-full text-white">
            <WaIcon size={18} />
          </div>
          <div className="bg-td-ink grid h-[40px] w-[40px] place-items-center rounded-full text-white">
            <PhoneIcon size={16} />
          </div>
        </div>
      </div>
    </PhoneScreen>
  );
}
