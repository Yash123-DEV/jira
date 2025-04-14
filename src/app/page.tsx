"use client";

import { useCurrent } from "@/features/auth/api/use-current";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/features/auth/api/use-logout";
import { Button } from "@/components/ui/button";

export default function Home() {

  const router = useRouter();
  const { data, isLoading, error } = useCurrent();
  const { mutate } = useLogout();

  console.log({data, error});

  useEffect(() => {
    if(!data && !isLoading) {
      router.push("/sign-in")
    }

  }, [data]);

 
  return (
    <div>
      only visible to authorized user.
      <Button onClick={() => mutate()}>
        logout
      </Button>
    </div>
  );
}
