import { Hono } from "hono";
import {z} from "zod";
import {zValidator} from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schema";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constant";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
   .get("/current",
     sessionMiddleware,
      (c) => {
       const user = c.get("user") as { [key: string]: any };

       return c.json({data : user});
   }
  )
   .post(
   "/login",
   zValidator("json", loginSchema),
   async (c) => {

    const {email, password} = await c.req.valid("json");

    const { account } = await createAdminClient();

    try {
      const session = await account.createEmailPasswordSession(email, password);
    
      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
      });

      console.log("Session ID set:", session.secret);

      return c.json({ success: true });
      
    } catch (err: any) {
      console.error("Login failed:", err);
      return c.json({ success: false, message: "Invalid credentials" }, 401);
    }

     
   }
 )
 .post(
   "/register",
  zValidator("json", registerSchema),
  async (c) => {

    const {username, email, password} = await c.req.valid("json");

    const { account } = await createAdminClient();

    await account.create(
      ID.unique(),
      email,
      password,
      username,
    );

    const session = await account.createEmailPasswordSession(
      email,
      password,
    );

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, 
    });
    
    return c.json<{success : boolean}>({ success : true });

     
   }
 )
 .post("/logout", sessionMiddleware , async (c) => {

  const account = c.get("account") as { [key: string]: any };

  deleteCookie(c ,AUTH_COOKIE);
  await account.deleteSession("current");

  return c.json<{success : boolean}>({ success : true });


    }
  )
  .post(
    "/register",
    zValidator("json", registerSchema),
    async (c) => {
      const { username, email, password } = await c.req.valid("json");
  
      const { account } = await createAdminClient();
  
      await account.create(
        ID.unique(),
        email,
        password,
        username,
      );
  
      const session = await account.createEmailPasswordSession(
        email,
        password,
      );
  
      // ✅ FIXED: Use session.$id instead of session.secret
      setCookie(c, AUTH_COOKIE, session.$id, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict", // optional: use "lax" if needed
        maxAge: 60 * 60 * 24 * 30, 
      });
  
      return c.json<{ success: boolean }>({ success: true });
    }
  )
  

export default app;