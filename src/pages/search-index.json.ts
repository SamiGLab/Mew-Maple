import { getCollection } from 'astro:content';
import { publishable } from '../lib/site';

// A draft-safe static build must not export unapproved post metadata.
export async function GET() {
  const posts = (await getCollection('blog')).filter(publishable);
  const entries = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    category: post.data.category,
    url: '/guides/' + post.id + '/',
  }));
  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
