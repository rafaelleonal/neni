import type { LogoVariant } from "@/lib/tokens";

type Props = {
  size?: number;
  color?: string;
  accent?: string;
  showWord?: boolean;
  variant?: LogoVariant;
};

export function NeniLogo({
  size = 80,
  color = "var(--td-ink)",
  accent = "var(--td-accent)",
  showWord = true,
  variant = "v3",
}: Props) {
  const S = size;

  if (variant === "v1") {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: S * 0.2,
          color,
        }}
      >
        <div
          style={{
            width: S,
            height: S,
            borderRadius: "50%",
            background: color,
            color: accent,
            display: "grid",
            placeItems: "center",
            position: "relative",
            border: `2px solid ${color}`,
          }}
        >
          <svg width={S * 0.5} height={S * 0.5} viewBox="0 0 24 24" fill="none">
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fontFamily="var(--font-sans), Geist, system-ui, sans-serif"
              fontSize="18"
              fontWeight="700"
              fill="var(--td-bg)"
              letterSpacing="-1"
            >
              n
            </text>
          </svg>
          <div
            style={{
              position: "absolute",
              right: -2,
              bottom: 4,
              width: S * 0.22,
              height: S * 0.22,
              borderRadius: "50%",
              background: accent,
              boxShadow:
                color === "var(--td-ink)"
                  ? `0 0 0 ${S * 0.04}px var(--td-bg)`
                  : "none",
            }}
          />
        </div>
        {showWord && (
          <span
            style={{
              fontFamily: "var(--font-sans), Geist, system-ui, sans-serif",
              fontSize: S * 0.58,
              fontWeight: 600,
              letterSpacing: -S * 0.03,
              lineHeight: 1,
              color,
            }}
          >
            neni
          </span>
        )}
      </div>
    );
  }

  if (variant === "v2") {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: S * 0.18,
          color,
        }}
      >
        <svg width={S} height={S} viewBox="0 0 40 40" fill="none">
          <rect x="6" y="10" width="5" height="24" fill={color} rx="0.5" />
          <path
            d="M 8.5 16 A 12 12 0 0 1 31.5 16"
            stroke={color}
            strokeWidth="5"
            fill="none"
            strokeLinecap="square"
          />
          <rect x="29" y="16" width="5" height="18" fill={color} rx="0.5" />
          <circle cx="34.5" cy="34" r="2.2" fill={accent} />
        </svg>
        {showWord && (
          <span
            style={{
              fontFamily: "var(--font-sans), Geist, system-ui, sans-serif",
              fontSize: S * 0.58,
              fontWeight: 600,
              letterSpacing: -S * 0.035,
              lineHeight: 1,
              color,
            }}
          >
            neni<span style={{ color: accent }}>.</span>
          </span>
        )}
      </div>
    );
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        fontFamily: "var(--font-sans), Geist, system-ui, sans-serif",
        fontWeight: 600,
        letterSpacing: -S * 0.045,
        fontSize: S * 0.72,
        lineHeight: 1,
        color,
      }}
    >
      neni
      <span
        style={{
          display: "inline-block",
          width: S * 0.14,
          height: S * 0.14,
          borderRadius: "50%",
          background: accent,
          marginLeft: S * 0.03,
          alignSelf: "flex-end",
          marginBottom: S * 0.06,
        }}
      />
    </span>
  );
}

type MarkProps = {
  size?: number;
  color?: string;
  bg?: string;
  accent?: string;
  variant?: LogoVariant;
};

export function NeniMark({
  size = 28,
  color = "var(--td-bg)",
  bg = "var(--td-ink)",
  accent = "var(--td-accent)",
  variant = "v3",
}: MarkProps) {
  if (variant === "v3") {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.26,
          background: bg,
          display: "grid",
          placeItems: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans), Geist, system-ui, sans-serif",
            fontWeight: 700,
            fontSize: size * 0.58,
            color,
            letterSpacing: -size * 0.02,
            lineHeight: 1,
            paddingLeft: size * 0.04,
          }}
        >
          n
        </span>
        <div
          style={{
            position: "absolute",
            right: size * 0.18,
            bottom: size * 0.22,
            width: size * 0.14,
            height: size * 0.14,
            borderRadius: "50%",
            background: accent,
          }}
        />
      </div>
    );
  }

  if (variant === "v1") {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: bg,
          color,
          display: "grid",
          placeItems: "center",
          position: "relative",
          fontFamily: "var(--font-sans), Geist, system-ui, sans-serif",
          fontWeight: 700,
          fontSize: size * 0.55,
        }}
      >
        n
        <div
          style={{
            position: "absolute",
            right: -1,
            bottom: size * 0.1,
            width: size * 0.22,
            height: size * 0.22,
            borderRadius: "50%",
            background: accent,
            border: `2px solid ${bg}`,
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: bg,
        display: "grid",
        placeItems: "center",
      }}
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 40 40"
        fill="none"
      >
        <rect x="6" y="10" width="5" height="24" fill={color} />
        <path
          d="M 8.5 16 A 12 12 0 0 1 31.5 16"
          stroke={color}
          strokeWidth="5"
          fill="none"
        />
        <rect x="29" y="16" width="5" height="18" fill={color} />
        <circle cx="34.5" cy="34" r="2.2" fill={accent} />
      </svg>
    </div>
  );
}
