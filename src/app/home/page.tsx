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
import {
  getRoutinesByPlanId,
  getRoutinesByUserId,
} from "@/lib/routines.service";
import DrawerStatus from "@/components/DrawerStatus/DrawerStatus";
import DrawerRoutinesChooser from "@/components/DrawerRoutinesChooser/DrawerRoutinesChooser";
import { PlanType } from "@/lib/types/plan.type";

const Home = () => {
  const { currentUser, updateCurrentUser } = useCurrentUserStore(
    (state) => state,
  );
  const [open, setOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [planFetchStatus, setPlanFetchStatus] = useState<boolean>(false);
  const [plansSearchKey, setPlansSearchKey] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<PlanType>({
    _id: "",
    name: "",
    description: "",
    user_id: "",
    createdAt: "",
  });
  useQuery("currentUser", getCurrentUser, {
    onSuccess: (data) => {
      updateCurrentUser(data.data.currentUser);
    },
  });
  console.log("current", currentUser);

  const { data: plans, isLoading: isPlansLoading } = useQuery({
    queryKey: ["plans", currentUser?._id, plansSearchKey],
    queryFn: () => getPlansByUser(currentUser?._id ?? "", plansSearchKey),
    enabled: !!currentUser?._id && planFetchStatus,
  });

  const { data: routines, isLoading: isRoutinesLoading } = useQuery({
    queryKey: ["routines", selectedPlan],
    queryFn: () => getRoutinesByPlanId(selectedPlan._id ?? ""),
    enabled: !!selectedPlan,
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
    console.log(key);
    setPlansSearchKey(key);
  };

  const handleSelectedPlan = (plan: PlanType) => {
    console.log(plan, "aaa");
    setSelectedPlan(plan);
    setStep(2);
  };

  const handleOpenInventory = () => {};

  const handleBack = () => {
    setSelectedPlan({
      _id: "",
      name: "",
      description: "",
      user_id: "",
      createdAt: "",
    });
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
              {step === 1 && (
                <DrawserPlansChooser
                  plans={plans}
                  searchKey={plansSearchKey}
                  handleSearch={handlePlansSearch}
                  handleSelectedPlan={handleSelectedPlan}
                />
              )}
              {step === 2 && <DrawerRoutinesChooser />}
            </DrawerHeader>
            <DrawerDescription></DrawerDescription>
            <DrawerFooter className="flex flex-row justify-center items-center">
              <Button variant="outline" className="text-gray-800">
                Submit
              </Button>
              <Button
                onClick={handleCloseDrawer}
                variant="outline"
                className="text-gray-800"
              >
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Suspense>
  );
};
export default Home;
