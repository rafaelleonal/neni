import "server-only";

import { sendWhatsapp } from "@/lib/twilio";
import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { phoneNumber } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  // Base URL for the auth server
  ...(process.env.BETTER_AUTH_URL
    ? { baseURL: process.env.BETTER_AUTH_URL }
    : {}),
  trustedOrigins:
    process.env.NODE_ENV === "production"
      ? process.env.BETTER_AUTH_URL
        ? [process.env.BETTER_AUTH_URL]
        : []
      : (request) => {
          const origin = request?.headers.get("origin");
          if (
            origin &&
            (origin.startsWith("http://localhost:") ||
              origin.startsWith("http://127.0.0.1:"))
          ) {
            return [origin];
          }
          return [];
        },
  // We don't use email/password or magic link for now — only phone+OTP.
  emailAndPassword: { enabled: false },
  plugins: [
    phoneNumber({
      otpLength: 6,
      expiresIn: 300, // 5 min
      allowedAttempts: 3,
      phoneNumberValidator: (value) => /^\+521\d{10}$/.test(value),
      sendOTP: async ({ phoneNumber: phone, code }) => {
        const isDev =
          process.env.NODE_ENV !== "production" && !process.env.VERCEL;
        if (isDev) {
          console.log(
            `\n  ┌──────────────────────────────────────┐\n` +
              `  │  OTP DEV  ${phone.padEnd(28)}│\n` +
              `  │  ${code.padEnd(36)}  │\n` +
              `  └──────────────────────────────────────┘\n`
          );
        }
        try {
          await sendWhatsapp(
            phone,
            `Tu código para acceder a Neni es ${code}. No lo compartas con nadie.`
          );
        } catch (e) {
          if (!isDev) throw e;
          console.warn(
            "[twilio] envío falló (probablemente trial limit). Usa el código de arriba.",
            e instanceof Error ? e.message : e
          );
        }
      },
      // If the number doesn't exist, Better Auth creates the user when verifying.
      // Since we don't request email, we generate a temporary one from the phone.
      signUpOnVerification: {
        getTempEmail: (phone) => `${phone.replace(/\D/g, "")}@phone.neni.local`,
        getTempName: (phone) => phone,
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
