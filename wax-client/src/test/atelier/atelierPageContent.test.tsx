import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/features/atelier/components/AtelierChat', () => ({
  AtelierChat: () => <div data-testid="atelier-chat" />,
}));

import { AtelierPageContent } from '@/features/atelier/pages/AtelierPageContent';

describe('AtelierPageContent', () => {
  it('muestra el panel de marca y monta el chat', () => {
    render(<AtelierPageContent />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Diseña con/);
    expect(screen.getByText(/Conversa con el asistente/)).toBeInTheDocument();
    expect(screen.getByTestId('atelier-chat')).toBeInTheDocument();
  });
});
