import { TimeRangeConstantType } from "@/lib/types/timeRangeConstant.type";
import { getThisMonth } from "@/lib/utils/getThisMonth";
import { getThisQuarter } from "@/lib/utils/getThisQuarter";
import { getThisWeek } from "@/lib/utils/getThisWeek";
import { getThisYear } from "@/lib/utils/getThisYear";

export const TimeRanges: TimeRangeConstantType[] = [
  {
    name: "This week",
    value: "week",
    startDate: getThisWeek().startOfWeek,
    endDate: getThisWeek().endOfWeek,
  },
  {
    name: "This month",
    value: "month",
    startDate: getThisMonth().startOfMonth,
    endDate: getThisMonth().endOfMonth,
  },
  {
    name: "This quarter",
    value: "quarter",
    startDate: getThisQuarter().startOfQuarter,
    endDate: getThisQuarter().endOfQuarter,
  },
  {
    name: "This year",
    value: "year",
    startDate: getThisYear().startOfYear,
    endDate: getThisYear().endOfYear,
  },
];
