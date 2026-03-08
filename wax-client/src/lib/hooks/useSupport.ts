import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type {
  CreateSupportTicketDto,
  SupportTicketDto,
  SupportTicketParams,
} from "../types/support";
import type { Pagination } from "../types/pagination";

export const useSupport = (id?: string, params?: SupportTicketParams) => {
  const queryClient = useQueryClient();
  const { orderBy, status, category, createdOn, pageNumber, pageSize } = params ?? {};

  const { data: ticketsData, isLoading: isLoadingTickets } = useQuery({
    queryKey: ["tickets", orderBy, status, category, createdOn, pageNumber, pageSize],
    queryFn: async () => {
      const response = await agent.get<SupportTicketDto[]>("/support", {
        params: { orderBy, status, category, createdOn, pageNumber, pageSize },
      });
      const paginationHeader = response.headers["pagination"];
      const pagination: Pagination | null = paginationHeader
        ? JSON.parse(paginationHeader)
        : null;
      return { items: response.data, pagination };
    },
    placeholderData: keepPreviousData,
    enabled: !id,
  });

  const { data: ticket, isLoading: isLoadingTicket } = useQuery({
    queryKey: ["tickets", id],
    queryFn: async () => {
      const response = await agent.get<SupportTicketDto>(`/support/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const createTicket = useMutation({
    mutationFn: async (dto: CreateSupportTicketDto) => {
      const response = await agent.post<CreateSupportTicketDto>("/support", dto);
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
