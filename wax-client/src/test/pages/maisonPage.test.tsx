import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MaisonPage } from '@/pages/MaisonPage';

const renderMaison = () =>
  render(
    <MemoryRouter>
      <MaisonPage />
    </MemoryRouter>,
  );

describe('MaisonPage', () => {
  it('muestra el hero con el copy oficial de la marca', () => {
    renderMaison();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/identidad/);
    expect(screen.getByText(/marca ecuatoriana de impresión 3D/)).toBeInTheDocument();
  });

  it('lista los 4 pasos del proceso', () => {
    renderMaison();
    expect(screen.getByText('Comparte tu idea')).toBeInTheDocument();
    expect(screen.getByText('Refinamos juntos')).toBeInTheDocument();
    expect(screen.getByText('Tu pieza cobra cuerpo')).toBeInTheDocument();
    expect(screen.getByText('Producción artesanal')).toBeInTheDocument();
  });

  it('muestra los 3 valores de la casa', () => {
    renderMaison();
    expect(screen.getByText('Producción a demanda')).toBeInTheDocument();
    expect(screen.getByText('Origen Ecuador')).toBeInTheDocument();
    expect(screen.getByText('Tecnología al servicio del oficio')).toBeInTheDocument();
  });

  it('incluye la seccion de envios con su ancla #envios', () => {
    const { container } = renderMaison();
    expect(screen.getByText('Cobertura')).toBeInTheDocument();
    expect(screen.getByText('Tiempos')).toBeInTheDocument();
    expect(container.querySelector('#envios')).not.toBeNull();
  });

  it('tiene CTAs hacia el Atelier y el catalogo', () => {
    renderMaison();
    expect(screen.getByRole('link', { name: 'Iniciar encargo' })).toHaveAttribute('href', '/atelier-ai');
    expect(screen.getByRole('link', { name: 'Ver la colección' })).toHaveAttribute('href', '/catalog');
  });
});
