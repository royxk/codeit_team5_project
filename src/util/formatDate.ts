import { format, addHours, addMinutes } from "date-fns";
export function formatApiDateData(
  startsAt: string,
  workhour: number,
): string[] {
  const start = new Date(startsAt);
  const end = addHours(start, workhour);

  const formattedDate = format(start, "yyyy-MM-dd");
  const formattedStartTime = format(start, "HH:mm");
  const formattedEndTime = format(end, "HH:mm");

  return [
    `${formattedDate}`,
    `${formattedStartTime}~${formattedEndTime} (${workhour}시간)`,
  ];
}

export function getCurrentDate() {
  const now = new Date();
  const formattedDate = format(now, "yyyy-MM-dd");
  return formattedDate;
}

export function getCurrentRFC3339DateTime() {
  const fiveMinutesLater = addMinutes(new Date(), 5);
  const rfc3339DateTime = format(fiveMinutesLater, "yyyy-MM-dd'T'HH:mm:ssXXX");
  return rfc3339DateTime;
}
