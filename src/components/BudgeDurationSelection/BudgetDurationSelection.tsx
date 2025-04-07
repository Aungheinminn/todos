import useOutsideClick from "@/hooks/useOutsideClick";
import Image from "next/image";
import { DayPicker } from "react-day-picker";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "../ui/alert-dialog";
import calendarIcon from "@/assets/calendar.svg";
import chevronRight from "@/assets/cheron_right.svg";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { getThisWeek } from "@/lib/utils/getThisWeek";
import { getThisMonth } from "@/lib/utils/getThisMonth";
import { getThisQuarter } from "@/lib/utils/getThisQuarter";
import { getThisYear } from "@/lib/utils/getThisYear";
import leftArrow from "@/assets/chevron_left.svg";
import { TimeRangeConstantType } from "@/lib/types/timeRangeConstant.type";
import { TimeRanges } from "@/constants/timeRanges";
import { getDate } from "@/lib/utils/getDate";
import { endOfWeek } from "date-fns";

type BudgetDurationSelectionProps = {
  date: {
    startDate: Date | string;
    endDate: Date | string;
  };
  setDate: React.Dispatch<
    React.SetStateAction<{
      startDate: Date | string;
      endDate: Date | string;
    }>
  >;
};

const getBudgetPlaceholder = (date: {
  startDate: Date | string;
  endDate: Date | string;
}): string => {
  if (!date.startDate || !date.endDate) return "Select Duration";
  const startDate = getDate(new Date(date.startDate));
  const endDate = getDate(new Date(date.endDate));
  return `${startDate.day}/${startDate.month} - ${endDate.day}/${endDate.month}`;
};

const BudgetDurationSelection: React.FC<BudgetDurationSelectionProps> = ({
  date,
  setDate,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isCustomSelection, setIsCustomSelection] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<string>("start");

  const handleDateCategory = (category: string) => {
    if (category === "week") {
      const { startOfWeek, endOfWeek } = getThisWeek();
      const newStartDate = new Date(
        startOfWeek.getFullYear(),
        startOfWeek.getMonth(),
        startOfWeek.getDate(),
      );
      const newEndDate = new Date(
        endOfWeek.getFullYear(),
        endOfWeek.getMonth(),
        endOfWeek.getDate(),
      );
      setDate({ startDate: newStartDate, endDate: newEndDate });
    } else if (category === "month") {
      const { startOfMonth, endOfMonth } = getThisMonth();
      const newStartDate = new Date(
        startOfMonth.getFullYear(),
        startOfMonth.getMonth(),
        startOfMonth.getDate(),
      );
      const newEndDate = new Date(
        endOfMonth.getFullYear(),
        endOfMonth.getMonth(),
        endOfMonth.getDate(),
      );
      setDate({ startDate: newStartDate, endDate: newEndDate });
    } else if (category === "quarter") {
      const { startOfQuarter, endOfQuarter } = getThisQuarter();
      const newStartDate = new Date(
        startOfQuarter.getFullYear(),
        startOfQuarter.getMonth(),
        startOfQuarter.getDate(),
      );
      const newEndDate = new Date(
        endOfQuarter.getFullYear(),
        endOfQuarter.getMonth(),
        endOfQuarter.getDate(),
      );
      setDate({ startDate: newStartDate, endDate: newEndDate });
    } else if (category === "year") {
      const { startOfYear, endOfYear } = getThisYear();
      const newStartDate = new Date(
        startOfYear.getFullYear(),
        startOfYear.getMonth(),
        startOfYear.getDate(),
      );
      const newEndDate = new Date(
        endOfYear.getFullYear(),
        endOfYear.getMonth(),
        endOfYear.getDate(),
      );
      setDate({ startDate: newStartDate, endDate: newEndDate });
    }

      setOpen(false);
  };

  const handleSelectDate = (day: Date) => {
    if (timeRange === "start") {
      setDate((prev) => ({ ...prev, startDate: day }));
    } else if (timeRange === "end") {
      setDate((prev) => ({ ...prev, endDate: day }));
    }
  };
  const handleClose = () => setOpen(false);
  useOutsideClick(calendarRef, handleClose);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="w-full flex justify-between items-center gap-x-8 py-1 px-4">
        <Image className="w-6 h-6 mb-3" src={calendarIcon} alt="calendar" />
        <div className="w-full flex justify-between items-center gap-x-2 border-b border-b-slate-500 ml-1 pb-3">
          <p className="text-base">{getBudgetPlaceholder(date)}</p>
          <Image className="w-4 h-4" src={chevronRight} alt="chevron right" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent
        ref={calendarRef}
        className="w-fit h-fit bg-gray-700 border-0 p-0"
      >
        {isCustomSelection ? (
          <div className="w-full h-[450px] flex flex-col items-start gap-y-1 p-1">
            <div className="w-full pt-1">
              <Button
                onClick={() => setIsCustomSelection(false)}
                className="h-4 bg-transparent hover:bg-transparent hover:text-sky-500 text-sm text-start"
              >
                <Image className="w-4 h-4" src={leftArrow} alt="left arrow" />
                back
              </Button>
              <div className="w-full flex justify-center items-center">
                <Button
                  onClick={() => setTimeRange("start")}
                  className={`p-0 px-1 bg-transparent hover:bg-transparent border-b-2 border-slate-500 ${timeRange === "start" && "text-sky-500 border-sky-500"} rounded-none`}
                >
                  Starting
                </Button>
                <Button
                  onClick={() => setTimeRange("end")}
                  className={`p-0 px-1 bg-transparent hover:bg-transparent border-b-2 border-slate-500 ${timeRange === "end" && "text-sky-500 border-sky-500"} rounded-none`}
                >
                  Ending
                </Button>
              </div>
            </div>
            <DayPicker
              classNames={{
                month: `bg-gray-700 w-full p-4 rounded-md`,
                table: `w-full`,
                caption_label: `text-green-500 font-normal `,
                button: "",
                button_reset: "",
                day: `w-[30px] h-[30px] flex justify-center items-center text-white hover:bg-[#34aeeb] hover:text-white rounded-full p-2 font-light`,
                day_selected: "bg-green-500 text-white font-light",
              }}
              mode="single"
              selected={timeRange === "start" ? new Date(date.startDate) : new Date(date.endDate)}
              onDayClick={handleSelectDate}
            />
          </div>
        ) : (
          <div className="w-[256px] flex flex-col items-center gap-y-1 p-1">
            {TimeRanges.map((range: TimeRangeConstantType) => (
              <Button
                key={range.value}
                onClick={() => handleDateCategory(range.value)}
                className="w-full"
              >
                {range.name}({getDate(range.startDate).day} /{" "}
                {getDate(range.startDate).month} - {getDate(range.endDate).day}{" "}
                / {getDate(range.endDate).month})
              </Button>
            ))}
            <Button
              onClick={() => setIsCustomSelection(true)}
              className="w-full"
            >
              Custom
            </Button>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BudgetDurationSelection;
