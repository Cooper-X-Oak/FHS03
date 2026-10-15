import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { storageDir } from './leads';
export async function recordEvent(event: 'quote_start'|'quote_submit'|'whatsapp_click'|'wechat_open', sourcePage: string) {
  await mkdir(storageDir(), {recursive:true,mode:0o700});
  await appendFile(path.join(storageDir(), 'events.jsonl'), JSON.stringify({event,sourcePage,date:new Date().toISOString().slice(0,10)})+'\n', {mode:0o600});
}
