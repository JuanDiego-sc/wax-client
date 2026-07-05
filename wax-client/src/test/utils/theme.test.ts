import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { resolveInitialTheme, applyTheme, persistTheme, getCurrentTheme } from '@/lib/utils/theme';

describe('theme utils', () => {
  beforeEach(() => {
    globalThis.localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('resolveInitialTheme', () => {
    it('respeta la preferencia guardada en localStorage', () => {
      globalThis.localStorage.setItem('wax-theme', 'dark');
      expect(resolveInitialTheme()).toBe('dark');
      globalThis.localStorage.setItem('wax-theme', 'light');
      expect(resolveInitialTheme()).toBe('light');
    });

    it('ignora valores invalidos y cae al default por viewport (mobile dark)', () => {
      globalThis.localStorage.setItem('wax-theme', 'neon');
      vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
      expect(resolveInitialTheme()).toBe('dark');
    });

    it('viewport ancho (desktop) por defecto es light', () => {
      vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
      expect(resolveInitialTheme()).toBe('light');
    });

    it('sin matchMedia disponible cae a light', () => {
      vi.stubGlobal('matchMedia', undefined);
      expect(resolveInitialTheme()).toBe('light');
    });
  });

  describe('applyTheme / getCurrentTheme', () => {
    it('applyTheme escribe data-theme en el html y getCurrentTheme lo lee', () => {
      applyTheme('dark');
      expect(document.documentElement.dataset.theme).toBe('dark');
      expect(getCurrentTheme()).toBe('dark');
      applyTheme('light');
      expect(getCurrentTheme()).toBe('light');
    });

    it('getCurrentTheme devuelve light cuando no hay data-theme', () => {
      expect(getCurrentTheme()).toBe('light');
    });
  });

  describe('persistTheme', () => {
    it('guarda la preferencia en localStorage', () => {
      persistTheme('dark');
      expect(globalThis.localStorage.getItem('wax-theme')).toBe('dark');
    });
  });
});
