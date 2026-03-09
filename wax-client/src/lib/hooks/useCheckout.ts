import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { Basket } from "../types/basket";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const createOrUpdatePaymentIntent = useMutation({
    mutationFn: async () => {
      const response = await agent.post<Basket>("/payment");
      return response.data;
    },
    onSuccess: (updatedBasket) => {
      queryClient.setQueryData<Basket>(["basket"], (old) => {
        if (!old) return old;
        return { ...old, clientSecret: updatedBasket.clientSecret };
      });
    },
  });

  return {
    createOrUpdatePaymentIntent,
  };
};
