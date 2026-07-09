interface IconProps {
  size?: number;
  className?: string;
}

const svg = (size: number, className: string | undefined, children: React.ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

export function ClockIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>);
}

export function CalendarIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>);
}

export function TimerIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <circle cx="12" cy="13" r="8" />
    <polyline points="12 9 12 13 14.5 15.5" />
    <path d="M16.51 3.51L19 6" />
    <path d="M7.5 3.51L5 6" />
    <line x1="12" y1="1" x2="12" y2="3" />
  </>);
}

export function HourglassIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <path d="M5 22h14M5 2h14" />
    <path d="M17 22v-4.17a2 2 0 00-.59-1.42L12 12l-4.41 4.41A2 2 0 007 17.83V22" />
    <path d="M7 2v4.17a2 2 0 00.59 1.42L12 12l4.41-4.41A2 2 0 0017 6.17V2" />
  </>);
}
