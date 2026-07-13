import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

vi.mock('@/features/support/pages/TicketDetailPageContent', () => ({
  TicketDetailPageContent: ({ ticketId }: { ticketId: string }) => (
    <div data-testid="ticket-detail">{ticketId === '' ? 'sin-id' : ticketId}</div>
  ),
}));

import { SupportTicketPage } from '@/pages/SupportTicketPage';

describe('SupportTicketPage', () => {
  it('pasa el id de la URL al detalle del ticket', () => {
    render(
      <MemoryRouter initialEntries={['/support/t-123']}>
        <Routes>
          <Route path="/support/:id" element={<SupportTicketPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByTestId('ticket-detail')).toHaveTextContent('t-123');
  });

  it('usa cadena vacia cuando la ruta no trae id', () => {
    render(
      <MemoryRouter initialEntries={['/support']}>
        <Routes>
          <Route path="/support" element={<SupportTicketPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByTestId('ticket-detail')).toHaveTextContent('sin-id');
  });
});
