import { next } from '@vercel/edge';

export const config = { matcher: '/((?!_vercel).*)' };

export default function middleware(request) {
  const auth = request.headers.get('authorization');
  if (auth) {
    const decoded = atob(auth.split(' ')[1] || '');
    if (decoded.split(':')[1] === 'Bupa123') {
      return next();
    }
  }
  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Protected"' },
  });
}
