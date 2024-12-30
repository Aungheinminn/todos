"use client";
import { useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import Image from "next/image";
import calendarIcon from "@/assets/calendar.svg";
import chevronRight from "@/assets/cheron_right.svg";
import useOutsideClick from "@/hooks/useOutsideClick";

type CalendarProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const Calendar: React.FC<CalendarProps> = ({ date, setDate }) => {
  const dateString = date.toDateString().replace(/^([A-Za-z]{3})/, "$1,");
  const [open, setOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setOpen(false);

  const handleSelectDate = (day: Date) => {
    setOpen(false);
    setDate(day);
  };
  useOutsideClick(calendarRef, handleClose);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="w-full flex justify-between items-center gap-x-8 py-1 px-4">
        <Image className="w-6 h-6 mb-3" src={calendarIcon} alt="calendar" />
        <div className="w-full flex justify-between items-center gap-x-2 border-b border-b-slate-500 ml-1 pb-3">
          <p className="text-base">{dateString}</p>
          <Image className="w-4 h-4" src={chevronRight} alt="chevron right" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent
        ref={calendarRef}
        className="w-fit bg-gray-700 border-0 p-0"
      >
        <DayPicker
          classNames={{
            month: `bg-gray-700 w-full rounded-md`,
            table: `w-full`,
            caption_label: `text-green-500 font-normal `,
            button: "",
            button_reset: "",
            day: `w-[30px] h-[30px] flex justify-center items-center text-white hover:bg-[#34aeeb] hover:text-white rounded-full p-2 font-light`,
            day_selected: "bg-green-500 text-white font-light",
          }}
          mode="single"
          selected={date}
          onDayClick={handleSelectDate}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Calendar;
