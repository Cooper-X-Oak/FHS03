/* Shared presentation for Markdown and CSV tables; source data stays intact. */
function readerTableURL(value){
  const text=value.trim();
  if(!/^https?:\/\//i.test(text) && !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?:\/\S*)?$/i.test(text)) return null;
  try{const url=new URL(/^https?:\/\//i.test(text)?text:`https://${text}`);return ['http:','https:'].includes(url.protocol)?url.href:null;}catch{return null;}
}
function enhanceReaderTable(table){
  if(table.dataset.enhanced) return;
  const rows=Array.from(table.rows),head=rows[0];
  if(!head || rows.some(row=>row.cells.length!==head.cells.length || Array.from(row.cells).some(cell=>cell.colSpan>1||cell.rowSpan>1))) return;
  const label=cell=>cell.textContent.replace(/[↑↓↕]/g,'').trim();
  const headers=Array.from(head.cells).map(label),body=rows.slice(1);
  const nameIndex=headers.findIndex(h=>/^(名称|网站名称|公司|公司名称|品牌|竞争者|对手|对象|域名|标题)$/.test(h));
  const urlIndex=headers.findIndex(h=>/^(网址|URL|网站网址|官网|官网链接)$/i.test(h));
  const destination=cell=>readerTableURL(cell.querySelector('a')?.getAttribute('href')||cell.textContent);
  // Merge only a complete one-to-one name/address pair; keep ambiguous sources.
  if(nameIndex>=0 && urlIndex>=0 && nameIndex!==urlIndex && body.length && body.every(row=>{
    const name=row.cells[nameIndex],url=destination(row.cells[urlIndex]);
    const existing=name.querySelector('a');
    return name.textContent.trim() && url && (!existing||readerTableURL(existing.getAttribute('href'))===url);
  })){
    for(const row of body){
      const name=row.cells[nameIndex],url=destination(row.cells[urlIndex]);
      if(!name.querySelector('a')){const a=document.createElement('a');a.href=url;while(name.firstChild)a.append(name.firstChild);name.append(a);}
    }
    rows.forEach(row=>row.cells[urlIndex].remove());
  }
  for(const row of body) for(const cell of row.cells){
    if(cell.querySelector('a,code,button,img')) continue;
    const url=readerTableURL(cell.textContent);
    if(url){const a=document.createElement('a');a.href=url;a.textContent=cell.textContent.trim();cell.replaceChildren(a);}
  }
  table.querySelectorAll('a').forEach(a=>{if(readerTableURL(a.getAttribute('href')||'')){a.target='_blank';a.rel='noopener noreferrer';a.title=a.href;}});
  const group=document.createElement('colgroup');
  const specs=Array.from(head.cells).map((th,i)=>{
    const h=label(th),cells=body.map(row=>row.cells[i]),texts=cells.map(c=>c.textContent.trim()).filter(t=>t&&t!=='—');
    const numeric=th.classList.contains('num') || texts.length && texts.every(t=>/^[+-]?[\d,.]+\s*%?$/.test(t));
    const prose=/备注|说明|理由|依据|特征|建议|策略|含义|为什么|证据|依赖|做法|问题|回应/.test(h);
    const lengths=texts.map(t=>Array.from(t).reduce((n,c)=>n+(/[\u0000-\u007f]/.test(c)?.55:1),0)).sort((a,b)=>a-b);
    const typical=lengths[Math.floor(lengths.length*.75)]||0;
    const kind=numeric?'number':prose?'prose':typical>28?'prose':/域名|竞争者|名称|对象|对手/.test(h)?'identity':'text';
    const weight=numeric?1:kind==='prose'?Math.min(5,Math.max(3,typical/12)):Math.min(2.6,Math.max(1.4,typical/12));
    th.scope='col';
    [th,...cells].forEach(c=>{c.dataset.columnKind=kind;if(numeric)c.classList.add('num');});
    return {weight,min:numeric?88:kind==='prose'?250:kind==='identity'?180:130};
  });
  const total=specs.reduce((n,s)=>n+s.weight,0);
  for(const spec of specs){const col=document.createElement('col');col.style.width=`${spec.weight/total*100}%`;group.append(col);}
  table.prepend(group);table.classList.add('reader-table');
  table.style.minWidth=`${specs.reduce((n,s)=>n+s.min,0)}px`;
  const wrap=table.parentElement;
  if(wrap?.classList.contains('tbl')){wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',`可横向滚动的表格：${Array.from(head.cells).map(label).join('、')}`);}
  table.dataset.enhanced='true';
}
