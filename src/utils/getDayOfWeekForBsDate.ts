// Get the day of the week for a specific Nepali date

import {
  BS_MONTHS_DATA,
  MIN_YEAR,
  MIN_YEAR_BAISAKH_1_DAY_OF_WEEK,
} from "../constants/bsMonthData";

// Returns 0 for Sunday, 1 for Monday, ..., 6 for Saturday
export const getDayOfWeekForBsDate = (
  year: number,
  month: number,
  day: number
): number => {
  let totalDays = 0;

  // This for loop calculate total days from the start of the Nepali calendar(MIN_YEAR)
  //  to the one year before the given year and store the vallue in totalDays
  for (let y = MIN_YEAR; y < year; y++) {
    const yearIndex = y - MIN_YEAR;
    if (yearIndex >= 0 && yearIndex < BS_MONTHS_DATA.length) {
      totalDays += BS_MONTHS_DATA[yearIndex].reduce(
        (sum, days) => sum + days,
        0
      );
    } else {
      throw new Error(
        `Year ${y} is out of range. Supported range is ${MIN_YEAR} to ${
          MIN_YEAR + BS_MONTHS_DATA.length - 1
        }`
      );
    }
  }
  const currentYearIndex = year - MIN_YEAR;
  if (currentYearIndex >= 0 && currentYearIndex < BS_MONTHS_DATA.length) {
    // Add days for the months in the current year up to the previous month
    for (let m = 0; m < month; m++) {
      totalDays += BS_MONTHS_DATA[currentYearIndex][m];
    }
  } else {
    throw new Error(
      `Year ${year} is out of range. Supported range is ${MIN_YEAR} to ${
        MIN_YEAR + BS_MONTHS_DATA.length - 1
      }`
    );
  }

  // Add days for the current month (up to the previous day of given day)
  totalDays += day - 1;
  return (MIN_YEAR_BAISAKH_1_DAY_OF_WEEK + totalDays) % 7;
};
