# 💰 TurboCash - Personal Finance Management

<div align="center">
  <img src="https://cdn.builder.io/api/v1/image/assets%2F04d13addb2044aadacba8e1009bd55e0%2F9b1fbf9496d4481fa9cbf801318433b5?format=webp&width=800" alt="TurboCash Logo" width="120" height="120">

  <h3>TurboCharge Your Financial Future</h3>
  <p>A modern, intelligent personal finance management platform with comprehensive subscription tracking and dark mode support</p>

  ![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
  ![Version](https://img.shields.io/badge/version-2.0.0-blue)
  ![License](https://img.shields.io/badge/license-MIT-green)
  ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
  ![Dark Mode](https://img.shields.io/badge/dark_mode-supported-purple)
</div>

---

## 🚀 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### UI Components
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide-FE7A16?style=for-the-badge&logo=lucide&logoColor=white)

### Backend & Data
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Local Storage](https://img.shields.io/badge/Local_Storage-FFD700?style=for-the-badge&logo=html5&logoColor=white)
![Cross-Platform DB](https://img.shields.io/badge/Cross_Platform_DB-00D4AA?style=for-the-badge&logo=database&logoColor=white)

### Deployment
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Fly.io](https://img.shields.io/badge/Fly.io-8A2BE2?style=for-the-badge&logo=fly.io&logoColor=white)

---

## 🌟 Features

### 📊 **Dashboard & Analytics**
- **Real-time Financial Overview** - Complete snapshot of your financial health
- **Spending Breakdown** - Visual categorization with interactive charts
- **Monthly Trends** - Track income vs expenses over time
- **Smart Insights** - AI-powered recommendations for better financial decisions

### 💡 **Budget Management**
- **Category-based Budgets** - Set limits for different spending categories
- **Progress Tracking** - Visual indicators with color-coded alerts
- **Overspending Alerts** - Get notified before you exceed your budget
- **Flexible Periods** - Weekly, monthly, or yearly budget cycles

### 🎯 **Goal Tracking**
- **Visual Progress Indicators** - Beautiful progress bars and percentages
- **Multiple Goals** - Track savings, emergency funds, vacations, and more
- **Deadline Management** - Set target dates and track milestone progress
- **Achievement Celebrations** - Gamified experience with badges and rewards

### 🔄 **Advanced Subscription Management**
- **OTT Platform Tracking** - Monitor Netflix, Spotify, Amazon Prime, Disney+, HBO Max, and 12+ platforms
- **Smart Renewal Alerts** - Get notified before payments are due with customizable reminders
- **One-Click Cancellation** - Direct links to official platform cancellation pages
- **Financial Impact Analysis** - Real-time calculation of monthly and yearly subscription costs
- **Budget Integration** - See how subscriptions affect your overall financial health
- **Platform-Specific Icons** - Visual identification of all your services

### 📈 **Advanced Analytics**
- **CSV Import** - Upload bank statements for automatic categorization
- **Spending Patterns** - Identify trends and recurring expenses
- **Custom Date Filtering** - Analyze specific time periods
- **Export Reports** - Download your financial data

### 🎓 **Financial Learning**
- **Educational Content** - Learn about budgeting, investing, and financial planning
- **Interactive Courses** - Step-by-step guides with progress tracking
- **Achievement System** - Earn badges for completing courses and milestones

---

## �� Design Features

### 🌙 **Advanced Dark Mode Support**
- **Authenticated-Only Access** - Dark mode toggle only available to logged-in users
- **Seamless Theme Switching** - Instant light/dark mode transitions
- **High Contrast Design** - Optimized color schemes for better readability
- **Consistent Experience** - Uniform dark mode across all application pages
- **Smart Defaults** - Respects system preferences while maintaining user control

### 📱 **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized layouts
- Touch-friendly interactions

### ✨ **Modern UI/UX**
- Clean, minimalist design
- Smooth animations and transitions
- Intuitive navigation with bottom tab bar
- Accessible color contrasts and typography
- **Improved Dashboard Layout** - Compact spending breakdown with scrollable categories
- **Enhanced Key Insights** - Full-width layout with better visual hierarchy
- **Optimized Spacing** - Consistent card spacing and improved mobile experience

---

## 🆕 Recent Updates (v2.0.0)

### 🎯 **Latest Features**
- **Enhanced Subscription Management** - Added cancellation links for 12+ platforms
- **Authenticated Dark Mode** - Theme toggle only for logged-in users
- **Improved Dashboard Design** - Compact spending breakdown with better space utilization
- **Budget Sync Fix** - Proper tracking of all transactions within budget periods
- **Cross-Platform Database** - Extensible storage system for future cloud integration
- **Mobile Optimization** - Fixed bottom navigation overlap and improved spacing

### 🐛 **Bug Fixes**
- Fixed budget calculations to include all relevant transactions
- Resolved text visibility issues in dark mode
- Corrected subscription platform matching for cancellation URLs
- Improved password strength indicator functionality

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/turbocash.git
   cd turbocash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Demo Account
Try TurboCash instantly with our demo account:
- **Email:** demo@turbocash.com
- **Password:** demo123

---

## 📁 Project Structure

```
turbocash/
├── client/                 # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (buttons, cards, etc.)
│   │   └── forms/         # Form components
│   ├── contexts/          # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Application pages/routes
│   ├── lib/               # Utility functions
│   └── utils/             # Helper functions
├── server/                # Backend API server
│   └── routes/            # API route handlers
├── shared/                # Shared utilities between client/server
└── public/                # Static assets
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |

---

## 🎯 Key Features in Detail

### Smart Budgeting
- **Intelligent Categorization** - Automatically sorts transactions
- **Predictive Alerts** - Warns you before overspending
- **Visual Progress** - Color-coded progress bars
- **Flexible Periods** - Weekly, monthly, yearly budgets

### Goal Management
- **Multiple Goal Types** - Emergency fund, vacation, home purchase
- **Visual Tracking** - Circular progress indicators
- **Milestone Rewards** - Gamified achievement system
- **Smart Suggestions** - AI-powered saving recommendations

### Subscription Control
- **Platform Integration** - Direct cancellation links
- **Cost Optimization** - Identify unused subscriptions
- **Renewal Management** - Never miss a payment date
- **Impact Analysis** - See how subscriptions affect your budget

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- **Radix UI** for the excellent component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Vite** for the blazing fast development experience

---

<div align="center">
  <h3>Made with ���️ by the TurboCash Team</h3>
  <p>
    <a href="#" style="text-decoration: none;">🌟 Star this repo</a> |
    <a href="#" style="text-decoration: none;">🐛 Report Bug</a> |
    <a href="#" style="text-decoration: none;">💡 Request Feature</a>
  </p>
</div>
