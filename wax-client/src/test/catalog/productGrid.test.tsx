import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Product } from '@/features/catalog/types/catalog.types';

vi.mock('@/features/catalog/components/ProductCard', () => ({
  ProductCard: ({ product }: { product: { id: string; name: string } }) => <div>{product.name}</div>,
}));

import { ProductGrid } from '@/features/catalog/components/ProductGrid';

const fakeProducts = [
  { id: '1', name: 'Bolso Cloud Blanc' },
  { id: '2', name: 'Bolso Negro Mate' },
] as unknown as Product[];

describe('ProductGrid', () => {
  it('renderiza una card por producto', () => {
    render(<ProductGrid products={fakeProducts} />);
    expect(screen.getByText('Bolso Cloud Blanc')).toBeInTheDocument();
    expect(screen.getByText('Bolso Negro Mate')).toBeInTheDocument();
  });

  it('renderiza un grid vacio sin productos', () => {
    const { container } = render(<ProductGrid products={[]} />);
    expect(container.querySelector('.catalog-grid')).toBeEmptyDOMElement();
  });
});
