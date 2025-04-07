"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form"
import Link from "next/link";
import { registerSchema } from "../schema";
import { useRegister } from "../api/use-register";




const SignUpCard = () => {

   const {mutate} = useRegister();

   const form = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      defaultValues : {
         username : "" ,
         email : "" ,
         password : "",

      },
   });
   
   const onSubmit = (values: z.infer<typeof registerSchema>) => {
      mutate({ ...values, success: "Ok" }); // Include success property
   };

   return (
      <Card className="w-full h-full md:w-[478px] border-none shadow-none">
         <CardHeader className="flex items-center justify-center text-center p-7">
            <CardTitle className="text-xl">
               Sign Up
            </CardTitle>
         </CardHeader>

         <div className="px-5 mb-2 ">
            <Separator/>
         </div>

         <CardContent className="p-5">
            <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <FormField
               name="username"
               control={form.control}
               render={({field}) => (
                  <FormItem>
                     <FormControl>
                  <Input
               required
               {...field}
               type="text"
               placeholder="username"
               />
               </FormControl>
               <FormMessage />

               </FormItem>
               )}
               
               />

               <FormField
               name="email"
               control={form.control}
               render={({field}) => (
                  <FormItem>
                     <FormControl>
                  <Input
               required
               {...field}
               type="email"
               placeholder="email address"
               />
               </FormControl>
               <FormMessage />

               </FormItem>
               )}
               
               />

               <FormField
               name="password"
               control={form.control}
               render={({field}) => (
                  <FormItem>
                     <FormControl>
                  <Input
               required
               {...field}
               type="password"
               placeholder="password"
               />
               </FormControl>
               <FormMessage />

               </FormItem>
               )}
               
               />
               
               <Button type="submit" disabled={false} size="lg" className="w-full" >
                  Sign Up
               </Button>
            </form>
            </Form>
         </CardContent>
         <div className="p-5">
            <Separator/>
         </div>

         <CardContent className="p-5 flex flex-col gap-y-4">
            <Button disabled={false} variant="secondary" size="lg" className="w-full">
               <FcGoogle className="mr-2 size-5" />
               Login with Google
            </Button>
         </CardContent>
         <div className="px-5">
            <Separator className="my-4" />
               <div className="flex items-center justify-center py-4">
                  <p className="text-sm text-muted-foreground">
                     Already have an account?
                     <Link href="/sign-in" className="ml-1 text-sm font-medium text-blue-600 hover:underline">
                     Sign In
                     </Link>
                  </p>
               </div>
            </div>
      </Card>
   );
}

export default SignUpCard;