import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '@/lib/hooks/useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    globalThis.localStorage.clear();
    document.documentElement.dataset.theme = 'light';
  });

  it('inicia con el tema actual del DOM', () => {
    document.documentElement.dataset.theme = 'dark';
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('toggleTheme alterna el tema, lo aplica al DOM y lo persiste', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(globalThis.localStorage.getItem('wax-theme')).toBe('dark');

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(globalThis.localStorage.getItem('wax-theme')).toBe('light');
  });
});
