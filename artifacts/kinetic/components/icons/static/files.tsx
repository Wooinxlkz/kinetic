interface IconProps {
  size?: number;
  className?: string;
}

const svg = (size: number, className: string | undefined, children: React.ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

export function FileIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </>);
}

export function FileTextIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </>);
}

export function FolderIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
  </>);
}

export function FolderOpenIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <path d="M3 7a2 2 0 012-2h4l2 2h7a2 2 0 012 2v1H3z" />
    <path d="M3 10v9a2 2 0 002 2h14a2 2 0 002-2l-2.5-9z" />
  </>);
}

export function DownloadIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </>);
}

export function UploadIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </>);
}

export function SaveIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </>);
}

export function ClipboardIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </>);
}

export function ArchiveIcon({ size = 24, className }: IconProps) {
  return svg(size, className, <>
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </>);
}
