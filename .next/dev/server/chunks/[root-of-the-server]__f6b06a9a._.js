module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getPrisma",
    ()=>getPrisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
function createPrismaClient() {
    if (globalForPrisma.prisma) {
        return globalForPrisma.prisma;
    }
    // Initialize Prisma Client
    const client = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
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
"[project]/lib/bengali-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/api-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$bengali$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/bengali-utils.ts [app-route] (ecmascript)");
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
    const bengaliMonth = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$bengali$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bengaliMonths"][monthIndex];
    const bengaliYear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$bengali$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toBengaliNumber"])(year);
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
        description: prismaTransaction.description,
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
"[project]/app/api/transactions/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
;
;
;
const updateTransactionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "শিরোনাম আবশ্যক").optional(),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive("পরিমাণ অবশ্যই ধনাত্মক হতে হবে").optional(),
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/, "তারিখ অবশ্যই YYYY-MM-DD ফরম্যাটে হতে হবে").optional(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "বিবরণ আবশ্যক").optional(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "income",
        "expense",
        "savings"
    ], {
        errorMap: ()=>({
                message: "অবৈধ লেনদেনের ধরন"
            })
    }).optional()
});
async function GET(request, { params }) {
    try {
        const { id } = await params;
        const prisma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPrisma"])();
        const transaction = await prisma.transaction.findUnique({
            where: {
                id
            }
        });
        if (!transaction) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "লেনদেন পাওয়া যায়নি"
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatTransaction"])(transaction)
        });
    } catch (error) {
        console.error("Error fetching transaction:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "লেনদেন আনতে ব্যর্থ হয়েছে",
            message: error instanceof Error ? error.message : "অজানা ত্রুটি"
        }, {
            status: 500
        });
    }
}
async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        // Check if transaction exists
        const prisma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPrisma"])();
        const existingTransaction = await prisma.transaction.findUnique({
            where: {
                id
            }
        });
        if (!existingTransaction) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "লেনদেন পাওয়া যায়নি"
            }, {
                status: 404
            });
        }
        // Validate request body
        const validationResult = updateTransactionSchema.safeParse(body);
        if (!validationResult.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "যাচাইকরণ ব্যর্থ হয়েছে",
                details: validationResult.error.errors.map((err)=>({
                        field: err.path.join("."),
                        message: err.message
                    }))
            }, {
                status: 400
            });
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
            updateData.month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateMonthFromDate"])(validationResult.data.date);
        }
        if (validationResult.data.description !== undefined) {
            updateData.description = validationResult.data.description;
        }
        if (validationResult.data.type !== undefined) {
            updateData.type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tsTypeToPrisma"])(validationResult.data.type);
        }
        const transaction = await prisma.transaction.update({
            where: {
                id
            },
            data: updateData
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatTransaction"])(transaction),
            message: "লেনদেন সফলভাবে আপডেট হয়েছে"
        });
    } catch (error) {
        console.error("Error updating transaction:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "লেনদেন আপডেট করতে ব্যর্থ হয়েছে",
            message: error instanceof Error ? error.message : "অজানা ত্রুটি"
        }, {
            status: 500
        });
    }
}
async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        // Check if transaction exists
        const prisma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPrisma"])();
        const existingTransaction = await prisma.transaction.findUnique({
            where: {
                id
            }
        });
        if (!existingTransaction) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "লেনদেন পাওয়া যায়নি"
            }, {
                status: 404
            });
        }
        await prisma.transaction.delete({
            where: {
                id
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "লেনদেন সফলভাবে মুছে ফেলা হয়েছে"
        });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "লেনদেন মুছে ফেলতে ব্যর্থ হয়েছে",
            message: error instanceof Error ? error.message : "অজানা ত্রুটি"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f6b06a9a._.js.map