import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { mutationKeys, queryKeys } from "../queryKeys";
import type { Basket } from "../types/basket";

/**
 * Hook for creating or updating a payment intent
 */
export const useCreatePaymentIntent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.checkout.createPaymentIntent,
    mutationFn: async () => {
      const response = await agent.post<Basket>("/payment");
      return response.data;
    },
    onSuccess: (updatedBasket) => {
      queryClient.setQueryData<Basket>(queryKeys.basket.all, (old) => {
        if (!old) return old;
        return { ...old, clientSecret: updatedBasket.clientSecret };
      });
    },
    onError: (error) => {
      console.error("Failed to create payment intent:", error);
    },
  });
};

/**
 * Composite hook for checkout functionality
 * Maintains backward compatibility with existing code
 */
export const useCheckout = () => {
  const queryClient = useQueryClient();

  const createOrUpdatePaymentIntent = useMutation({
    mutationKey: mutationKeys.checkout.createPaymentIntent,
    mutationFn: async () => {
      const response = await agent.post<Basket>("/payment");
      return response.data;
    },
    onSuccess: (updatedBasket) => {
      queryClient.setQueryData<Basket>(queryKeys.basket.all, (old) => {
        if (!old) return old;
        return { ...old, clientSecret: updatedBasket.clientSecret };
      });
    },
    onError: (error) => {
      console.error("Failed to create payment intent:", error);
    },
  });

  return {
    createOrUpdatePaymentIntent,
  };
};
