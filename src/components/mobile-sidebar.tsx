
"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Sidebar } from "./sidebar";
import { usePathname } from "next/navigation";
import { use, useState, useEffect } from "react";


export const MobileSidebar = () => {
   const [isopen, setIsOpen] = useState(false);
   const pathname = usePathname();

useEffect(() => {
      setIsOpen(false);
}, [pathname])


   return (
      <Sheet modal={false} open={isopen} onOpenChange={setIsOpen}>
         <SheetTrigger asChild>
            <Button variant="secondary" className="lg:hidden "  >
               <MenuIcon className="size-3 text-neutral-500"/>

            </Button>
         </SheetTrigger>
         <SheetContent side="left" className="p-0">
            <Sidebar/>
         </SheetContent>

      </Sheet>
   )
}