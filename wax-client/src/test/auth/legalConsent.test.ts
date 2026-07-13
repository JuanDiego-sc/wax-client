import { describe, it, expect, beforeEach } from 'vitest';
import { getStoredLegalConsent, storeLegalConsent, LEGAL_CONSENT_VERSION } from '@/features/auth/utils/legalConsent';

const STORAGE_KEY = 'wax.legal.consent';

describe('legalConsent', () => {
  beforeEach(() => {
    globalThis.localStorage.clear();
  });

  describe('getStoredLegalConsent', () => {
    it('devuelve null cuando no hay consentimiento guardado', () => {
      expect(getStoredLegalConsent()).toBeNull();
    });

    it('devuelve null si el JSON es invalido (sin romper)', () => {
      globalThis.localStorage.setItem(STORAGE_KEY, '{not-valid-json');
      expect(getStoredLegalConsent()).toBeNull();
    });

    it('lee y parsea el registro guardado', () => {
      globalThis.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: '2026-01-01', acceptedAt: '2026-01-01T00:00:00.000Z', terms: true, dataProcessing: true, aiUse: true }),
      );
      expect(getStoredLegalConsent()?.version).toBe('2026-01-01');
    });
  });

  describe('storeLegalConsent', () => {
    it('guarda version vigente, fecha ISO y las tres aceptaciones', () => {
      storeLegalConsent();
      const record = getStoredLegalConsent();
      expect(record).not.toBeNull();
      expect(record?.version).toBe(LEGAL_CONSENT_VERSION);
      expect(record?.terms).toBe(true);
      expect(record?.dataProcessing).toBe(true);
      expect(record?.aiUse).toBe(true);
      expect(new Date(record?.acceptedAt ?? '').getTime()).not.toBeNaN();
    });
  });
});
