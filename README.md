<div align="center">

<img src="screenshots/logo.jpeg" alt="Finotify Logo" width="100"/>

# 💰 Finotify

### Automated personal finance tracking for Android — powered by SMS intelligence

[![React Native](https://img.shields.io/badge/React_Native-Expo-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Railway](https://img.shields.io/badge/Deployed-Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white)](https://railway.app)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io)

</div>

---

## 🚩 The Problem

Most people give up on expense tracking apps within days — not because they lack discipline, but because the apps demand constant manual input. Entering every transaction by hand is tedious, prone to errors, and easy to forget.

**Finotify removes that barrier entirely.**

It reads UPI and bank SMS messages directly on the device, parses them automatically, and builds a complete financial record without any manual effort. For everything else — cash transactions, salary credits, custom entries — users can add records manually too, making it a single source of truth for personal finance.

---

## ✨ Features

**📲 Automated SMS Transaction Detection**
Scans the device inbox for UPI and bank messages using pattern-matched regex. Identifies transaction type (credit/debit), amount, merchant, and bank — and logs the entry instantly without user intervention.

**🔄 Incremental Scan Engine**
On refresh, the app scans only from the last recorded entry's timestamp — no duplicates, no missed transactions across sessions.

**📊 Dashboard with Filters**
Tabbed transaction view across All / Income / Expense. Supports keyword search, category filters, sort options, and custom date ranges for fast financial review.

**✏️ Manual Entry Support**
Users can add income or expense entries by hand — covering cash payments, salary, and any transaction not captured via SMS.

**🗓️ Due Payments Tracker**
A dedicated screen to track money you owe or are owed. Supports Pay / Receive types with notes and due dates.

**📈 Financial Stats**
Visual donut chart showing income vs expense breakdown. Supports This Week, This Month, and Custom date range views.

**🔐 Secure Authentication**
JWT-based login and registration with forgot password flow. OTP delivered to registered email via transactional email API.

**🗑️ Soft Delete**
Deleted entries are flagged in the database — not permanently removed — preventing them from being re-inserted on the next SMS scan.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| 📱 Mobile Frontend | React Native (Expo Router) |
| ⚙️ Backend API | Node.js, Express.js |
| 🗄️ Database | MongoDB Atlas |
| 🔑 Authentication | JWT |
| 📧 Email (OTP) | Brevo Transactional API |
| 🚀 Deployment | Railway |
| 📦 APK Build | EAS (Expo Application Services) |

---

## 🏗️ Architecture

```
FINOTIFY-2/
├── app/                        # React Native screens (Expo Router)
│   ├── authentication/         # Login, Signup, Forgot Password, OTP
│   ├── dashboard/              # Main dashboard, filters, manual entry
│   ├── charts/                 # Financial stats screen
│   ├── due-payment/            # Due management screen
│   └── user-settings/          # Profile and settings
│
├── assets/                     # App icon and images
├── constants/                  # Config (BASE_URL)
│
└── BACKEND/
    └── src/
        ├── app.js              # Express app entry point
        ├── server.js           # Server startup
        ├── db/                 # MongoDB connection
        └── routes/             # Auth, Dashboard, Due, SMS, Feedback, Password
```

---

## ⚙️ How It Works

1. 🔐 User registers and logs in → JWT token stored locally via AsyncStorage
2. 📩 App requests SMS read permission on Android
3. 🔍 On load or refresh, device inbox is scanned for bank/UPI messages
4. 🧠 Regex engine identifies transaction type, amount, merchant, and bank
5. 💾 New entries (after last saved timestamp) are sent to the backend and stored in MongoDB
6. 📋 Dashboard renders live data with filtering and search
7. 📊 Stats screen aggregates data into income/expense visualizations
8. 🗓️ Due screen tracks pending payments and receivables separately
9. 🔑 Forgot password → OTP sent to email → user resets password

---

## 📸 Screenshots

| Welcome | Login | Register |
|---|---|---|
| ![](screenshots/welcome.png) | ![](screenshots/login.png) | ![](screenshots/register.png) |

| Dashboard | Filters | Stats |
|---|---|---|
| ![](screenshots/dashboard.png) | ![](screenshots/filters.png) | ![](screenshots/stats.png) |

| Due Management | Add Due Entry | Settings |
|---|---|---|
| ![](screenshots/due.png) | ![](screenshots/add_due.png) | ![](screenshots/settings.png) |

---

## 🗄️ Data Models

**📋 Dashboard (Transactions)**
`amount`, `bankName`, `category`, `type` (income/expense), `date`, `desc`, `upiId`, `user` (ref), `deletedByUser`, `createdAt`

**🗓️ Due Records**
`type` (pay/receive), `name`, `amount`, `note`, `date`, `user` (ref)

**👤 Users**
`name`, `phonenumber`, `email`, `password`, `since`

---

## 🔮 Future Enhancements

- 💱 Multi-currency support
- 🤖 AI-powered auto-categorization of expenses
- 📶 Offline storage for data access without internet
- 📄 Bank statement import via Excel or PDF
- 🏦 Expanded transaction support for NEFT, RTGS
- 📊 Smart spending reports with insights

---

## 👥 Team

Built as a final semester grand project at Asia Pacific BCA College, Ahmedabad — submitted to Gujarat University under the Faculty of Computer Applications.

- Shaikh Mohammed Zisan Naib Husen
- Mansuri Sahil Sakilbhai
- Momin Mohammad Musab Sijauddin
