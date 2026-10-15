import type { Field, TextField } from 'payload';

export const text = (name: string, required = false): TextField => ({ name, type: 'text', required });
export const paragraphs: Field = { name: 'paragraphs', type: 'array', fields: [{ name: 'text', type: 'textarea', required: true }] };
export const contentFields: Field[] = [
  {name:'seoTitle',type:'text'}, {name:'request_hint',type:'textarea'},
  {name:'gallery',type:'array',fields:[{name:'image',type:'upload',relationTo:'media',required:true},{name:'kind',type:'select',options:['overall','end-cap','detail','dimensions'],required:true},text('caption')]},
  {name:'processImage',type:'upload',relationTo:'media'},
  {name:'moduleContent',type:'json',admin:{description:'Module keyed content: M04, M09, M12, M15, M16, M27. Arrays of {heading, paragraphs, table?, productIds?}. Empty modules are hidden.'}},
  { name: 'description', type: 'textarea', required: true, maxLength: 155 },
  { name: 'intro', type: 'textarea', required: true },
  { name: 'sections', type: 'array', fields: [text('heading', true), paragraphs, { name: 'table', type: 'json', admin: { description: 'Optional {headings: string[], rows: string[][]} comparison table.' } }] },
  { name: 'specs', type: 'array', fields: [text('label', true), text('value', true), text('note')] },
  { name: 'faq', type: 'array', fields: [text('question', true), { name: 'answer', type: 'textarea', required: true }] },
  { name: 'stages', type: 'array', fields: [text('title', true), {name:'seoTitle',type:'text'}, {name:'request_hint',type:'textarea'},
  {name:'gallery',type:'array',fields:[{name:'image',type:'upload',relationTo:'media',required:true},{name:'kind',type:'select',options:['overall','end-cap','detail','dimensions'],required:true},text('caption')]},
  {name:'processImage',type:'upload',relationTo:'media'},
  {name:'moduleContent',type:'json',admin:{description:'Module keyed content: M04, M09, M12, M15, M16, M27. Arrays of {heading, paragraphs, table?, productIds?}. Empty modules are hidden.'}},
  { name: 'description', type: 'textarea', required: true }, { name: 'products', type: 'select', hasMany: true, options: [] }] },
  ...['mistakes', 'selection'].map(name => ({ name, type: 'array' as const, fields: [{ name: 'text', type: 'textarea' as const, required: true }] })),
  { name: 'supply', type: 'array', fields: [text('title', true), {name:'seoTitle',type:'text'}, {name:'request_hint',type:'textarea'},
  {name:'gallery',type:'array',fields:[{name:'image',type:'upload',relationTo:'media',required:true},{name:'kind',type:'select',options:['overall','end-cap','detail','dimensions'],required:true},text('caption')]},
  {name:'processImage',type:'upload',relationTo:'media'},
  {name:'moduleContent',type:'json',admin:{description:'Module keyed content: M04, M09, M12, M15, M16, M27. Arrays of {heading, paragraphs, table?, productIds?}. Empty modules are hidden.'}},
  { name: 'description', type: 'textarea', required: true }] },
  { name: 'sources', type: 'array', fields: [text('title', true), text('url', true), { name: 'note', type: 'textarea' }] },
  { name: 'formPrompt', type: 'textarea' },
  { name: 'topics', type: 'json' },
];
