"use client";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const CurrentBudgetUsage = () => {
  const data = {
    labels: ["Used", "Remaining"],
    datasets: [
      {
        label: "Budget Usage Percentage",
        data: [300, 50],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const configs = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-[200px] flex justify-between items-center bg-gray-700 rounded-md">
      <div className="w-2/3 h-full py-1">
        <Doughnut data={data} options={configs} />
      </div>
      <div className="w-1/3 h-full flex flex-col justify-start items-center px-1 gap-y-1 py-2">
        <div className="w-full flex flex-col bg-gray-800 gap-x-2 px-2 py-1 rounded-md">
          <p className="whitespace-nowrap text-sm text-slate-400">Remaining </p>
          <p className="text-sm text-sky-500 truncate">
{/*             10000000000000000000000000000000 */}
						1000
          </p>
        </div>
        <div className="w-full flex flex-col gap-x-2 bg-gray-800 px-2 py-1 rounded-md">
          <p className="whitespace-nowrap text-sm text-slate-400">Used </p>
          <p className="text-sm text-red-500 max-w-[100px] truncate">
{/*             50000000000000000000000000000000 */}
						1000
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentBudgetUsage;
