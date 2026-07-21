import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Solo proteger las rutas que empiecen por /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('recetario_auth_token');

    if (!authCookie || authCookie.value !== 'authenticated') {
      // Si no está autenticado, redirigir al login (raíz)
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};
