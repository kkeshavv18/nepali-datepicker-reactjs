import React from "react";
import { NepaliDatePicker } from "./components/NepaliDatePicker";
import type { Story } from "@ladle/react";

export const NepaliDatePickerStory: Story = () => (
  <NepaliDatePicker
    initialDate="2082-02-10"
    onDateChange={(date) => {
      console.log("Date changed:", date);
    }}
    width="250px"
  />
);

export const NepaliDatePickerWithGreenBackground: Story = () => (
  <NepaliDatePicker
    initialDate={"2082-02-10"}
    onDateChange={(date) => {
      console.log("Date changed:", date);
    }}
    closeOnSelect={false}
    bgColor="green"
    textColor="white"
    selectedDayBgColor="green"
    selectedDayColor="white"
  />
);

export const NepaliDatePickerWithHelperText: Story = () => (
  <NepaliDatePicker
    initialDate={"2023-10-01"}
    onDateChange={(date) => {
      console.log("Date changed:", date);
    }}
    closeOnSelect={false}
    bgColor="green"
    textColor="white"
    selectedDayBgColor="green"
    selectedDayColor="white"
    helperText="Select a date"
  />
);

export const NepaliDatePickerWithEnglishLanguage: Story = () => (
  <NepaliDatePicker
    initialDate={"2023-10-01"}
    onDateChange={(date) => {
      console.log("Date changed:", date);
    }}
    closeOnSelect={false}
    bgColor="green"
    textColor="white"
    selectedDayBgColor="green"
    selectedDayColor="white"
    dayLanguage="eng"
    helperText="Select a date"
  />
);

export const NepaliDatePickerWithMoreWidth: Story = () => (
  <NepaliDatePicker
    initialDate={"2023-10-01"}
    onDateChange={(date) => {
      console.log("Date changed:", date);
    }}
    closeOnSelect={false}
    bgColor="green"
    textColor="white"
    selectedDayBgColor="green"
    selectedDayColor="white"
    width="300px"
    dayLanguage="eng"
  />
);

export const NepaliDatePickerWithBorderRadius: Story = () => (
  <NepaliDatePicker
    initialDate={"2023-10-01"}
    onDateChange={(date) => {
      console.log("Date changed:", date);
    }}
    closeOnSelect={false}
    bgColor="green"
    textColor="white"
    selectedDayBgColor="green"
    selectedDayColor="white"
    borderRadius="15px"
    width="300px"
    dayLanguage="eng"
  />
);

export const NepaliDatePickerWithMoreHeight: Story = () => (
  <NepaliDatePicker
    initialDate={"2023-10-01"}
    onDateChange={(date) => {
      console.log("Date changed:", date);
    }}
    closeOnSelect={false}
    bgColor="green"
    textColor="white"
    selectedDayBgColor="green"
    selectedDayColor="white"
    borderRadius="15px"
    width="300px"
    dayLanguage="eng"
    height="40px"
  />
);
