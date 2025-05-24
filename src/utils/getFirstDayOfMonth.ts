import { getDayOfWeekForBsDate } from "./getDayOfWeekForBsDate";

export const getFirstDayOfMonth = (
  year: number,
  monthIndex: number
): number => {
  return getDayOfWeekForBsDate(year, monthIndex, 1);
};
