import type { FaqEntry } from '@/components/ContentComponents';
export type SectionContent = {productIds?: string[]; heading: string; paragraphs: string[]; table?: {headings: string[]; rows: string[][]}};
export type PageContent = {
  seoTitle?: string; request_hint?: string; gallery?: {image: number | {url?: string;alt?: string;width?: number;height?: number};kind:string;caption?:string}[]; processImage?: number | {url?:string;alt?:string;width?:number;height?:number}; moduleContent?: Record<string,(SectionContent & {productIds?:string[]})[]>;
  description: string; intro: string; sections: SectionContent[];
  specs?: {label: string; value: string; note?: string}[];
  faq?: FaqEntry[]; stages?: {title: string; seoTitle?: string; request_hint?: string; gallery?: {image: number | {url?: string;alt?: string;width?: number;height?: number};kind:string;caption?:string}[]; processImage?: number | {url?:string;alt?:string;width?:number;height?:number}; moduleContent?: Record<string,(SectionContent & {productIds?:string[]})[]>;
  description: string; products: string[]}[];
  mistakes?: string[]; selection?: string[];
  supply?: {title:string;description:string}[];
  formPrompt?: string;
  sources?: {title:string;url:string;note:string}[];
  topics?: Record<string,string>;
};
