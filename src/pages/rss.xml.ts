import { getCollection } from 'astro:content';
import { siteReady, validOrigin } from '../lib/site';
function escapeXml(v:string) {return v.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');}
export async function GET() {
 const posts = (siteReady && validOrigin ? await getCollection('blog') : []).filter(p=>p.data.status==='published' && p.data.publishedAt);
 const site = import.meta.env.SITE || 'https://preview.invalid/';
 const xml=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Mew &amp; Maple</title><link>${site}</link><description>Indoor cat living guides</description>${posts.map(p=>`<item><title>${escapeXml(p.data.title)}</title><link>${new URL('/guides/'+p.id+'/',site)}</link><description>${escapeXml(p.data.description)}</description><pubDate>${p.data.publishedAt!.toUTCString()}</pubDate></item>`).join('')}</channel></rss>`;
 return new Response(xml,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}
