// Next's internal request URL can normalize a loopback hostname. Compare the
// browser's Origin to the HTTP Host it actually addressed instead.
export function sameOrigin(request: Request, requireOrigin = false) {
  const origin = request.headers.get('origin');
  if (!origin) return !requireOrigin;
  try {
    const parsed = new URL(origin);
    return ['http:','https:'].includes(parsed.protocol) && parsed.origin === origin && parsed.host === request.headers.get('host');
  } catch {return false;}
}
