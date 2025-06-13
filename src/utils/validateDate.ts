import { MAX_YEAR, MIN_YEAR } from "../constants/bsMonthData";
import type { DateObject } from "../types/types";
import { getDaysInMonthNepali } from "./getDaysInMonthNepali";

export const validateDate = (value: string): DateObject | null => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    if (
      year >= MIN_YEAR &&
      year <= MAX_YEAR &&
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= getDaysInMonthNepali(year, month - 1)
    ) {
      return { year, month: month - 1, day };
    }
  }
  return null;
};
