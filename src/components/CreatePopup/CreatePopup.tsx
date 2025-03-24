"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { SetStateAction, useState } from "react";
import { useCreatePopupStore } from "@/lib/stores/popupStore";
import { PlanType } from "@/lib/types/plan.type";
import SelectComponent from "../Select/Select";

type PlanPopupProps = {
  name: string;
  description: string;
  setName: React.Dispatch<SetStateAction<string>>;
  setDescription: React.Dispatch<SetStateAction<string>>;
};

type RoutinePopupProps = {
  name: string;
  description: string;
  setName: React.Dispatch<SetStateAction<string>>;
  setDescription: React.Dispatch<SetStateAction<string>>;
  dropdownItems?: PlanType[];
  selected: string;
  setSelected: React.Dispatch<SetStateAction<string>>;
};

const CreatePlanPopup: React.FC<PlanPopupProps> = ({
  name,
  description,
  setName,
  setDescription,
}) => {
  return (
    <AlertDialogHeader>
      <AlertDialogTitle>Create a plan</AlertDialogTitle>
      <div className="flex flex-col justify-start">
        <label className="mb-2 text-start" htmlFor="name">
          Name *
        </label>
        <input
          className="text-black p-2 rounded-md"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-start">
        <label className="mb-2 text-start" htmlFor="description">
          Description
        </label>
        <input
          className="text-black p-2 rounded-md"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </AlertDialogHeader>
  );
};

const CreateRoutinePopup: React.FC<RoutinePopupProps> = ({
  name,
  description,
  setName,
  setDescription,
  dropdownItems,
  selected,
  setSelected,
}) => {
  return (
    <AlertDialogHeader>
      <AlertDialogTitle>Create a routine</AlertDialogTitle>
      <div className="flex flex-col">
        <label className="mb-2 text-start" htmlFor="name">
          Name *
        </label>
        <input
          className="text-black py-2 px-3 rounded-md w-full focus:outline-[#0ea5e9]"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-start">
        <label className="mb-2 text-start" htmlFor="description">
          Description
        </label>
        <input
          className="text-black p-2 rounded-md"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <SelectComponent
        selected={selected}
        setSelected={setSelected}
        dropdownItems={dropdownItems ?? []}
      />
    </AlertDialogHeader>
  );
};

const CreatePopupComponent: React.FC = () => {
  const { isOpen, closePopup, popupData } = useCreatePopupStore(
    (state) => state,
  );
  console.log(popupData);
  const [name, setName] = useState<string>(popupData.name || "");
  const [desc, setDesc] = useState<string>(popupData.description || "");
  const [selected, setSelected] = useState<string>("");

  const handleProcess = () => {
    const data = {
      name: name,
      description: desc,
      plan_id: popupData.type === "createRoutine" && selected,
      icon: "",
    };
    console.log(data, "data");
    popupData.process(data);
    setName("");
    setDesc("");
    setSelected("");
    closePopup();
  };

  const handleCancel = () => {
    setName("");
    setDesc("");
    setSelected("");
    closePopup();
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-[320px] bg-[#334155] rounded-lg">
        {popupData.type === "createPlan" && (
          <CreatePlanPopup
            name={name}
            description={desc}
            setName={setName}
            setDescription={setDesc}
          />
        )}
        {popupData.type === "createRoutine" && (
          <CreateRoutinePopup
            name={name}
            description={desc}
            setName={setName}
            setDescription={setDesc}
            dropdownItems={popupData.dropdownItems}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        <AlertDialogFooter className="w-full flex flex-row justify-ceter items-center gap-x-1">
          <AlertDialogCancel
            className="text-black w-1/2 m-0 p-0"
            onClick={handleCancel}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="w-1/2 m-0 p-0" onClick={handleProcess}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default CreatePopupComponent;

