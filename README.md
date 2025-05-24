# Nepali DatePicker Component

A React component for selecting dates in the Nepali (Bikram Sambat) calendar system, supporting years 2001-2099 BS.

## Installation

```bash
npm install @kkeshavv18/nepali-datepicker-reactjs
```

## Demo
![image](https://github.com/user-attachments/assets/595f5385-6edc-47f9-9626-3271dd2e3870)


## Basic Usage

```jsx
import React, { useState } from "react";
import { NepaliDatePicker } from "@kkeshavv18/nepali-datepicker-reactjs";
import "@kkeshavv18/nepali-datepicker-reactjs/dist/index.css";

function App() {
  const [selectedDate, setSelectedDate] = useState("2081-01-15");

  return (
    <NepaliDatePicker
      initialDate={selectedDate}
      onDateChange={(date) => setSelectedDate(date)}
    />
  );
}
```

## Props

### Required Props

| Prop           | Type                     | Description                                                                        |
| -------------- | ------------------------ | ---------------------------------------------------------------------------------- |
| `initialDate`  | `string \| null`         | Initial date in YYYY-MM-DD format (Bikram Sambat). Example: `"2081-03-15"`         |
| `onDateChange` | `(date: string) => string` | Callback function called when date is selected. Receives date in YYYY-MM-DD format |

### Optional Props

#### Behavior Props

| Prop            | Type             | Default | Description                                                                                                 |
| --------------- | ---------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `closeOnSelect` | `boolean`        | `true`  | Whether to close the datepicker automatically after selecting a date                                        |
| `dayLanguage`   | `"nep" \| "eng"` | `"nep"` | Language for weekday headers. `"nep"` shows Nepali (आइत, सोम, etc.), `"eng"` shows English (Sun, Mon, etc.) |

#### Styling Props

| Prop           | Type     | Default      | Description                                |
| -------------- | -------- | ------------ | ------------------------------------------ |
| `width`        | `string` | `"200px"`    | Width of the datepicker input and dropdown |
| `height`       | `string` | `"auto"`     | Height of the datepicker input             |
| `borderRadius` | `string` | `"0.375rem"` | Border radius for the input field          |
| `bgColor`      | `string` | `"#fff"`     | Background color of the input field        |
| `textColor`    | `string` | `"#374151"`  | Text color of the input field              |

#### Selected Day Styling

| Prop                 | Type     | Default     | Description                          |
| -------------------- | -------- | ----------- | ------------------------------------ |
| `selectedDayBgColor` | `string` | `"#3b82f6"` | Background color of the selected day |
| `selectedDayColor`   | `string` | `"#fff"`    | Text color of the selected day       |

#### Helper Text Props

| Prop                 | Type     | Default     | Description                                 |
| -------------------- | -------- | ----------- | ------------------------------------------- |
| `helperText`         | `string` | `""`        | Helper text displayed above the input field |
| `helperTextColor`    | `string` | `"#374151"` | Color of the helper text                    |
| `helperTextFontSize` | `string` | `"14px"`    | Font size of the helper text                |

## Examples

### Basic Example

```jsx
<NepaliDatePicker
  initialDate="2081-03-15"
  onDateChange={(date) => console.log("Selected:", date)}
/>
```

### Customized Styling

```jsx
<NepaliDatePicker
  initialDate="2081-01-01"
  onDateChange={(date) => setDate(date)}
  width="300px"
  height="45px"
  bgColor="#f8fafc"
  textColor="#1e293b"
  borderRadius="8px"
  selectedDayBgColor="#059669"
  selectedDayColor="#ffffff"
  helperText="Select your birth date"
  helperTextColor="#6b7280"
  helperTextFontSize="12px"
/>
```

### English Weekdays

```jsx
<NepaliDatePicker
  initialDate="2081-06-10"
  onDateChange={handleDateChange}
  dayLanguage="eng"
  closeOnSelect={false}
/>
```

## Date Format

- **Input/Output Format**: `YYYY-MM-DD` (Bikram Sambat)
- **Example**: `"2081-02-15"` represents 15th Jestha, 2081 BS
- **Supported Range**: 2001 BS to 2099 BS

## Features

- **Full Calendar Navigation**: Navigate between months and years using dropdown selectors and arrow buttons
- **Boundary Date Selection**: Select dates from previous/next months visible in the calendar grid
- **Responsive Design**: Arrow button sizes automatically adjust based on the component width
- **Initial Date Highlighting**: The initially provided date is highlighted with a border
- **Click Outside to Close**: Calendar closes when clicking outside the component

## Notes

- The component requires the accompanying CSS file to be imported for proper styling
- All dates are in Bikram Sambat (BS) calendar system
- The component handles leap years and varying month lengths automatically
- Supports both Nepali and English weekday labels
