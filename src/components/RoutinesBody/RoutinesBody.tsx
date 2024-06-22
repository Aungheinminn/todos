import RoutineCard from "../RoutineCard/RoutineCard";

const RoutinesBody = () => {
    return (
        <div className="w-full flex flex-col items-center gap-y-3">
            <RoutineCard />
            <RoutineCard />
            <RoutineCard />
        </div>
    );
}
export default RoutinesBody