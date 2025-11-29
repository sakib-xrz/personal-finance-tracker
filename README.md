# Personal Finance Tracker - Client-Side Data Fetching

A modern personal finance tracking application built with Next.js 16, React Query, and Prisma, featuring Bengali language support.

## 🚀 Features

### Data Fetching
- ✅ **Client-side data fetching** with React Query
- ✅ **API Routes** instead of Server Actions
- ✅ **Automatic caching** and background refetching
- ✅ **Optimistic updates** ready

### User Experience
- ✅ **Skeleton loading states** for all components
- ✅ **Dual error handling** (Toast + Alert Banner)
- ✅ **Bengali language** support throughout
- ✅ **Responsive design** for all devices
- ✅ **Real-time updates** without page refresh

### Technical Features
- ✅ **TypeScript** for type safety
- ✅ **Zod validation** with custom Bengali error messages
- ✅ **Prisma ORM** for database operations
- ✅ **React Query** for state management
- ✅ **Sonner** for toast notifications

## 📁 Project Structure

```
personal-finance-tracker/
├── app/
│   ├── api/
│   │   └── transactions/
│   │       ├── route.ts              # GET, POST transactions
│   │       ├── [id]/route.ts         # GET, PATCH, DELETE by ID
│   │       └── stats/route.ts        # GET statistics
│   ├── layout.tsx                    # Root layout with providers
│   └── page.tsx                      # Home page (client component)
├── components/
│   ├── finance/
│   │   ├── add-transaction-dialog.tsx
│   │   ├── edit-transaction-dialog.tsx
│   │   ├── header.tsx
│   │   ├── statistics-chart.tsx
│   │   ├── summary-cards.tsx
│   │   ├── transaction-list.tsx
│   │   └── transaction-tabs.tsx
│   ├── providers/
│   │   └── react-query-provider.tsx  # React Query setup
│   ├── ui/
│   │   ├── error-alert.tsx           # Error banner component
│   │   ├── skeleton.tsx              # Base skeleton
│   │   └── skeletons.tsx             # All skeleton variants
│   └── finance-tracker.tsx           # Main component
├── hooks/
│   └── use-transactions.ts           # React Query hooks
├── lib/
│   ├── api-utils.ts                  # API utility functions
│   ├── bengali-utils.ts              # Bengali number/date utils
│   └── finance-data.ts               # Type definitions
└── prisma/
    └── schema.prisma                 # Database schema
```

## 🔧 API Routes

### Transactions

#### `GET /api/transactions`
Fetch all transactions with optional filters.

**Query Parameters:**
- `type` (optional): `income` | `expense` | `savings`
- `month` (optional): Bengali month string (e.g., "জানুয়ারি ২০২৫")
- `description` (optional): Filter by description

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "...",
      "amount": 1000,
      "date": "2025-01-15",
      "description": "...",
      "type": "income",
      "month": "জানুয়ারি ২০২৫"
    }
  ]
}
```

#### `POST /api/transactions`
Create a new transaction.

**Request Body:**
```json
{
  "title": "Salary",
  "amount": 50000,
  "date": "2025-01-15",
  "description": "Monthly salary",
  "type": "income"
}
```

#### `GET /api/transactions/[id]`
Fetch a single transaction by ID.

#### `PATCH /api/transactions/[id]`
Update a transaction.

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "amount": 60000,
  "date": "2025-01-16",
  "description": "Updated description",
  "type": "income"
}
```

#### `DELETE /api/transactions/[id]`
Delete a transaction.

#### `GET /api/transactions/stats`
Get transaction statistics.

**Query Parameters:**
- `month` (optional): Bengali month string

**Response:**
```json
{
  "success": true,
  "data": {
    "totals": {
      "income": 50000,
      "expense": 30000,
      "savings": 10000,
      "balance": 10000
    },
    "counts": {
      "total": 15,
      "income": 5,
      "expense": 8,
      "savings": 2
    },
    "descriptionBreakdown": {
      "Salary": { "income": 50000, "expense": 0, "savings": 0 }
    }
  }
}
```

## 🎣 React Query Hooks

### `useTransactions(filters?)`
Fetch transactions with optional filters.

```tsx
const { data, isLoading, error } = useTransactions({ 
  month: "জানুয়ারি ২০২৫",
  type: "income" 
})
```

### `useTransactionStats(month?)`
Fetch transaction statistics.

```tsx
const { data, isLoading, error } = useTransactionStats("জানুয়ারি ২০২৫")
```

### `useCreateTransaction()`
Create a new transaction.

```tsx
const createMutation = useCreateTransaction()

createMutation.mutate({
  title: "Salary",
  amount: 50000,
  date: "2025-01-15",
  description: "Monthly salary",
  type: "income"
})
```

### `useUpdateTransaction()`
Update an existing transaction.

```tsx
const updateMutation = useUpdateTransaction()

updateMutation.mutate({
  id: "transaction-id",
  amount: 60000
})
```

### `useDeleteTransaction()`
Delete a transaction.

```tsx
const deleteMutation = useDeleteTransaction()

deleteMutation.mutate("transaction-id")
```

## 🎨 Skeleton Components

All loading states use skeleton components:

```tsx
import {
  TransactionListSkeleton,
  SummaryCardSkeleton,
  StatisticsChartSkeleton,
  TransactionTabsSkeleton,
} from "@/components/ui/skeletons"
```

## ⚠️ Error Handling

### Toast Notifications
Automatic toast notifications for all mutations:
- ✅ Success: "লেনদেন সফলভাবে তৈরি হয়েছে"
- ❌ Error: Shows specific error message

### Alert Banners
Persistent error banners for data fetching failures:

```tsx
<ErrorAlert
  title="ডেটা লোড করতে সমস্যা হয়েছে"
  message={errorMessage}
  onDismiss={() => setShowError(false)}
/>
```

## 🚦 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:3000`

## 🧪 Testing the Migration

1. **Create a transaction** - Should show success toast
2. **Edit a transaction** - Should update without page refresh
3. **Delete a transaction** - Should remove from list immediately
4. **Change month filter** - Should show skeleton then new data
5. **Simulate network error** - Should show error banner and toast
6. **Check loading states** - All sections should show skeletons

## 📦 Dependencies

- **Next.js 16** - React framework
- **React Query** - Data fetching and caching
- **Prisma** - Database ORM
- **Zod** - Schema validation
- **Sonner** - Toast notifications
- **Radix UI** - UI components
- **Tailwind CSS** - Styling

## 🔄 Migration Benefits

### Before (Server Actions)
- Full page reloads on mutations
- No loading states
- Limited error handling
- Server-side rendering overhead

### After (React Query + API Routes)
- Instant UI updates
- Skeleton loading states
- Comprehensive error handling
- Client-side caching
- Better performance
- Improved UX

## 📝 Notes

- All error messages are in Bengali for better user experience
- Date format: `dd/MM/yyyy` for display, `YYYY-MM-DD` for API
- Month format: Bengali (e.g., "জানুয়ারি ২০২৫")
- Currency: BDT (Bangladeshi Taka)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for learning and development.
