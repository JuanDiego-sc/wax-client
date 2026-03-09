import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { CreateProduct, Product, ProductParams, UpdateProduct } from "../types/product";
import type { PagedList } from "../types/pagination";

const toFormData = (dto: CreateProduct | UpdateProduct): FormData => {
  const formData = new FormData();
  Object.entries(dto).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });
  return formData;
};

export const useCatalog = (id?: string, params?: ProductParams) => {
  const queryClient = useQueryClient();
  const { orderBy, searchTerm, brands, types, pageNumber, pageSize } = params ?? {};

  const { data: catalogData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", orderBy, searchTerm, brands, types, pageNumber, pageSize],
    queryFn: async () => {
      const response = await agent.get<PagedList<Product>>("/product", {
        params: { orderBy, searchTerm, brands, types, pageNumber, pageSize },
      });
      return response.data;
    },
    placeholderData: keepPreviousData,
    enabled: !id,
  });

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await agent.get<Product>(`/product/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const createProduct = useMutation({
    mutationFn: async (dto: CreateProduct) => {
      const response = await agent.post<Product>("/product", toFormData(dto), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: async (dto: UpdateProduct) => {
      await agent.put("/product", toFormData(dto), {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (productId: string) => {
      await agent.delete(`/product/${productId}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    catalogData,
    isLoadingProducts,
    product,
    isLoadingProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
