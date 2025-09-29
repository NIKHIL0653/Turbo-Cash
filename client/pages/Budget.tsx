import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useUser } from "../contexts/UserContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Clock,
  Activity,
} from "lucide-react";
import {
  calculateDaysToNextBudgetPeriod,
  calculateBudgetRiskLevel,
  getRiskLevelColor,
  getRiskLevelText,
} from "../utils/budgetAnalytics";
import { useCurrency } from "../hooks/useCurrency";

interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  period: "weekly" | "monthly" | "yearly";
  startDate: string;
  userId: string;
}

export default function Budget() {
  const { userData, addBudget, updateBudget, deleteBudget } = useUser();
  const { currencySymbol, formatAmount } = useCurrency();
  const budgets = userData.budgets;

  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState<{
    category: string;
    allocated: string;
    period: "weekly" | "monthly" | "yearly";
  }>({
    category: "",
    allocated: "",
    period: "monthly",
  });
  const [editingBudget, setEditingBudget] = useState<any>(null);
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  const totalAllocated = budgets.reduce(
    (sum, budget) => sum + budget.allocated,
    0,
  );
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalAllocated - totalSpent;

  const getBudgetStatus = (budget: Budget) => {
    const percentage = (budget.spent / budget.allocated) * 100;
    if (percentage >= 100) return "exceeded";
    if (percentage >= 90) return "warning";
    if (percentage >= 75) return "caution";
    return "good";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "exceeded":
        return "bg-red-500";
      case "warning":
        return "bg-orange-500";
      case "caution":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "exceeded":
        return "Over Budget";
      case "warning":
        return "Budget Alert";
      case "caution":
        return "Monitor Closely";
      default:
        return "On Track";
    }
  };

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.allocated) {
      addBudget({
        category: newBudget.category,
        allocated: parseFloat(newBudget.allocated),
        period: newBudget.period,
        startDate: new Date().toISOString(),
      });
      setNewBudget({ category: "", allocated: "", period: "monthly" });
      setIsAddingBudget(false);
    }
  };

  const handleEditBudget = (budget: any) => {
    setEditingBudget({
      id: budget.id,
      category: budget.category,
      allocated: budget.allocated.toString(),
      period: budget.period,
    });
    setIsEditingBudget(true);
  };

  const handleUpdateBudget = () => {
    if (editingBudget && editingBudget.category && editingBudget.allocated) {
      updateBudget(editingBudget.id, {
        category: editingBudget.category,
        allocated: parseFloat(editingBudget.allocated),
        period: editingBudget.period,
      });
      setEditingBudget(null);
      setIsEditingBudget(false);
    }
  };

  const handleDeleteBudget = (id: string) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      deleteBudget(id);
    }
  };

  const overBudgetCategories = budgets.filter(
    (budget) => budget.spent > budget.allocated,
  );
  const warningCategories = budgets.filter((budget) => {
    const percentage = (budget.spent / budget.allocated) * 100;
    return percentage >= 90 && percentage < 100;
  });

  // Calculate high-risk budgets using analytics
  const highRiskBudgets = budgets.filter((budget) => {
    const riskAnalysis = calculateBudgetRiskLevel(
      budget,
      userData.transactions,
    );
    return (
      riskAnalysis.riskLevel === "high" || riskAnalysis.riskLevel === "critical"
    );
  });

  // Check if user has any budgets
  const hasBudgets = budgets.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Budget Management
          </h1>
          <p className="text-gray-600">
            {hasBudgets
              ? "Track your spending against budgets and get alerts before overspending."
              : "Create budgets for different categories to track your spending."}
          </p>
        </div>

        {/* Empty State for New Users */}
        {!hasBudgets && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <img
                  src="https://img.icons8.com/?size=100&id=22442&format=png&color=40C057"
                  alt="Budget icon"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No Budgets Yet
              </h3>
              <p className="text-muted-foreground mb-8">
                Start by creating your first budget to track spending in
                different categories and stay on track with your financial
                goals.
              </p>
              <Button
                onClick={() => setIsAddingBudget(true)}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Budget
              </Button>
            </div>
          </div>
        )}

        {/* Summary Cards - Only show when user has budgets */}
        {hasBudgets && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Total Budget
                  </p>
                  <p className="text-xl font-bold text-gray-900 mb-1">
                    {formatAmount(totalAllocated)}
                  </p>
                  <p className="text-xs text-gray-500">
                    This month
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
                    Total Spent
                  </p>
                  <p className="text-xl font-bold text-gray-900 mb-1">
                    {formatAmount(totalSpent)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {((totalSpent / totalAllocated) * 100).toFixed(1)}% of budget
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
                    Remaining
                  </p>
                  <p
                    className={`text-xl font-bold mb-1 ${
                      remainingBudget >= 0 ? "text-gray-900" : "text-gray-900"
                    }`}
                  >
                    {formatAmount(Math.abs(remainingBudget))}
                  </p>
                  <p className="text-xs text-gray-500">
                    {remainingBudget >= 0 ? "Available" : "Over budget"}
                  </p>
                </div>
                <div className={`rounded-full p-2 ${remainingBudget >= 0 ? "bg-gray-100" : "bg-gray-100"}`}>
                  {remainingBudget >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-gray-600" />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    High Risk
                  </p>
                  <p className="text-xl font-bold text-gray-900 mb-1">
                    {highRiskBudgets.length}
                  </p>
                  <p className="text-xs text-gray-500">
                    Budgets at risk
                  </p>
                </div>
                <div className="bg-gray-100 rounded-full p-2">
                  <AlertTriangle className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* High Risk Budgets Section - Only show when user has budgets */}
        {hasBudgets && highRiskBudgets.length > 0 && (
          <Card className="border-0 shadow-md mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertTriangle className="w-5 h-5" />
                High Risk Budgets ({highRiskBudgets.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {highRiskBudgets.map((budget) => {
                  const riskAnalysis = calculateBudgetRiskLevel(
                    budget,
                    userData.transactions,
                  );
                  const isOverBudget = budget.spent > budget.allocated;
                  const percentage = (budget.spent / budget.allocated) * 100;

                  return (
                    <div
                      key={budget.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        riskAnalysis.riskLevel === "critical"
                          ? "bg-red-50 border-red-200"
                          : "bg-orange-50 border-orange-200"
                      }`}
                    >
                      <div>
                        <p
                          className={`font-semibold ${
                            riskAnalysis.riskLevel === "critical"
                              ? "text-red-900"
                              : "text-orange-900"
                          }`}
                        >
                          {budget.category}
                        </p>
                        <p
                          className={`text-sm ${
                            riskAnalysis.riskLevel === "critical"
                              ? "text-red-700"
                              : "text-orange-700"
                          }`}
                        >
                          {isOverBudget
                            ? `Over budget by ${formatAmount(budget.spent - budget.allocated)}`
                            : riskAnalysis.daysToRunOut !== null &&
                                riskAnalysis.daysToRunOut <= 7
                              ? `Budget depletes in ${riskAnalysis.daysToRunOut} days`
                              : `High spending rate: ${formatAmount(riskAnalysis.averageDailySpend)}/day`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold ${
                            riskAnalysis.riskLevel === "critical"
                              ? "text-red-600"
                              : "text-orange-600"
                          }`}
                        >
                          {formatAmount(budget.spent)} /{" "}
                          {formatAmount(budget.allocated)}
                        </p>
                        <p
                          className={`text-sm ${
                            riskAnalysis.riskLevel === "critical"
                              ? "text-red-500"
                              : "text-orange-500"
                          }`}
                        >
                          {percentage.toFixed(1)}% used -{" "}
                          {getRiskLevelText(riskAnalysis.riskLevel)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Budget Button */}
        <div className="mb-6">
          <Dialog open={isAddingBudget} onOpenChange={setIsAddingBudget}>
            <DialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
                <Plus className="w-4 h-4 mr-2" />
                Add New Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Budget</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newBudget.category}
                    onValueChange={(value) =>
                      setNewBudget({ ...newBudget, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {userData.categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">
                    Budget Amount ({currencySymbol})
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newBudget.allocated}
                    onChange={(e) =>
                      setNewBudget({
                        ...newBudget,
                        allocated: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="period">Period</Label>
                  <Select
                    value={newBudget.period}
                    onValueChange={(value: "weekly" | "monthly" | "yearly") =>
                      setNewBudget({ ...newBudget, period: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddBudget} className="flex-1">
                    Create Budget
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingBudget(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Budget Categories Grid - Only show when user has budgets */}
        {hasBudgets && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map((budget) => {
              const percentage = Math.min(
                (budget.spent / budget.allocated) * 100,
                100,
              );
              const status = getBudgetStatus(budget);
              const statusColor = getStatusColor(status);
              const statusText = getStatusText(status);

              // Calculate analytics
              const daysToNext = calculateDaysToNextBudgetPeriod(budget);
              const riskAnalysis = calculateBudgetRiskLevel(
                budget,
                userData.transactions,
              );
              const riskColor = getRiskLevelColor(riskAnalysis.riskLevel);
              const riskText = getRiskLevelText(riskAnalysis.riskLevel);

              return (
                <Card key={budget.id} className="border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-foreground">
                          {budget.category}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground capitalize">
                          {budget.period} budget
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1"
                          onClick={() => handleEditBudget(budget)}
                        >
                          <Edit className="w-4 h-4 text-navy-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1"
                          onClick={() => handleDeleteBudget(budget.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="font-medium text-foreground">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-300 ${statusColor}`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Amount Details */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Spent:</span>
                          <span className="font-semibold text-foreground">
                            {formatAmount(budget.spent)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Budget:</span>
                          <span className="font-semibold text-foreground">
                            {formatAmount(budget.allocated)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium text-foreground">
                            Remaining:
                          </span>
                          <span
                            className={`font-bold ${
                              budget.allocated - budget.spent >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            $
                            {Math.abs(budget.allocated - budget.spent).toFixed(
                              2,
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Analytics Section */}
                      <div className="space-y-3 border-t pt-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Next period:
                            </span>
                          </div>
                          <span className="font-medium text-foreground">
                            {daysToNext} day{daysToNext !== 1 ? "s" : ""}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Activity className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Risk level:
                            </span>
                          </div>
                          <span className={`font-medium ${riskColor}`}>
                            {riskText}
                          </span>
                        </div>

                        {riskAnalysis.daysToRunOut !== null &&
                          riskAnalysis.daysToRunOut > 0 && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Budget depletes in:
                              </span>
                              <span
                                className={`font-medium ${riskAnalysis.daysToRunOut <= 7 ? "text-red-600" : "text-foreground"}`}
                              >
                                {riskAnalysis.daysToRunOut} day
                                {riskAnalysis.daysToRunOut !== 1 ? "s" : ""}
                              </span>
                            </div>
                          )}

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Avg daily spend:
                          </span>
                          <span className="font-medium text-foreground">
                            {formatAmount(riskAnalysis.averageDailySpend)}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center justify-between">
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${statusColor}`}
                        >
                          {status === "good" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <AlertTriangle className="w-3 h-3" />
                          )}
                          {statusText}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {budget.period}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Edit Budget Dialog */}
        <Dialog open={isEditingBudget} onOpenChange={setIsEditingBudget}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Budget</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingBudget?.category || ""}
                  onValueChange={(value) =>
                    setEditingBudget((prev) =>
                      prev ? { ...prev, category: value } : null,
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {userData.categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-amount">
                  Budget Amount ({currencySymbol})
                </Label>
                <Input
                  id="edit-amount"
                  type="number"
                  placeholder="0.00"
                  value={editingBudget?.allocated || ""}
                  onChange={(e) =>
                    setEditingBudget((prev) =>
                      prev ? { ...prev, allocated: e.target.value } : null,
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-period">Period</Label>
                <Select
                  value={editingBudget?.period || "monthly"}
                  onValueChange={(value: "weekly" | "monthly" | "yearly") =>
                    setEditingBudget((prev) =>
                      prev ? { ...prev, period: value } : null,
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleUpdateBudget}
                  className="flex-1 bg-teal-500 hover:bg-teal-600"
                >
                  Update Budget
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditingBudget(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Budget Tips */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8 hover:shadow-md transition-all duration-200">
          <div className="bg-gray-50 rounded-t-xl p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
              <div className="bg-teal-100 rounded-full p-2">
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              Budget Tips
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-teal-50 rounded-lg border border-teal-200 hover:bg-teal-100 transition-all duration-200">
                <h3 className="font-semibold text-teal-800 mb-3 text-lg">
                  50/30/20 Rule
                </h3>
                <p className="text-sm text-teal-700 leading-relaxed">
                  Allocate 50% for needs, 30% for wants, and 20% for savings and
                  debt repayment.
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-all duration-200">
                <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                  Track Daily
                </h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Check your budgets daily to stay aware of your spending
                  patterns and avoid surprises.
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-all duration-200">
                <h3 className="font-semibold text-green-800 mb-3 text-lg">
                  Buffer Zone
                </h3>
                <p className="text-sm text-green-700 leading-relaxed">
                  Set budgets slightly lower than you can afford to create a
                  natural buffer for unexpected expenses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
