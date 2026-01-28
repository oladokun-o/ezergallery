import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const host = event.request.headers.get('host');
  const url = new URL(event.request.url);

  // Handle admin subdomain
  if (host?.startsWith('admin.')) {
    if (!url.pathname.startsWith('/studio')) {
      // Rewrite / → /studio, and /anything → /studio/anything
      const newPath =
        url.pathname === '/' ? '/studio' : `/studio${url.pathname}`;
      url.pathname = newPath;
      return Response.redirect(url, 302);
    }
  }

  // For main domain, prevent access to /studio
  if (url.pathname.startsWith('/studio') && !host?.startsWith('admin.')) {
    const adminUrl = new URL(
      url.pathname.replace('/studio', ''),
      `https://admin.${host}`
    );
    adminUrl.search = url.search;
    return Response.redirect(adminUrl, 301);
  }

  return resolve(event);
};
