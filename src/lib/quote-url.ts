export function quoteUrl(quotePath: string, sourcePage: string, extra: Record<string, string> = {}) {
  return `${quotePath}?${new URLSearchParams({sourcePage, ...extra})}`;
}
