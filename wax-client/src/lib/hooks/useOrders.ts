import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import agent from "../api/agent";
import type { CreateOrderDto, OrderDto, OrderParams } from "../types/order";
import type { InfinityPagedList } from "../types/pagination";

export const useOrders = (id?: string, params?: OrderParams) => {
  const queryClient = useQueryClient();
  const { filter, startDate } = params ?? {};

  const {
    data: ordersData,
    isLoading: isLoadingOrders,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<InfinityPagedList<OrderDto, string | null>>({
    queryKey: ["orders", filter, startDate],
    queryFn: async ({ pageParam }) => {
      const response = await agent.get<InfinityPagedList<OrderDto, string | null>>("/order", {
        params: {
          cursor: pageParam,
          filter,
          startDate,
        },
      });
      return response.data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !id,
  });

  const { data: order, isLoading: isLoadingOrder } = useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const response = await agent.get<OrderDto>(`/order/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const createOrder = useMutation({
    mutationFn: async (orderData: CreateOrderDto) => {
      const response = await agent.post<OrderDto>("/order", orderData);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    ordersData,
    isLoadingOrders,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    order,
    isLoadingOrder,
    createOrder,
  };
};
