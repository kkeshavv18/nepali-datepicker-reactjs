import React, { useState, useEffect, useRef } from "react";
import "../styles/NepaliDatePicker.css"; // Import your CSS styles
import type { DateObject, NepaliDatePickerProps } from "../types/types";
import { getInitialDate } from "../utils/getInitialDate";
import { getDayOfWeekForBsDate } from "../utils/getDayOfWeekForBsDate";
import { MAX_YEAR, MIN_YEAR } from "../constants/bsMonthData";
import { normalizeDateFormat } from "../utils/normalizeDateFormat";
import { getDaysInMonthNepali } from "../utils/getDaysInMonthNepali";
import {
  ENGLISH_WEEKDAYS,
  NEPALI_MONTHS,
  NEPALI_WEEKDAYS,
} from "../constants/monthsAndDays";

export const NepaliDatePicker: React.FC<NepaliDatePickerProps> = ({
  initialDate,
  onDateChange,
  closeOnSelect = true,
  bgColor = "#fff",
  textColor = "#374151",
  width = "200px",
  height = "auto",
  helperText = "",
  helperTextColor = "#374151",
  helperTextFontSize = "14px",
  selectedDayBgColor = "#3b82f6",
  selectedDayColor = "#fff",
  dayLanguage = "nep",
  borderRadius = " 0.375rem",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);
  const [currentDate, setCurrentDate] = useState<DateObject>(
    getInitialDate(initialDate)
  );
  const datepickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialDateObject = initialDate ? getInitialDate(initialDate) : null;

  // Calculate navigation arrow size based on width prop
  const widthValue = parseInt(width, 10) || 200; // Fallback to 200px
  const arrowSize = widthValue / 8; // Proportional to width

  function getFirstDayOfMonth(year: number, monthIndex: number): number {
    return getDayOfWeekForBsDate(year, monthIndex, 1);
  }

  const handlePreviousMonth = () => {
    setCurrentDate((prev) => {
      if (prev.month === 0) {
        const newYear = prev.year - 1;
        if (newYear >= MIN_YEAR) {
          return { year: newYear, month: 11, day: 1 };
        }
        return prev;
      } else {
        return { ...prev, month: prev.month - 1, day: 1 };
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      if (prev.month === 11) {
        const newYear = prev.year + 1;
        if (newYear <= MAX_YEAR) {
          return { year: newYear, month: 0, day: 1 };
        }
        return prev;
      } else {
        return { ...prev, month: prev.month + 1, day: 1 };
      }
    });
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate((prev) => ({
      ...prev,
      year: parseInt(event.target.value, 10),
      day: 1,
    }));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate((prev) => ({
      ...prev,
      month: parseInt(event.target.value, 10),
      day: 1,
    }));
  };

  const selectDate = (year: number, month: number, day: number) => {
    setSelectedDate({ year, month, day });
    setCurrentDate({ year, month, day: 1 });
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      datepickerRef.current &&
      !datepickerRef.current.contains(event.target as Node) &&
      inputRef.current !== event.target
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    if (initialDate) {
      const [year, month, day] = initialDate.split("-").map(Number);
      setSelectedDate({ year, month: month - 1, day });
      setCurrentDate(getInitialDate(initialDate));
    } else {
      throw new Error("Initial date is not provided");
    }
  }, [initialDate]);

  useEffect(() => {
    if (selectedDate && onDateChange) {
      onDateChange(
        normalizeDateFormat(
          `${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`
        )
      );
    }
    if (selectedDate && inputRef.current) {
      inputRef.current.value = normalizeDateFormat(
        `${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`
      );
    }
  }, [selectedDate]);

  // Component responsible for rendering the days of the month
  const renderDays = () => {
    const days: React.ReactElement[] = [];
    const daysInMonth = getDaysInMonthNepali(
      currentDate.year,
      currentDate.month
    );
    const firstDay = getFirstDayOfMonth(currentDate.year, currentDate.month);

    // Calculate previous and next month/year for boundary days
    let prevMonth = currentDate.month - 1;
    let prevYear = currentDate.year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear = currentDate.year - 1;
    }
    let nextMonth = currentDate.month + 1;
    let nextYear = currentDate.year;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear = currentDate.year + 1;
    }

    // Get days in previous month
    const daysInPrevMonth =
      prevYear >= MIN_YEAR ? getDaysInMonthNepali(prevYear, prevMonth) : 0;

    // Fill days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      if (prevYear >= MIN_YEAR) {
        const isSelected =
          selectedDate?.year === prevYear &&
          selectedDate?.month === prevMonth &&
          selectedDate?.day === day;
        const isInitial =
          initialDateObject?.year === prevYear &&
          initialDateObject?.month === prevMonth &&
          initialDateObject?.day === day;
        days.push(
          <div
            key={`prev-${day}`}
            style={{
              backgroundColor: isSelected ? selectedDayBgColor : "transparent",
              color: isSelected ? selectedDayColor : "gray",
              border: isInitial ? `1px solid ${selectedDayBgColor}` : "none",
            }}
            className={`day ${isInitial ? "initial" : ""}`}
            onClick={() => selectDate(prevYear, prevMonth, day)}
          >
            {day}
          </div>
        );
      } else {
        days.push(<div key={`empty-prev-${i}`} className="day empty"></div>);
      }
    }

    // Fill days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate?.year === currentDate.year &&
        selectedDate?.month === currentDate.month &&
        selectedDate?.day === day;
      const isInitial =
        initialDateObject?.year === currentDate.year &&
        initialDateObject?.month === currentDate.month &&
        initialDateObject?.day === day;
      days.push(
        <div
          key={day}
          style={{
            backgroundColor: isSelected ? selectedDayBgColor : "transparent",
            color: isSelected ? selectedDayColor : "#374151",
            border: isInitial ? `1px solid ${selectedDayBgColor}` : "none",
          }}
          className={` day ${isInitial ? "initial" : ""}`}
          onClick={() => selectDate(currentDate.year, currentDate.month, day)}
        >
          {day}
        </div>
      );
    }

    // Fill remaining days from next month
    const totalDaysSoFar = firstDay + daysInMonth;
    const remainingDays = 42 - totalDaysSoFar; // 6 rows * 7 columns = 42 cells
    for (let day = 1; day <= remainingDays; day++) {
      if (nextYear <= MAX_YEAR) {
        const isSelected =
          selectedDate?.year === nextYear &&
          selectedDate?.month === nextMonth &&
          selectedDate?.day === day;
        const isInitial =
          initialDateObject?.year === nextYear &&
          initialDateObject?.month === nextMonth &&
          initialDateObject?.day === day;
        days.push(
          <div
            key={`next-${day}`}
            style={{
              backgroundColor: isSelected ? selectedDayBgColor : "transparent",
              color: isSelected ? selectedDayColor : "gray",
              border: isInitial ? `1px solid ${selectedDayBgColor}` : "none",
            }}
            className={`day  ${isInitial ? "initial" : ""}`}
            onClick={() => selectDate(nextYear, nextMonth, day)}
          >
            {day}
          </div>
        );
      } else {
        days.push(<div key={`empty-next-${day}`} className="day empty"></div>);
      }
    }

    return <div className="days-grid">{days}</div>;
  };
  //render days component ends here

  const yearOptions: React.ReactElement[] = [];
  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  const monthOptions = NEPALI_MONTHS.map((month, index) => (
    <option key={index} value={index}>
      {month}
    </option>
  ));

  return (
    <div className="nepali-datepicker-container" ref={datepickerRef}>
      {helperText && (
        <div style={{ color: helperTextColor, fontSize: helperTextFontSize }}>
          {helperText}
        </div>
      )}
      <input
        ref={inputRef}
        type="text"
        className="date-input"
        value={
          selectedDate
            ? normalizeDateFormat(
                `${selectedDate.year}-${selectedDate.month + 1}-${
                  selectedDate.day
                }`
              )
            : "Select a date"
        }
        onClick={() => setIsOpen(!isOpen)}
        readOnly
        style={{
          borderRadius: borderRadius,
          backgroundColor: bgColor,
          color: textColor,
          width: width,
          height: height,
        }}
      />
      {isOpen && (
        <div className="datepicker-modal" style={{ width: width }}>
          <div className="controls">
            <button
              style={{
                width: `${arrowSize}px`,
              }}
              className="arrow-button"
              onClick={handlePreviousMonth}
            >
              &lt;
            </button>
            <select
              className="modern-dropdown"
              value={currentDate.year}
              onChange={handleYearChange}
            >
              {yearOptions}
            </select>
            <select
              className="modern-dropdown"
              value={currentDate.month}
              onChange={handleMonthChange}
            >
              {monthOptions}
            </select>
            <button
              style={{
                width: `${arrowSize}px`,
              }}
              className="arrow-button"
              onClick={handleNextMonth}
            >
              &gt;
            </button>
          </div>
          <div className="weekdays">
            {dayLanguage === "nep"
              ? NEPALI_WEEKDAYS.map((day) => <div key={day}>{day}</div>)
              : ENGLISH_WEEKDAYS.map((day) => <div key={day}>{day}</div>)}
          </div>
          {renderDays()}
        </div>
      )}
    </div>
  );
};
