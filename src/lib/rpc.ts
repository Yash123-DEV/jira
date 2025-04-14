// import { hc } from "hono/client";
// import type { AppType } from "@/app/api/[[...route]]/route";

// export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);


import { hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!, {
  fetch: (input: URL | RequestInfo, init: RequestInit = {}) =>
    fetch(input instanceof URL ? input.toString() : input, {
      ...init,
      credentials: "include", // ✅ IMPORTANT
    }),
});