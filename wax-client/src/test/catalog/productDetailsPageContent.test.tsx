import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';

vi.mock('@/features/catalog/hooks/useProduct', () => ({ useProduct: vi.fn() }));
vi.mock('@/features/basket/hooks/useAddToBasket', () => ({ useAddToBasket: vi.fn() }));
vi.mock('@/lib/hooks/useProfileGuard', () => ({ useProfileGuard: vi.fn() }));
vi.mock('@/components/PageLoadingSkeleton', () => ({
  PageLoadingSkeleton: ({ label }: { label: string }) => <div data-testid="skeleton">{label}</div>,
}));

import { useProduct } from '@/features/catalog/hooks/useProduct';
import { useAddToBasket } from '@/features/basket/hooks/useAddToBasket';
import { useProfileGuard } from '@/lib/hooks/useProfileGuard';
import { ProductDetailsPageContent } from '@/features/catalog/pages/ProductDetailsPageContent';

const mockUseProduct = vi.mocked(useProduct);
const mockUseAddToBasket = vi.mocked(useAddToBasket);
const mockUseProfileGuard = vi.mocked(useProfileGuard);

const fakeProduct = {
  id: 'p1',
  name: 'Bolso Cloud Blanc',
  description: 'Pieza escultórica impresa en 3D.',
  price: 12000,
  pictureUrl: 'https://cdn.wax/p1.png',
  type: 'Bolso',
  brand: 'WAX',
  quantityInStock: 5,
};

const mockAddToBasket = vi.fn();
const mockRequireProfile = vi.fn((action: () => void) => action());

const setProductState = (state: Partial<{ data: typeof fakeProduct; isLoading: boolean; isError: boolean }>) => {
  mockUseProduct.mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: false,
    ...state,
  } as unknown as ReturnType<typeof useProduct>);
};

const setBasketState = (isPending = false) => {
  mockUseAddToBasket.mockReturnValue({
    mutate: mockAddToBasket,
    isPending,
  } as unknown as ReturnType<typeof useAddToBasket>);
};

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/catalog/p1']}>
      <Routes>
        <Route path="/catalog/:id" element={<ProductDetailsPageContent />} />
      </Routes>
    </MemoryRouter>,
  );

describe('ProductDetailsPageContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setBasketState();
    mockUseProfileGuard.mockReturnValue({
      requireProfile: mockRequireProfile,
      isAuthenticated: true,
      hasCompleteProfile: true,
    });
  });

  it('muestra el skeleton mientras carga', () => {
    setProductState({ isLoading: true });
    renderPage();
    expect(screen.getByTestId('skeleton')).toHaveTextContent('Cargando pieza');
  });

  it('muestra el mensaje de error cuando falla la carga', () => {
    setProductState({ isError: true });
    renderPage();
    expect(screen.getByText('No pudimos cargar esta pieza.')).toBeInTheDocument();
  });

  it('renderiza la pieza con imagen, marca, tipo y disponibilidad', () => {
    setProductState({ data: fakeProduct });
    renderPage();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bolso Cloud Blanc');
    expect(screen.getByRole('img', { name: 'Bolso Cloud Blanc' })).toHaveAttribute('src', fakeProduct.pictureUrl);
    expect(screen.getByText('WAX')).toBeInTheDocument();
    expect(screen.getByText('5 disponibles')).toBeInTheDocument();
  });

  it('añade al carrito pasando por el guard de perfil', async () => {
    const user = userEvent.setup();
    setProductState({ data: fakeProduct });
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Añadir al carrito' }));

    expect(mockRequireProfile).toHaveBeenCalledTimes(1);
    expect(mockAddToBasket).toHaveBeenCalledWith({ productId: 'p1', quantity: 1 });
  });

  it('deshabilita el boton y muestra Sin stock cuando no hay unidades', () => {
    setProductState({ data: { ...fakeProduct, quantityInStock: 0 } });
    renderPage();
    expect(screen.getByRole('button', { name: 'Sin stock' })).toBeDisabled();
  });

  it('muestra Añadiendo... mientras la mutacion esta pendiente', () => {
    setProductState({ data: fakeProduct });
    setBasketState(true);
    renderPage();
    expect(screen.getByRole('button', { name: 'Añadiendo...' })).toBeDisabled();
  });
});
