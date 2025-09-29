import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  PieChart,
  TrendingUp,
  Target,
  Shield,
  Smartphone,
  DollarSign,
  BarChart3,
  Users,
  Star,
  AlertTriangle,
  Tv,
  Music,
  Film,
  Upload,
  FileText,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function Index() {

  const features = [
    {
      icon: <PieChart className="w-12 h-12 text-teal-500" />,
      title: "Expense Analytics",
      description:
        "Visualize your spending patterns with beautiful charts and detailed breakdowns.",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-teal-500" />,
      title: "Smart Budgeting",
      description:
        "Set budgets that work for you and track your progress in real-time.",
    },
    {
      icon: <Target className="w-12 h-12 text-teal-500" />,
      title: "Goal Tracking",
      description:
        "Set financial goals and watch your progress with visual indicators.",
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-teal-500" />,
      title: "Insights & Trends",
      description:
        "Get actionable insights and recommendations to improve your finances.",
    },
    {
      icon: <Shield className="w-12 h-12 text-teal-500" />,
      title: "Secure & Private",
      description:
        "Your financial data is encrypted and protected with bank-level security.",
    },
    {
      icon: <Smartphone className="w-12 h-12 text-teal-500" />,
      title: "Mobile Ready",
      description:
        "Access your finances anywhere with our responsive mobile design.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content:
        "TurboCash helped me save $2,000 in just 3 months by showing me exactly where my money was going. The insights are incredible!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Software Engineer",
      content:
        "Finally, a finance app that doesn't overwhelm you with features. Clean, simple, and effective. Love the goal tracking!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Teacher",
      content:
        "The budgeting tools are game-changers. I can now plan for vacations and big purchases without stress.",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "Freelance Designer",
      content:
        "As a freelancer with irregular income, TurboCash helps me manage my finances better than any other app I've tried.",
      rating: 5,
    },
    {
      name: "Lisa Parker",
      role: "Small Business Owner",
      content:
        "The subscription tracking feature alone saved me $500/year by helping me cancel unused services. Highly recommend!",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Student",
      content:
        "Perfect for students on a tight budget. The goal tracking keeps me motivated to save for my study abroad trip!",
      rating: 5,
    },
    {
      name: "Rachel Green",
      role: "Nurse",
      content:
        "Simple, intuitive, and powerful. TurboCash made budgeting fun instead of stressful. Love the progress visualizations!",
      rating: 5,
    },
    {
      name: "Alex Thompson",
      role: "Consultant",
      content:
        "The analytics are incredibly detailed yet easy to understand. It's like having a personal financial advisor in my pocket.",
      rating: 5,
    },
    {
      name: "Maya Patel",
      role: "Content Creator",
      content:
        "Been using TurboCash for 6 months now. My savings rate increased by 40% thanks to their smart insights and alerts.",
      rating: 5,
    },
  ];



      return (
    <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                                          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight">
                TurboCharge Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600">
                  Finances
                </span>
              </h1>
                                          <p className="text-xl text-navy-600 mt-6 leading-relaxed">
                Get smart insights on your expenses, set goals, and take control
                of your money. Transform your financial future with data-driven
                decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 text-lg"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-teal-500 text-teal-600 hover:bg-teal-50 px-8 py-4 text-lg"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-500" />
                                                        <span className="text-navy-600">10K+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                        <span className="text-navy-600">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-teal-500" />
                                                        <span className="text-navy-600">Free to Start</span>
                </div>
              </div>
            </div>
            <div className="relative">
              {/* Dashboard Preview */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-4 mb-4">
                  <h3 className="text-white font-semibold text-lg">
                    Dashboard Overview
                  </h3>
                  <p className="text-teal-100">March 2024</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <p className="text-sm text-red-700">Total Expenses</p>
                      <p className="font-bold text-red-800">$2,456</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700">Saved</p>
                      <p className="font-bold text-green-800">+$544</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-navy-600">Food</span>
                      <span className="font-bold text-navy-900">$682</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <div className="bg-blue-50 p-2 rounded border border-blue-200 flex-1">
                      <p className="text-blue-800 font-medium">Budget on track</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Everything you need to manage your money
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Powerful features designed to give you complete control over your
              financial life
            </p>
          </div>

          {/* Feature Showcase Cards */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Dashboard Feature */}
              <div>
                                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  Comprehensive Dashboard
                </h3>
                <p className="text-lg text-navy-600 mb-6">
                  Get a complete overview of your finances at a glance. Track
                  expenses, monitor budgets, and see your financial goals all in
                  one beautiful dashboard.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">
                      Real-time expense tracking
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">
                      Monthly spending trends
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">
                      Budget progress indicators
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">Goal tracking widgets</span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="bg-gray-100 rounded-xl p-6 shadow-lg">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-navy-900">
                      March Overview
                    </h4>
                    <span className="text-sm text-teal-600">+12% savings</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <p className="text-sm text-red-700">Total Spent</p>
                      <p className="text-xl font-bold text-red-800">$2,456</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700">Saved</p>
                      <p className="text-xl font-bold text-green-800">$544</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-navy-600">Food</span>
                      <span className="font-bold text-navy-900">$682</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-blue-50 p-2 rounded text-xs border border-blue-200 flex-1">
                        <p className="text-blue-800 font-medium">Spending insights updated</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Analytics Feature */}
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-xl p-6 shadow-lg">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-navy-900 mb-4">
                      Spending Analysis
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Housing</span>
                        </div>
                        <span className="text-sm font-semibold">
                          $1,200 (49%)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm">Food</span>
                        </div>
                        <span className="text-sm font-semibold">
                          $682 (28%)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Transport</span>
                        </div>
                        <span className="text-sm font-semibold">
                          $245 (10%)
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-blue-500 w-2/5"></div>
                      <div className="bg-red-500 w-1/4"></div>
                      <div className="bg-green-500 w-1/5"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  Advanced Analytics
                </h3>
                <p className="text-lg text-navy-600 mb-6">
                  Upload your bank statements and get instant insights. Our
                  smart categorization engine automatically sorts your
                  transactions and identifies spending patterns.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">
                      CSV import from any bank
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">
                      Automatic categorization
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">
                      Spending trend analysis
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">Custom date filtering</span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Budget Feature */}
              <div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  Smart Budgeting
                </h3>
                <p className="text-lg text-navy-600 mb-6">
                  Set budgets that work for you and get alerts before you
                  overspend. Track your progress with beautiful visual
                  indicators and stay on top of your finances.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">
                      Category-based budgets
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">Overspending alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">Progress tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">Monthly summaries</span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="bg-gray-100 rounded-xl p-6 shadow-lg">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-navy-900 mb-4">
                    Food Budget
                  </h4>
                  <div className="flex justify-between text-sm mb-2">
                    <span>$485 of $600 spent</span>
                    <span className="text-green-600">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-green-500 h-3 rounded-full w-4/5"></div>
                  </div>
                  <div className="flex justify-between text-xs text-navy-500">
                    <span>$115 remaining</span>
                    <span className="text-green-600">On track</span>
                  </div>
                  <div className="mt-4 p-2 bg-green-50 rounded border border-green-200">
                    <p className="text-xs text-green-700">
                      ✓ You're doing great! Stay within $38/week to meet your
                      goal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Goals Feature */}
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-xl p-6 shadow-lg">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-navy-900 mb-4">
                      Emergency Fund
                    </h4>
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-gray-200"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 32}`}
                            strokeDashoffset={`${2 * Math.PI * 32 * (1 - 0.57)}`}
                            className="text-teal-500"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold text-navy-900">
                            57%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-navy-600">Saved:</span>
                        <span className="font-semibold">$8,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-navy-600">Target:</span>
                        <span className="font-semibold">$15,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">Remaining:</span>
                        <span className="font-bold text-teal-600">$6,500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  Goal Tracking
                </h3>
                <p className="text-lg text-navy-600 mb-6">
                  Set financial goals and watch your progress with beautiful
                  visual indicators. Whether it's an emergency fund, vacation,
                  or major purchase, stay motivated with clear milestones.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">
                      Visual progress tracking
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">Multiple goal support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">
                      Deadline notifications
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600">
                      Milestone celebrations
                    </span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            {/* Subscription Tracking Section */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
              <div>
                                <h3 className="text-3xl font-bold text-navy-900 mb-6">
                  Subscription Tracking
                </h3>
                                <p className="text-xl text-navy-600 mb-8 leading-relaxed">
                  Never miss a renewal again! Track all your subscriptions in
                  one place, get alerts before payments, and understand their
                  impact on your finances.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600 text-lg">
                      Track OTT platforms and services
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600 text-lg">
                      Renewal date alerts
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600 text-lg">
                      Monthly and yearly cost analysis
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-navy-600 text-lg">
                      Impact on overall budget
                    </span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white text-lg px-8 py-3">
                    Get Started
                  </Button>
                </Link>
              </div>
                            <div className="bg-gray-100 rounded-xl p-6 shadow-lg">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h4 className="font-semibold text-navy-900 mb-4">
                    Your Subscriptions
                  </h4>
                  <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tv className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium">Netflix</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold">₹649/mo</span>
                        <p className="text-xs text-green-600">
                          Renews in 5 days
                        </p>
                      </div>
                    </div>
                                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Music className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">Spotify</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold">₹119/mo</span>
                        <p className="text-xs text-green-600">Active</p>
                      </div>
                    </div>
                                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Film className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Prime Video</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold">₹125/mo</span>
                        <p className="text-xs text-orange-600">Yearly plan</p>
                      </div>
                    </div>
                  </div>
                                    <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
                                        <p className="text-xs text-red-700">
                      ⚠️ Total monthly impact: ₹893 - 12% of your budget
                    </p>
                  </div>
                </div>
              </div>
                </div>
              </div>
            </section>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-navy-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
            <section className="py-20 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-navy-600 mb-6 leading-relaxed">
                At TurboCash, we believe that everyone deserves access to
                powerful financial tools. We're on a mission to democratize
                personal finance management by making it simple, beautiful, and
                actionable.
              </p>
              <p className="text-lg text-navy-600 mb-8 leading-relaxed">
                Founded by a team of finance professionals and technology
                experts, we've experienced firsthand the frustration of
                complicated budgeting apps. That's why we built TurboCash - to
                give you the insights you need without the complexity you don't
                want.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-500 mb-2">
                    10K+
                  </div>
                  <div className="text-navy-600">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-500 mb-2">
                    $2M+
                  </div>
                  <div className="text-navy-600">Money Saved</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">
                    Our Promise
                  </h3>
                </div>
                <ul className="space-y-4 text-navy-600">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    Simple, intuitive design
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    Bank-level security
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    Actionable insights
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    Ongoing support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
            <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              What our users say
            </h2>
            <p className="text-xl text-navy-600">
              Real stories from people who transformed their finances
            </p>
          </div>

          {/* Marquee Grid Layout */}
          <div className="relative h-[600px] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              {/* Column 1 */}
              <div className="flex flex-col animate-marquee-up space-y-6">
                {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map(
                  (testimonial, index) => (
                    <Card
                      key={`col1-${index}`}
                      className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <p className="text-navy-600 mb-4 italic text-sm leading-relaxed">
                          "{testimonial.content}"
                        </p>
                        <div className="border-t border-gray-100 pt-3">
                          <p className="font-semibold text-navy-900 text-sm">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-navy-500">
                            {testimonial.role}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col animate-marquee-down space-y-6">
                {[...testimonials.slice(3, 6), ...testimonials.slice(3, 6)].map(
                  (testimonial, index) => (
                    <Card
                      key={`col2-${index}`}
                      className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <p className="text-navy-600 mb-4 italic text-sm leading-relaxed">
                          "{testimonial.content}"
                        </p>
                        <div className="border-t border-gray-100 pt-3">
                          <p className="font-semibold text-navy-900 text-sm">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-navy-500">
                            {testimonial.role}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>

              {/* Column 3 */}
              <div className="flex flex-col animate-marquee-up space-y-6">
                {[...testimonials.slice(6, 9), ...testimonials.slice(6, 9)].map(
                  (testimonial, index) => (
                    <Card
                      key={`col3-${index}`}
                      className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <p className="text-navy-600 mb-4 italic text-sm leading-relaxed">
                          "{testimonial.content}"
                        </p>
                        <div className="border-t border-gray-100 pt-3">
                          <p className="font-semibold text-navy-900 text-sm">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-navy-500">
                            {testimonial.role}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            </div>

            {/* Fade gradients */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to take control of your finances?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of users who have already transformed their financial
            lives with TurboCash
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 text-lg"
              >
                Start Free Today
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 text-lg"
              >
                Sign In
              </Button>
            </Link>
          </div>
          <p className="text-teal-100 mt-4">
            No credit card required • 14-day free trial
          </p>
        </div>
      </section>
    </div>
  );
}
