import { RoutineType } from "@/lib/types/routine.type";
import { PlanType } from "@/lib/types/plan.type";
import { Button } from "../ui/button";
const DrawerInventory = ({
  plan,
  routines,
  handleOpenInventory,
}: {
  plan: PlanType;
  routines: RoutineType[];
  handleOpenInventory: () => void;
}) => {
  return (
    <div className="w-full flex flex-col items-center border-2 border-white rounded-lg">
      <div className="w-[95%] pt-2">
        {plan && plan.name !== "" ? (
          <p className="w-[150px] bg-[#0F172A] p-2 line-clamp-1 rounded-md mb-1">
            {plan.name}
          </p>
        ) : (
          <p className="text-start p-2">Please choose a plan</p>
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="w-[95%] h-[180px] p-2 mt-0 flex flex-wrap border-t border-b border-[#0f172a] rounded-lg gap-2 overflow-y-auto">
          {routines && routines.length > 0 ? (
            routines.map((routine) => (
              <p
                key={routine._id}
                className="max-w-[200px] h-[40px] bg-[#0F172A] p-2 line-clamp-1 rounded-md"
              >
                {routine.name}
              </p>
            ))
          ) : (
            <p className="w-full text-center">There's no routines</p>
          )}
        </div>
        <Button
          onClick={handleOpenInventory}
          className="my-2 w-[100px] rounded-2xl"
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default DrawerInventory;
