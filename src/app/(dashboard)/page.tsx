"use client";


import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import {useEffect} from "react";
import { useRouter } from "next/navigation";
import { useCurrent } from "@/features/auth/api/use-current";

export default function Home() {

  const router = useRouter();
  const { data: user, isLoading } = useCurrent();

  useEffect(() => {
    if(isLoading) return;

    if(user) {
      router.push("/");
    }else {
      router.push("/sign-in");
    }


  }, [isLoading, user, router]);


  return (
    <div>
      <CreateWorkspaceForm/>
    </div>
  );
}
