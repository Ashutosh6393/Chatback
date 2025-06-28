import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware } from "better-auth/api";
import { db } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 10,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (!ctx.path.startsWith("/sign-up")) return;

      const newSession = ctx.context.newSession;
      if (!newSession) return;

      const userId = newSession.user.id;
      // const now = new Date();
      const defaultPlan = "free";
      // const durationInMonths = defaultPlan === "free" ? 0 : 1;

      await db.subscription.create({
        data: {
          userId,
          plan: defaultPlan,
          status: "active",
          // currentPeriodEnd: addMonths(now, durationInMonths),
          currentPeriodEnd: null,
        },
      });
    }),
  },
});
