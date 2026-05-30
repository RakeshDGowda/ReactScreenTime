import { QueryClient, useMutation } from "@tanstack/react-query";
import apiClient from "../../utils/api-client";

const useRemoveFromCart = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ id }: any) =>
      apiClient.patch(`/cart/remove/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useRemoveFromCart;
