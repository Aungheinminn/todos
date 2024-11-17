import Image from "next/image";
import { Button } from "../ui/button";
import backpack from "@/assets/backpack.svg";
import back from "@/assets/caret_back.svg";
import { PlanType } from "@/lib/types/plan.type";
const DrawerStatus = ({
  step,
  selectedPlan,
  handleOpenInventory,
  handleBack,
}: {
  step: number;
  selectedPlan: PlanType;
  handleOpenInventory: () => void;
  handleBack: () => void;
}) => {
  return (
    <div className="w-full flex flex-col items-start gap-y-2">
      <div className="w-full flex justify-start items-center gap-x-2">
        <Button className="rounded-md">
          {step === 1 ? "Plans" : "Routines"}
        </Button>

        {step === 2 && (
          <p className="min-w-[100px]  bg-[#0F172A] p-2 line-clamp-1 rounded-md">
            {selectedPlan.name}
          </p>
        )}
      </div>
      <div className="w-full flex justify-start items-center gap-x-2">
        {step === 2 && (
          <Button
            onClick={handleBac}
            className="flex justify-center items-center"
          >
            <Image className="w-8 h-8" src={back} alt="back" />
          </Button>
        )}
        <Button
          onClick={handleOpenInventory}
          className="flex justify-center items-center"
        >
          <Image src={backpack} alt="backpack" />
        </Button>
      </div>
    </div>
  );
};

export default DrawerStatus;
