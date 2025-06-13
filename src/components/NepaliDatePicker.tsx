import React, { useState, useEffect, useRef } from "react";
import "../styles/NepaliDatePicker.css";
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
import { validateDate } from "../utils/validateDate";

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
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(
    initialDate ? getInitialDate(initialDate) : null
  );

  const [currentDate, setCurrentDate] = useState<DateObject>(
    initialDate
      ? getInitialDate(initialDate)
      : { year: MIN_YEAR, month: 0, day: 1 }
  );
  const [inputValue, setInputValue] = useState<string>(
    initialDate ? normalizeDateFormat(initialDate) : ""
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
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
    const newDate = { year, month, day };
    setSelectedDate(newDate);
    setCurrentDate(newDate);
    const formattedDate = normalizeDateFormat(`${year}-${month + 1}-${day}`);
    setInputValue(formattedDate); // Sync inputValue with selected date
    setErrorMessage("");
    onDateChange?.(formattedDate);
    closeOnSelect && setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      datepickerRef.current &&
      !datepickerRef.current.contains(event.target as Node) &&
      inputRef.current !== event.target
    ) {
      setIsOpen(false);
      // If inputValue is non-empty, validate it and update selectedDate/currentDate
      if (inputValue) {
        const validDate = validateDate(inputValue);
        if (validDate) {
          setSelectedDate(validDate);
          setCurrentDate(validDate);
          setErrorMessage("");
          onDateChange?.(
            normalizeDateFormat(
              `${validDate.year}-${validDate.month + 1}-${validDate.day}`
            )
          );
        } else {
          setErrorMessage("Invalid date.");
        }
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    // Added inputValue, selectedDate to dependencies to ensure handleOutsideClick
    // uses the latest values when it's re-bound.
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, inputValue, selectedDate]);

  useEffect(() => {
    if (initialDate) {
      const dateObject = getInitialDate(initialDate);
      setSelectedDate(dateObject);
      setCurrentDate(dateObject); // Also set currentDate from initialDate
      setInputValue(normalizeDateFormat(initialDate));
    }
  }, [initialDate]);

  const handleInputClick = () => {
    // When the input is clicked and the modal is currently closed (about to open)
    if (!isOpen) {
      if (selectedDate) {
        // If a date is already selected, make sure currentDate matches it
        setCurrentDate(selectedDate);
      } else if (inputValue) {
        // If no date is selected but there's a valid input value, parse it
        const validDate = validateDate(inputValue);
        if (validDate) {
          setCurrentDate(validDate);
        } else {
          // If input is invalid, default to MIN_YEAR
          setCurrentDate({ year: MIN_YEAR, month: 0, day: 1 });
        }
      } else {
        // If no selectedDate and no valid inputValue, default to MIN_YEAR
        setCurrentDate({ year: MIN_YEAR, month: 0, day: 1 });
      }
    }
    // Toggle the modal's open state
    setIsOpen((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setErrorMessage("");
    if (!value) {
      setIsOpen(false);
      return;
    }
    const validDate = validateDate(value);
    if (validDate) {
      setSelectedDate(validDate);
      setCurrentDate(validDate); // Update currentDate when input becomes valid
      setIsOpen(false);
      onDateChange?.(
        normalizeDateFormat(
          `${validDate.year}-${validDate.month + 1}-${validDate.day}`
        )
      );
    }
    // If input is invalid, we don't change selectedDate/currentDate here,
    // the errorMessage will guide the user.
  };

  const handleInputBlur = () => {
    if (inputValue) {
      const validDate = validateDate(inputValue);
      if (validDate) {
        setSelectedDate(validDate);
        setCurrentDate(validDate); // Update currentDate on blur if valid
        setErrorMessage("");
        if (onDateChange) {
          onDateChange(
            normalizeDateFormat(
              `${validDate.year}-${validDate.month + 1}-${validDate.day}`
            )
          );
        }
      } else {
        setErrorMessage("Invalid date.");
      }
    } else if (selectedDate) {
      // If input is cleared on blur, but a date was previously selected, restore input value
      setInputValue(
        normalizeDateFormat(
          `${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`
        )
      );
      setErrorMessage("");
    }
  };

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
            key={`prev-${prevYear}-${prevMonth}-${day}`}
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

    // Render days for the current month
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
          key={`current-${currentDate.year}-${currentDate.month}-${day}`}
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
            key={`next-${nextYear}-${nextMonth}-${day}`}
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
        value={inputValue}
        onClick={handleInputClick}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder="YYYY-MM-DD"
        style={{
          borderRadius: borderRadius,
          backgroundColor: bgColor,
          color: textColor,
          width: width,
          height: height,
          border: errorMessage ? "1px solid red" : "",
        }}
      />
      {errorMessage && (
        <div
          style={{
            color: "red",
            fontSize: helperTextFontSize,
            marginTop: "4px",
          }}
        >
          {errorMessage}
        </div>
      )}
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
