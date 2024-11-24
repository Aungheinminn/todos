"use client";
import { Suspense, cache, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { createItems, getItemDetails, getItems } from "@/lib/items.service";
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
import { ItemType } from "@/lib/types/item.type";
import { PlanType } from "@/lib/types/plan.type";
import { RoutineType } from "@/lib/types/routine.type";
import DrawerInventory from "@/components/DrawerInventory/DrawerInventory";
import { ItemMutationProvider } from "./itemMutationProvider";
import DrawerComponent from "@/components/DrawerComponent/DrawerComponent";

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

  const { data: items } = useQuery({
    queryKey: ["items", currentUser?._id],
    queryFn: () => getItems(currentUser?._id ?? ""),
    enabled: !!currentUser?._id,
  });

  console.log("items", items);

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

  // const [selectedDates, setSelectedDates] = useState<any[]>([new Date()]);
  const drawerRef = useRef<HTMLDivElement>(null);

  const { createMutation } = ItemMutationProvider();

  const handleGetCurrentItem = async (date: Date) => {
    const newDate = new Date(date).toISOString();
    console.log(newDate, typeof newDate);
    try {
      const res = await getItemDetails(currentUser?._id ?? "", newDate);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOpenDrawer = () => {
    // setStep(1);
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
  const handleAddDate = async () => {
    if (!selectedPlan || selectedRoutines.length === 0) return;
    const newDate = new Date();
    console.log(newDate, typeof newDate);
    const data = {
      plan: selectedPlan._id || "",
      routines: selectedRoutines.map((r) => r._id || ""),
      user_id: currentUser?._id || "",
      date: newDate.toISOString(),
    };
    try {
      createMutation.mutate({ datas: data, user_id: currentUser?._id || "" });
    } catch (e) {
      console.log(e);
    } finally {
      setPlanFetchStatus(false);
      setRoutineFetchStatus(false);
      setStep(1);
      setSelectedPlan({
        _id: "",
        name: "",
        description: "",
        user_id: "",
        createdAt: "",
      });
      setSelectedRoutines([]);
      setOpen(false);
    }
  };

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
            onDayClick={(date) => handleGetCurrentItem(date as unknown as Date)}
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
            selected={
              items && items.map((item: ItemType) => new Date(item.date))
            }
          />
        </div>
        <DrawerComponent
          open={open}
          handleOpenDrawer={handleOpenDrawer}
          drawerRef={drawerRef}
          step={step}
          selectedPlan={selectedPlan}
          selectedRoutines={selectedRoutines}
          handleOpenInventory={handleOpenInventory}
          handleBack={handleBack}
          inventoryStatus={inventoryStatus}
          plans={plans}
          plansSearchKey={plansSearchKey}
          planFocusStatus={planFocusStatus}
          setPlanFocusStatus={setPlanFocusStatus}
          handlePlansSearch={handlePlansSearch}
          handleSelectedPlan={handleSelectedPlan}
          routines={routines}
          routinesSearchKey={routinesSearchKey}
          routineFocusStatus={routineFocusStatus}
          setRoutineFocusStatus={setRoutineFocusStatus}
          handleRoutinesSearch={handleRoutinesSearch}
          handleSelectedRoutines={handleSelectedRoutines}
          handleAddDate={handleAddDate}
          handleCloseDrawer={handleCloseDrawer}
        />
      </div>
    </Suspense>
  );
};
export default Home;
