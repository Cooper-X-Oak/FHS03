import type { PageContent } from './types';
import cases from './pages/cases';
import { pageById, keyword } from '../lib/sitemap';

// Confirmed owner scope, 2026-10-13 04:17–04:23. Seed input only.
export const ownerFeedbackContent: Record<string, PageContent> = {};
for (const id of ['lab', 'accessories', 'presses']) {
  const page = pageById(id);
  ownerFeedbackContent[id] = {
    description: `${keyword(page)}: send your requirements to FHS. Product information is awaiting confirmation.`,
    intro: `[Confirm ${page.label}: deferred product information]`,
    sections: [{heading: 'Product information', paragraphs: [`[Confirm ${page.label}: scope after main product lines are complete]`]}],
    faq: [{question: 'What should I send with my request?', answer: 'Send the existing part number or a photo, the application and the quantity you need.'}],
  };
}
ownerFeedbackContent['inkjet-printing'] = {
  description: 'Inkjet ink filtration for coding printers and ceramic inkjet printers. Send the printer model, ink details and installed filter for review.',
  intro: 'For inkjet ink filtration in coding printers and ceramic inkjet printers, send the printer model, ink details and current filter part number or photo.',
  sections: [
    {heading: 'Coding printers', paragraphs: ['Identify the printer brand and model, the filter position and the part number shown on the installed filter. Include a clear photo if the label is difficult to read.']},
    {heading: 'Ceramic inkjet printers', paragraphs: ['Identify the ceramic inkjet printer, the ink in use and the existing filter. Send the available printer or filter specification so the proposed replacement can be reviewed against that requirement.']},
    {heading: 'Confirm the replacement before ordering', paragraphs: ['Application scope alone does not establish compatibility with a printer model. Dimensions, connections and the required filtration specification need to be checked before a match is confirmed.']},
  ],
  faq: [{question: 'Can you confirm a replacement from the printer brand alone?', answer: 'Send the printer model and current filter code or photo as well. A brand name alone is not a verified cross-reference.'}],
};

ownerFeedbackContent.cases = cases;
