interface IconProps {
  size?: number;
  className?: string;
}

const svg = (size: number, className: string | undefined, children: React.ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

export function MailIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,6 12,13 22,6" />
  </>);
}

export function SendIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </>);
}

export function MessageCircleIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </>);
}

export function MessageSquareIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </>);
}

export function PhoneIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.14 13a19.79 19.79 0 01-3.07-8.67A2 2 0 013.07 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </>);
}

export function AtSignIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" />
  </>);
}

export function InboxIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
  </>);
}

export function ReplyIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <polyline points="9 17 4 12 9 7" />
    <path d="M20 18v-2a4 4 0 00-4-4H4" />
  </>);
}
