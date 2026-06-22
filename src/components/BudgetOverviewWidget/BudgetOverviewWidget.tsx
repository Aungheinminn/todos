"use client";
import { BudgetSpentOverviewType } from "@/lib/types/budget.type";
import { useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Categories } from "@/constants/categories";

// No need for mock data anymore as we're using real data from the API

type BudgetOverviewWidgetProps = {
  budgetOverview?: BudgetSpentOverviewType[];
};

const BudgetOverviewWidget: React.FC<BudgetOverviewWidgetProps> = ({
  budgetOverview = [],
}) => {

  return (
    <div className="w-full flex flex-col items-start gap-y-2 p-2 bg-gray-700 rounded-xl">
      <div className="w-full flex justify-between items-center px-2">
        <h2 className="text-lg font-semibold text-white">Budget Overview</h2>
        <Link href="/budgets" className="text-sm text-blue-400 hover:underline">
          View All
        </Link>
      </div>
      
      <div className="w-full space-y-3">
        {budgetOverview.map((budget) => (
          <BudgetProgressCard key={budget._id} budget={budget} />
        ))}
      </div>
    </div>
  );
};

// Budget progress card component
const BudgetProgressCard: React.FC<{ 
  budget: BudgetSpentOverviewType
}> = ({
  budget
}) => {
  const percentSpent = budget.percentage || 0;
  const isNearLimit = percentSpent >= 90;
  
  const formattedBudget = `K ${budget.budget.toLocaleString()}`;
  const formattedSpent = `K ${budget.transactions.toLocaleString()}`;
  const remaining = budget.budget - budget.transactions;
  const formattedRemaining = `K ${remaining.toLocaleString()}`;
  
  return (
    <Card className="w-full p-3 bg-gray-800 border-0">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-x-2">
          <Image
            src={Categories.find((cate) => cate.name === budget.category)?.icon || ''}
            className="w-5 h-5"
            alt={budget.category}
            width={20}
            height={20}
          />
          <h3 className="font-medium text-white">{budget.category}</h3>
        </div>
        <Link
          href={`/budgets/${budget._id}`}
          className="text-xs text-blue-400 hover:underline"
        >
          Details
        </Link>
      </div>
      
      <div className="w-full mt-2">
        <Progress 
          value={percentSpent} 
          className={`h-2 bg-gray-700 border border-gray-600`}
        />
      </div>
      
      <div className="flex justify-between items-center mt-1 text-xs">
        <div className="flex gap-x-1">
          <span className="text-gray-400">Spent:</span>
          <span className={`${isNearLimit ? 'text-red-400' : 'text-white'}`}>{formattedSpent}</span>
        </div>
        <div className="flex gap-x-1">
          <span className="text-gray-400">Budget:</span>
          <span className="text-white">{formattedBudget}</span>
        </div>
      </div>
      
      <div className="text-xs mt-1">
        <span className="text-gray-400">Remaining: </span>
        <span className={`${remaining < 0 ? 'text-red-400' : 'text-green-400'}`}>
          {formattedRemaining}
        </span>
      </div>
    </Card>
  );
};

export default BudgetOverviewWidget;
