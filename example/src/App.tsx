import "./App.css";
import { useState } from "react";
import { NepaliDatePicker } from "@kkeshavv18/nepali-datepicker";
import "@kkeshavv18/nepali-datepicker/dist/index.css";

function App() {
  const [selectedDate, setSelectedDate] = useState("2081-01-15");
  return (
    <>
      <NepaliDatePicker
        initialDate={selectedDate}
        onDateChange={(date: string) => setSelectedDate(date)}
      />
    </>
  );
}

export default App;
