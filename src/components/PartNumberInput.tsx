import { quoteUrl } from '@/lib/quote-url';
export function PartNumberInput({quotePath, source, id}: {quotePath: string; source: string; id: string}) {
  return <div className="part-number">
    <form action={quotePath} method="get" data-part-number>
      <label className="type-label-caps" htmlFor={id}>Your current part number</label>
      <input type="hidden" name="sourcePage" value={source}/>
      <div className="part-number-control"><input id={id} name="partNumber" maxLength={160} placeholder="Enter a part number"/><button className="button quote-button" type="submit">Send part number</button></div>
    </form>
    <p className="type-body-sm">No part number? <a className="quote-link" href={quoteUrl(quotePath, source, {attach: 'photo'})}>Upload a photo of the filter</a>. A person replies within <span className="mono">24 hours</span>.</p>
  </div>;
}
