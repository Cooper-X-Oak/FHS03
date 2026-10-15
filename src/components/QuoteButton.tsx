import { quoteUrl } from '@/lib/quote-url';
import type { ReactNode } from 'react';
export function QuoteButton({quotePath, source, label = 'Request a quote', compact = false, icon}: {quotePath: string; source: string; label?: string; compact?: boolean; icon?: ReactNode}) {
  return <a data-quote className={`button quote-button${compact ? ' compact' : ''}`} href={quoteUrl(quotePath, source)}>{label}{icon}</a>;
}
