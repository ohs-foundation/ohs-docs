const utcDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const utcDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "UTC",
  timeZoneName: "short",
});

/** Formats a timestamp (epoch ms, ISO string, or Date) in deterministic UTC labels. */
export function formatLastUpdated(timestamp) {
  if (timestamp === null || timestamp === undefined || timestamp === "") {
    return null;
  }
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return {
    iso: date.toISOString(),
    dateLabel: utcDateFormatter.format(date),
    dateTimeLabel: utcDateTimeFormatter.format(date),
  };
}
