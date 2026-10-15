'use client';
import { useState } from 'react';
export function ArchiveFilter({items}: {items:{label:string;path:string;type:string}[]}) {
  const [topic,setTopic]=useState('');
  const filtered=items.filter(item=>!topic||item.type===topic);
  return <div><label className="field">Topic<select value={topic} onChange={e=>setTopic(e.target.value)}><option value="">All topics</option>{[...new Set(items.map(item=>item.type))].map(type=><option key={type}>{type}</option>)}</select></label><p role="status"><span className="mono">{filtered.length}</span> matching {filtered.length===1?'page':'pages'}</p><ul>{filtered.map(item=><li key={item.path}><a href={item.path}>{item.label}</a></li>)}</ul></div>;
}
