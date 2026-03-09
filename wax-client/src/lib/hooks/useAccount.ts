import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import agent from "../api/agent";
import type { Address, Login, Register, UserInfo } from "../types/user";

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await agent.get<UserInfo>("/account/user-info");
      return response.data;
    },
    enabled: !queryClient.getQueryData(["user"]),
  });

  const loginUser = useMutation({
    mutationFn: async (creds: Login) => {
      await agent.post("/login?useCookies=true", creds);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const registerUser = useMutation({
    mutationFn: async (creds: Register) => {
      await agent.post("/account/register", creds);
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post("/account/logout");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["basket"] });
      navigate("/");
    },
  });

  const { data: savedAddress, isLoading: isLoadingAddress } = useQuery({
    queryKey: ["address"],
    queryFn: async () => {
      const response = await agent.get<Address>("/account/address");
      return response.data;
    },
    enabled: !!currentUser,
  });

  const saveAddress = useMutation({
    mutationFn: async (address: Address) => {
      const response = await agent.post<Address>("/account/address", address);
      return response.data;
    },
    onSuccess: (updatedAddress) => {
      queryClient.setQueryData(["address"], updatedAddress);
    },
  });

  return {
    currentUser,
    isLoadingUser,
    loginUser,
    registerUser,
    logoutUser,
    savedAddress,
    isLoadingAddress,
    saveAddress,
  };
};
