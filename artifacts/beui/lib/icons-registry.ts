export type IconEntry = {
  slug: string;
  name: string;
  description: string;
  componentName: string;
  file: string;
  tags: string[];
  badge?: "new";
};

export type IconCategoryEntry = {
  slug: "static" | "animated";
  name: string;
  description: string;
  icons: IconEntry[];
};

export const iconsRegistry: IconCategoryEntry[] = [
  {
    slug: "static",
    name: "Static Icons",
    description: "Clean, stroke-based SVG icon components. Copy-paste into any project — no runtime dependencies.",
    icons: [
      /* ── Interface ── */
      { slug: "home", name: "Home", componentName: "HomeIcon", file: "components/icons/static/interface.tsx", description: "House / homepage.", tags: ["interface", "navigation"] },
      { slug: "bell", name: "Bell", componentName: "BellIcon", file: "components/icons/static/interface.tsx", description: "Notification bell.", tags: ["interface", "notification"] },
      { slug: "search", name: "Search", componentName: "SearchIcon", file: "components/icons/static/interface.tsx", description: "Magnifying glass.", tags: ["interface", "input"] },
      { slug: "settings", name: "Settings", componentName: "SettingsIcon", file: "components/icons/static/interface.tsx", description: "Gear for settings.", tags: ["interface", "system"] },
      { slug: "menu", name: "Menu", componentName: "MenuIcon", file: "components/icons/static/interface.tsx", description: "Hamburger menu.", tags: ["interface", "navigation"] },
      { slug: "grid", name: "Grid", componentName: "GridIcon", file: "components/icons/static/interface.tsx", description: "Grid layout view.", tags: ["interface", "layout"] },
      { slug: "sun", name: "Sun", componentName: "SunIcon", file: "components/icons/static/interface.tsx", description: "Light mode / brightness.", tags: ["interface", "theme"] },
      { slug: "moon", name: "Moon", componentName: "MoonIcon", file: "components/icons/static/interface.tsx", description: "Dark mode / night.", tags: ["interface", "theme"] },
      { slug: "external-link", name: "External Link", componentName: "ExternalLinkIcon", file: "components/icons/static/interface.tsx", description: "Opens in a new tab.", tags: ["interface", "navigation"] },
      { slug: "bookmark", name: "Bookmark", componentName: "BookmarkIcon", file: "components/icons/static/interface.tsx", description: "Save / bookmark.", tags: ["interface", "action"] },
      { slug: "link", name: "Link", componentName: "LinkIcon", file: "components/icons/static/interface.tsx", description: "Hyperlink chain.", tags: ["interface", "action"] },
      { slug: "layers", name: "Layers", componentName: "LayersIcon", file: "components/icons/static/interface.tsx", description: "Stacked layers.", tags: ["interface", "layout"] },
      /* ── Arrows ── */
      { slug: "arrow-right", name: "Arrow Right", componentName: "ArrowRightIcon", file: "components/icons/static/arrows.tsx", description: "Rightward arrow.", tags: ["arrow", "navigation", "direction"] },
      { slug: "arrow-left", name: "Arrow Left", componentName: "ArrowLeftIcon", file: "components/icons/static/arrows.tsx", description: "Leftward arrow.", tags: ["arrow", "navigation", "direction"] },
      { slug: "arrow-up", name: "Arrow Up", componentName: "ArrowUpIcon", file: "components/icons/static/arrows.tsx", description: "Upward arrow.", tags: ["arrow", "direction"] },
      { slug: "arrow-down", name: "Arrow Down", componentName: "ArrowDownIcon", file: "components/icons/static/arrows.tsx", description: "Downward arrow.", tags: ["arrow", "direction"] },
      { slug: "chevron-right", name: "Chevron Right", componentName: "ChevronRightIcon", file: "components/icons/static/arrows.tsx", description: "Slim rightward chevron.", tags: ["arrow", "navigation"] },
      { slug: "chevron-down", name: "Chevron Down", componentName: "ChevronDownIcon", file: "components/icons/static/arrows.tsx", description: "Slim downward chevron.", tags: ["arrow", "navigation"] },
      /* ── Actions ── */
      { slug: "plus", name: "Plus", componentName: "PlusIcon", file: "components/icons/static/actions.tsx", description: "Add / create.", tags: ["action", "form"] },
      { slug: "minus", name: "Minus", componentName: "MinusIcon", file: "components/icons/static/actions.tsx", description: "Remove / decrement.", tags: ["action", "form"] },
      { slug: "check", name: "Check", componentName: "CheckIcon", file: "components/icons/static/actions.tsx", description: "Confirmation checkmark.", tags: ["action", "status", "form"] },
      { slug: "x-mark", name: "X Mark", componentName: "XMarkIcon", file: "components/icons/static/actions.tsx", description: "Close or dismiss.", tags: ["action", "close"] },
      { slug: "trash", name: "Trash", componentName: "TrashIcon", file: "components/icons/static/actions.tsx", description: "Delete item.", tags: ["action", "destructive"] },
      { slug: "copy", name: "Copy", componentName: "CopyIcon", file: "components/icons/static/actions.tsx", description: "Copy to clipboard.", tags: ["action", "clipboard"] },
      { slug: "share", name: "Share", componentName: "ShareIcon", file: "components/icons/static/actions.tsx", description: "Share or export.", tags: ["action", "social"] },
      { slug: "edit", name: "Edit", componentName: "EditIcon", file: "components/icons/static/actions.tsx", description: "Pencil for edit.", tags: ["action", "form"] },
      /* ── Media ── */
      { slug: "play", name: "Play", componentName: "PlayIcon", file: "components/icons/static/media.tsx", description: "Start playback.", tags: ["media", "audio", "video"] },
      { slug: "pause", name: "Pause", componentName: "PauseIcon", file: "components/icons/static/media.tsx", description: "Pause playback.", tags: ["media", "audio", "video"] },
      { slug: "volume", name: "Volume", componentName: "VolumeIcon", file: "components/icons/static/media.tsx", description: "Speaker volume.", tags: ["media", "audio"] },
      { slug: "mic", name: "Mic", componentName: "MicIcon", file: "components/icons/static/media.tsx", description: "Microphone.", tags: ["media", "audio", "input"] },
      /* ── Tech ── */
      { slug: "code", name: "Code", componentName: "CodeIcon", file: "components/icons/static/tech.tsx", description: "Angle brackets for code.", tags: ["tech", "developer"] },
      { slug: "globe", name: "Globe", componentName: "GlobeIcon", file: "components/icons/static/tech.tsx", description: "Globe / web.", tags: ["tech", "web"] },
      { slug: "shield", name: "Shield", componentName: "ShieldIcon", file: "components/icons/static/tech.tsx", description: "Security / protection.", tags: ["tech", "security"] },
      { slug: "zap", name: "Zap", componentName: "ZapIcon", file: "components/icons/static/tech.tsx", description: "Lightning — speed or power.", tags: ["tech", "status"] },
      /* ── Social ── */
      { slug: "github", name: "GitHub", componentName: "GitHubIcon", file: "components/icons/static/social.tsx", description: "GitHub brand.", tags: ["social", "brand"] },
      { slug: "twitter-x", name: "X (Twitter)", componentName: "XTwitterIcon", file: "components/icons/static/social.tsx", description: "X / Twitter brand.", tags: ["social", "brand"] },
      { slug: "linkedin", name: "LinkedIn", componentName: "LinkedInIcon", file: "components/icons/static/social.tsx", description: "LinkedIn brand.", tags: ["social", "brand"] },
      { slug: "discord", name: "Discord", componentName: "DiscordIcon", file: "components/icons/static/social.tsx", description: "Discord brand.", tags: ["social", "brand"] },
      { slug: "instagram", name: "Instagram", componentName: "InstagramIcon", file: "components/icons/static/social.tsx", description: "Instagram brand.", tags: ["social", "brand"] },
      { slug: "youtube", name: "YouTube", componentName: "YouTubeIcon", file: "components/icons/static/social.tsx", description: "YouTube brand.", tags: ["social", "brand"] },
      { slug: "slack", name: "Slack", componentName: "SlackIcon", file: "components/icons/static/social.tsx", description: "Slack brand.", tags: ["social", "brand"] },
      { slug: "figma", name: "Figma", componentName: "FigmaIcon", file: "components/icons/static/social.tsx", description: "Figma brand.", tags: ["social", "brand", "design"] },
      { slug: "twitch", name: "Twitch", componentName: "TwitchIcon", file: "components/icons/static/social.tsx", description: "Twitch brand.", tags: ["social", "brand"], badge: "new" },
      { slug: "reddit", name: "Reddit", componentName: "RedditIcon", file: "components/icons/static/social.tsx", description: "Reddit brand.", tags: ["social", "brand"], badge: "new" },
      /* ── Communication ── */
      { slug: "mail", name: "Mail", componentName: "MailIcon", file: "components/icons/static/communication.tsx", description: "Email envelope.", tags: ["communication", "email"] },
      { slug: "send", name: "Send", componentName: "SendIcon", file: "components/icons/static/communication.tsx", description: "Paper plane — send.", tags: ["communication", "action"] },
      { slug: "message-circle", name: "Message Circle", componentName: "MessageCircleIcon", file: "components/icons/static/communication.tsx", description: "Round chat bubble.", tags: ["communication", "chat"] },
      { slug: "message-square", name: "Message Square", componentName: "MessageSquareIcon", file: "components/icons/static/communication.tsx", description: "Square chat bubble.", tags: ["communication", "chat"] },
      { slug: "phone", name: "Phone", componentName: "PhoneIcon", file: "components/icons/static/communication.tsx", description: "Phone handset.", tags: ["communication", "contact"] },
      { slug: "at-sign", name: "At Sign", componentName: "AtSignIcon", file: "components/icons/static/communication.tsx", description: "@ address / mention.", tags: ["communication", "input"] },
      { slug: "inbox", name: "Inbox", componentName: "InboxIcon", file: "components/icons/static/communication.tsx", description: "Incoming messages.", tags: ["communication", "email"] },
      { slug: "reply", name: "Reply", componentName: "ReplyIcon", file: "components/icons/static/communication.tsx", description: "Reply arrow.", tags: ["communication", "action"] },
      /* ── Files ── */
      { slug: "file", name: "File", componentName: "FileIcon", file: "components/icons/static/files.tsx", description: "Generic document.", tags: ["file", "document"] },
      { slug: "file-text", name: "File Text", componentName: "FileTextIcon", file: "components/icons/static/files.tsx", description: "Document with text.", tags: ["file", "document"] },
      { slug: "folder", name: "Folder", componentName: "FolderIcon", file: "components/icons/static/files.tsx", description: "Closed folder.", tags: ["file", "navigation"] },
      { slug: "folder-open", name: "Folder Open", componentName: "FolderOpenIcon", file: "components/icons/static/files.tsx", description: "Open folder.", tags: ["file", "navigation"] },
      { slug: "download", name: "Download", componentName: "DownloadIcon", file: "components/icons/static/files.tsx", description: "Arrow down — download.", tags: ["file", "action"] },
      { slug: "upload", name: "Upload", componentName: "UploadIcon", file: "components/icons/static/files.tsx", description: "Arrow up — upload.", tags: ["file", "action"] },
      { slug: "save", name: "Save", componentName: "SaveIcon", file: "components/icons/static/files.tsx", description: "Floppy disk save.", tags: ["file", "action"] },
      { slug: "clipboard", name: "Clipboard", componentName: "ClipboardIcon", file: "components/icons/static/files.tsx", description: "Clipboard paste.", tags: ["file", "action"] },
      { slug: "archive", name: "Archive", componentName: "ArchiveIcon", file: "components/icons/static/files.tsx", description: "Archive / store.", tags: ["file", "action"] },
      /* ── Data & Tech ── */
      { slug: "database", name: "Database", componentName: "DatabaseIcon", file: "components/icons/static/data.tsx", description: "Cylinder database.", tags: ["tech", "data"] },
      { slug: "server", name: "Server", componentName: "ServerIcon", file: "components/icons/static/data.tsx", description: "Server rack.", tags: ["tech", "infrastructure"] },
      { slug: "cloud", name: "Cloud", componentName: "CloudIcon", file: "components/icons/static/data.tsx", description: "Cloud storage.", tags: ["tech", "data"] },
      { slug: "terminal", name: "Terminal", componentName: "TerminalIcon", file: "components/icons/static/data.tsx", description: "Command-line.", tags: ["tech", "developer"] },
      { slug: "cpu", name: "CPU", componentName: "CpuIcon", file: "components/icons/static/data.tsx", description: "Processor chip.", tags: ["tech", "hardware"] },
      { slug: "wifi", name: "Wi-Fi", componentName: "WifiIcon", file: "components/icons/static/data.tsx", description: "Wireless signal.", tags: ["tech", "network"] },
      { slug: "package", name: "Package", componentName: "PackageIcon", file: "components/icons/static/data.tsx", description: "3D package / box.", tags: ["tech", "ecommerce"] },
      { slug: "bar-chart", name: "Bar Chart", componentName: "BarChartIcon", file: "components/icons/static/data.tsx", description: "Vertical bar chart.", tags: ["data", "analytics"] },
      { slug: "trending-up", name: "Trending Up", componentName: "TrendingUpIcon", file: "components/icons/static/data.tsx", description: "Upward trend line.", tags: ["data", "analytics"] },
      { slug: "activity", name: "Activity", componentName: "ActivityIcon", file: "components/icons/static/data.tsx", description: "Heartbeat / activity.", tags: ["data", "analytics", "health"] },
      /* ── User & Auth ── */
      { slug: "user", name: "User", componentName: "UserIcon", file: "components/icons/static/user.tsx", description: "Single person.", tags: ["user", "profile"] },
      { slug: "users", name: "Users", componentName: "UsersIcon", file: "components/icons/static/user.tsx", description: "Group of people.", tags: ["user", "team"] },
      { slug: "user-plus", name: "User Plus", componentName: "UserPlusIcon", file: "components/icons/static/user.tsx", description: "Add a user.", tags: ["user", "action"] },
      { slug: "lock", name: "Lock", componentName: "LockIcon", file: "components/icons/static/user.tsx", description: "Closed padlock.", tags: ["user", "security", "auth"] },
      { slug: "unlock", name: "Unlock", componentName: "UnlockIcon", file: "components/icons/static/user.tsx", description: "Open padlock.", tags: ["user", "security", "auth"] },
      { slug: "eye", name: "Eye", componentName: "EyeIcon", file: "components/icons/static/user.tsx", description: "Show / visible.", tags: ["user", "input"] },
      { slug: "eye-off", name: "Eye Off", componentName: "EyeOffIcon", file: "components/icons/static/user.tsx", description: "Hide / invisible.", tags: ["user", "input"] },
      { slug: "key", name: "Key", componentName: "KeyIcon", file: "components/icons/static/user.tsx", description: "Key / credential.", tags: ["user", "security", "auth"] },
      /* ── Time ── */
      { slug: "clock", name: "Clock", componentName: "ClockIcon", file: "components/icons/static/time.tsx", description: "Analog clock.", tags: ["time", "schedule"] },
      { slug: "calendar", name: "Calendar", componentName: "CalendarIcon", file: "components/icons/static/time.tsx", description: "Date calendar.", tags: ["time", "schedule"] },
      { slug: "timer", name: "Timer", componentName: "TimerIcon", file: "components/icons/static/time.tsx", description: "Stopwatch.", tags: ["time", "measure"] },
      { slug: "hourglass", name: "Hourglass", componentName: "HourglassIcon", file: "components/icons/static/time.tsx", description: "Hourglass — waiting.", tags: ["time", "loading"] },
      /* ── Status ── */
      { slug: "info", name: "Info", componentName: "InfoIcon", file: "components/icons/static/status.tsx", description: "Informational notice.", tags: ["status", "feedback"] },
      { slug: "alert-circle", name: "Alert Circle", componentName: "AlertCircleIcon", file: "components/icons/static/status.tsx", description: "Circle alert.", tags: ["status", "feedback", "error"] },
      { slug: "alert-triangle", name: "Alert Triangle", componentName: "AlertTriangleIcon", file: "components/icons/static/status.tsx", description: "Triangle warning.", tags: ["status", "feedback", "warning"] },
      { slug: "help-circle", name: "Help Circle", componentName: "HelpCircleIcon", file: "components/icons/static/status.tsx", description: "Question / help.", tags: ["status", "feedback"] },
      { slug: "check-circle", name: "Check Circle", componentName: "CheckCircleIcon", file: "components/icons/static/status.tsx", description: "Circled checkmark.", tags: ["status", "feedback", "success"] },
      { slug: "x-circle", name: "X Circle", componentName: "XCircleIcon", file: "components/icons/static/status.tsx", description: "Circled X — error.", tags: ["status", "feedback", "error"] },
      /* ── Misc / E-commerce ── */
      { slug: "star", name: "Star", componentName: "StarIcon", file: "components/icons/static/misc.tsx", description: "Star — favourite or rating.", tags: ["misc", "feedback", "rating"], badge: "new" },
      { slug: "heart-outline", name: "Heart", componentName: "HeartOutlineIcon", file: "components/icons/static/misc.tsx", description: "Heart outline — like.", tags: ["misc", "social", "feedback"], badge: "new" },
      { slug: "thumbs-up", name: "Thumbs Up", componentName: "ThumbsUpIcon", file: "components/icons/static/misc.tsx", description: "Thumbs up approval.", tags: ["misc", "feedback", "social"], badge: "new" },
      { slug: "thumbs-down", name: "Thumbs Down", componentName: "ThumbsDownIcon", file: "components/icons/static/misc.tsx", description: "Thumbs down rejection.", tags: ["misc", "feedback"], badge: "new" },
      { slug: "flag", name: "Flag", componentName: "FlagIcon", file: "components/icons/static/misc.tsx", description: "Flag / report.", tags: ["misc", "action"], badge: "new" },
      { slug: "tag", name: "Tag", componentName: "TagIcon", file: "components/icons/static/misc.tsx", description: "Price tag / label.", tags: ["misc", "ecommerce"], badge: "new" },
      { slug: "crown", name: "Crown", componentName: "CrownIcon", file: "components/icons/static/misc.tsx", description: "Crown — premium.", tags: ["misc", "status"], badge: "new" },
      { slug: "gift", name: "Gift", componentName: "GiftIcon", file: "components/icons/static/misc.tsx", description: "Gift / present.", tags: ["misc", "ecommerce"], badge: "new" },
      { slug: "trophy", name: "Trophy", componentName: "TrophyIcon", file: "components/icons/static/misc.tsx", description: "Trophy / achievement.", tags: ["misc", "status"], badge: "new" },
      { slug: "dollar-sign", name: "Dollar Sign", componentName: "DollarSignIcon", file: "components/icons/static/misc.tsx", description: "Dollar currency symbol.", tags: ["misc", "ecommerce", "finance"], badge: "new" },
      { slug: "credit-card", name: "Credit Card", componentName: "CreditCardIcon", file: "components/icons/static/misc.tsx", description: "Payment card.", tags: ["misc", "ecommerce", "finance"], badge: "new" },
      { slug: "shopping-cart", name: "Shopping Cart", componentName: "ShoppingCartIcon", file: "components/icons/static/misc.tsx", description: "Shopping cart.", tags: ["misc", "ecommerce"], badge: "new" },
      { slug: "shopping-bag", name: "Shopping Bag", componentName: "ShoppingBagIcon", file: "components/icons/static/misc.tsx", description: "Shopping bag.", tags: ["misc", "ecommerce"], badge: "new" },
      { slug: "wallet", name: "Wallet", componentName: "WalletIcon", file: "components/icons/static/misc.tsx", description: "Wallet / payment.", tags: ["misc", "ecommerce", "finance"], badge: "new" },
      { slug: "receipt", name: "Receipt", componentName: "ReceiptIcon", file: "components/icons/static/misc.tsx", description: "Purchase receipt.", tags: ["misc", "ecommerce", "finance"], badge: "new" },
      { slug: "coins", name: "Coins", componentName: "CoinsIcon", file: "components/icons/static/misc.tsx", description: "Stacked coins.", tags: ["misc", "ecommerce", "finance"], badge: "new" },
      /* ── Navigation ── */
      { slug: "chevron-left", name: "Chevron Left", componentName: "ChevronLeftIcon", file: "components/icons/static/navigation.tsx", description: "Slim leftward chevron.", tags: ["arrow", "navigation"], badge: "new" },
      { slug: "chevron-up", name: "Chevron Up", componentName: "ChevronUpIcon", file: "components/icons/static/navigation.tsx", description: "Slim upward chevron.", tags: ["arrow", "navigation"], badge: "new" },
      { slug: "more-horizontal", name: "More Horizontal", componentName: "MoreHorizontalIcon", file: "components/icons/static/navigation.tsx", description: "Horizontal ellipsis menu.", tags: ["navigation", "interface"], badge: "new" },
      { slug: "more-vertical", name: "More Vertical", componentName: "MoreVerticalIcon", file: "components/icons/static/navigation.tsx", description: "Vertical ellipsis menu.", tags: ["navigation", "interface"], badge: "new" },
      { slug: "filter", name: "Filter", componentName: "FilterIcon", file: "components/icons/static/navigation.tsx", description: "Filter funnel.", tags: ["navigation", "data"], badge: "new" },
      { slug: "sort-desc", name: "Sort", componentName: "SortDescIcon", file: "components/icons/static/navigation.tsx", description: "Sort descending lines.", tags: ["navigation", "data"], badge: "new" },
      { slug: "zoom-in", name: "Zoom In", componentName: "ZoomInIcon", file: "components/icons/static/navigation.tsx", description: "Magnifier with plus.", tags: ["navigation", "action"], badge: "new" },
      { slug: "zoom-out", name: "Zoom Out", componentName: "ZoomOutIcon", file: "components/icons/static/navigation.tsx", description: "Magnifier with minus.", tags: ["navigation", "action"], badge: "new" },
      { slug: "rotate-cw", name: "Rotate CW", componentName: "RotateCwIcon", file: "components/icons/static/navigation.tsx", description: "Clockwise rotation.", tags: ["navigation", "action"], badge: "new" },
      { slug: "rotate-ccw", name: "Rotate CCW", componentName: "RotateCcwIcon", file: "components/icons/static/navigation.tsx", description: "Counter-clockwise rotation.", tags: ["navigation", "action"], badge: "new" },
      { slug: "maximize", name: "Maximize", componentName: "MaximizeIcon", file: "components/icons/static/navigation.tsx", description: "Expand to fullscreen.", tags: ["navigation", "layout"], badge: "new" },
      { slug: "minimize", name: "Minimize", componentName: "MinimizeIcon", file: "components/icons/static/navigation.tsx", description: "Collapse from fullscreen.", tags: ["navigation", "layout"], badge: "new" },
      { slug: "hash", name: "Hash", componentName: "HashIcon", file: "components/icons/static/navigation.tsx", description: "# symbol / channel.", tags: ["navigation", "input"], badge: "new" },
      { slug: "percent", name: "Percent", componentName: "PercentIcon", file: "components/icons/static/navigation.tsx", description: "% percentage.", tags: ["navigation", "finance"], badge: "new" },
      { slug: "move", name: "Move", componentName: "MoveIcon", file: "components/icons/static/navigation.tsx", description: "4-directional move.", tags: ["navigation", "action"], badge: "new" },
      { slug: "list", name: "List", componentName: "ListIcon", file: "components/icons/static/navigation.tsx", description: "Bulleted list view.", tags: ["navigation", "layout"], badge: "new" },
      /* ── Devices ── */
      { slug: "monitor", name: "Monitor", componentName: "MonitorIcon", file: "components/icons/static/devices.tsx", description: "Desktop monitor.", tags: ["device", "hardware"], badge: "new" },
      { slug: "laptop", name: "Laptop", componentName: "LaptopIcon", file: "components/icons/static/devices.tsx", description: "Laptop computer.", tags: ["device", "hardware"], badge: "new" },
      { slug: "smartphone", name: "Smartphone", componentName: "SmartphoneIcon", file: "components/icons/static/devices.tsx", description: "Mobile phone.", tags: ["device", "hardware", "mobile"], badge: "new" },
      { slug: "tablet", name: "Tablet", componentName: "TabletIcon", file: "components/icons/static/devices.tsx", description: "Tablet device.", tags: ["device", "hardware", "mobile"], badge: "new" },
      { slug: "printer", name: "Printer", componentName: "PrinterIcon", file: "components/icons/static/devices.tsx", description: "Printer.", tags: ["device", "hardware"], badge: "new" },
      { slug: "hard-drive", name: "Hard Drive", componentName: "HardDriveIcon", file: "components/icons/static/devices.tsx", description: "Hard disk storage.", tags: ["device", "hardware", "data"], badge: "new" },
      { slug: "battery", name: "Battery", componentName: "BatteryIcon", file: "components/icons/static/devices.tsx", description: "Battery level.", tags: ["device", "hardware"], badge: "new" },
      { slug: "power", name: "Power", componentName: "PowerIcon", file: "components/icons/static/devices.tsx", description: "Power on/off.", tags: ["device", "hardware"], badge: "new" },
      { slug: "plug", name: "Plug", componentName: "PlugIcon", file: "components/icons/static/devices.tsx", description: "Power plug.", tags: ["device", "hardware"], badge: "new" },
      { slug: "bluetooth", name: "Bluetooth", componentName: "BluetoothIcon", file: "components/icons/static/devices.tsx", description: "Bluetooth symbol.", tags: ["device", "network"], badge: "new" },
      { slug: "headphones", name: "Headphones", componentName: "HeadphonesIcon", file: "components/icons/static/devices.tsx", description: "Headphones audio.", tags: ["device", "audio", "media"], badge: "new" },
      { slug: "camera", name: "Camera", componentName: "CameraIcon", file: "components/icons/static/devices.tsx", description: "Camera / photo.", tags: ["device", "media"], badge: "new" },
      { slug: "video", name: "Video", componentName: "VideoIcon", file: "components/icons/static/devices.tsx", description: "Video camera.", tags: ["device", "media"], badge: "new" },
      { slug: "scan", name: "Scan", componentName: "ScanIcon", file: "components/icons/static/devices.tsx", description: "Scan with crosshair.", tags: ["device", "action"], badge: "new" },
      { slug: "qr-code", name: "QR Code", componentName: "QrCodeIcon", file: "components/icons/static/devices.tsx", description: "QR code grid.", tags: ["device", "data"], badge: "new" },
      { slug: "radio", name: "Radio", componentName: "RadioIcon", file: "components/icons/static/devices.tsx", description: "Broadcast signal.", tags: ["device", "media", "network"], badge: "new" },
      /* ── Design ── */
      { slug: "pen", name: "Pen", componentName: "PenIcon", file: "components/icons/static/design.tsx", description: "Pen / write.", tags: ["design", "action"], badge: "new" },
      { slug: "pen-tool", name: "Pen Tool", componentName: "PenToolIcon", file: "components/icons/static/design.tsx", description: "Vector pen tool.", tags: ["design", "developer"], badge: "new" },
      { slug: "paintbrush", name: "Paintbrush", componentName: "PaintbrushIcon", file: "components/icons/static/design.tsx", description: "Paintbrush.", tags: ["design", "art"], badge: "new" },
      { slug: "palette", name: "Palette", componentName: "PaletteIcon", file: "components/icons/static/design.tsx", description: "Color palette.", tags: ["design", "art"], badge: "new" },
      { slug: "eraser", name: "Eraser", componentName: "EraserIcon", file: "components/icons/static/design.tsx", description: "Eraser / delete.", tags: ["design", "action"], badge: "new" },
      { slug: "ruler", name: "Ruler", componentName: "RulerIcon", file: "components/icons/static/design.tsx", description: "Ruler / measure.", tags: ["design", "measure"], badge: "new" },
      { slug: "scissors", name: "Scissors", componentName: "ScissorsIcon", file: "components/icons/static/design.tsx", description: "Scissors / cut.", tags: ["design", "action"], badge: "new" },
      { slug: "paperclip", name: "Paperclip", componentName: "PaperclipIcon", file: "components/icons/static/design.tsx", description: "Paperclip / attach.", tags: ["design", "action", "file"], badge: "new" },
      { slug: "magnet", name: "Magnet", componentName: "MagnetIcon", file: "components/icons/static/design.tsx", description: "Magnet / attract.", tags: ["design", "action"], badge: "new" },
      { slug: "scale", name: "Scale", componentName: "ScaleIcon", file: "components/icons/static/design.tsx", description: "Balance scale / justice.", tags: ["design", "misc"], badge: "new" },
      { slug: "wand", name: "Magic Wand", componentName: "WandIcon", file: "components/icons/static/design.tsx", description: "Magic wand / generate.", tags: ["design", "ai", "action"], badge: "new" },
      /* ── Map & Weather ── */
      { slug: "map", name: "Map", componentName: "MapIcon", file: "components/icons/static/map.tsx", description: "Folded map.", tags: ["map", "navigation"], badge: "new" },
      { slug: "map-pin", name: "Map Pin", componentName: "MapPinIcon", file: "components/icons/static/map.tsx", description: "Location pin.", tags: ["map", "navigation"], badge: "new" },
      { slug: "navigation", name: "Navigation", componentName: "NavigationIcon", file: "components/icons/static/map.tsx", description: "Navigation arrow.", tags: ["map", "navigation"], badge: "new" },
      { slug: "compass", name: "Compass", componentName: "CompassIcon", file: "components/icons/static/map.tsx", description: "Compass / direction.", tags: ["map", "navigation"], badge: "new" },
      { slug: "thermometer", name: "Thermometer", componentName: "ThermometerIcon", file: "components/icons/static/map.tsx", description: "Temperature thermometer.", tags: ["map", "weather"], badge: "new" },
      { slug: "droplets", name: "Droplets", componentName: "DropletsIcon", file: "components/icons/static/map.tsx", description: "Water droplets / humidity.", tags: ["map", "weather"], badge: "new" },
      { slug: "cloud-rain", name: "Cloud Rain", componentName: "CloudRainIcon", file: "components/icons/static/map.tsx", description: "Rain cloud.", tags: ["map", "weather"], badge: "new" },
      { slug: "wind", name: "Wind", componentName: "WindIcon", file: "components/icons/static/map.tsx", description: "Wind / breeze.", tags: ["map", "weather"], badge: "new" },
      { slug: "umbrella", name: "Umbrella", componentName: "UmbrellaIcon", file: "components/icons/static/map.tsx", description: "Umbrella / rain.", tags: ["map", "weather"], badge: "new" },
    ],
  },
  {
    slug: "animated",
    name: "Animated Icons",
    description: "Motion-powered icons built with Framer Motion. Hover to preview — drop them in and they animate out of the box.",
    icons: [
      { slug: "spinner", name: "Spinner", componentName: "SpinnerIcon", file: "components/icons/animated/spinner.tsx", description: "Continuous rotation loading.", tags: ["loading", "status"], badge: "new" },
      { slug: "check-animated", name: "Animated Check", componentName: "CheckAnimatedIcon", file: "components/icons/animated/check.tsx", description: "Checkmark draws itself in.", tags: ["status", "feedback"], badge: "new" },
      { slug: "bell-animated", name: "Ringing Bell", componentName: "BellAnimatedIcon", file: "components/icons/animated/bell.tsx", description: "Bell shakes on notification.", tags: ["notification", "feedback"], badge: "new" },
      { slug: "heart-animated", name: "Heart", componentName: "HeartIcon", file: "components/icons/animated/heart.tsx", description: "Heart pulses — great for likes.", tags: ["social", "feedback"], badge: "new" },
      { slug: "star-animated", name: "Star", componentName: "StarAnimatedIcon", file: "components/icons/animated/star.tsx", description: "Star fills and scales.", tags: ["feedback", "rating"], badge: "new" },
      { slug: "menu-close", name: "Menu → Close", componentName: "MenuCloseIcon", file: "components/icons/animated/menu-close.tsx", description: "Hamburger morphs into X.", tags: ["navigation", "interface"], badge: "new" },
      { slug: "download-animated", name: "Download", componentName: "DownloadAnimatedIcon", file: "components/icons/animated/download.tsx", description: "Arrow bounces on download.", tags: ["action", "file"], badge: "new" },
      { slug: "refresh", name: "Refresh", componentName: "RefreshIcon", file: "components/icons/animated/refresh.tsx", description: "Circular arrows spin.", tags: ["action", "loading"], badge: "new" },
      { slug: "loading-dots", name: "Loading Dots", componentName: "LoadingDotsIcon", file: "components/icons/animated/loading-dots.tsx", description: "Three dots stagger-bounce.", tags: ["loading", "status"], badge: "new" },
      { slug: "trash-animated", name: "Trash", componentName: "TrashAnimatedIcon", file: "components/icons/animated/trash.tsx", description: "Trash shakes before deletion.", tags: ["action", "destructive"], badge: "new" },
      { slug: "thumbs-up-animated", name: "Thumbs Up", componentName: "ThumbsUpAnimatedIcon", file: "components/icons/animated/thumbs-up.tsx", description: "Thumb bounces up on like.", tags: ["feedback", "social"], badge: "new" },
      { slug: "send-animated", name: "Send", componentName: "SendAnimatedIcon", file: "components/icons/animated/send.tsx", description: "Paper plane flies on send.", tags: ["communication", "action"], badge: "new" },
      { slug: "eye-blink", name: "Eye Blink", componentName: "EyeBlinkIcon", file: "components/icons/animated/eye-blink.tsx", description: "Eye blinks on hover.", tags: ["interface", "feedback"], badge: "new" },
      { slug: "lock-animated", name: "Lock", componentName: "LockAnimatedIcon", file: "components/icons/animated/lock.tsx", description: "Shackle lifts to unlock.", tags: ["security", "auth"], badge: "new" },
      { slug: "alert-pulse", name: "Alert Pulse", componentName: "AlertPulseIcon", file: "components/icons/animated/alert-pulse.tsx", description: "Alert circle ripples.", tags: ["status", "notification"], badge: "new" },
      { slug: "cloud-upload", name: "Cloud Upload", componentName: "CloudUploadIcon", file: "components/icons/animated/cloud-upload.tsx", description: "Arrow bounces up into cloud.", tags: ["file", "action"], badge: "new" },
      { slug: "bookmark-animated", name: "Bookmark", componentName: "BookmarkAnimatedIcon", file: "components/icons/animated/bookmark.tsx", description: "Bookmark fills on save.", tags: ["interface", "action"], badge: "new" },
      { slug: "toggle", name: "Toggle", componentName: "ToggleIcon", file: "components/icons/animated/toggle.tsx", description: "Switch knob slides left / right.", tags: ["interface", "form"], badge: "new" },
      { slug: "progress", name: "Progress", componentName: "ProgressIcon", file: "components/icons/animated/progress.tsx", description: "Circle arc fills as progress.", tags: ["loading", "status"], badge: "new" },
      { slug: "typing-indicator", name: "Typing Indicator", componentName: "TypingIndicatorIcon", file: "components/icons/animated/typing-indicator.tsx", description: "Chat bubble with bouncing dots.", tags: ["communication", "loading"], badge: "new" },
      { slug: "pulse-dot", name: "Pulse Dot", componentName: "PulseDotIcon", file: "components/icons/animated/pulse-dot.tsx", description: "Dot with expanding ring pulse.", tags: ["status", "notification"], badge: "new" },
      { slug: "rocket", name: "Rocket", componentName: "RocketIcon", file: "components/icons/animated/rocket.tsx", description: "Rocket launches on hover.", tags: ["misc", "action"], badge: "new" },
      { slug: "volume-wave", name: "Volume Wave", componentName: "VolumeWaveIcon", file: "components/icons/animated/volume-wave.tsx", description: "Speaker waves pulse.", tags: ["media", "audio"], badge: "new" },
      { slug: "magnet-animated", name: "Magnet", componentName: "MagnetAnimatedIcon", file: "components/icons/animated/magnet.tsx", description: "Magnet shakes to attract.", tags: ["misc", "action"], badge: "new" },
      { slug: "sparkle", name: "Sparkle", componentName: "SparkleIcon", file: "components/icons/animated/sparkle.tsx", description: "Stars burst and twinkle.", tags: ["misc", "feedback", "ai"], badge: "new" },
      { slug: "chevron-down-animated", name: "Chevron Down", componentName: "ChevronDownAnimatedIcon", file: "components/icons/animated/chevron-down.tsx", description: "Chevron drops and flips open.", tags: ["interface", "navigation"], badge: "new" },
      { slug: "search-animated", name: "Search", componentName: "SearchAnimatedIcon", file: "components/icons/animated/search.tsx", description: "Lens zooms in on hover.", tags: ["interface", "input"], badge: "new" },
      { slug: "settings-gear-animated", name: "Settings Gear", componentName: "SettingsGearAnimatedIcon", file: "components/icons/animated/settings-gear.tsx", description: "Gear spins into place.", tags: ["interface", "system"], badge: "new" },
      { slug: "copy-animated", name: "Copy", componentName: "CopyAnimatedIcon", file: "components/icons/animated/copy.tsx", description: "Back sheet slides out on copy.", tags: ["action", "file"], badge: "new" },
      { slug: "edit-pencil-animated", name: "Edit Pencil", componentName: "EditPencilAnimatedIcon", file: "components/icons/animated/edit-pencil.tsx", description: "Pencil tilts as if writing.", tags: ["action", "interface"], badge: "new" },
      { slug: "plus-minus-animated", name: "Plus / Minus", componentName: "PlusMinusAnimatedIcon", file: "components/icons/animated/plus-minus.tsx", description: "Plus rotates into a minus.", tags: ["interface", "action"], badge: "new" },
      { slug: "sun-moon-animated", name: "Sun / Moon", componentName: "SunMoonAnimatedIcon", file: "components/icons/animated/sun-moon.tsx", description: "Sun rotates and rays fade for dark mode.", tags: ["interface", "theme"], badge: "new" },
      { slug: "arrow-right-slide", name: "Arrow Right", componentName: "ArrowRightSlideAnimatedIcon", file: "components/icons/animated/arrow-right-slide.tsx", description: "Arrow slides forward on hover.", tags: ["arrow", "navigation"], badge: "new" },
    ],
  },
];

export function findIcon(slug: string): IconEntry | undefined {
  for (const cat of iconsRegistry) {
    const found = cat.icons.find((i) => i.slug === slug);
    if (found) return found;
  }
}

export function findIconCategory(slug: string): IconCategoryEntry | undefined {
  return iconsRegistry.find((c) => c.slug === slug);
}
