import { BS_MONTHS_DATA, MIN_YEAR } from "../constants/bsMonthData";

// Get the number of days in a specific month of a specific year in the Nepali calendar
export const getDaysInMonthNepali = (
  year: number,
  monthIndex: number
): number => {
  const yearIndexInData = year - MIN_YEAR;
  if (yearIndexInData >= 0 && yearIndexInData < BS_MONTHS_DATA.length) {
    return BS_MONTHS_DATA[yearIndexInData][monthIndex];
  }
  throw new Error(
    `Year ${year} is out of range. Supported range is ${MIN_YEAR} to ${
      MIN_YEAR + BS_MONTHS_DATA.length - 1
    }`
  );
};
