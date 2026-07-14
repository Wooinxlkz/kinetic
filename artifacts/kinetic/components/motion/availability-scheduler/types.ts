export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type TimeRange = { id: string; start: string; end: string };
export type DayAvailability = { enabled: boolean; ranges: TimeRange[] };
export type WeekAvailability = Record<DayKey, DayAvailability>;
export type TimeOption = { value: string; label: string };

export const WEEKDAYS: { key: DayKey; label: string; short: string }[] = [
  { key: "mon", label: "Monday",    short: "Mon" },
  { key: "tue", label: "Tuesday",   short: "Tue" },
  { key: "wed", label: "Wednesday", short: "Wed" },
  { key: "thu", label: "Thursday",  short: "Thu" },
  { key: "fri", label: "Friday",    short: "Fri" },
  { key: "sat", label: "Saturday",  short: "Sat" },
  { key: "sun", label: "Sunday",    short: "Sun" },
];

export const WEEKEND_KEYS: DayKey[] = ["sat", "sun"];
export const WEEKDAY_KEYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri"];

// ─── time helpers ─────────────────────────────────────────────────────────────

export const toMinutes = (v: string) => {
  const [h, m] = v.split(":").map(Number);
  return h * 60 + m;
};

export const toValue = (mins: number) => {
  const clamped = Math.max(0, Math.min(24 * 60 - 1, mins));
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export const label12 = (v: string) => {
  const [h, m] = v.split(":").map(Number);
  const ap = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ap}`;
};

export function buildOptions(step: number): TimeOption[] {
  const out: TimeOption[] = [];
  for (let m = 0; m < 24 * 60; m += step) {
    const value = toValue(m);
    out.push({ value, label: label12(value) });
  }
  return out;
}

/** Total scheduled hours for a single day. */
export function dayHours(state: DayAvailability): number {
  if (!state.enabled) return 0;
  return state.ranges.reduce((acc, r) => {
    const mins = Math.max(0, toMinutes(r.end) - toMinutes(r.start));
    return acc + mins / 60;
  }, 0);
}

// Default: Mon–Fri 9–5, weekends off.
export function defaultWeek(): WeekAvailability {
  const workday = (day: DayKey): DayAvailability => ({
    enabled: true,
    ranges: [{ id: `${day}-0`, start: "09:00", end: "17:00" }],
  });
  const off = (day: DayKey): DayAvailability => ({
    enabled: false,
    ranges: [{ id: `${day}-0`, start: "09:00", end: "17:00" }],
  });
  return {
    mon: workday("mon"),
    tue: workday("tue"),
    wed: workday("wed"),
    thu: workday("thu"),
    fri: workday("fri"),
    sat: off("sat"),
    sun: off("sun"),
  };
}

export function everydayWeek(): WeekAvailability {
  const all = (day: DayKey): DayAvailability => ({
    enabled: true,
    ranges: [{ id: `${day}-0`, start: "09:00", end: "17:00" }],
  });
  return {
    mon: all("mon"), tue: all("tue"), wed: all("wed"), thu: all("thu"),
    fri: all("fri"), sat: all("sat"), sun: all("sun"),
  };
}

export function weekendsWeek(): WeekAvailability {
  const off = (day: DayKey): DayAvailability => ({
    enabled: false,
    ranges: [{ id: `${day}-0`, start: "09:00", end: "17:00" }],
  });
  const on = (day: DayKey): DayAvailability => ({
    enabled: true,
    ranges: [{ id: `${day}-0`, start: "10:00", end: "18:00" }],
  });
  return {
    mon: off("mon"), tue: off("tue"), wed: off("wed"), thu: off("thu"),
    fri: off("fri"), sat: on("sat"), sun: on("sun"),
  };
}

export function clearWeek(): WeekAvailability {
  const off = (day: DayKey): DayAvailability => ({
    enabled: false,
    ranges: [{ id: `${day}-0`, start: "09:00", end: "17:00" }],
  });
  return {
    mon: off("mon"), tue: off("tue"), wed: off("wed"), thu: off("thu"),
    fri: off("fri"), sat: off("sat"), sun: off("sun"),
  };
}
