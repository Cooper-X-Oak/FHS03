import { cache } from 'react';
import { cms } from './content';

export const contactDetails = cache(async () => (await cms()).findGlobal({ slug: 'contact', locale: 'en', depth: 1, overrideAccess: true }));
export const approvedProof = cache(async () => {
  const data = await (await cms()).findGlobal({ slug: 'proof', locale: 'en', depth: 1, overrideAccess: true });
  return (data.metrics || []).filter(metric => metric.confirmed);
});
export const approvedCertifications = cache(async () => {
  const data = await (await cms()).findGlobal({ slug: 'certifications', locale: 'en', depth: 1, overrideAccess: true });
  return (data.items || []).filter(item => item.approved);
});
export const approvedCases = cache(async () => (await (await cms()).find({ collection: 'cases', where: { approved: { equals: true } }, locale: 'en', depth: 1, pagination: false, overrideAccess: true })).docs);
export const productModels = cache(async (pageId: string) => (await (await cms()).find({ collection: 'products', where: { and: [{ pageId: { equals: pageId } }, { approved: { equals: true } }] }, locale: 'en', depth: 1, pagination: false, overrideAccess: true })).docs);
export const verifiedReferences = cache(async (pageId: string) => (await (await cms()).find({ collection: 'crossReferences', where: { and: [{ pageId: { equals: pageId } }, { verified: { equals: true } }] }, depth: 0, pagination: false, overrideAccess: true })).docs);
