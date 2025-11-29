module.exports = [
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[project]/lib/prisma.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getPrisma",
    ()=>getPrisma
]);
(()=>{
    const e = new Error("Cannot find module '@prisma/client'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
const globalForPrisma = globalThis;
// Prisma Client configuration for Next.js 16 with cache components
// Workaround for Prisma 7.0.1 + Next.js 16.0.3 compatibility issue
// The engineType = "library" is set in prisma/schema.prisma, but Prisma
// still detects "client" engine type at runtime in Next.js 16 cache components context
// Use a getter function that's called at runtime, not module evaluation
function createPrismaClient() {
    if (globalForPrisma.prisma) {
        return globalForPrisma.prisma;
    }
    // Initialize Prisma Client - the schema has engineType = "library"
    // but we need to ensure it's not evaluated during module load
    const client = new PrismaClient({
        log: ("TURBOPACK compile-time truthy", 1) ? [
            "query",
            "error",
            "warn"
        ] : "TURBOPACK unreachable"
    });
    if ("TURBOPACK compile-time truthy", 1) {
        globalForPrisma.prisma = client;
    }
    return client;
}
function getPrisma() {
    return createPrismaClient();
}
const __TURBOPACK__default__export__ = getPrisma;
}),
"[project]/lib/bengali-utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Utility functions for Bengali number conversion
__turbopack_context__.s([
    "bengaliMonths",
    ()=>bengaliMonths,
    "bengaliWeekdays",
    ()=>bengaliWeekdays,
    "bengaliWeekdaysShort",
    ()=>bengaliWeekdaysShort,
    "toBengaliNumber",
    ()=>toBengaliNumber
]);
const bengaliNumerals = [
    "০",
    "১",
    "২",
    "৩",
    "৪",
    "৫",
    "৬",
    "৭",
    "৮",
    "৯"
];
function toBengaliNumber(num) {
    return String(num).split("").map((char)=>{
        const digit = Number.parseInt(char, 10);
        return isNaN(digit) ? char : bengaliNumerals[digit];
    }).join("");
}
const bengaliMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর"
];
const bengaliWeekdays = [
    "রবি",
    "সোম",
    "মঙ্গল",
    "বুধ",
    "বৃহঃ",
    "শুক্র",
    "শনি"
];
const bengaliWeekdaysShort = [
    "র",
    "সো",
    "ম",
    "বু",
    "বৃ",
    "শু",
    "শ"
];
}),
"[project]/lib/api-utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateMonthFromDate",
    ()=>calculateMonthFromDate,
    "convertDateFromISO",
    ()=>convertDateFromISO,
    "convertDateToISO",
    ()=>convertDateToISO,
    "formatTransaction",
    ()=>formatTransaction,
    "prismaTypeToTS",
    ()=>prismaTypeToTS,
    "tsTypeToPrisma",
    ()=>tsTypeToPrisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$bengali$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/bengali-utils.ts [app-rsc] (ecmascript)");
;
function prismaTypeToTS(type) {
    switch(type){
        case "INCOME":
            return "income";
        case "EXPENSE":
            return "expense";
        case "SAVINGS":
            return "savings";
        default:
            return "income";
    }
}
function tsTypeToPrisma(type) {
    switch(type){
        case "income":
            return "INCOME";
        case "expense":
            return "EXPENSE";
        case "savings":
            return "SAVINGS";
        default:
            return "INCOME";
    }
}
function calculateMonthFromDate(date) {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const bengaliMonth = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$bengali$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["bengaliMonths"][monthIndex];
    const bengaliYear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$bengali$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toBengaliNumber"])(year);
    return `${bengaliMonth} ${bengaliYear}`;
}
function formatTransaction(prismaTransaction) {
    // Handle date conversion - Prisma returns Date object
    const dateString = prismaTransaction.date instanceof Date ? prismaTransaction.date.toISOString().split("T")[0] : new Date(prismaTransaction.date).toISOString().split("T")[0];
    return {
        id: prismaTransaction.id,
        title: prismaTransaction.title,
        amount: Number(prismaTransaction.amount),
        date: dateString,
        category: prismaTransaction.category,
        type: prismaTypeToTS(prismaTransaction.type),
        month: prismaTransaction.month
    };
}
function convertDateToISO(dateString) {
    // Handle Bengali date format (dd/MM/yyyy) or already ISO format
    if (dateString.includes("/")) {
        const parts = dateString.split("/");
        if (parts.length === 3) {
            const day = parts[0].padStart(2, "0");
            const month = parts[1].padStart(2, "0");
            const year = parts[2];
            return `${year}-${month}-${day}`;
        }
    }
    // If already in ISO format or invalid, return as is
    return dateString;
}
function convertDateFromISO(dateString) {
    // Handle ISO format (YYYY-MM-DD)
    if (dateString.includes("-") && dateString.length === 10) {
        const parts = dateString.split("-");
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
    }
    // If already in dd/MM/yyyy format or invalid, return as is
    return dateString;
}
}),
"[project]/app/actions/transactions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"406248439e02a48fa56465edd9c0b29e36560f7d30":"getTransaction","40d87f6f6982ce78e04ff6615b06286b60f7c41892":"createTransaction","40e993d5248b4b8df9c8f17d3ed787765adac02f2b":"getTransactionStats","40f77a286404cbef10c00701a25590f2629957f74b":"deleteTransaction","608f978a79c2bec7623c716cb9f0346df8e81a7f29":"updateTransaction","c0c6d0b473795f8ef2259009d0644f184944fc9822":"$$RSC_SERVER_CACHE_0"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "createTransaction",
    ()=>createTransaction,
    "deleteTransaction",
    ()=>deleteTransaction,
    "getTransaction",
    ()=>getTransaction,
    "getTransactionStats",
    ()=>getTransactionStats,
    "getTransactions",
    ()=>getTransactions,
    "updateTransaction",
    ()=>updateTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
