import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const authCookie = request.cookies.get('recetario_auth_token');
  const isAuthenticated = authCookie && authCookie.value === 'authenticated';
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');

  // Si está logueado y trata de entrar a /login, enviarlo al dashboard
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Si no está logueado y trata de entrar a cualquier ruta protegida (dashboard)
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login'
  ],
};
