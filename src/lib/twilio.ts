import "server-only";

import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_WHATSAPP_FROM;

if (!accountSid || !authToken || !from) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_WHATSAPP_FROM son " +
        "requeridos en producción."
    );
  }
  console.warn(
    "[twilio] Faltan TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_WHATSAPP_FROM. " +
      "El envío de OTP por WhatsApp NO funcionará."
  );
}

export const twilioClient =
  accountSid && authToken ? twilio(accountSid, authToken) : null;

/**
 * Send a WhatsApp message via Twilio.
 *
 * `to` must be in E.164 format: `+5215512345678` (no spaces, no dashes).
 * Internally we prepend the `whatsapp:` prefix that Twilio requires.
 */
export async function sendWhatsapp(to: string, body: string): Promise<void> {
  if (!twilioClient || !from) {
    throw new Error("Twilio no está configurado.");
  }
  await twilioClient.messages.create({
    from,
    to: `whatsapp:${to}`,
    body,
  });
}
