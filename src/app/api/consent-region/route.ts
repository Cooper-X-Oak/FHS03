import {consentPolicy} from '@/lib/consent-policy';
export async function GET(request:Request){
  // Enable only behind an origin firewall and a proxy that overwrites this header.
  const country=process.env.TRUST_GEO_HEADER==='true'?request.headers.get('cf-ipcountry'):process.env.CONSENT_DEFAULT_COUNTRY||null;
  return Response.json(consentPolicy(country),{headers:{'Cache-Control':'private, no-store','Vary':'CF-IPCountry'}});
}
