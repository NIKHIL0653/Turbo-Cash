import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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
  Calendar,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Tv,
  Music,
  Film,
  Gamepad2,
  ExternalLink,
} from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { useCurrency } from "../hooks/useCurrency";

// OTT Service renewal URL mapping
const serviceRenewalUrls: Record<string, string> = {
  Netflix: "https://www.netflix.com/signup",
  "Amazon Prime": "https://www.amazon.in/prime",
  "Disney+": "https://www.hotstar.com/in/subscribe/plans",
  "Spotify Premium": "https://www.spotify.com/in/premium",
  "YouTube Premium": "https://www.youtube.com/premium",
  Hulu: "https://www.hulu.com/welcome",
  Max: "https://www.max.com/subscribe",
  "HBO Max": "https://www.max.com/subscribe",
  "Apple TV+": "https://tv.apple.com/in",
  "Paramount+": "https://www.paramountplus.com/account/signup/pickplan/",
  Peacock: "https://www.peacocktv.com/plans/all-monthly",
  "Xbox Game Pass": "https://www.xbox.com/en-IN/xbox-game-pass",
  "PlayStation Plus": "https://www.playstation.com/en-in/ps-plus/",
};

// Service cancellation URL mapping
const serviceCancellationUrls: Record<string, string> = {
  Netflix: "https://www.netflix.com/cancelplan",
  netflix: "https://www.netflix.com/cancelplan",
  "Amazon Prime": "https://www.primevideo.com/help?nodeId=GWGDSNXVPJ93UW5V",
  prime: "https://www.primevideo.com/help?nodeId=GWGDSNXVPJ93UW5V",
  "Disney+": "https://help.disneyplus.com/en-GB/article/disneyplus-en-fr-cancel",
  disney: "https://help.disneyplus.com/en-GB/article/disneyplus-en-fr-cancel",
  Spotify: "https://spotify.com/account",
  spotify: "https://spotify.com/account",
  "Spotify Premium": "https://spotify.com/account",
  "YouTube Premium": "https://support.google.com/youtube/answer/6308278?hl=en",
  youtube: "https://support.google.com/youtube/answer/6308278?hl=en",
  Hulu: "https://help.hulu.com/article/hulu-cancel-hulu-subscription",
  hulu: "https://help.hulu.com/article/hulu-cancel-hulu-subscription",
  "HBO Max": "https://www.hbomax.com/",
  hbo: "https://www.hbomax.com/",
  Max: "https://www.hbomax.com/",
  "Apple TV+": "https://support.apple.com/en-lamr/118398",
  apple: "https://support.apple.com/en-lamr/118398",
  "Paramount+": "https://www.paramountplus.com/account/",
  paramount: "https://www.paramountplus.com/account/",
  Peacock: "https://www.peacocktv.com/account/plans",
  peacock: "https://www.peacocktv.com/account/plans",
  "Xbox Game Pass": "https://account.microsoft.com/services/",
  xbox: "https://account.microsoft.com/services/",
  "PlayStation Plus": "https://account.sony.com/",
  playstation: "https://account.sony.com/",
};

// Helper function to get renewal URL for a service
const getServiceRenewalUrl = (serviceName: string): string | null => {
  // Try exact match first
  if (serviceRenewalUrls[serviceName]) {
    return serviceRenewalUrls[serviceName];
  }

  // Try case-insensitive partial match
  const lowerServiceName = serviceName.toLowerCase();
  for (const [key, url] of Object.entries(serviceRenewalUrls)) {
    if (
      key.toLowerCase().includes(lowerServiceName) ||
      lowerServiceName.includes(key.toLowerCase())
    ) {
      return url;
    }
  }

  return null;
};

