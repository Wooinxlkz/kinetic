import { CounterRing } from "@/components/motion/counter-ring";

export function CounterRingPreview() {
  return (
    <div className="flex flex-wrap gap-8 p-8 justify-center">
      <CounterRing value={72} label="Storage used" />
      <CounterRing value={38} max={100} color="hsl(var(--primary))" label="CPU load" suffix="%" size={100} strokeWidth={7} />
      <CounterRing value={95} max={100} color="hsl(142 71% 45%)" label="Uptime" suffix="%" size={140} strokeWidth={10} />
    </div>
  );
}
