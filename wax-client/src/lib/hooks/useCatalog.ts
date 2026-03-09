import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { mutationKeys, queryKeys } from "../queryKeys";
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

/**
 * Hook for fetching paginated product list
 */
export const useProducts = (params: ProductParams = {}) => {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: async () => {
      const response = await agent.get<PagedList<Product>>("/product", { params });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};

/**
 * Hook for fetching a single product by ID
 */
export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id!),
    queryFn: async () => {
      const response = await agent.get<Product>(`/product/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

/**
 * Hook for creating a new product
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.products.create,
    mutationFn: async (dto: CreateProduct) => {
      const response = await agent.post<Product>("/product", toFormData(dto), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
    onError: (error) => {
      console.error("Failed to create product:", error);
    },
  });
};

/**
 * Hook for updating an existing product
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.products.update,
    mutationFn: async (dto: UpdateProduct) => {
      await agent.put("/product", toFormData(dto), {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
    onError: (error) => {
      console.error("Failed to update product:", error);
    },
  });
};

/**
 * Hook for deleting a product
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.products.delete,
    mutationFn: async (productId: string) => {
      await agent.delete(`/product/${productId}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
    onError: (error) => {
      console.error("Failed to delete product:", error);
    },
  });
};

/**
 * Composite hook that combines all catalog functionality
 * Maintains backward compatibility with existing code
 */
export const useCatalog = (id?: string, params?: ProductParams) => {
  const queryClient = useQueryClient();

  const { data: catalogData, isLoading: isLoadingProducts } = useQuery({
    queryKey: queryKeys.products.list(params ?? {}),
    queryFn: async () => {
      const response = await agent.get<PagedList<Product>>("/product", { params });
      return response.data;
    },
    placeholderData: keepPreviousData,
    enabled: !id,
  });

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: queryKeys.products.detail(id!),
    queryFn: async () => {
      const response = await agent.get<Product>(`/product/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const createProduct = useMutation({
    mutationKey: mutationKeys.products.create,
    mutationFn: async (dto: CreateProduct) => {
      const response = await agent.post<Product>("/product", toFormData(dto), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
    onError: (error) => {
      console.error("Failed to create product:", error);
    },
  });

  const updateProduct = useMutation({
    mutationKey: mutationKeys.products.update,
    mutationFn: async (dto: UpdateProduct) => {
      await agent.put("/product", toFormData(dto), {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
    onError: (error) => {
      console.error("Failed to update product:", error);
    },
  });

  const deleteProduct = useMutation({
    mutationKey: mutationKeys.products.delete,
    mutationFn: async (productId: string) => {
      await agent.delete(`/product/${productId}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
    onError: (error) => {
      console.error("Failed to delete product:", error);
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