// Helper function to get cancellation URL for a service
const getServiceCancellationUrl = (serviceName: string, platform?: string): string | null => {
  // Try exact match with service name first
  if (serviceCancellationUrls[serviceName]) {
    return serviceCancellationUrls[serviceName];
  }

  // Try exact match with platform if provided
  if (platform && serviceCancellationUrls[platform]) {
    return serviceCancellationUrls[platform];
  }

  // Try case-insensitive partial match with service name
  const lowerServiceName = serviceName.toLowerCase();
  for (const [key, url] of Object.entries(serviceCancellationUrls)) {
    if (
      key.toLowerCase().includes(lowerServiceName) ||
      lowerServiceName.includes(key.toLowerCase())
    ) {
      return url;
    }
  }

  // Try case-insensitive partial match with platform
  if (platform) {
    const lowerPlatform = platform.toLowerCase();
    for (const [key, url] of Object.entries(serviceCancellationUrls)) {
      if (
        key.toLowerCase().includes(lowerPlatform) ||
        lowerPlatform.includes(key.toLowerCase())
      ) {
        return url;
      }
    }
  }

  return null;
};

interface Subscription {
  id: string;
  name: string;
  platform: string;
  amount: number;
  billableMonths: number;
  purchaseDate: string;
  nextRenewal: string;
  isActive: boolean;
  userId: string;
}

