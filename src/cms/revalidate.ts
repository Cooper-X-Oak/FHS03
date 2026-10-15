import { revalidatePath } from 'next/cache';
import { pages, pageById, requiredLinks, ancestors } from '../lib/sitemap';

export function revalidateProduct(id: string) {
  revalidatePath('/products/catalog/', 'layout'); revalidatePath('/sitemap.xml');
  const product = pageById(id);
  const affected = new Set([product.path, ...ancestors(product).map(page => page.path)]);
  for (const page of pages) if (requiredLinks(page).some(target => target.id === id)) affected.add(page.path);
  for (const path of affected) revalidatePath(path);
}
export function revalidateShared() { revalidatePath('/', 'layout'); }
