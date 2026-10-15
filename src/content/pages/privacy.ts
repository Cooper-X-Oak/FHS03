import type { PageContent } from '../types';
const content: PageContent = {
  "description": "Read how the FHS website handles quote requests, uploaded files and basic enquiry attribution. Owner policy details are awaiting confirmation.",
  "intro": "This page describes the enquiry features implemented on this website. The organization, service-provider and retention details below require confirmation before launch.",
  "sections": [
    {
      "heading": "Information in a quote request",
      "paragraphs": [
        "The form collects your name, work email, company, country and message. You can also supply a part number and an optional photograph or PDF. It records the referring site page and campaign parameters when available.",
        "These details are used to review and respond to the enquiry. Avoid including information in an attachment that is unnecessary for that request."
      ]
    },
    {
      "heading": "Storage and email",
      "paragraphs": [
        "An accepted request and any attachment are saved in private server storage. A notification containing the request and attachment is sent through the configured email service to the configured recipient. Failed email notifications remain pending for retry.",
        "[Confirm data controller legal name, address and privacy contact]",
        "[Confirm hosting and email providers, storage locations and international transfers]"
      ]
    },
    {
      "heading": "Browser storage and enquiry counts",
      "paragraphs": [
        "Campaign parameters may be kept in session storage so an enquiry can retain its source as you browse. The site records quote-start and quote-submission counts by source page and UTC day; those event counts do not include the form’s contact fields.",
        "Abuse controls store a hashed request identity and recent submission timestamps. Hashing supports rate limiting; it should not be treated as a promise that all technical records are anonymous. Hosting-provider access logs depend on the deployment configuration.",
        "[Confirm hosting logs, analytics configuration and applicable consent requirements]"
      ]
    },
    {
      "heading": "Retention and requests",
      "paragraphs": [
        "[Confirm enquiry, attachment, email and abuse-record retention and deletion periods]",
        "[Confirm applicable privacy rights, legal basis and request procedure]",
        "[Confirm privacy contact and final policy approval]"
      ]
    }
  ]
};
export default content;