const OTT_PLATFORMS = [
  { value: "netflix", label: "Netflix", icon: Tv, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netflix/netflix-original.svg" },
  { value: "prime", label: "Amazon Prime", icon: Film, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
  { value: "disney", label: "Disney+", icon: Film, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/disney/disney-original.svg" },
  { value: "spotify", label: "Spotify", icon: Music, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spotify/spotify-original.svg" },
  { value: "youtube", label: "YouTube Premium", icon: Tv, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/youtube/youtube-original.svg" },
  { value: "hulu", label: "Hulu", icon: Tv, logo: "https://img.icons8.com/color/48/hulu.png" },
  { value: "hbo", label: "HBO Max", icon: Film, logo: "https://img.icons8.com/color/48/hbo-max.png" },
  { value: "apple", label: "Apple TV+", icon: Film, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" },
  { value: "paramount", label: "Paramount+", icon: Film, logo: "https://img.icons8.com/color/48/paramount-plus.png" },
  { value: "peacock", label: "Peacock", icon: Tv, logo: "https://img.icons8.com/color/48/peacock.png" },
  { value: "xbox", label: "Xbox Game Pass", icon: Gamepad2, logo: "https://img.icons8.com/color/48/xbox.png" },
  { value: "playstation", label: "PlayStation Plus", icon: Gamepad2, logo: "https://img.icons8.com/color/48/playstation.png" },
  { value: "other", label: "Other", icon: DollarSign, logo: null },
];

export default function Recurring() {
  const {
    userData,
    addTransaction,
    addSubscription,
    updateSubscription,
    deleteSubscription,
  } = useUser();
  const { currencySymbol, formatAmount } = useCurrency();
  const subscriptions = userData.subscriptions;
  const [isAddingSubscription, setIsAddingSubscription] = useState(false);
  const [editingSubscription, setEditingSubscription] =
    useState<Subscription | null>(null);
  const [isEditingSubscription, setIsEditingSubscription] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    name: "",
    platform: "",
    amount: "",
    billableMonths: "1",
    purchaseDate: new Date().toISOString().split("T")[0],
  });

  // Calculate next renewal date
  const calculateNextRenewal = (
    purchaseDate: string,
    billableMonths: number,
  ) => {
    const date = new Date(purchaseDate);
    date.setMonth(date.getMonth() + billableMonths);
    return date.toISOString().split("T")[0];
  };

  // Check if renewal is coming soon (within 7 days)
  const isRenewalSoon = (nextRenewal: string) => {
    const renewalDate = new Date(nextRenewal);
    const today = new Date();
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  // Get days until renewal
  const getDaysUntilRenewal = (nextRenewal: string) => {
    const renewalDate = new Date(nextRenewal);
    const today = new Date();
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAddSubscription = () => {
    if (
      newSubscription.name &&
      newSubscription.platform &&
      newSubscription.amount
    ) {
      const subscription = {
        name: newSubscription.name,
        platform: newSubscription.platform,
        amount: parseFloat(newSubscription.amount),
        billableMonths: parseInt(newSubscription.billableMonths),
        purchaseDate: newSubscription.purchaseDate,
        nextRenewal: calculateNextRenewal(
          newSubscription.purchaseDate,
          parseInt(newSubscription.billableMonths),
        ),
        isActive: true,
      };

      addSubscription(subscription);

      // Add initial transaction
      addTransaction({
        description: `${subscription.name} Subscription`,
        amount: subscription.amount,
        category: "Entertainment",
        type: "expense",
        date: subscription.purchaseDate,
      });

      setNewSubscription({
        name: "",
        platform: "",
        amount: "",
        billableMonths: "1",
        purchaseDate: new Date().toISOString().split("T")[0],
      });
      setIsAddingSubscription(false);
    }
  };

  const editSubscription = (subscription: Subscription) => {
    setEditingSubscription({
      ...subscription,
      amount: subscription.amount,
      billableMonths: subscription.billableMonths,
    });
    setIsEditingSubscription(true);
  };

  const handleUpdateSubscription = () => {
    if (editingSubscription) {
      updateSubscription(editingSubscription.id, {
        ...editingSubscription,
        nextRenewal: calculateNextRenewal(
          editingSubscription.purchaseDate,
          editingSubscription.billableMonths,
        ),
      });
      setEditingSubscription(null);
      setIsEditingSubscription(false);
    }
  };

  const handleDeleteSubscription = (id: string) => {
    if (confirm("Are you sure you want to delete this subscription?")) {
      deleteSubscription(id);
    }
  };

  const renewSubscription = (subscription: Subscription) => {
    // Add renewal transaction
    addTransaction({
      description: `${subscription.name} Subscription Renewal`,
      amount: subscription.amount,
      category: "Entertainment",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    });

    // Update next renewal date
    updateSubscription(subscription.id, {
      nextRenewal: calculateNextRenewal(
        subscription.nextRenewal,
        subscription.billableMonths,
      ),
    });
  };

  // Calculate totals
  const totalMonthlySpend = (subscriptions || []).reduce((sum, sub) => {
    const monthlyAmount = sub.amount / sub.billableMonths;
    return sum + monthlyAmount;
  }, 0);

  const totalYearlySpend = totalMonthlySpend * 12;

  const upcomingRenewals = (subscriptions || []).filter((sub) =>
    isRenewalSoon(sub.nextRenewal),
  );

  const getPlatformIcon = (platform: string) => {
    const platformData = OTT_PLATFORMS.find((p) => p.value === platform);
    if (platformData?.logo) {
      return (
        <img
          src={platformData.logo}
          alt={platformData.label}
          className="w-6 h-6 object-contain"
          onError={(e) => {
            // Fallback to icon if logo fails to load
            const IconComponent = platformData.icon || DollarSign;
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
      );
    }
    const IconComponent = platformData?.icon || DollarSign;
    return <IconComponent className="w-5 h-5" />;
  };

  const getPlatformName = (platform: string) => {
    const platformData = OTT_PLATFORMS.find((p) => p.value === platform);
    return platformData?.label || platform;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Recurring Subscriptions
          </h1>
          <p className="text-muted-foreground">
            Track your subscriptions and get alerts before renewal dates.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Active Subscriptions
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {subscriptions?.length || 0}
                  </p>
                </div>
                <Tv className="w-8 h-8 text-teal-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Monthly Spend
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatAmount(totalMonthlySpend)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Yearly Impact
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatAmount(totalYearlySpend)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Renewal Alerts
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {upcomingRenewals.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Next 7 days</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Renewals Alert */}
        {upcomingRenewals.length > 0 && (
          <Card className="border-0 shadow-md mb-8 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="w-5 h-5" />
                Upcoming Renewals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingRenewals.map((subscription) => (
                  <div
                    key={subscription.id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-yellow-900 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getPlatformIcon(subscription.platform)}
                      <div>
                        <p className="font-semibold text-foreground">
                          {subscription.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Renews in{" "}
                          {getDaysUntilRenewal(subscription.nextRenewal)} days
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        {formatAmount(subscription.amount)}
                      </p>
                      {(() => {
                        const serviceUrl = getServiceRenewalUrl(
                          subscription.name,
                        );
                        if (serviceUrl) {
                          return (
                            <div className="space-y-2 mt-1">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    window.open(serviceUrl, "_blank")
                                  }
                                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  Renew on {subscription.name}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => renewSubscription(subscription)}
                                  className="text-teal-600 border-teal-600"
                                >
                                  Mark as Renewed
                                </Button>
                              </div>
                              {(() => {
                                const cancelUrl = getServiceCancellationUrl(subscription.name, subscription.platform);
                                if (cancelUrl) {
                                  return (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => window.open(cancelUrl, "_blank")}
                                      className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full flex items-center gap-1"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      Cancel Subscription
                                    </Button>
                                  );
                                }
                                return null;
                              })()}
                            </div>
                          );
                        } else {
                          return (
                            <Button
                              size="sm"
                              onClick={() => renewSubscription(subscription)}
                              className="bg-teal-500 hover:bg-teal-600 text-white mt-1"
                            >
                              Renew Now
                            </Button>
                          );
                        }
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Subscription Button */}
        <div className="mb-8">
          <Dialog
            open={isAddingSubscription}
            onOpenChange={setIsAddingSubscription}
          >
            <DialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Subscription
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Subscription</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={newSubscription.platform}
                    onValueChange={(value) =>
                      setNewSubscription({
                        ...newSubscription,
                        platform: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {OTT_PLATFORMS.map((platform) => (
                        <SelectItem key={platform.value} value={platform.value}>
                          <div className="flex items-center gap-2">
                            <platform.icon className="w-4 h-4" />
                            {platform.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name">Subscription Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Netflix Premium"
                    value={newSubscription.name}
                    onChange={(e) =>
                      setNewSubscription({
                        ...newSubscription,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="amount">Amount ({currencySymbol})</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newSubscription.amount}
                    onChange={(e) =>
                      setNewSubscription({
                        ...newSubscription,
                        amount: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="billableMonths">Billing Cycle (Months)</Label>
                  <Select
                    value={newSubscription.billableMonths}
                    onValueChange={(value) =>
                      setNewSubscription({
                        ...newSubscription,
                        billableMonths: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Monthly</SelectItem>
                      <SelectItem value="3">Quarterly</SelectItem>
                      <SelectItem value="6">Half-yearly</SelectItem>
                      <SelectItem value="12">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={newSubscription.purchaseDate}
                    onChange={(e) =>
                      setNewSubscription({
                        ...newSubscription,
                        purchaseDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddSubscription}
                    className="flex-1 bg-teal-500 hover:bg-teal-600"
                  >
                    Add Subscription
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingSubscription(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Subscriptions Grid */}
        {(subscriptions?.length || 0) > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(subscriptions || []).map((subscription) => {
              const daysUntilRenewal = getDaysUntilRenewal(
                subscription.nextRenewal,
              );
              const isExpiringSoon = isRenewalSoon(subscription.nextRenewal);

              return (
                <Card key={subscription.id} className="border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getPlatformIcon(subscription.platform)}
                        <div>
                          <CardTitle className="text-lg text-foreground dark:text-white">
                            {subscription.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground dark:text-gray-300">
                            {getPlatformName(subscription.platform)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1"
                          onClick={() => editSubscription(subscription)}
                        >
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1"
                          onClick={() =>
                            handleDeleteSubscription(subscription.id)
                          }
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Amount and Billing */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-semibold text-foreground dark:text-white">
                            {formatAmount(subscription.amount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Billing:
                          </span>
                          <span className="text-foreground dark:text-white">
                            Every {subscription.billableMonths} month
                            {subscription.billableMonths > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Monthly Cost:
                          </span>
                          <span className="text-foreground dark:text-white">
                            {formatAmount(
                              subscription.amount / subscription.billableMonths,
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Renewal Information */}
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-muted-foreground">
                            Next Renewal:
                          </span>
                          <span className="text-foreground dark:text-white">
                            {new Date(
                              subscription.nextRenewal,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Days Left:
                          </span>
                          <span
                            className={`font-medium ${
                              isExpiringSoon
                                ? "text-red-600"
                                : daysUntilRenewal <= 30
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          >
                            {daysUntilRenewal > 0
                              ? `${daysUntilRenewal} days`
                              : "Expired"}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge and Actions */}
                      <div className="flex flex-col items-center gap-3">
                        {isExpiringSoon ? (
                          <>
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                              <AlertTriangle className="w-4 h-4" />
                              Renewal Due Soon
                            </div>
                            {(() => {
                              const serviceUrl = getServiceRenewalUrl(
                                subscription.name,
                              );
                              if (serviceUrl) {
                                return (
                                  <div className="flex flex-col gap-2 w-full">
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        window.open(serviceUrl, "_blank")
                                      }
                                      className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 text-xs"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      Renew on {subscription.name}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        renewSubscription(subscription)
                                      }
                                      className="text-teal-600 border-teal-600 text-xs"
                                    >
                                      Mark as Renewed
                                    </Button>
                                    {(() => {
                                      const cancelUrl = getServiceCancellationUrl(subscription.name, subscription.platform);
                                      if (cancelUrl) {
                                        return (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => window.open(cancelUrl, "_blank")}
                                            className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs flex items-center gap-1"
                                          >
                                            <ExternalLink className="w-3 h-3" />
                                            Cancel
                                          </Button>
                                        );
                                      }
                                      return null;
                                    })()}
                                  </div>
                                );
                              } else {
                                return (
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      renewSubscription(subscription)
                                    }
                                    className="bg-teal-500 hover:bg-teal-600 text-white text-xs"
                                  >
                                    Renew Now
                                  </Button>
                                );
                              }
                            })()}
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                              <CheckCircle className="w-4 h-4" />
                              Active
                            </div>
                            {(() => {
                              const cancelUrl = getServiceCancellationUrl(subscription.name, subscription.platform);
                              if (cancelUrl) {
                                return (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(cancelUrl, "_blank")}
                                    className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs flex items-center gap-1"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    Cancel Subscription
                                  </Button>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-teal-600" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No Subscriptions Yet
              </h3>
              <p className="text-muted-foreground mb-8">
                Start tracking your subscriptions to get alerts before renewal
                dates and manage your recurring expenses.
              </p>
              <Button
                onClick={() => setIsAddingSubscription(true)}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Subscription
              </Button>
            </div>
          </div>
        )}

        {/* Edit Subscription Dialog */}
        <Dialog
          open={isEditingSubscription}
          onOpenChange={setIsEditingSubscription}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Subscription</DialogTitle>
            </DialogHeader>
            {editingSubscription && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="edit-platform">Platform</Label>
                  <Select
                    value={editingSubscription.platform}
                    onValueChange={(value) =>
                      setEditingSubscription({
                        ...editingSubscription,
                        platform: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {OTT_PLATFORMS.map((platform) => (
                        <SelectItem key={platform.value} value={platform.value}>
                          <div className="flex items-center gap-2">
                            <platform.icon className="w-4 h-4" />
                            {platform.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-name">Subscription Name</Label>
                  <Input
                    id="edit-name"
                    value={editingSubscription.name}
                    onChange={(e) =>
                      setEditingSubscription({
                        ...editingSubscription,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-amount">Amount ({currencySymbol})</Label>
                  <Input
                    id="edit-amount"
                    type="number"
                    value={editingSubscription.amount}
                    onChange={(e) =>
                      setEditingSubscription({
                        ...editingSubscription,
                        amount: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-billableMonths">
                    Billing Cycle (Months)
                  </Label>
                  <Select
                    value={editingSubscription.billableMonths.toString()}
                    onValueChange={(value) =>
                      setEditingSubscription({
                        ...editingSubscription,
                        billableMonths: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Monthly</SelectItem>
                      <SelectItem value="3">Quarterly</SelectItem>
                      <SelectItem value="6">Half-yearly</SelectItem>
                      <SelectItem value="12">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-purchaseDate">Purchase Date</Label>
                  <Input
                    id="edit-purchaseDate"
                    type="date"
                    value={editingSubscription.purchaseDate}
                    onChange={(e) =>
                      setEditingSubscription({
                        ...editingSubscription,
                        purchaseDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleUpdateSubscription}
                    className="flex-1 bg-teal-500 hover:bg-teal-600"
                  >
                    Update Subscription
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingSubscription(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