// Cache tags
const CACHE_TAG_TRANSACTIONS = "transactions";
const CACHE_TAG_TRANSACTION = (id)=>`transaction-${id}`;
const CACHE_TAG_STATS = "transaction-stats";
// Validation schemas
const createTransactionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Title is required"),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive("Amount must be positive"),
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Category is required"),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "income",
        "expense",
        "savings"
    ])
});
const updateTransactionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Title is required").optional(),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive("Amount must be positive").optional(),
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format").optional(),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Category is required").optional(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "income",
        "expense",
        "savings"
    ]).optional()
});
const $$RSC_SERVER_CACHE_0_INNER = async function getTransactions(filters) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(CACHE_TAG_TRANSACTIONS);
        const where = {};
        if (filters?.type && [
            "income",
            "expense",
            "savings"
        ].includes(filters.type)) {
            where.type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tsTypeToPrisma"])(filters.type);
        }
        if (filters?.month) {
            where.month = filters.month;
        }
        if (filters?.category) {
            where.category = filters.category;
        }
        const prisma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrisma"])();
        const transactions = await prisma.transaction.findMany({
            where,
            orderBy: {
                date: "desc"
            }
        });
        const formattedTransactions = transactions.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatTransaction"]);
        return {
            success: true,
            data: formattedTransactions
        };
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return {
            success: false,
            error: "Failed to fetch transactions",
            message: error instanceof Error ? error.message : "Unknown error"
        };
    }
};
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(function getTransactions() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c0c6d0b473795f8ef2259009d0644f184944fc9822", 0, $$RSC_SERVER_CACHE_0_INNER, arguments);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "c0c6d0b473795f8ef2259009d0644f184944fc9822", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "getTransactions"
});
var getTransactions = $$RSC_SERVER_CACHE_0;
async function getTransaction(id) {
    // Temporarily removed "use cache" due to Prisma 7.0.1 compatibility issue
    // "use cache";
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(CACHE_TAG_TRANSACTION(id));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(CACHE_TAG_TRANSACTIONS);
        const prisma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrisma"])();
        const transaction = await prisma.transaction.findUnique({
            where: {
                id
            }
        });
        if (!transaction) {
            return {
                success: false,
                error: "Transaction not found"
            };
        }
        return {
            success: true,
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatTransaction"])(transaction)
        };
    } catch (error) {
        console.error("Error fetching transaction:", error);
        return {
            success: false,
            error: "Failed to fetch transaction",
            message: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
async function createTransaction(data) {
    try {
        // Validate request body
        const validationResult = createTransactionSchema.safeParse(data);
        if (!validationResult.success) {
            return {
                success: false,
                error: "Validation failed",
                details: validationResult.error.errors
            };
        }
        const { title, amount, date, category, type } = validationResult.data;
        // Calculate month from date
        const month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["calculateMonthFromDate"])(date);
        // Create transaction in database
        const prisma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrisma"])();
        const transaction = await prisma.transaction.create({
            data: {
                title,
                amount,
                date: new Date(date),
                category,
                type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tsTypeToPrisma"])(type),
                month
            }
        });
        // Revalidate cache immediately
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(CACHE_TAG_TRANSACTIONS);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(CACHE_TAG_STATS);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(CACHE_TAG_TRANSACTION(transaction.id));
        return {
            success: true,
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatTransaction"])(transaction)
        };
    } catch (error) {
        console.error("Error creating transaction:", error);
        return {
            success: false,
            error: "Failed to create transaction",
            message: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
async function updateTransaction(id, data) {
    try {
        // Check if transaction exists
        const prisma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrisma"])();
        const existingTransaction = await prisma.transaction.findUnique({
            where: {
                id
            }
        });
        if (!existingTransaction) {
            return {
                success: false,
                error: "Transaction not found"
            };
        }
        // Validate request body
        const validationResult = updateTransactionSchema.safeParse(data);
        if (!validationResult.success) {
            return {
                success: false,
                error: "Validation failed",
                details: validationResult.error.errors
            };
        }
        const updateData = {};
        if (validationResult.data.title !== undefined) {
            updateData.title = validationResult.data.title;
        }
        if (validationResult.data.amount !== undefined) {
            updateData.amount = validationResult.data.amount;
        }
        if (validationResult.data.date !== undefined) {
            updateData.date = new Date(validationResult.data.date);
            updateData.month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["calculateMonthFromDate"])(validationResult.data.date);
        }
        if (validationResult.data.category !== undefined) {
            updateData.category = validationResult.data.category;
        }
        if (validationResult.data.type !== undefined) {
            updateData.type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tsTypeToPrisma"])(validationResult.data.type);
        }
        const transaction = await prisma.transaction.update({
            where: {
                id
            },
            data: updateData
        });
        // Revalidate cache immediately
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(CACHE_TAG_TRANSACTIONS);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(CACHE_TAG_STATS);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(CACHE_TAG_TRANSACTION(id));
        return {
            success: true,
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatTransaction"])(transaction)
        };
    } catch (error) {
        console.error("Error updating transaction:", error);
        return {
            success: false,
            error: "Failed to update transaction",
            message: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
async function deleteTransaction(id) {
    try {
        // Check if transaction exists
        const prisma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrisma"])();
        const existingTransaction = await prisma.transaction.findUnique({
            where: {
                id
            }
        });
        if (!existingTransaction) {
            return {
                success: false,
                error: "Transaction not found"
            };
        }
        await prisma.transaction.delete({
            where: {
                id
            }
        });
        // Revalidate cache immediately
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(CACHE_TAG_TRANSACTIONS);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(CACHE_TAG_STATS);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"])(CACHE_TAG_TRANSACTION(id));
        return {
            success: true,
            message: "Transaction deleted successfully"
        };
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return {
            success: false,
            error: "Failed to delete transaction",
            message: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
async function getTransactionStats(month) {
    // Temporarily removed "use cache" due to Prisma 7.0.1 compatibility issue
    // "use cache";
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(CACHE_TAG_STATS);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cacheTag"])(CACHE_TAG_TRANSACTIONS);
        const where = {};
        if (month) {
            where.month = month;
        }
        const prisma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrisma"])();
        const transactions = await prisma.transaction.findMany({
            where
        });
        // Calculate totals
        let income = 0;
        let expense = 0;
        let savings = 0;
        transactions.forEach((transaction)=>{
            const amount = Number(transaction.amount);
            switch(transaction.type){
                case "INCOME":
                    income += amount;
                    break;
                case "EXPENSE":
                    expense += amount;
                    break;
                case "SAVINGS":
                    savings += amount;
                    break;
            }
        });
        // Calculate additional statistics
        const totalTransactions = transactions.length;
        const incomeTransactions = transactions.filter((t)=>t.type === "INCOME").length;
        const expenseTransactions = transactions.filter((t)=>t.type === "EXPENSE").length;
        const savingsTransactions = transactions.filter((t)=>t.type === "SAVINGS").length;
        // Calculate balance (income - expense - savings)
        const balance = income - expense - savings;
        // Get category breakdown
        const categoryBreakdown = {};
        transactions.forEach((transaction)=>{
            const category = transaction.category;
            const amount = Number(transaction.amount);
            if (!categoryBreakdown[category]) {
                categoryBreakdown[category] = {
                    income: 0,
                    expense: 0,
                    savings: 0
                };
            }
            switch(transaction.type){
                case "INCOME":
                    categoryBreakdown[category].income += amount;
                    break;
                case "EXPENSE":
                    categoryBreakdown[category].expense += amount;
                    break;
                case "SAVINGS":
                    categoryBreakdown[category].savings += amount;
                    break;
            }
        });
        return {
            success: true,
            data: {
                totals: {
                    income,
                    expense,
                    savings,
                    balance
                },
                counts: {
                    total: totalTransactions,
                    income: incomeTransactions,
                    expense: expenseTransactions,
                    savings: savingsTransactions
                },
                categoryBreakdown
            }
        };
    } catch (error) {
        console.error("Error fetching statistics:", error);
        return {
            success: false,
            error: "Failed to fetch statistics",
            message: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionStats
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTransaction, "406248439e02a48fa56465edd9c0b29e36560f7d30", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTransaction, "40d87f6f6982ce78e04ff6615b06286b60f7c41892", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTransaction, "608f978a79c2bec7623c716cb9f0346df8e81a7f29", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTransaction, "40f77a286404cbef10c00701a25590f2629957f74b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTransactionStats, "40e993d5248b4b8df9c8f17d3ed787765adac02f2b", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/transactions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$transactions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/transactions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/transactions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "406248439e02a48fa56465edd9c0b29e36560f7d30",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$transactions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTransaction"],
    "40d87f6f6982ce78e04ff6615b06286b60f7c41892",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$transactions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTransaction"],
    "40e993d5248b4b8df9c8f17d3ed787765adac02f2b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$transactions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTransactionStats"],
    "40f77a286404cbef10c00701a25590f2629957f74b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$transactions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTransaction"],
    "608f978a79c2bec7623c716cb9f0346df8e81a7f29",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$transactions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTransaction"],
    "c0051826376a93c82271df604dec916490ec7fa869",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$transactions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTransactions"],
    "c0c6d0b473795f8ef2259009d0644f184944fc9822",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$transactions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_CACHE_0"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$transactions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/transactions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$transactions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/transactions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5f4ecc0c._.js.map