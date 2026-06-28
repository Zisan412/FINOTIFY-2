Manual expense tracking fails in practice people forget entries, miscategorize transactions, or abandon the app within days.

Finotify eliminates that friction entirely. It reads UPI and bank transaction SMS messages directly on the device, parses them automatically, and builds a complete financial record without any manual input. Users can also add income or expenses manually when needed, making it a comprehensive solution for daily personal finance management.


Features

Automated Transaction Detection

Parses UPI and bank SMS messages using pattern-matched regex. Identifies transaction type (credit/debit), amount, and merchant — and logs the entry instantly without user intervention.

Incremental Scan Engine

On refresh, the app scans only from the last recorded entry timestamp — preventing duplicates and ensuring no transaction is missed across sessions.

Dashboard & Filtering

Tabbed transaction view (All / Income / Expense) with keyword search and custom date range filters for quick financial review.

Manual Entry Support

Users can manually add income or expense entries, ensuring all financial activity is captured in one place — even transactions that don't come through SMS.

Due Payments Tracker

Dedicated screen for tracking upcoming or pending payments, helping users stay on top of recurring obligations.

Monthly Statistics & Reports

Visual breakdown of income vs. expense trends across months. Helps users understand spending patterns and plan finances effectively.

Secure Authentication

JWT-based login and registration. Password recovery via OTP delivered through transactional email API.

Soft Delete

Deleted entries are flagged in the database rather than permanently removed — preventing re-insertion on the next SMS scan.


Tech Stack

LayerTechnologyMobile FrontendReact Native (Expo Router)Backend APINode.js, Express.jsDatabaseMongoDB AtlasAuthenticationJWTDeploymentRailwayBuildEAS (Expo Application Services)


Architecture

FINOTIFY-2/
├── FRONTEND/               # React Native (Expo Router)
│   ├── app/                # Screens — Dashboard, Stats, Auth, Due
│   └── components/         # Shared UI components
│
└── BACKEND/                # REST API
    └── src/
        ├── app.js          # Express application
        ├── server.js       # Entry point
        ├── db/             # MongoDB connection
        └── routes/         # API route definitions


How It Works


User authenticates → JWT token issued and stored locally
App reads device SMS inbox and applies regex patterns to detect bank/UPI transactions
Parsed data (amount, type, merchant, date) is sent to the backend and stored in MongoDB Atlas
Dashboard displays live transaction data with filters and search
On each refresh, only messages since the last entry are processed — no duplicates
Stats screen aggregates data for monthly income/expense visualization
Due screen tracks upcoming payments separately from regular transactions



Screenshots

WelcomeDashboardManual EntryShow ImageShow ImageShow Image

StatsDue PaymentsSettingsShow ImageShow ImageShow Image


To add screenshots: create a screenshots/ folder in the repo root and upload your images with the filenames above.




Team

NameRoleZisanFull Stack DevelopmentMusabFull Stack DevelopmentSahilFull Stack Development


Status

Developed and demonstrated as part of BCA Semester 6 project evaluation at Asia Pacific BCA College, Ahmedabad.

APK available on request.
