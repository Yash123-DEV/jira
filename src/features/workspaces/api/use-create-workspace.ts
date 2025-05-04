import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType , InferResponseType} from "hono";
import{ client } from "@/lib/rpc";



type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>;
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>;


export const useCreateWorkspace = () => {
   const queryClient = useQueryClient();

   const Mutation = useMutation<
   RequestType,
   Error,
   ResponseType
   >({
      mutationFn: async (json) => {
         console.log("Sending to API:", json); // ⬅️ This will show if `name` is undefined
         const response = await client.api.workspaces["$post"](json);
         // return { json: await response.json() };
         return await response.json();

       },
      onSuccess: () => {
         toast.success("Workspace created successfully!");
         queryClient.invalidateQueries({ queryKey : ["workspaces"] });
      },
      onError: (error) => {
         toast.error("Failed to create workspace: " + error.message);
      }
   });

   return Mutation;
};