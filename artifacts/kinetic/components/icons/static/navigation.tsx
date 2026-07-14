interface IconProps {
  size?: number;
  className?: string;
}

const S = (size: number, className: string | undefined, children: React.ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

export function ChevronLeftIcon({ size = 24, className }: IconProps) {
  return S(size, className, <polyline points="15 18 9 12 15 6" />);
}

export function ChevronUpIcon({ size = 24, className }: IconProps) {
  return S(size, className, <polyline points="18 15 12 9 6 15" />);
}

export function MoreHorizontalIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </>);
}

export function MoreVerticalIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
  </>);
}

export function FilterIcon({ size = 24, className }: IconProps) {
  return S(size, className, <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />);
}

export function SortDescIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <line x1="3" y1="5" x2="21" y2="5" />
    <line x1="3" y1="10" x2="17" y2="10" />
    <line x1="3" y1="15" x2="12" y2="15" />
    <line x1="3" y1="20" x2="7" y2="20" />
  </>);
}

export function ZoomInIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </>);
}

export function ZoomOutIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </>);
}

export function RotateCwIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
  </>);
}

export function RotateCcwIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
  </>);
}

export function MaximizeIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
  </>);
}

export function MinimizeIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
  </>);
}

export function HashIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </>);
}

export function PercentIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </>);
}

export function MoveIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <polyline points="5 9 2 12 5 15" />
    <polyline points="9 5 12 2 15 5" />
    <polyline points="15 19 12 22 9 19" />
    <polyline points="19 9 22 12 19 15" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </>);
}

export function ListIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </>);
}
