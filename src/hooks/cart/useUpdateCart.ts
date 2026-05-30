import { QueryClient, useMutation } from "@tanstack/react-query";
import apiClient from "../../utils/api-client";

const useUpdateCart = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ id, type }: any) =>
      apiClient.patch(`/cart/${type}/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
export default useUpdateCart;
