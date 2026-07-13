import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

const mockUseRouteError = vi.fn();
const mockIsRouteErrorResponse = vi.fn();

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useRouteError: () => mockUseRouteError(),
    isRouteErrorResponse: (error: unknown) => mockIsRouteErrorResponse(error),
  };
});

import { RouteErrorPage } from '@/pages/RouteErrorPage';

describe('RouteErrorPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra status y descripcion para errores de ruta', () => {
    mockUseRouteError.mockReturnValue({ status: 404, statusText: 'Not Found', data: 'La pagina no existe' });
    mockIsRouteErrorResponse.mockReturnValue(true);
    render(<RouteErrorPage />);
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('La pagina no existe')).toBeInTheDocument();
  });

  it('muestra el mensaje cuando el error es una instancia de Error', () => {
    mockUseRouteError.mockReturnValue(new Error('Fallo de render'));
    mockIsRouteErrorResponse.mockReturnValue(false);
    render(<RouteErrorPage />);
    expect(screen.getByText('Ocurrio un error inesperado')).toBeInTheDocument();
    expect(screen.getByText('Fallo de render')).toBeInTheDocument();
  });

  it('usa el mensaje generico para errores desconocidos', () => {
    mockUseRouteError.mockReturnValue(42);
    mockIsRouteErrorResponse.mockReturnValue(false);
    render(<RouteErrorPage />);
    expect(screen.getByText('La aplicacion encontro un problema al renderizar esta vista.')).toBeInTheDocument();
  });

  it('cae al texto generico si la descripcion no es un string', () => {
    mockUseRouteError.mockReturnValue({ status: 500, statusText: 'Server Error', data: { detail: 'x' } });
    mockIsRouteErrorResponse.mockReturnValue(true);
    render(<RouteErrorPage />);
    expect(screen.getByText('No fue posible completar esta accion.')).toBeInTheDocument();
  });
});
