import type { CSSProperties, ReactNode } from "react";

import {
  HomeIndicator,
  StatusBar,
  type HomeIndicatorPlacement,
} from "@/components/status-bar";

type PhoneScreenProps = {
  children: ReactNode;
  background?: string;
  color?: string;
  statusBar?: "light" | "dark" | false;
  homeIndicator?: false | "light" | "dark";
  homeIndicatorPlacement?: HomeIndicatorPlacement;
  letterSpacing?: number;
  paddingBottom?: number;
  height?: number | "auto";
  className?: string;
  style?: CSSProperties;
};

export function PhoneScreen({
  children,
  background = "var(--td-bg)",
  color = "var(--td-ink)",
  statusBar = "light",
  homeIndicator = "light",
  homeIndicatorPlacement = "flow",
  letterSpacing = -0.2,
  paddingBottom,
  height = "auto",
  className,
  style,
}: PhoneScreenProps) {
  return (
    <div
      className={className}
      style={{
        width: 390,
        ...(height === "auto" ? { minHeight: 844 } : { height }),
        background,
        color,
        letterSpacing,
        position: "relative",
        ...(paddingBottom != null ? { paddingBottom } : null),
        ...style,
      }}
    >
      {statusBar !== false && <StatusBar dark={statusBar === "dark"} />}
      {children}
      {homeIndicator !== false && (
        <HomeIndicator
          dark={homeIndicator === "dark"}
          placement={homeIndicatorPlacement}
        />
      )}
    </div>
  );
}
