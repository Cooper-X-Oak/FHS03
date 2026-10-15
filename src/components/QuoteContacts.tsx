import { contactDetails } from '@/cms/public-data';
import { ContactOptions } from './ContactOptions';
export async function QuoteContacts({ source }: { source: string }) {
  const contact = await contactDetails();
  const qr = contact.wechatQR;
  return <ContactOptions source={source} whatsapp={contact.whatsapp} wechatQR={typeof qr === 'object' && qr?.url && qr.width && qr.height ? { url: qr.url, width: qr.width, height: qr.height, alt: qr.alt || 'Scan to contact FHS on WeChat' } : undefined}/>;
}
