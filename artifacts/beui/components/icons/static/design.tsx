interface IconProps {
  size?: number;
  className?: string;
}

const S = (size: number, className: string | undefined, children: React.ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

export function PenIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </>);
}

export function PenToolIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </>);
}

export function PaintbrushIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M18.37 2.63L14 7l-1.59-1.59a2 2 0 00-2.82 0L8 7l9 9 1.59-1.59a2 2 0 000-2.82L17 10l4.37-4.37a2.12 2.12 0 00-3-3z" />
    <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
    <path d="M14.5 17.5L4.5 15" />
  </>);
}

export function PaletteIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="7" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="17" cy="11.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="7" cy="13" r="1.5" fill="currentColor" stroke="none" />
  </>);
}

export function EraserIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M20 20H7L3 16l11-11 7 7-3.5 3.5" />
    <path d="M6.5 17.5l5-5" />
    <line x1="3" y1="20" x2="22" y2="20" />
  </>);
}

export function RulerIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
    <path d="M8 3v4M12 3v2M16 3v4" />
    <path d="M3 8h4M3 12h2M3 16h4" />
  </>);
}

export function ScissorsIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </>);
}

export function PaperclipIcon({ size = 24, className }: IconProps) {
  return S(size, className, <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />);
}

export function MagnetIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M6 15V9a6 6 0 0112 0v6" />
    <path d="M5 9h2v6H5V9zM17 9h2v6h-2V9z" />
    <line x1="5" y1="21" x2="7" y2="21" />
    <line x1="17" y1="21" x2="19" y2="21" />
  </>);
}

export function ScaleIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <line x1="12" y1="3" x2="12" y2="20" />
    <path d="M5 7h14" />
    <path d="M3 9l5 8a4 4 0 01-5 0l5-8z" />
    <path d="M16 9l5 8a4 4 0 01-5 0l5-8z" />
    <line x1="5" y1="22" x2="19" y2="22" />
  </>);
}

export function WandIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <line x1="15" y1="9" x2="3" y2="21" />
    <path d="M15 4V2M15 16v-2M8 9H6M20 9h-2" />
    <path d="M17.8 6.2l1.4-1.4M10.2 6.2L8.8 4.8" />
    <path d="M17.8 11.8l1.4 1.4M10.2 11.8l-1.4 1.4" />
  </>);
}
