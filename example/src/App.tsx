import "./App.css";
import { useState } from "react";
import { NepaliDatePicker } from "@kkeshavv18/nepali-datepicker";
import "@kkeshavv18/nepali-datepicker/dist/index.css";

function App() {
  const [selectedDate, setSelectedDate] = useState("2081-01-15");
  const handleDateChange = (date: string) => {
    console.log("selected Date:", date);
    setSelectedDate(date);
  };
  return (
    <>
      <NepaliDatePicker
        initialDate={selectedDate}
        onDateChange={handleDateChange}
        width="300px"
        helperText="Select a date"
        helperTextColor="#6b7280"
        helperTextFontSize="15px"
        closeOnSelect={false}
      />
    </>
  );
}

export default App;
