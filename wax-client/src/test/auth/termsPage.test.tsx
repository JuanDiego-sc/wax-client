import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { TermsPage } from '@/pages/TermsPage';

const renderTermsPage = () =>
  render(
    <MemoryRouter>
      <TermsPage />
    </MemoryRouter>,
  );

describe('TermsPage', () => {
  it('muestra el titulo del documento legal', () => {
    renderTermsPage();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Términos/);
  });

  it('incluye la seccion de datos personales (LOPDP)', () => {
    renderTermsPage();
    expect(screen.getByText('Política de privacidad (LOPDP).')).toBeInTheDocument();
    expect(screen.getAllByText(/Superintendencia de Protección de Datos Personales/).length).toBeGreaterThan(0);
  });

  it('incluye el aviso de transparencia de uso de IA', () => {
    renderTermsPage();
    expect(screen.getByText('Aviso de transparencia de IA.')).toBeInTheDocument();
    expect(screen.getByText(/estás interactuando con un sistema automatizado/)).toBeInTheDocument();
  });

  it('explica que la aceptacion ocurre al completar el registro', () => {
    renderTermsPage();
    expect(screen.getByText(/Al completar el registro de tu cuenta/)).toBeInTheDocument();
  });

  it('incluye definiciones, revocatoria y veracidad (estructura legal)', () => {
    renderTermsPage();
    expect(screen.getByText(/se entiende por "tratamiento"/)).toBeInTheDocument();
    expect(screen.getByText(/Puedes revocar este consentimiento/)).toBeInTheDocument();
    expect(screen.getByText(/información veraz, exacta y actualizada/)).toBeInTheDocument();
  });

  it('no contiene guiones largos en el texto legal', () => {
    const { container } = renderTermsPage();
    expect(container.textContent).not.toContain('—');
  });
});
