import Link from "next/link";
import BudgetRange from "../BudgetRange.tsx/BudgetRange";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { BudgetType } from "@/lib/types/budget.type";
import Image from "next/image";
import { Categories } from "@/constants/categories";

type BudgetCardProps = {
  budget: BudgetType;
};

const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
  return (
    <Accordion collapsible type="single" className="w-full">
      <AccordionItem
        value="item-1"
        className="w-full bg-gray-600 rounded-lg border-none"
      >
        <AccordionTrigger className="w-full hover:no-underline flex items-center justify-between gap-x-4 px-2">
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col justify-start items-start">
              <div className="flex justify-start items-center gap-x-2">
                <Image
                  src={
                    Categories.find((cate) => cate.name === budget.category)
                      ?.icon
                  }
                  className="w-6 h-6"
                  alt="transportation"
                />
                <p className="text-md max-w-[180px] truncate">
                  {budget.category}
                </p>
              </div>
              <p className="text-sm text-slate-400 ml-8 max-w-[150px] truncate">
                {budget.budget}
              </p>
            </div>
            <div className="flex justify-start items-center mt-5 gap-x-2">
              <Link
                className="transition-all text-sm bg-sky-500 py-[2px] px-4 rounded-md hover:bg-blue-500"
                href={`/budgets/${budget._id || ""}`}
              >
                View
              </Link>
              {/* <div className="flex justify-end items-start gap-x-1">
                <p className="max-w-[50px] truncate text-green-500">20000</p>
                <p className="text-red-400">/</p>
                <p className="max-w-[50px] truncate text-red-500">100000</p>
              </div> */}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="w-full flex flex-col justify-center items-center gap-y-2 rounded-lg">
          <hr className="w-[96%]" />
          <div className="w-[95%] bg-gray-900 flex flex-col items-center justify-center py-2 px-3 rounded-lg">
            <BudgetRange
              min={new Date(budget.start_date || "")}
              max={new Date(budget.end_date || "")}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BudgetCard;
