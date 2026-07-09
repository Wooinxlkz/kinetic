interface IconProps {
  size?: number;
  className?: string;
}

const S = (size: number, className: string | undefined, children: React.ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

export function MonitorIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </>);
}

export function LaptopIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 01-.9 1.45H3.62a1 1 0 01-.9-1.45L4 16" />
  </>);
}

export function SmartphoneIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </>);
}

export function TabletIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </>);
}

export function PrinterIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </>);
}

export function HardDriveIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <line x1="22" y1="12" x2="2" y2="12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
    <line x1="6" y1="16" x2="6.01" y2="16" />
    <line x1="10" y1="16" x2="10.01" y2="16" />
  </>);
}

export function BatteryIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
    <line x1="23" y1="13" x2="23" y2="11" />
  </>);
}

export function PowerIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M18.36 6.64a9 9 0 11-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </>);
}

export function PlugIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M8 2v4M16 2v4" />
    <path d="M4 8h16v4a8 8 0 01-16 0z" />
    <line x1="12" y1="18" x2="12" y2="22" />
  </>);
}

export function BluetoothIcon({ size = 24, className }: IconProps) {
  return S(size, className, <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />);
}

export function HeadphonesIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </>);
}

export function CameraIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </>);
}

export function VideoIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </>);
}

export function ScanIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </>);
}

export function QrCodeIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="3" height="3" />
    <line x1="21" y1="14" x2="21" y2="21" />
    <line x1="14" y1="21" x2="21" y2="21" />
  </>);
}

export function RadioIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <circle cx="12" cy="12" r="2" />
    <path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14" />
  </>);
}
