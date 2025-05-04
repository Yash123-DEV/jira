import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {InferResponseType} from "hono";
import{ client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;


// type RequestType = InferRequestType<typeof client.api.auth.logout["$post"]>;


export const useLogout = () => {

   const queryClient = useQueryClient();


   const Mutation = useMutation<ResponseType, Error>({
      mutationFn: async () => {
         const response = await client.api.auth.logout["$post"]();
         return await response.json() as ResponseType;
      },
      onSuccess: () => {
         toast.success("Logout successful!");
         queryClient.invalidateQueries({ queryKey : ["current"]});
      },
      onError: (error) => {
         toast.error("Logout failed! " + error.message);
      }
   });

   return Mutation;
}