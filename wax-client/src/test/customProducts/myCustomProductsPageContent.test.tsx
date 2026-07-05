import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

vi.mock('@/features/customProducts/hooks/useMyCustomProducts', () => ({ useMyCustomProducts: vi.fn() }));
vi.mock('@/features/customProducts/components/CustomProductCard', () => ({
  CustomProductCard: ({ product }: { product: { id: string } }) => <div data-testid="cp-card">{product.id}</div>,
}));
vi.mock('@/components/PageLoadingSkeleton', () => ({
  PageLoadingSkeleton: ({ label }: { label: string }) => <div data-testid="skeleton">{label}</div>,
}));

import { useMyCustomProducts } from '@/features/customProducts/hooks/useMyCustomProducts';
import { MyCustomProductsPageContent } from '@/features/customProducts/pages/MyCustomProductsPageContent';

const mockUseMyCustomProducts = vi.mocked(useMyCustomProducts);

const setHookState = (data: unknown, isLoading = false) => {
  mockUseMyCustomProducts.mockReturnValue({ data, isLoading } as unknown as ReturnType<typeof useMyCustomProducts>);
};

const renderPage = () =>
  render(
    <MemoryRouter>
      <MyCustomProductsPageContent />
    </MemoryRouter>,
  );

describe('MyCustomProductsPageContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra el skeleton mientras carga', () => {
    setHookState(undefined, true);
    renderPage();
    expect(screen.getByTestId('skeleton')).toHaveTextContent('Cargando tus cotizaciones');
  });

  it('muestra el estado vacio con CTA al Atelier', () => {
    setHookState([]);
    renderPage();
    expect(screen.getByText('Todavía no enviaste ninguna pieza a cotizar.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ir al Atelier' })).toHaveAttribute('href', '/atelier-ai');
  });

  it('lista las cotizaciones sin banner cuando ninguna espera respuesta', () => {
    setHookState([
      { id: 'c1', status: 'Requested' },
      { id: 'c2', status: 'Approved' },
    ]);
    renderPage();
    expect(screen.getAllByTestId('cp-card')).toHaveLength(2);
    expect(screen.queryByText(/esperando tu respuesta/)).not.toBeInTheDocument();
  });

  it('muestra el banner en singular con una propuesta pendiente', () => {
    setHookState([{ id: 'c1', status: 'AwaitingCustomerReview' }]);
    renderPage();
    expect(screen.getByText('Tienes 1 propuesta esperando tu respuesta.')).toBeInTheDocument();
  });

  it('muestra el banner en plural con varias propuestas pendientes', () => {
    setHookState([
      { id: 'c1', status: 'AwaitingCustomerReview' },
      { id: 'c2', status: 'AwaitingCustomerReview' },
      { id: 'c3', status: 'Requested' },
    ]);
    renderPage();
    expect(screen.getByText('Tienes 2 propuestas esperando tu respuesta.')).toBeInTheDocument();
    expect(screen.getAllByTestId('cp-card')).toHaveLength(3);
  });
});
