export interface OpeningHourRule {
  label: string;
  /** Short weekday names matching Intl.DateTimeFormat("en-GB", { weekday: "short" }) */
  days: readonly string[];
  open: string;
  close: string;
}

export const SITE_CONFIG = {
  entityName: "Luminex Logistics Ltd.",
  registrationNumber: "CS120930824",
  tin: "C0064381064",
  address: "H302 Sowah Larbi Ave, Accra, Ghana",
  email: "luminexlogisticsltd@gmail.com",
  timezone: "Africa/Accra",
  desks: {
    bookings: {
      label: "Bookings & Dispatch",
      role: "Head of Operations",
      display: "+233 54 597 5896",
      tel: "+233545975896",
      wa: "233545975896",
    },
    customerRelations: {
      label: "Support & Refunds",
      role: "Customer Relations Office",
      display: "+233 59 646 4461",
      tel: "+233596464461",
      wa: "233596464461",
    },
  },
  hours: [
    {
      label: "Mon–Fri",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      open: "08:00",
      close: "18:00",
    },
    {
      label: "Sat",
      days: ["Sat"],
      open: "09:00",
      close: "13:00",
    },
  ] as readonly OpeningHourRule[],
} as const;

const WEEKDAYS_ORDER = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Computes live open/closed office status directly from `SITE_CONFIG.hours`
 * in the configured Accra timezone so schedule changes stay synchronized.
 */
export function getAccraHoursStatus(now: Date = new Date()): {
  isOpen: boolean;
  label: string;
} {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: SITE_CONFIG.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 12);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const mins = hour * 60 + minute;

  const todayRule = SITE_CONFIG.hours.find((rule) =>
    rule.days.includes(weekday)
  );

  if (todayRule) {
    const openMins = toMinutes(todayRule.open);
    const closeMins = toMinutes(todayRule.close);

    if (mins >= openMins && mins < closeMins) {
      return {
        isOpen: true,
        label: `Open now · Closes ${todayRule.close} GMT`,
      };
    }

    if (mins < openMins) {
      return {
        isOpen: false,
        label: `Closed · Opens ${todayRule.open} GMT`,
      };
    }
  }

  // Find the next scheduled operating day
  const startIdx = WEEKDAYS_ORDER.indexOf(
    weekday as (typeof WEEKDAYS_ORDER)[number]
  );
  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = WEEKDAYS_ORDER[(startIdx + offset) % 7];
    const nextRule = SITE_CONFIG.hours.find((rule) =>
      rule.days.includes(nextDay)
    );
    if (nextRule) {
      return {
        isOpen: false,
        label: `Closed · Opens ${nextDay} ${nextRule.open} GMT`,
      };
    }
  }

  return { isOpen: false, label: "Closed" };
}
