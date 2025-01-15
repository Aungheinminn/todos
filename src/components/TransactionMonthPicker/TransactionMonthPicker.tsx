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
import chevronLeft from "@/assets/chevron_left.svg";
import useOutsideClick from "@/hooks/useOutsideClick";
import { Button } from "../ui/button";

type TransactionMonthPickerProps = {
  date: {
    month: number;
    year: number;
  };
  setDate: React.Dispatch<
    React.SetStateAction<{
      month: number;
      year: number;
    }>
  >;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const TransactionMonthPicker: React.FC<TransactionMonthPickerProps> = ({
  date,
  setDate,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const handleSelectMonth = (month: number) => {
    setDate((prevDate) => ({
      ...prevDate,
      month,
    }));
    setOpen(false);
  };

  const handleSelectPrevYear = () => {
    setDate((prevDate) => ({
      ...prevDate,
      year: prevDate.year - 1,
    }));
  };

  const handleSelectNextYear = () => {
    setDate((prevDate) => ({
      ...prevDate,
      year: prevDate.year + 1,
    }));
  };
  const handleClose = () => setOpen(false);
  useOutsideClick(calendarRef, handleClose);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="w-fit flex justify-between items-center gap-x-3 py-1 px-4 bg-gray-700 my-2 rounded-md">
        <Image className="w-5 h-5" src={calendarIcon} alt="calendar" />
        <p className="text-base">
          {date.month} / {date.year}
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent
        ref={calendarRef}
        className="w-fit bg-gray-700 border-0 p-3"
      >
        <div className="flex flex-col gap-y-2">
          <div className="w-full flex justify-center items-center gap-x-1">
            <Image
              onClick={handleSelectPrevYear}
              className="w-4 h-4 cursor-pointer shrink-0"
              src={chevronLeft}
              alt="chevron left"
            />
            <p className="text-base text-center w-[50px]">{date.year}</p>
            <Image
              onClick={handleSelectNextYear}
              className="w-4 h-4 cursor-pointer shrink-0"
              src={chevronRight}
              alt="chevron right"
            />
          </div>
          <div className="grid grid-cols-3 gap-1">
            {months.map((month, index) => (
              <Button
                onClick={() => handleSelectMonth(index + 1)}
                className="bg-transparent"
                key={index}
              >
                {month}
              </Button>
            ))}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TransactionMonthPicker;
