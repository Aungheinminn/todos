import { RoutineType } from "@/lib/types/routine.type";
import { PlanType } from "@/lib/types/plan.type";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import DrawerStatus from "@/components/DrawerStatus/DrawerStatus";
import DrawerInventory from "@/components/DrawerInventory/DrawerInventory";
import DrawserPlansChooser from "@/components/DrawerPlansChooser/DrawserPlansChooser";
import DrawerRoutinesChooser from "@/components/DrawerRoutinesChooser/DrawerRoutinesChooser";
import { Button } from "@/components/ui/button";

type DrawerComponentType = {
  open: boolean;
  handleOpenDrawer: () => void;
  drawerRef: React.RefObject<HTMLDivElement>;
  step: number;
  selectedPlan: PlanType;
  selectedRoutines: RoutineType[];
  handleOpenInventory: () => void;
  handleBack: () => void;
  inventoryStatus: boolean;
  plans: PlanType[];
  plansSearchKey: string;
  planFocusStatus: boolean;
  setPlanFocusStatus: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlansSearch: (key: string) => void;
  handleSelectedPlan: (plan: PlanType) => void;
  routines: RoutineType[];
  routinesSearchKey: string;
  routineFocusStatus: boolean;
  setRoutineFocusStatus: React.Dispatch<React.SetStateAction<boolean>>;
  handleRoutinesSearch: (key: string) => void;
  handleSelectedRoutines: (routines: RoutineType) => void;
  handleAddDate: () => void;
  handleCloseDrawer: () => void;
};

const DrawerComponent: React.FC<DrawerComponentType> = ({
  open,
  handleOpenDrawer,
  drawerRef,
  step,
  selectedPlan,
  selectedRoutines,
  handleOpenInventory,
  handleBack,
  inventoryStatus,
  plans,
  plansSearchKey,
  planFocusStatus,
  setPlanFocusStatus,
  handlePlansSearch,
  handleSelectedPlan,
  routines,
  routinesSearchKey,
  routineFocusStatus,
  setRoutineFocusStatus,
  handleRoutinesSearch,
  handleSelectedRoutines,
  handleAddDate,
  handleCloseDrawer,
}) => {
  return (
    <Drawer open={open}>
      <DrawerTrigger
        onClick={handleOpenDrawer}
        className="bg-[#2c3e50] py-2 px-3 border-2 border-[#0ea5e9] text-white rounded-md"
      >
        Add today activity
      </DrawerTrigger>
      <DrawerContent ref={drawerRef} className="bg-gray-800">
        <DrawerHeader className="flex flex-col gap-y-2">
          <DrawerTitle></DrawerTitle>
          <DrawerStatus
            step={step}
            selectedPlan={selectedPlan}
            handleOpenInventory={handleOpenInventory}
            handleBack={handleBack}
          />
          {inventoryStatus ? (
            <DrawerInventory
              plan={selectedPlan}
              routines={selectedRoutines}
              handleOpenInventory={handleOpenInventory}
            />
          ) : (
            <div>
              {step === 1 && (
                <DrawserPlansChooser
                  plans={plans}
                  searchKey={plansSearchKey}
                  focus={planFocusStatus}
                  setFocus={setPlanFocusStatus}
                  handleSearch={handlePlansSearch}
                  handleSelectedPlan={handleSelectedPlan}
                />
              )}
              {step === 2 && (
                <DrawerRoutinesChooser
                  routines={routines}
                  selectedRoutines={selectedRoutines}
                  focus={routineFocusStatus}
                  setFocus={setRoutineFocusStatus}
                  searchKey={routinesSearchKey}
                  handleSearch={handleRoutinesSearch}
                  handleSelectedRoutines={handleSelectedRoutines}
                />
              )}
            </div>
          )}
        </DrawerHeader>
        <DrawerDescription></DrawerDescription>
        <DrawerFooter className="flex flex-row justify-center items-center">
          <Button
            onClick={handleAddDate}
            variant="outline"
            className="text-gray-800"
          >
            Submit
          </Button>
          <Button
            onClick={() => (step === 2 ? handleBack() : handleCloseDrawer())}
            variant="outline"
            className="text-gray-800"
          >
            {step === 2 ? "Back" : "Close"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
