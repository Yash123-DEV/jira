import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType , InferResponseType} from "hono";
import{ client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;


export const useLogin = () => {
   const queryClient = useQueryClient();
   const router = useRouter();

   const Mutation = useMutation<
   RequestType,
   Error,
   ResponseType
   >({
      mutationFn: async (json) => {
         const response = await client.api.auth.login["$post"]({ json });
         return { json: await response.json() };
      },
      onSuccess: () => {
         toast.success("Login successful!");
         router.refresh();
         router.push("/");
         queryClient.invalidateQueries({ queryKey : ["current"]});
      },
      onError: (error) => {
         toast.error("Login failed! " + error.message);
      }
   });

   return Mutation;
}