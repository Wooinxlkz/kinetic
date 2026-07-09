interface IconProps {
  size?: number;
  className?: string;
}

const S = (size: number, className: string | undefined, children: React.ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

export function MapIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </>);
}

export function MapPinIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </>);
}

export function NavigationIcon({ size = 24, className }: IconProps) {
  return S(size, className, <polygon points="3 11 22 2 13 21 11 13 3 11" />);
}

export function CompassIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </>);
}

export function ThermometerIcon({ size = 24, className }: IconProps) {
  return S(size, className, <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />);
}

export function DropletsIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 6.6A10.97 10.97 0 0014 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 01-11.91 4.97" />
  </>);
}

export function CloudRainIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <line x1="16" y1="13" x2="16" y2="21" />
    <line x1="8" y1="13" x2="8" y2="21" />
    <line x1="12" y1="15" x2="12" y2="23" />
    <path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25" />
  </>);
}

export function WindIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
  </>);
}

export function UmbrellaIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M23 12a11.05 11.05 0 00-22 0zm-5 7a3 3 0 01-6 0v-7" />
  </>);
}
