"use client";
import { Suspense, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { createItems } from "@/lib/items.service";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/lib/users.service";
import { useCurrentUserStore } from "@/lib/userStore";
import Badge from "@/components/Badge/Badge";
import "react-day-picker/dist/style.css";
import HomeLoading from "./loading";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import DrawserPlansChooser from "@/components/DrawerPlansChooser/DrawserPlansChooser";
import useOutsideClick from "@/hooks/useOutsideClick";
import { getPlansByUser } from "@/lib/plan.service";
import { getRoutinesByPlanId } from "@/lib/routines.service";
import DrawerStatus from "@/components/DrawerStatus/DrawerStatus";
import DrawerRoutinesChooser from "@/components/DrawerRoutinesChooser/DrawerRoutinesChooser";
import { PlanType } from "@/lib/types/plan.type";
import { RoutineType } from "@/lib/types/routine.type";
import DrawerInventory from "@/components/DrawerInventory/DrawerInventory";

const Home = () => {
  const { currentUser, updateCurrentUser } = useCurrentUserStore(
    (state) => state,
  );
  const [open, setOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [planFocusStatus, setPlanFocusStatus] = useState<boolean>(false);
  const [routineFocusStatus, setRoutineFocusStatus] = useState<boolean>(false);
  const [inventoryStatus, setInventoryStatus] = useState<boolean>(false);
  const [planFetchStatus, setPlanFetchStatus] = useState<boolean>(false);
  const [routineFetchStatus, setRoutineFetchStatus] = useState<boolean>(false);
  const [plansSearchKey, setPlansSearchKey] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<PlanType>({
    _id: "",
    name: "",
    description: "",
    user_id: "",
    createdAt: "",
  });
  const [routinesSearchKey, setRoutinesSearchKey] = useState<string>("");
  const [selectedRoutines, setSelectedRoutines] = useState<RoutineType[]>([]);
  useQuery("currentUser", getCurrentUser, {
    onSuccess: (data) => {
      updateCurrentUser(data.data.currentUser);
    },
  });
  console.log("current", currentUser);

  const { data: plans } = useQuery({
    queryKey: ["plans", currentUser?._id, plansSearchKey],
    queryFn: () => getPlansByUser(currentUser?._id ?? "", plansSearchKey),
    enabled: !!currentUser?._id && planFetchStatus,
  });

  const { data: routines } = useQuery({
    queryKey: ["routines", selectedPlan, routinesSearchKey],
    queryFn: () =>
      getRoutinesByPlanId(selectedPlan._id ?? "", routinesSearchKey),
    enabled: !!selectedPlan && routineFetchStatus,
  });

  const [selectedDates, setSelectedDates] = useState<any[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleOpenDrawer = () => {
    setPlanFetchStatus(true);
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setStep(1);
    setOpen(false);
  };

  const handlePlansSearch = (key: string) => {
    setPlansSearchKey(key);
  };

  const handleSelectedPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
    setRoutineFetchStatus(true);
    setStep(2);
  };

  const handleRoutinesSearch = (key: string) => {
    setRoutinesSearchKey(key);
  };

  const handleSelectedRoutines = (routine: RoutineType) => {
    if (selectedRoutines.includes(routine)) {
      setSelectedRoutines((prev) => prev.filter((r) => r._id !== routine._id));
    }
    setSelectedRoutines((prev) => [...prev, routine]);
  };
  console.log("selected routines", selectedRoutines);

  const handleOpenInventory = () => {
    setInventoryStatus(!inventoryStatus);
  };

  const handleBack = () => {
    setRoutineFetchStatus(false);
    setSelectedPlan({
      _id: "",
      name: "",
      description: "",
      user_id: "",
      createdAt: "",
    });
    setSelectedRoutines([]);
    setStep(1);
  };
  // const handleAddDate = async () => {
  //     const newDate = new Date() as any
  //     console.log(newDate, typeof newDate)
  //     const data = {
  //         date: newDate,
  //         userId: currentUser?._id
  //     }
  //     setSelectedDates([...selectedDates, newDate])
  //     await createItems(data)
  //     console.log('new date', newDate)
  // }
  // const handleRemoveDate = () => {
  //     //No need yet
  // }

  useOutsideClick(drawerRef, handleCloseDrawer);

  return (
    <Suspense fallback={<HomeLoading />}>
      <div className="w-full pt-[55px] text-black flex items-center flex-col justify-center">
        <div className="mt-1" />
        <div className="w-full px-2">
          <Badge
            title="Heads up!"
            desc="You can add components to your app using the cli."
          />
        </div>
        <div className="w-full">
          <DayPicker
            onSelect={() => console.log("asf")}
            classNames={{
              month: `bg-[#2c3e50] w-full px-3 py-2 border-2 border-[#34aeeb] rounded-md`,
              table: `w-full mt-2`,
              caption_label: `text-[#34aeeb] font-bold `,
              nav: `flex justify-between items-center gap-x-2 text-[#34aeeb]`,
              head_cell: `w-[50px] text-[#34aeeb] font-bold`,
              button: ``,
              button_reset: ``,
              day: `h-[30px] text-[#34aeeb] hover:bg-[#34aeeb] hover:text-white rounded-full px-2`,
            }}
            mode="multiple"
            selected={selectedDates}
          />
        </div>

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
              <Button variant="outline" className="text-gray-800">
                Submit
              </Button>
              <Button
                onClick={() =>
                  step === 2 ? handleBack() : handleCloseDrawer()
                }
                variant="outline"
                className="text-gray-800"
              >
                {step === 2 ? "Back" : "Close"}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Suspense>
  );
};
export default Home;
