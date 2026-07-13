import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { TabBar } from '@/layouts/TabBar';

const renderTabBar = (path = '/', basketCount = 0, quotationsCount = 0) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <TabBar basketCount={basketCount} quotationsCount={quotationsCount} />
    </MemoryRouter>,
  );

describe('TabBar', () => {
  it('marca Inicio activo solo con match exacto', () => {
    renderTabBar('/');
    expect(screen.getByRole('link', { name: /Inicio/ })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /Catálogo/ })).not.toHaveAttribute('aria-current');
  });

  it('marca activo el tab cuya ruta prefija el pathname', () => {
    renderTabBar('/catalog/abc');
    expect(screen.getByRole('link', { name: /Catálogo/ })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /Inicio/ })).not.toHaveAttribute('aria-current');
  });

  it('el tab del Atelier es el orbe central (hero)', () => {
    renderTabBar('/');
    expect(screen.getByRole('link', { name: /Atelier/ })).toHaveClass('wax-tab-hero');
  });

  it('muestra el badge del carrito cuando hay items', () => {
    renderTabBar('/', 3, 0);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('no muestra badges cuando los contadores estan en cero', () => {
    const { container } = renderTabBar('/', 0, 0);
    expect(container.querySelector('.wax-tab-badge')).toBeNull();
  });

  it('muestra el badge de cotizaciones en Cuenta', () => {
    renderTabBar('/', 0, 2);
    expect(screen.getByRole('link', { name: /Cuenta/ })).toHaveTextContent('2');
  });
});
