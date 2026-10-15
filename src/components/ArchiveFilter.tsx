'use client';
import { useState } from 'react';
export function ArchiveFilter({items}: {items:{label:string;path:string;type?:string;category?:string;industry?:string;intent?:string}[]}) {
  const [filters,setFilters]=useState<Record<string,string>>({});
  const axes=['category','industry','intent'] as const;
  const filtered=items.filter(item=>axes.every(axis=>!filters[axis]||item[axis]===filters[axis]));
  return <div><div className="form-grid">{axes.map(axis=><label className="field" key={axis}>{axis}<select value={filters[axis]||''} onChange={e=>setFilters({...filters,[axis]:e.target.value})}><option value="">All</option>{[...new Set(items.map(item=>item[axis]).filter(Boolean))].map(value=><option key={value}>{value}</option>)}</select></label>)}</div><p role="status"><span className="mono">{filtered.length}</span> matching {filtered.length===1?'page':'pages'}</p><ul>{filtered.map(item=><li key={item.path}><a href={item.path}>{item.label}</a></li>)}</ul></div>;
}
