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

type BudgetDurationSelectionProps = {
  date: {
    startDate: Date;
    endDate: Date;
  };
  setDate: React.Dispatch<
    React.SetStateAction<{
      startDate: Date;
      endDate: Date;
    }>
  >;
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
      setDate({ startDate: startOfWeek, endDate: endOfWeek });
    } else if (category === "month") {
      const { startOfMonth, endOfMonth } = getThisMonth();
      setDate({ startDate: startOfMonth, endDate: endOfMonth });
    } else if (category === "quarter") {
      const { startOfQuarter, endOfQuarter } = getThisQuarter();
      setDate({ startDate: startOfQuarter, endDate: endOfQuarter });
    } else if (category === "year") {
      const { startOfYear, endOfYear } = getThisYear();
      setDate({ startDate: startOfYear, endDate: endOfYear });
    }
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
          <p className="text-base">Select Duration</p>
          <Image className="w-4 h-4" src={chevronRight} alt="chevron right" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent
        ref={calendarRef}
        className="w-fit h-fit bg-gray-700 border-0 p-0"
      >
        {isCustomSelection ? (
          <div className="w-full h-[380px] flex flex-col items-start gap-y-1 p-1">
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
              selected={date.startDate}
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
