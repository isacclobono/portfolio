import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site ? site.toString() : SITE.URL).replace(/\/$/, '');
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const items = posts.map((post) => {
    const postUrl = `${siteUrl}/blog/${post.id}`;
    const pubDate = post.data.date.toUTCString();
    const tags = post.data.tags ? post.data.tags.map(t => `<category>${escapeXml(t)}</category>`).join('\n      ') : '';

    return `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${pubDate}</pubDate>
      ${tags}
      <author>${SITE.EMAIL} (${SITE.AUTHOR})</author>
    </item>`;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.TITLE)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(SITE.DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rssFeed.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
