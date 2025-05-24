import type { DateObject } from "../types/types";

export const getInitialDate = (initial?: string | null): DateObject => {
  if (initial) {
    const [year, month, day] = initial.split("-").map(Number);
    return { year, month: month - 1, day };
  }
  throw new Error("Initial date is not provided ");
};
