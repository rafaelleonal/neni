import { PhoneScreen } from "@/components/phone-screen";
import { CheckIcon, PhoneIcon, WaIcon } from "@/components/neni-icons";
import { TRACKING_STEPS } from "@/lib/mocks";

export function Tracking() {
  return (
    <PhoneScreen>
      <div className="flex items-center gap-3 pt-[4px] px-[20px] pb-[8px]">
        <div className="text-td-mute text-[22px]">‹</div>
        <div className="flex-1 text-[17px] font-semibold">
          Pedido #4821
        </div>
      </div>

      <div className="py-[12px] px-[16px]">
        <div className="h-[240px] rounded-[16px] bg-[#E9E3D4] relative overflow-hidden">
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
          <div className="grid place-items-center bg-td-accent absolute left-[170px] top-[130px] w-[36px] h-[36px] rounded-full border-[3px] border-white text-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
            🛵
          </div>
          <div className="absolute top-[14px] right-[14px] py-[8px] px-[12px] rounded-full bg-[rgba(20,19,17,0.92)] text-white text-[12px] font-semibold">
            Llega en <span className="text-td-accent">13 min</span>
          </div>
        </div>
      </div>

      <div className="pt-[16px] px-[20px]">
        <div className="text-td-mute text-[12px] tracking-[1.3px] uppercase mb-[6px]">
          Tu pedido
        </div>
        <div className="text-[26px] font-semibold tracking-[-0.8px]">
          Va en camino
        </div>
        <div className="text-td-mute text-[13.5px] mt-[4px]">
          Ramón está a 13 min de tu ubicación
        </div>
      </div>

      <div className="pt-[22px] px-[20px]">
        <div className="border border-td-line bg-white rounded-[16px] py-[8px] px-[18px]">
          {TRACKING_STEPS.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 py-[14px] relative"
              style={{
                borderBottom:
                  i < TRACKING_STEPS.length - 1 ? "1px solid var(--td-line)" : "none",
              }}
            >
              <div
                className="grid place-items-center shrink-0 w-[20px] h-[20px] rounded-full mt-[2px]"
                style={{
                  background: step.done ? "var(--td-accent)" : "var(--td-line)",
                  boxShadow: step.active ? "0 0 0 4px rgba(31,170,89,0.2)" : "none",
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
                <div className="text-td-mute text-[12px] mt-[2px]">
                  {step.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-[16px] px-[20px] pb-[40px]">
        <div className="flex items-center gap-3 border border-td-line bg-white rounded-[16px] p-[14px]">
          <div className="grid place-items-center w-[44px] h-[44px] rounded-full bg-[#E9E3D4] font-mono font-semibold text-[14px]">
            R
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-semibold">
              Ramón · Repartidor
            </div>
            <div className="text-td-mute text-[11.5px]">
              Moto · ⭐ 4.9
            </div>
          </div>
          <div className="grid place-items-center bg-td-accent w-[40px] h-[40px] rounded-full text-white">
            <WaIcon size={18} />
          </div>
          <div className="grid place-items-center bg-td-ink w-[40px] h-[40px] rounded-full text-white">
            <PhoneIcon size={16} />
          </div>
        </div>
      </div>

    </PhoneScreen>
  );
}
