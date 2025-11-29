# Testing Checklist ✅

Use this checklist to verify that the migration to client-side data fetching is working correctly.

## 🚀 Setup Verification

- [ ] Dependencies installed (`@tanstack/react-query` and `@tanstack/react-query-devtools`)
- [ ] Dev server running (`npm run dev` or `yarn dev`)
- [ ] No TypeScript errors in terminal
- [ ] No console errors in browser
- [ ] React Query DevTools icon visible in bottom-right corner

## 📊 Loading States

### Summary Cards
- [ ] Shows 3 skeleton cards when loading
- [ ] Skeleton cards have pulsing animation
- [ ] Real data appears after loading
- [ ] Layout matches skeleton structure

### Statistics Chart
- [ ] Shows skeleton chart when loading
- [ ] Skeleton has correct height (~300px)
- [ ] Real chart appears after loading

### Transaction Tabs
- [ ] Shows skeleton tabs when loading
- [ ] Shows 3 skeleton transaction cards
- [ ] Real transactions appear after loading
- [ ] Tabs are clickable during loading

## ✅ CRUD Operations

### Create Transaction
- [ ] Click "নতুন যোগ করুন" button
- [ ] Dialog opens with form
- [ ] Fill in all fields (title, amount, date, description)
- [ ] Click "যোগ করুন" button
- [ ] Success toast appears: "লেনদেন সফলভাবে তৈরি হয়েছে"
- [ ] Dialog closes automatically
- [ ] New transaction appears in list immediately
- [ ] Summary cards update automatically
- [ ] Chart updates automatically
- [ ] **No page reload occurs**

### Read Transactions
- [ ] Transactions load on page load
- [ ] Can switch between tabs (আয়, ব্যয়, সঞ্চয়)
- [ ] Each tab shows correct transactions
- [ ] Transactions show: title, amount, date, description
- [ ] Bengali numbers display correctly
- [ ] Date format is dd/MM/yyyy

### Update Transaction
- [ ] Click edit icon (pencil) on a transaction
- [ ] Edit dialog opens with pre-filled data
- [ ] Modify any field
- [ ] Click "আপডেট করুন" button
- [ ] Success toast appears: "লেনদেন সফলভাবে আপডেট হয়েছে"
- [ ] Dialog closes automatically
- [ ] Transaction updates in list immediately
- [ ] Summary cards update if amount/type changed
- [ ] **No page reload occurs**

### Delete Transaction
- [ ] Click delete icon (trash) on a transaction
- [ ] Confirmation dialog appears
- [ ] Click "মুছে ফেলুন" button
- [ ] Success toast appears: "লেনদেন সফলভাবে মুছে ফেলা হয়েছে"
- [ ] Transaction disappears from list immediately
- [ ] Summary cards update automatically
- [ ] **No page reload occurs**

## 🔍 Filtering

### Month Filter
- [ ] Click month dropdown in header
- [ ] Select different month
- [ ] Loading skeletons appear
- [ ] Transactions for selected month load
- [ ] Summary cards update for selected month
- [ ] Chart updates for selected month
- [ ] **No page reload occurs**

## ⚠️ Error Handling

### Network Errors (Simulate by stopping server)
- [ ] Stop the dev server
- [ ] Try to create a transaction
- [ ] Error toast appears with Bengali message
- [ ] Try to load transactions (refresh page)
- [ ] Error alert banner appears at top
- [ ] Banner shows: "ডেটা লোড করতে সমস্যা হয়েছে"
- [ ] Can dismiss error banner by clicking X
- [ ] Restart server
- [ ] Data loads correctly again

### Validation Errors
- [ ] Try to create transaction with empty title
- [ ] Form validation prevents submission
- [ ] Try to create transaction with negative amount
- [ ] Form validation prevents submission
- [ ] Try to create transaction without date
- [ ] Form validation prevents submission

### API Validation Errors
- [ ] Open browser DevTools Network tab
- [ ] Create transaction with invalid data (if possible)
- [ ] Check API response shows validation errors
- [ ] Error toast shows specific validation message

## 🎨 UI/UX

### Responsiveness
- [ ] Test on desktop (works well)
- [ ] Test on tablet (works well)
- [ ] Test on mobile (works well)
- [ ] All dialogs are responsive
- [ ] All buttons are clickable on mobile

### Bengali Language
- [ ] All UI text is in Bengali
- [ ] Numbers display in Bengali (০১২৩৪৫৬৭৮৯)
- [ ] Months display in Bengali (জানুয়ারি, ফেব্রুয়ারি, etc.)
- [ ] Error messages are in Bengali
- [ ] Success messages are in Bengali

### Animations
- [ ] Skeleton loading has pulse animation
- [ ] Toast notifications slide in/out smoothly
- [ ] Dialog open/close is smooth
- [ ] Tab switching is smooth
- [ ] No janky animations

## 🔧 React Query DevTools

