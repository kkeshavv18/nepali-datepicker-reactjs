// Normalize the date format - YYYY-MM-DD
export const normalizeDateFormat = (date: string): string => {
  // Splits the string by the hyphen - into an array and Converts each string in the array to a number:
  const [year, month, day] = date.split("-").map(Number);
  const normalizedMonth = month < 10 ? `0${month}` : `${month}`;
  const normalizedDay = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${normalizedMonth}-${normalizedDay}`;
};
