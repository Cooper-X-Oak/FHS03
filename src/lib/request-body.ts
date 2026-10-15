export class PayloadTooLargeError extends Error {}
export async function readLimitedBody(request: Request, limit: number): Promise<Buffer> {
  if (Number(request.headers.get('content-length') || 0)>limit) throw new PayloadTooLargeError();
  const reader=request.body?.getReader();
  if (!reader) return Buffer.alloc(0);
  const chunks: Uint8Array[]=[]; let size=0;
  try {
    while(true) {
      const {done,value}=await reader.read();
      if(done) break;
      size+=value.byteLength;
      if(size>limit) {await reader.cancel();throw new PayloadTooLargeError();}
      chunks.push(value);
    }
    return Buffer.concat(chunks);
  } finally {reader.releaseLock();}
}
