interface IconProps {
  size?: number;
  className?: string;
}

const S = (size: number, className: string | undefined, children: React.ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

export function StarIcon({ size = 24, className }: IconProps) {
  return S(size, className, <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />);
}

export function HeartOutlineIcon({ size = 24, className }: IconProps) {
  return S(size, className, <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />);
}

export function ThumbsUpIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
  </>);
}

export function ThumbsDownIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" />
    <path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" />
  </>);
}

export function FlagIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </>);
}

export function TagIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </>);
}

export function CrownIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M2 17L12 2l10 15H2z" />
    <path d="M6 17l2-5 4 3 4-3 2 5" />
    <line x1="2" y1="21" x2="22" y2="21" />
  </>);
}

export function GiftIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <path d="M12 22V7" />
    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
  </>);
}

export function TrophyIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0012 0V2z" />
  </>);
}

export function DollarSignIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </>);
}

export function CreditCardIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </>);
}

export function ShoppingCartIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <circle cx="9" cy="21" r="1" fill="currentColor" stroke="none" />
    <circle cx="20" cy="21" r="1" fill="currentColor" stroke="none" />
    <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6" />
  </>);
}

export function ShoppingBagIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </>);
}

export function WalletIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <path d="M20 12V6H6a2 2 0 010-4h14v4" />
    <path d="M4 6v16h16V12" />
    <circle cx="18" cy="15" r="2" />
  </>);
}

export function ReceiptIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <polyline points="4 2 4 22 12 18 20 22 20 2" />
    <line x1="8" y1="8" x2="16" y2="8" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </>);
}

export function CoinsIcon({ size = 24, className }: IconProps) {
  return S(size, className, <>
    <circle cx="15" cy="15" r="6" />
    <circle cx="9" cy="9" r="6" />
    <path d="M9 6v3h3" />
  </>);
}
