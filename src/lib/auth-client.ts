"use client";

import { phoneNumberClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// No baseURL — the client uses window.location.origin, so it works on
// any local port and in production without having to configure env vars.
export const authClient = createAuthClient({
  plugins: [phoneNumberClient()],
});

export const { useSession, signOut } = authClient;
