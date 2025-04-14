import "server-only";

import {
   Account,
   Client,
   Databases,
   Models,
   Storage,
   Users,
   type Account as AccountType,
   type Databases as DatabasesType,
   type Storage as StorageType,
   type Users as UsersType,

} from "node-appwrite"

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { AUTH_COOKIE } from "@/features/auth/constant";

type AdditionalContext = {
   Bindings?: Record<string, unknown>;
   Variables?: Record<string, unknown>;
   variables: {
      account: AccountType;
      databases: DatabasesType;
      storage: StorageType;
      users: UsersType;
      user: Models.User<Models.Preferences>;
   };
   set: <K extends keyof AdditionalContext["variables"]>(
      key: K,
      value: AdditionalContext["variables"][K]
   ) => void & ((key: string, value: unknown) => void);
};


// export const sessionMiddleware = createMiddleware<AdditionalContext>(
//    async (c, next) => {
//       const client = new Client()

//          .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//          .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);


//       const session = getCookie(c, AUTH_COOKIE);

//       if(!session) {
//          return c.json({success: false, message: "Unauthorized"}, 401);
//       }

//       client.setSession(session);

//       const account = new Account(client);
//       const databases = new Databases(client);
//       const storage = new Storage(client);

//       const user = await account.get();

//       c.set("account", account);
//       c.set("databases", databases);
//       c.set("storage", storage);
//       c.set("user", user);

//       await next();
//    },
// );


export const sessionMiddleware = createMiddleware<AdditionalContext>(
   async (c, next) => {
     const client = new Client()
       .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
       .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
 
     const session = getCookie(c, AUTH_COOKIE);
 
     if (!session) {
       return c.json({ success: false, message: "Unauthorized (no session)" }, 401);
     }
 
     client.setSession(session);
 
     const account = new Account(client);
     const databases = new Databases(client);
     const storage = new Storage(client);
 
     try {
       const user = await account.get();
 
       c.set("account", account);
       c.set("databases", databases);
       c.set("storage", storage);
       c.set("user", user);
 
       await next();
     } catch (err: any) {
       console.error("Session invalid or expired:", err);
       return c.json({ success: false, message: "Unauthorized (invalid session)" }, 401);
     }
   }
 );
 