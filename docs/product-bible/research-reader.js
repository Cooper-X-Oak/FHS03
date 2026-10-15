/* Native CSV research blocks. No additional runtime dependencies. */
function parseResearchSpec(src){
  const s={}; src.split(/\r?\n/).forEach((line,i)=>{if(!line.trim()||line.trim().startsWith('#'))return;const m=line.match(/^\s*([^:]+):\s*(.*?)\s*$/);if(!m)throw Error(`配置第 ${i+1} 行：缺少冒号`);s[m[1].trim()]=m[2].replace(/\s+#\s.*$/,'').trim();});return s;
}
function parseResearchCSV(text){
  text=text.replace(/^\uFEFF/,'');const records=[];let row=[],field='',quoted=false,closed=false,line=1,start=1;
  for(let i=0;i<text.length;i++){const c=text[i];if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else{quoted=false;closed=true;}}else{field+=c;if(c==='\n')line++;}continue;}
    if(c==='"'){if(field||closed)throw Error(`CSV 第 ${line} 行：引号位置无效`);quoted=true;}
    else if(c===','){row.push(field);field='';closed=false;}
    else if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(v=>v!==''))records.push({values:row,line:start});row=[];field='';closed=false;line++;start=line;}
    else{if(closed&&!/\s/.test(c))throw Error(`CSV 第 ${line} 行：引号后有多余字符`);if(!closed)field+=c;}
  }
  if(quoted)throw Error(`CSV 第 ${start} 行：引号未闭合`);if(field||row.length){row.push(field);records.push({values:row,line:start});}
  if(!records.length)throw Error('CSV 第 1 行：没有表头');const headers=records.shift().values;
  if(new Set(headers).size!==headers.length)throw Error('CSV 第 1 行：表头重复');
  return {headers,rows:records.map(r=>{if(r.values.length!==headers.length)throw Error(`CSV 第 ${r.line} 行：字段数 ${r.values.length}，应为 ${headers.length}`);return {...Object.fromEntries(headers.map((h,i)=>[h,r.values[i]])),__line:r.line};})};
}
const researchDataCache=new Map();
async function researchCSV(path){
  if(!path)throw Error('配置第 1 行：缺少 data/src 字段');const u=new URL(path,location.href);if(u.origin!==location.origin)throw Error('data/src：只允许同源 CSV');
  if(!researchDataCache.has(path))researchDataCache.set(path,fetch(u).then(async r=>{if(!r.ok)throw Error(`data/src：${path} HTTP ${r.status}`);return parseResearchCSV(await r.text());}).catch(e=>{researchDataCache.delete(path);throw e;}));return researchDataCache.get(path);
}
function researchField(d,f){if(!f||!d.headers.includes(f))throw Error(`CSV 第 1 行：不存在字段「${f||'(空)'}」`);}
function researchFilter(d,filter){let rows=d.rows.slice();if(filter)for(const rule of filter.split(',')){const p=rule.indexOf('=');if(p<0)throw Error(`filter 字段：${rule} 缺少等号`);const k=rule.slice(0,p).trim(),v=rule.slice(p+1).trim();researchField(d,k);rows=rows.filter(r=>r[k]===v);}return rows;}
function researchNumber(row,key){if(row[key]==='')return null;const n=Number(row[key]);if(!Number.isFinite(n))throw Error(`CSV 第 ${row.__line} 行：字段「${key}」不是数值：${row[key]}`);return n;}
function researchFormat(v,format){if(v===null||v===undefined||v==='')return '—';return format==='percent'?new Intl.NumberFormat('zh-CN',{style:'percent',minimumFractionDigits:1,maximumFractionDigits:1}).format(+v):new Intl.NumberFormat('zh-CN',{maximumFractionDigits:2}).format(+v);}
function researchTitle(d,s){const h=document.createElement('div');h.className='chart-title';h.textContent=s.title||'';d.appendChild(h);}
function researchNote(d,text){if(!text)return;const p=document.createElement('p');p.className='chart-note';p.textContent=text;d.appendChild(p);}
function researchSvgText(x,y,label,attrs=''){return `<text x="${x}" y="${y}" fill="var(--ink)" ${attrs}>${esc(label)}</text>`;}
async function drawResearchChart(d,s){
  const data=await researchCSV(s.data);researchField(data,s.x);researchField(data,s.y);if(s.type==='stacked')researchField(data,s.series);
  if(!['bar','hbar','stacked'].includes(s.type))throw Error(`type 字段：${s.type}，只支持 bar/hbar/stacked`);
  let rows=researchFilter(data,s.filter),missing=0;const groups=new Map(),series=[];
  for(const r of rows){const v=researchNumber(r,s.y);if(v===null){missing++;continue;}if(v<0)throw Error(`CSV 第 ${r.__line} 行：字段「${s.y}」不能为负数`);const key=r[s.x],ser=s.type==='stacked'?r[s.series]:'';if(!series.includes(ser))series.push(ser);if(!groups.has(key))groups.set(key,{key,total:0,parts:{}});const g=groups.get(key);g.total+=v;g.parts[ser]=(g.parts[ser]||0)+v;}
  let gs=[...groups.values()];if(s.sort==='asc'||s.sort==='desc')gs.sort((a,b)=>(a.total-b.total)*(s.sort==='desc'?-1:1));if(s.limit)gs=gs.slice(0,+s.limit);
  d.innerHTML='';researchTitle(d,s);if(!gs.length){researchNote(d,'没有可绘制的非空数值。');researchNote(d,s.note);return;}
  const W=Math.max(260,Math.floor(d.clientWidth-34)),horizontal=s.type!=='bar'||W<500,L=horizontal?Math.min(160,W*.43):48,R=horizontal?64:15,T=20,H=horizontal?gs.length*32+35:290,B=horizontal?H-15:H-70,space=horizontal?32:(W-L-R)/gs.length,max=Math.max(...gs.map(g=>g.total))||1,span=horizontal?W-L-R:B-T;
  let svg=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(s.title||s.y)}" style="font-size:12px;font-variant-numeric:tabular-nums"><line x1="${L}" y1="${T-8}" x2="${L}" y2="${B}" stroke="var(--rule)"/>`;
  const palette=['--accent','--star','--ok','--warn','--muted','--todo'];
  gs.forEach((g,i)=>{let offset=0;const cy=T+i*space,full=g.key,short=Array.from(full).slice(0,Math.min(14,Math.floor((L-10)/7))).join('')+(Array.from(full).length>Math.min(14,Math.floor((L-10)/7))?'…':'');
    if(horizontal)svg+=`<text x="${L-9}" y="${cy+13}" text-anchor="end" fill="var(--ink)"><title>${esc(full)}</title>${esc(short)}</text>`;
    for(const [j,ser] of series.entries()){const val=g.parts[ser]||0,len=val/max*span;const color=s.type==='stacked'?`var(${palette[j%palette.length]})`:(g.key===s.highlight?'var(--accent)':'var(--muted)');const opacity=s.type==='stacked'||g.key===s.highlight?1:.55;
      if(horizontal)svg+=`<rect x="${L+offset}" y="${cy}" width="${len}" height="19" fill="${color}" opacity="${opacity}"><title>${esc(full+' / '+ser+' '+researchFormat(val,s.format))}</title></rect>`;
      else svg+=`<rect x="${L+i*space+space*.18}" y="${B-offset-len}" width="${space*.64}" height="${len}" fill="${color}" opacity="${opacity}"><title>${esc(full+' '+researchFormat(val,s.format))}</title></rect>`;offset+=len;}
    if(horizontal)svg+=researchSvgText(L+g.total/max*span+5,cy+13,researchFormat(g.total,s.format),'font-size="11"');
    else{svg+=researchSvgText(L+(i+.5)*space,B-g.total/max*span-7,researchFormat(g.total,s.format),'text-anchor="middle" font-size="11"');svg+=`<text transform="translate(${L+(i+.5)*space} ${B+15}) rotate(-30)" text-anchor="end" fill="var(--muted)"><title>${esc(full)}</title>${esc(full.slice(0,12))}</text>`;}
  });d.insertAdjacentHTML('beforeend',svg+'</svg>');
  if(s.type==='stacked'){const legend=document.createElement('div');legend.className='chart-legend';series.forEach((ser,i)=>{const item=document.createElement('span'),sw=document.createElement('i');sw.style.background=`var(${palette[i%palette.length]})`;item.append(sw,document.createTextNode(ser));legend.append(item);});d.append(legend);}
  researchNote(d,(s.note||'')+(missing?`；${missing}行空值未绘制，未按0处理。`:''));
}
async function drawResearchTable(d,s){
  const data=await researchCSV(s.src),cols=s.columns?s.columns.split(',').map(v=>v.trim()):data.headers;cols.forEach(c=>researchField(data,c));let rows=researchFilter(data,s.filter),sortKey='',direction=1,shown=+(s.limit||20);const formats={};
  if(s.format)s.format.split(',').forEach(r=>{const [k,v]=r.split('=').map(x=>x.trim());researchField(data,k);formats[k]=v;});
  const numeric=new Set(cols.filter(c=>formats[c]||rows.some(r=>r[c]!=='')&&rows.every(r=>r[c]===''||Number.isFinite(Number(r[c])))));
  if(s.sort){const m=s.sort.match(/^(.*?)\s+(asc|desc)$/);if(!m)throw Error('sort 字段需要「列名 asc/desc」');sortKey=m[1];researchField(data,sortKey);direction=m[2]==='desc'?-1:1;}
  function paint(){d.innerHTML='';const wrap=document.createElement('div');wrap.className='tbl';const table=document.createElement('table'),head=table.createTHead().insertRow();
    for(const c of cols){const th=document.createElement('th'),btn=document.createElement('button');btn.type='button';btn.textContent=c+(sortKey===c?(direction===1?' ↑':' ↓'):' ↕');th.setAttribute('aria-sort',sortKey===c?(direction===1?'ascending':'descending'):'none');btn.addEventListener('click',()=>{direction=sortKey===c?-direction:1;sortKey=c;paint();});th.append(btn);if(numeric.has(c))th.className='num';head.append(th);}
    let sorted=rows.slice();if(sortKey)sorted.sort((a,b)=>{if(a[sortKey]==='')return b[sortKey]===''?0:1;if(b[sortKey]==='')return -1;const num=numeric.has(sortKey)||rows.every(r=>r[sortKey]===''||Number.isFinite(+r[sortKey]));return (num?(+a[sortKey]-+b[sortKey]):a[sortKey].localeCompare(b[sortKey],'zh-CN'))*direction;});
    const body=table.createTBody();for(const r of sorted.slice(0,shown)){const tr=body.insertRow();for(const c of cols){const td=tr.insertCell(),value=r[c];if(numeric.has(c)){td.className='num';td.textContent=researchFormat(value,formats[c]||'number');}else if(/^https?:\/\//i.test(value)){const a=document.createElement('a');a.href=value;a.target='_blank';a.rel='noopener';a.textContent=value;td.append(a);}else td.textContent=value||'—';}}
    wrap.append(table);enhanceReaderTable(table);d.append(wrap);if(shown<rows.length){const b=document.createElement('button');b.type='button';b.className='show-all';b.textContent=`显示全部 ${rows.length} 行（当前 ${Math.min(shown,rows.length)} 行）`;b.onclick=()=>{shown=rows.length;paint();};d.append(b);}researchNote(d,s.note);
  }paint();
}
async function drawResearchQuadrant(d,s){
  const data=await researchCSV(s.data);[s.x,s.y,s.label].forEach(k=>researchField(data,k));let rows=researchFilter(data,s.filter).map(r=>({row:r,x:researchNumber(r,s.x),y:researchNumber(r,s.y)})).filter(r=>r.x!==null&&r.y!==null);
  if(!rows.length)throw Error('x/y 字段：没有同时非空的数值');const minX=Math.min(...rows.map(r=>r.x)),maxX=Math.max(...rows.map(r=>r.x)),minY=Math.min(...rows.map(r=>r.y)),maxY=Math.max(...rows.map(r=>r.y));
  const labelled=new Set(rows.filter(r=>!data.headers.includes('机会判断')||r.row['机会判断']==='机会').sort((a,b)=>b.y-a.y).slice(0,+(s.limit||12)).map(r=>r.row[s.label]));
  const W=Math.max(270,Math.floor(d.clientWidth-34)),L=45,T=20,S=W-L-15,B=T+S,H=B+65;let svg=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(s.title||'机会四象限')}" style="font-size:10px"><rect x="${L}" y="${T}" width="${S}" height="${S}" fill="var(--paper)" stroke="var(--rule)"/><path d="M${L+S/2},${T}V${B} M${L},${T+S/2}H${L+S}" stroke="var(--rule)"/>`;
  const used=[];for(const p of rows){const cx=L+(maxX===minX?.5:(p.x-minX)/(maxX-minX))*S,cy=B-(maxY===minY?.5:(p.y-minY)/(maxY-minY))*S,name=p.row[s.label],label=labelled.has(name);svg+=`<circle cx="${cx}" cy="${cy}" r="${label?4:3}" fill="var(${label?'--accent':'--muted'})" opacity="${label?1:.55}"><title>${esc(name+'；'+s.x+' '+p.x+'；'+s.y+' '+p.y)}</title></circle>`;
    if(label){let yy=Math.max(T+10,cy-7);const options=[yy];for(let step=1;step<30;step++)options.push(yy-step*12,yy+step*12);yy=options.find(y=>y>=T+10&&y<=B-5&&!used.some(z=>Math.abs(z-y)<11))??Math.min(B-5,yy);used.push(yy);const right=cx<L+S*.55;svg+=`<line x1="${cx}" y1="${cy}" x2="${right?cx+5:cx-5}" y2="${yy}" stroke="var(--muted)" opacity=".5"/><text x="${right?cx+5:cx-5}" y="${yy}" text-anchor="${right?'start':'end'}" fill="var(--ink)"><title>${esc(name)}</title>${esc(name.length>14?name.slice(0,13)+'…':name)}</text>`;}}
  svg+=researchSvgText(L,B+18,minX)+researchSvgText(L+S,B+18,maxX,'text-anchor="end"');svg+=researchSvgText(L+S/2,B+38,s.x,'text-anchor="middle"');svg+=researchSvgText(1,T+8,researchFormat(maxY))+researchSvgText(1,B,researchFormat(minY));svg+=`<text transform="translate(12 ${T+S/2}) rotate(-90)" fill="var(--muted)">${esc(s.y)}</text>`;
  d.innerHTML='';researchTitle(d,s);d.insertAdjacentHTML('beforeend',svg+'</svg>');researchNote(d,(s.note||'')+'；全部有效点归一化，limit仅控制机会标签数；悬停点查看原值。');
}
async function drawResearchBlocks(root){
  const nodes=root.querySelectorAll('[data-chart],[data-table],[data-quad]');await Promise.all([...nodes].map(async d=>{try{const kind=d.dataset.chart?'chart':d.dataset.table?'table':'quad',s=parseResearchSpec(decodeURIComponent(d.dataset[kind]));if(kind==='quad'&&!s.data)return;if(kind==='chart')await drawResearchChart(d,s);else if(kind==='table')await drawResearchTable(d,s);else await drawResearchQuadrant(d,s);d.dataset.ready='true';}catch(e){d.classList.add('err');d.textContent='渲染失败：'+e.message;d.dataset.ready='error';}}));
}
