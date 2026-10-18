import { getCollection } from 'astro:content';
import { siteReady, validOrigin } from '../lib/site';
function escapeXml(v:string) {return v.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');}
export async function GET() {
 const posts = (siteReady && validOrigin ? await getCollection('blog') : []).filter(p=>p.data.status==='published' && p.data.publishedAt);
 const site = import.meta.env.SITE || 'https://preview.invalid/';
 const selfLink = siteReady && validOrigin ? `<atom:link href="${new URL('/rss.xml',site)}" rel="self" type="application/rss+xml"/>` : '';
 const xml=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Mew &amp; Maple</title><link>${site}</link><description>Practical, safety-minded ideas for happier indoor-cat living.</description><language>en-us</language>${selfLink}${posts.map(p=>{const url=new URL('/guides/'+p.id+'/',site).toString();return `<item><title>${escapeXml(p.data.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><category>${escapeXml(p.data.category)}</category><description>${escapeXml(p.data.description)}</description><pubDate>${p.data.publishedAt!.toUTCString()}</pubDate></item>`;}).join('')}</channel></rss>`;
 return new Response(xml,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}
