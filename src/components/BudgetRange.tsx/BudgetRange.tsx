type BudgetRangeProps = {
  min: Date;
  max: Date;
};

const BudgetRange: React.FC<BudgetRangeProps> = ({ min, max }) => {
  const range = (max.getTime() - min.getTime()) / (1000 * 60 * 60 * 24);
  const currentRange =
    new Date().getDate() === min.getDate() &&
    new Date().getMonth() === min.getMonth()
      ? 1
      : (new Date().getTime() - min.getTime()) / (1000 * 60 * 60 * 24);
  if (new Date() > max) return <div className="w-full h-2 bg-red-500"></div>;
  return (
    <div className="w-full flex flex-col justify-center items-start gap-y-2">
      <p className="text-xs">Budget duration</p>
      <div
        style={{
          width: `${(currentRange / range) * 100}%`,
          height: "10px",
          borderRadius: "5px",
          backgroundColor: currentRange > 70 ? "red" : "green",
        }}
      ></div>
    </div>
  );
};

export default BudgetRange;
