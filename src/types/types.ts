export interface DateObject {
  year: number;
  month: number;
  day: number;
}

export interface NepaliDatePickerProps {
  initialDate: string | null; // YYYY-MM-DD (BS)
  onDateChange: (date: string) => void;
  closeOnSelect?: boolean;
  bgColor?: string;
  textColor?: string;
  width?: string;
  height?: string;
  helperText?: string;
  helperTextColor?: string;
  helperTextFontSize?: string;
  selectedDayBgColor?: string;
  selectedDayColor?: string;
  dayLanguage?: "nep" | "eng";
  borderRadius?: string;
}
