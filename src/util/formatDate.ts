import { format, addHours } from "date-fns";
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
