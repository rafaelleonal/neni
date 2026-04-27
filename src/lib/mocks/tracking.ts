export type TrackingStep = {
  title: string;
  sub: string;
  done: boolean;
  active?: boolean;
};

export const TRACKING_STEPS: TrackingStep[] = [
  { title: "Pedido recibido", sub: "14:30", done: true },
  { title: "Preparando", sub: "14:31", done: true },
  { title: "En camino", sub: "14:52", done: true, active: true },
  { title: "Entregado", sub: "Estimado: 15:05", done: false },
];
