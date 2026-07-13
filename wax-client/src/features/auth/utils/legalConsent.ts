const LEGAL_CONSENT_STORAGE_KEY = 'wax.legal.consent';

// Versión del documento legal vigente; si el texto cambia, subir la fecha
// para poder pedir re-aceptación en el futuro.
export const LEGAL_CONSENT_VERSION = '2026-07-04';

export type LegalConsentRecord = {
  version: string;
  acceptedAt: string;
  terms: boolean;
  dataProcessing: boolean;
  aiUse: boolean;
};

export const getStoredLegalConsent = (): LegalConsentRecord | null => {
  if (globalThis.window === undefined) return null;
  try {
    const rawValue = globalThis.localStorage.getItem(LEGAL_CONSENT_STORAGE_KEY);
    if (!rawValue) return null;
    return JSON.parse(rawValue) as LegalConsentRecord;
  } catch {
    return null;
  }
};

export const storeLegalConsent = () => {
  if (globalThis.window === undefined) return;
  const record: LegalConsentRecord = {
    version: LEGAL_CONSENT_VERSION,
    acceptedAt: new Date().toISOString(),
    terms: true,
    dataProcessing: true,
    aiUse: true,
  };
  globalThis.localStorage.setItem(LEGAL_CONSENT_STORAGE_KEY, JSON.stringify(record));
};
