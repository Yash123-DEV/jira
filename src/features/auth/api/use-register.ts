import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType , InferResponseType} from "hono";
import{ client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>;


export const useRegister = () => {
   const Mutation = useMutation<
   RequestType,
   Error,
   ResponseType
   >({
      mutationFn: async (json) => {
         const response = await client.api.auth.register["$post"]({ json });
         return { json: await response.json() };
      },
      onSuccess: () => {
         toast.success("Registration successful!");
         
      },
      onError: (error) => {
         toast.error("Registration failed! " + error.message);
      }
   });

   return Mutation;
}