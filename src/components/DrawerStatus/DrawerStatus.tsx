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
    <div className="w-full flex justify-start items-center gap-x-2">
      <Button className="rounded-md">
        Choose {step === 1 ? "a Plan" : "Routines"}
      </Button>
      <Button
        onClick={handleOpenInventory}
        className="flex justify-center items-center"
      >
        <Image src={backpack} alt="backpack" />
      </Button>
      {step === 2 && (
        <Button className="flex justify-center items-center">
          {selectedPlan.name}
        </Button>
      )}
      {step === 2 && (
        <Button
          onClick={handleBack}
          className="flex justify-center items-center"
        >
          <Image src={back} alt="back" />
        </Button>
      )}
    </div>
  );
};

export default DrawerStatus;
