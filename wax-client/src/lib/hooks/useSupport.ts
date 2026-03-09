import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type {
  CreateSupportTicket,
  SupportTicket,
  SupportTicketParams,
} from "../types/support";
import type { PagedList } from "../types/pagination";

export const useSupport = (id?: string, params?: SupportTicketParams) => {
  const queryClient = useQueryClient();
  const { orderBy, status, category, createdOn, pageNumber, pageSize } = params ?? {};

  const { data: ticketsData, isLoading: isLoadingTickets } = useQuery({
    queryKey: ["tickets", orderBy, status, category, createdOn, pageNumber, pageSize],
    queryFn: async () => {
      const response = await agent.get<PagedList<SupportTicket>>("/support", {
        params: { orderBy, status, category, createdOn, pageNumber, pageSize },
      });
      return response.data;
    },
    placeholderData: keepPreviousData,
    enabled: !id,
  });

  const { data: ticket, isLoading: isLoadingTicket } = useQuery({
    queryKey: ["tickets", id],
    queryFn: async () => {
      const response = await agent.get<SupportTicket>(`/support/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const createTicket = useMutation({
    mutationFn: async (dto: CreateSupportTicket) => {
      const response = await agent.post<CreateSupportTicket>("/support", dto);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  return {
    ticketsData,
    isLoadingTickets,
    ticket,
    isLoadingTicket,
    createTicket,
  };
};
