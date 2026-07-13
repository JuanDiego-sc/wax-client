import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordInput } from '@/components/PasswordInput';

describe('PasswordInput', () => {
  it('inicia oculto (type password) con el boton de mostrar', () => {
    render(<PasswordInput placeholder="Tu contraseña" />);
    expect(screen.getByPlaceholderText('Tu contraseña')).toHaveAttribute('type', 'password');
    expect(screen.getByRole('button', { name: 'Mostrar contraseña' })).toBeInTheDocument();
  });

  it('alterna la visibilidad al hacer click en el toggle', async () => {
    const user = userEvent.setup();
    render(<PasswordInput placeholder="Tu contraseña" />);

    await user.click(screen.getByRole('button', { name: 'Mostrar contraseña' }));
    expect(screen.getByPlaceholderText('Tu contraseña')).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: 'Ocultar contraseña' }));
    expect(screen.getByPlaceholderText('Tu contraseña')).toHaveAttribute('type', 'password');
  });
});
