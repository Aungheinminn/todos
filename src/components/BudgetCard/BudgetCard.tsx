import BudgetRange from "../BudgetRange.tsx/BudgetRange";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const BudgetCard = () => {
  return (
    <Accordion collapsible type="single" className="w-full">
      <AccordionItem
        value="item-1"
        className="w-full bg-gray-600 rounded-lg border-none"
      >
        <AccordionTrigger className="w-full hover:no-underline flex items-center justify-between gap-x-4 px-2">
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col justify-start items-start">
              <p className="text-md max-w-[100px] truncate">BudgetType</p>
              <p className="text-sm text-slate-400">Amount</p>
            </div>
            <div className="flex justify-end items-start gap-x-1 mt-5">
              <p className="max-w-[50px] truncate text-green-500">20000</p>
              <p className="text-red-400">/</p>
              <p className="max-w-[50px] truncate text-red-500">100000</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="w-full flex flex-col justify-center items-center gap-y-2 rounded-lg">
          <hr className="w-[96%]" />
          <div className="w-[95%] bg-gray-900 flex flex-col items-center justify-center py-2 px-3 rounded-lg">
            <BudgetRange
              min={new Date("Wed Feb 12 2025 22:23:24 GMT+0630 (Myanmar Time)")}
              max={new Date("Tue Feb 18 2025 22:23:24 GMT+0630 (Myanmar Time)")}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BudgetCard;
