import { requiredLinks } from '@/lib/sitemap';
import { Breadcrumb, CaseCard } from '@/components/ContentComponents';
import { ArchiveFilter } from '@/components/ArchiveFilter';
import { publishedNews, newsPath } from '@/cms/news';
import { Hero, Section, Cards, TextSections, CtaBand, type TemplateProps } from './shared';
export async function T8Archive({page,content}: TemplateProps) {
  const links=requiredLinks(page).filter(p=>p.id!=='quote');
  if (page.id === 'news') {
    const posts = await publishedNews();
    return <main id="main" data-stage={page.stage} data-template="T8" data-variant=""><Breadcrumb page={page}/><Hero page={page} content={content}/><Section title="Browse FHS news" module="Topic / industry filters"><p>Product updates, customer visits and company news.</p></Section><Section title="Latest update" module="Featured item">{posts[0] ? <article className="card"><h3><a href={newsPath(posts[0].slug)}>{posts[0].title}</a></h3><time dateTime={posts[0].date}>{posts[0].date.slice(0,10)}</time></article> : <p>No news posts have been published yet.</p>}</Section><Section title="News and related reading" module="Article, case or news cards"><div className="card-grid">{posts.slice(1).map(post => <article key={post.id} className="card"><h3><a href={newsPath(post.slug)}>{post.title}</a></h3><time dateTime={post.date}>{post.date.slice(0,10)}</time></article>)}</div><Cards pages={links}/><TextSections content={content}/></Section><CtaBand page={page}/></main>;
  }
  return <main id="main" data-stage={page.stage} data-template="T8" data-variant=""><Breadcrumb page={page}/><Hero page={page} content={content}/><Section title="Browse by topic" module="Topic / industry filters"><ArchiveFilter items={links.map(p=>({label:p.label,path:p.path,type:content.topics?.[p.id] || (p.template==='T5'?p.label:p.template==='T7'?'Guides':'Support')}))}/></Section><Section title={page.id==='cases'?'Customer evidence':'Featured reading'} module="Featured item">{page.id==='cases'?<><CaseCard/><p>Customer stories will be published only when the supporting evidence and permission to share them are confirmed.</p></>:links.length?<Cards pages={[links[0]]}/>:<p>[Confirm approved industry insight]</p>}</Section><Section title={page.id==='cases'?'Explore the related processes':'More reading'} module="Article, case or news cards"><Cards pages={links}/><TextSections content={content}/></Section><CtaBand page={page}/></main>;
}
