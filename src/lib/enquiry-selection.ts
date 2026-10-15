export type EnquiryItem = {id: string; label: string; path: string};
export const MAX_ENQUIRY_ITEMS = 12;

export function parseEnquirySelection(raw: string | null): EnquiryItem[] {
  if (!raw || raw.length > 12000) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    const seen = new Set<string>();
    return data.filter((item): item is EnquiryItem => {
      if (!item || typeof item !== 'object') return false;
      const {id, label, path} = item;
      if (typeof id !== 'string' || !id || id.length > 120 || seen.has(id)) return false;
      if (typeof label !== 'string' || !label.trim() || label.length > 160 || /[\r\n]/.test(label)) return false;
      if (typeof path !== 'string' || path.length > 300 || !/^\/products\/[a-z0-9/-]*\/$/.test(path)) return false;
      seen.add(id);
      return true;
    }).slice(0, MAX_ENQUIRY_ITEMS).map(({id,label,path}) => ({id,label,path}));
  } catch { return []; }
}

export function enquirySelectionText(items: EnquiryItem[], heading: string): string {
  return items.length ? `${heading}\n${items.map(item => `- ${item.label} (${item.path})`).join('\n')}\n\n` : '';
}
