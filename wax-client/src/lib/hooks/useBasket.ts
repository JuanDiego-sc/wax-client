import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { Basket } from "../types/basket";

export const useBasket = () => {
  const queryClient = useQueryClient();

  const { data: basket, isLoading: isLoadingBasket } = useQuery({
    queryKey: ["basket"],
    queryFn: async () => {
      const response = await agent.get<Basket>("/basket");
      return response.data;
    },
  });

  const addItem = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const response = await agent.post<Basket>(
        `/basket?productId=${productId}&quantity=${quantity}`
      );
      return response.data;
    },
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["basket"] });

      const prevBasket = queryClient.getQueryData<Basket>(["basket"]);

      // If no basket exists yet, skip optimistic update — server will create it
      if (!prevBasket?.basketId) return { prevBasket };

      queryClient.setQueryData<Basket>(["basket"], (old) => {
        if (!old) return old;
        const existingItem = old.items.find(
          (item) => item.productId === productId
        );
        return {
          ...old,
          items: existingItem
            ? old.items.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            : [
                ...old.items,
                {
                  productId,
                  name: "",
                  price: 0,
                  pictureUrl: "",
                  brand: "",
                  type: "",
                  quantity,
                },
              ],
        };
      });

      return { prevBasket };
    },
    onError: (_error, _vars, context) => {
      if (context?.prevBasket !== undefined) {
        queryClient.setQueryData(["basket"], context.prevBasket);
      }
    },
    onSuccess: (newBasket, _vars, context) => {
      // If it was a new basket, replace optimistic data with real server response
      if (!context?.prevBasket?.basketId) {
        queryClient.setQueryData(["basket"], newBasket);
      }
    },
  });

  const removeItem = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      await agent.delete(`/basket?productId=${productId}&quantity=${quantity}`);
    },
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["basket"] });

      const prevBasket = queryClient.getQueryData<Basket>(["basket"]);

      queryClient.setQueryData<Basket>(["basket"], (old) => {
        if (!old) return old;
        const itemIndex = old.items.findIndex(
          (item) => item.productId === productId
        );
        if (itemIndex < 0) return old;

        const updatedItems = [...old.items];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity - quantity,
        };

        return {
          ...old,
          items:
            updatedItems[itemIndex].quantity <= 0
              ? updatedItems.filter((item) => item.productId !== productId)
              : updatedItems,
        };
      });

      return { prevBasket };
    },
    onError: (_error, _vars, context) => {
      if (context?.prevBasket !== undefined) {
        queryClient.setQueryData(["basket"], context.prevBasket);
      }
    },
  });

  return {
    basket,
    isLoadingBasket,
    addItem,
    removeItem,
  };
};
