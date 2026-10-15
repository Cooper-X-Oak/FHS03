/** Payload's own media route is same-origin even when serverURL includes a host. */
export function mediaSource(value:string):string {
  try {const url=new URL(value,'http://relative.invalid');if(url.pathname.startsWith('/api/media/file/'))return url.pathname.replace(/\/$/,'');}catch {/* Keep external media URLs unchanged. */}
  return value;
}
