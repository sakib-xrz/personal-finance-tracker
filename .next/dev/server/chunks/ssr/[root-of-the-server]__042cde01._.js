module.exports = [
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/prisma.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
// Prisma Client configuration for Next.js 16 with cache components
// The engineType = "library" is set in prisma/schema.prisma
// This ensures Prisma uses the library engine, not the client engine type
// Lazy initialization to avoid module evaluation issues with Next.js 16 cache components
// Prisma Client is only created when first accessed, not during module evaluation
let prismaInstance;
function getPrismaClient() {
    if (prismaInstance) {
        return prismaInstance;
    }
    if (globalForPrisma.prisma) {
        prismaInstance = globalForPrisma.prisma;
        return prismaInstance;
    }
    prismaInstance = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
        log: ("TURBOPACK compile-time truthy", 1) ? [
            "query",
            "error",
            "warn"
        ] : "TURBOPACK unreachable"
    });
    if ("TURBOPACK compile-time truthy", 1) {
        globalForPrisma.prisma = prismaInstance;
    }
    return prismaInstance;
}
const prisma = new Proxy({}, {
    get (_target, prop) {
        const client = getPrismaClient();
        const value = client[prop];
        if (typeof value === "function") {
            return value.bind(client);
        }
        return value;
    }
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__042cde01._.js.map