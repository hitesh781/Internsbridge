function initialLetter(company) {
  const s = (company || "?").trim();
  if (!s) return "?";
  const char = s.charAt(0);
  return /[A-Za-z0-9\u0900-\u097F]/.test(char) ? char.toUpperCase() : "?";
}

/**
 * Inline SVG — loads instantly, no Clearbit / third-party lag.
 */
export function companyLogoFallbackDataUri(company) {
  const letter = initialLetter(company);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect fill="#6366f1" width="128" height="128" rx="16"/><text x="64" y="78" font-family="system-ui,sans-serif" font-size="52" font-weight="700" fill="#fff" text-anchor="middle">${letter}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Prefer logo URL from Firestore; otherwise instant initials avatar (data URI).
 */
export function companyLogoSrc(company, explicitLogo) {
  const trimmed = explicitLogo && String(explicitLogo).trim();
  if (trimmed) return trimmed;
  return companyLogoFallbackDataUri(company);
}
