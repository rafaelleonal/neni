import type { SVGProps } from "react";

type IconProps = {
  size?: number;
  stroke?: string;
  fill?: string;
  sw?: number;
  className?: string;
  style?: SVGProps<SVGSVGElement>["style"];
};

function StrokeIcon({
  d,
  size = 18,
  stroke = "currentColor",
  fill = "none",
  sw = 1.6,
  className,
  style,
}: IconProps & { d: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d={d} />
    </svg>
  );
}

export const WaIcon = ({ size = 18, className, style }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-5-4.4-5.1-4.6-.1-.2-1.2-1.6-1.2-3 0-1.5.8-2.2 1-2.5.3-.3.6-.3.8-.3h.6c.2 0 .5-.1.7.5s.9 2.2.9 2.3c.1.2.1.3 0 .5-.1.2-.2.3-.3.5l-.4.5c-.2.1-.3.3-.1.5.1.3.7 1.1 1.5 1.8 1 .9 1.8 1.2 2 1.3.3.1.5.1.6-.1.2-.2.7-.8.9-1 .2-.3.4-.2.7-.1.2.1 1.6.8 1.9 1 .3.1.5.2.5.3.1.2.1.8 0 1.6Z" />
  </svg>
);

export const ArrowIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M5 12h14M13 6l6 6-6 6" />
);
export const CheckIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M4 12l5 5L20 6" />
);
export const StoreIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M3 9l1.5-5h15L21 9M3 9v11h18V9M3 9h18M9 13h6" />
);
export const BagIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M6 8h12l-1 12H7L6 8Zm3 0a3 3 0 1 1 6 0" />
);
export const LinkIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"
  />
);
export const CardIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M3 7h18v12H3zM3 11h18M7 15h3" />
);
export const ChartIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
);
export const PlusIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M12 5v14M5 12h14" />
);
export const BellIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9ZM10 21a2 2 0 0 0 4 0"
  />
);
export const SearchIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14ZM16 16l5 5" />
);
export const MoreIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M5 12h.01M12 12h.01M19 12h.01" sw={p.sw ?? 3} />
);
export const PhoneIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"
  />
);
export const PkgIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M21 16V8l-9-5-9 5v8l9 5 9-5ZM3 8l9 5 9-5M12 13v10" />
);
