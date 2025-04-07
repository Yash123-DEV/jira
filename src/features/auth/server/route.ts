import { Hono } from "hono";
import {z} from "zod";
import {zValidator} from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schema";


const app = new Hono()
   .post(
   "/login",
   zValidator("json", loginSchema),
   async (c) => {

    const {email, password} = await c.req.valid("json");

    console.log({email, password})
    
    return c.json({ success: "Ok", email, password });

     
   }
 )
 .post(
   "/register",
  zValidator("json", registerSchema),
  async (c) => {

    const {username, email, password} = await c.req.valid("json");

    console.log({username, email, password});
    
    return c.json({ success: "Ok",username, email, password });

     
   }
)


export default app;