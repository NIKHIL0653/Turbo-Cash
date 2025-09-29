import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Users,
} from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { GoalForm } from "../components/forms/GoalForm";
import { EditGoalForm } from "../components/forms/EditGoalForm";
import { GoalContributionForm } from "../components/forms/GoalContributionForm";
import { useCurrency } from "../hooks/useCurrency";

interface Goal {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  priority: "high" | "medium" | "low";
  createdAt: string;
  userId: string;
}

export default function Goals() {
  const { userData, deleteGoal } = useUser();
  const { currencySymbol, formatAmount } = useCurrency();
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [contributionGoal, setContributionGoal] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const totalTargetAmount = userData.goals.reduce(
    (sum, goal) => sum + goal.targetAmount,
    0,
  );
  const totalCurrentAmount = userData.goals.reduce(
    (sum, goal) => sum + goal.currentAmount,
    0,
  );
  const completedGoals = userData.goals.filter(
    (goal) => goal.currentAmount >= goal.targetAmount,
  );
  const activeGoals = userData.goals.filter(
    (goal) => goal.currentAmount < goal.targetAmount,
  );

  const getGoalStatus = (goal: Goal) => {
    const percentage = (goal.currentAmount / goal.targetAmount) * 100;
    const deadline = new Date(goal.deadline);
    const today = new Date();
    const daysRemaining = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (percentage >= 100) return "completed";
    if (daysRemaining < 0) return "overdue";
    if (daysRemaining <= 30 && percentage < 80) return "at-risk";
    if (percentage >= 75) return "on-track";
    return "in-progress";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "overdue":
        return "bg-red-500";
      case "at-risk":
        return "bg-orange-500";
      case "on-track":
        return "bg-blue-500";
      default:
        return "bg-teal-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "overdue":
        return "Overdue";
      case "at-risk":
        return "At Risk";
      case "on-track":
        return "On Track";
      default:
        return "In Progress";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "overdue":
      case "at-risk":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20";
      default:
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Financial Goals
          </h1>
          <p className="text-gray-600">
            Set, track, and achieve your financial milestones with visual
            progress tracking.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium mb-1">
                  Total Goals
                </p>
                <p className="text-xl font-bold text-gray-900 mb-1">
                  {userData.goals.length}
                </p>
                <p className="text-xs text-gray-500">
                  {activeGoals.length} active
                </p>
              </div>
              <div className="bg-gray-100 rounded-full p-2">
                <Target className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium mb-1">
                  Target Amount
                </p>
                <p className="text-xl font-bold text-gray-900 mb-1">
                  {formatAmount(totalTargetAmount)}
                </p>
                <p className="text-xs text-gray-500">
                  All goals combined
                </p>
              </div>
              <div className="bg-gray-100 rounded-full p-2">
                <DollarSign className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium mb-1">
                  Saved So Far
                </p>
                <p className="text-xl font-bold text-gray-900 mb-1">
                  {formatAmount(totalCurrentAmount)}
                </p>
                <p className="text-xs text-gray-500">
                  {totalTargetAmount > 0
                    ? (
                        (totalCurrentAmount / totalTargetAmount) *
                        100
                      ).toFixed(1)
                    : 0}
                  % complete
                </p>
              </div>
              <div className="bg-gray-100 rounded-full p-2">
                <TrendingUp className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium mb-1">
                  Completed
                </p>
                <p className="text-xl font-bold text-gray-900 mb-1">
                  {completedGoals.length}
                </p>
                <p className="text-xs text-gray-500">
                  Goals achieved
                </p>
              </div>
              <div className="bg-gray-100 rounded-full p-2">
                <CheckCircle className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Goal Button */}
        <div className="mb-6">
          <Button
            onClick={() => setIsAddingGoal(true)}
            className="bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Goal
          </Button>
        </div>

        {/* Goals Grid */}
        <div className="overflow-x-auto md:overflow-x-visible">
          <div className="flex gap-4 md:grid md:grid-cols-3 md:gap-4 min-w-max md:min-w-0">
            {userData.goals.length > 0 ? (
              userData.goals.map((goal) => {
                const percentage = Math.min(
                  (goal.currentAmount / goal.targetAmount) * 100,
                  100,
                );
                const status = getGoalStatus(goal);
                const statusColor = getStatusColor(status);
                const statusText = getStatusText(status);
                const statusIcon = getStatusIcon(status);
                const daysRemaining = getDaysRemaining(goal.deadline);

                return (
                  <Card
                    key={goal.id}
                    className="border-0 shadow-md flex-shrink-0 w-80 md:w-auto"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-lg text-foreground">
                              {goal.name}
                            </CardTitle>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                goal.priority,
                              )}`}
                            >
                              {goal.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {goal.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {daysRemaining > 0
                                ? `${daysRemaining} days left`
                                : `${Math.abs(daysRemaining)} days overdue`}
                            </span>
                            <span>{goal.category}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="p-1"
                            onClick={() => setEditingGoal(goal)}
                          >
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="p-1"
                            onClick={() => deleteGoal(goal.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Compact Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">
                              {formatAmount(goal.currentAmount)} /{" "}
                              {formatAmount(goal.targetAmount)}
                            </span>
                            <span className="text-sm font-bold text-teal-600">
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>

                        {/* Compact Details */}
                        <div className="text-xs text-muted-foreground">
                          Remaining:{" "}
                          <span className="font-semibold text-foreground">
                            {formatAmount(
                              goal.targetAmount - goal.currentAmount,
                            )}
                          </span>
                          {status !== "completed" && (
                            <span className="ml-2">
                              • Monthly target:{" "}
                              <span className="font-semibold">
                                {formatAmount(
                                  Math.ceil(
                                    (goal.targetAmount - goal.currentAmount) /
                                      Math.max(daysRemaining / 30, 1),
                                  ),
                                )}
                              </span>
                            </span>
                          )}
                        </div>

                        {/* Status and Actions */}
                        <div className="flex items-center justify-between">
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${statusColor}`}
                          >
                            {statusIcon}
                            {statusText}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setContributionGoal({
                                id: goal.id,
                                name: goal.name,
                              })
                            }
                            className="text-teal-600 border-teal-600 hover:bg-teal-50 h-7 px-3 text-xs"
                          >
                            Add {currencySymbol}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Target className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Goals Yet
                </h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Start setting financial goals to track your progress and stay
                  motivated.
                </p>
                <Button
                  onClick={() => setIsAddingGoal(true)}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Goal
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Goal Tips */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8 hover:shadow-md transition-all duration-200">
          <div className="bg-gray-50 rounded-t-xl p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
              <div className="bg-teal-100 rounded-full p-2">
                <Star className="w-5 h-5 text-teal-600" />
              </div>
              Goal Setting Tips
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      Be Specific
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Set clear, specific goals with exact amounts and deadlines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      Start Small
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Begin with achievable goals to build momentum
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      Track Progress
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Regularly update your progress to stay motivated
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      Celebrate Wins
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Acknowledge milestones and completed goals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <GoalForm
          isOpen={isAddingGoal}
          onClose={() => setIsAddingGoal(false)}
          onSuccess={() => setIsAddingGoal(false)}
        />

        <EditGoalForm
          isOpen={!!editingGoal}
          onClose={() => setEditingGoal(null)}
          goal={editingGoal}
          onSuccess={() => setEditingGoal(null)}
        />

        <GoalContributionForm
          isOpen={!!contributionGoal}
          onClose={() => setContributionGoal(null)}
          goalId={contributionGoal?.id || ""}
          goalName={contributionGoal?.name || ""}
          onSuccess={() => setContributionGoal(null)}
        />
      </div>
    </div>
  );
}