### Opening DevTools
- [ ] Click React Query icon in bottom-right
- [ ] DevTools panel opens
- [ ] Can see all queries listed
- [ ] Can see query status (loading, success, error)

### Inspecting Queries
- [ ] Find "transactions" query
- [ ] See query data
- [ ] See query status
- [ ] See last updated time
- [ ] Find "transaction-stats" query
- [ ] See stats data

### Testing Cache
- [ ] Create a transaction
- [ ] Watch "transactions" query invalidate
- [ ] Watch query refetch automatically
- [ ] See new data in cache
- [ ] Switch to different month
- [ ] See new query created for that month
- [ ] Switch back to original month
- [ ] Data loads from cache (instant)

### Manual Actions
- [ ] Click "Refetch" button in DevTools
- [ ] Query refetches data
- [ ] Click "Invalidate" button
- [ ] Query refetches data
- [ ] Click "Remove" button
- [ ] Query is removed from cache
- [ ] Query refetches when needed again

## 📱 Performance

### Initial Load
- [ ] Page loads in < 2 seconds
- [ ] Skeletons appear immediately
- [ ] Data appears within 1 second
- [ ] No layout shift when data loads

### Mutations
- [ ] Create transaction completes in < 500ms
- [ ] Update transaction completes in < 500ms
- [ ] Delete transaction completes in < 500ms
- [ ] UI updates feel instant

### Caching
- [ ] Switch between months
- [ ] Return to previously viewed month
- [ ] Data loads instantly from cache
- [ ] No unnecessary API calls

## 🐛 Edge Cases

### Empty States
- [ ] Select a month with no transactions
- [ ] Shows "এই মাসে কোনো আয় নেই" for income tab
- [ ] Shows "এই মাসে কোনো ব্যয় নেই" for expense tab
- [ ] Shows "এই মাসে কোনো সঞ্চয় নেই" for savings tab
- [ ] Summary cards show 0 for all values

### Large Numbers
- [ ] Create transaction with amount 1,000,000
- [ ] Number formats correctly with commas
- [ ] Bengali numbers display correctly
- [ ] No overflow in UI

### Special Characters
- [ ] Create transaction with Bengali title
- [ ] Create transaction with English title
- [ ] Create transaction with numbers in title
- [ ] Create transaction with special characters
- [ ] All display correctly

### Concurrent Operations
- [ ] Create multiple transactions quickly
- [ ] All succeed
- [ ] All appear in list
- [ ] No race conditions
- [ ] Summary updates correctly

## 🔒 Data Integrity

### Database Consistency
- [ ] Open Prisma Studio (`npx prisma studio`)
- [ ] Create transaction in app
- [ ] Verify it appears in Prisma Studio
- [ ] Update transaction in app
- [ ] Verify update in Prisma Studio
- [ ] Delete transaction in app
- [ ] Verify deletion in Prisma Studio

### Month Calculation
- [ ] Create transaction with date in January
- [ ] Verify month is "জানুয়ারি ২০২৫"
- [ ] Create transaction with date in December
- [ ] Verify month is "ডিসেম্বর ২০২৫"
- [ ] Filter by month
- [ ] Only transactions from that month appear

## 📊 Statistics Accuracy

### Totals Calculation
- [ ] Create income transaction of 10,000
- [ ] Income total increases by 10,000
- [ ] Create expense transaction of 5,000
- [ ] Expense total increases by 5,000
- [ ] Create savings transaction of 2,000
- [ ] Savings total increases by 2,000
- [ ] Balance = Income - Expense - Savings
- [ ] Verify balance is correct (3,000)

### Chart Updates
- [ ] Create transaction
- [ ] Chart updates immediately
- [ ] Delete transaction
- [ ] Chart updates immediately
- [ ] Update transaction amount
- [ ] Chart updates immediately

## ✨ Final Checks

- [ ] No console errors
- [ ] No console warnings (except expected ones)
- [ ] No TypeScript errors
- [ ] No network errors (check Network tab)
- [ ] All features work as expected
- [ ] App feels fast and responsive
- [ ] Error handling works correctly
- [ ] Loading states look good
- [ ] Bengali text displays correctly
- [ ] Ready for production! 🚀

## 📝 Notes

**If any test fails:**
1. Check browser console for errors
2. Check terminal for errors
3. Check React Query DevTools for query status
4. Check Network tab for API errors
5. Refer to MIGRATION_SUMMARY.md for implementation details

**Common Issues:**
- If data doesn't update: Check React Query cache invalidation
- If loading states don't show: Check isLoading flags
- If errors don't show: Check error handling in hooks
- If API fails: Check API route implementation

**Success Criteria:**
✅ All checkboxes checked
✅ No errors in console
✅ Fast and responsive
✅ Great user experience
✅ Ready to deploy!

---

**Testing completed on:** _________________

**Tested by:** _________________

**Issues found:** _________________

**Status:** ⬜ Pass | ⬜ Fail | ⬜ Needs Review
