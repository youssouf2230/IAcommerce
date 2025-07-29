/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

async function verifyToken(token: string) {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET environment variable is not set!');
    return null;
  }
  try {
    // const secret = new TextEncoder().encode(JWT_SECRET);
    const decodedSecret = Buffer.from(JWT_SECRET, 'base64');
    const { payload } = await jwtVerify(token, decodedSecret);

    return payload;
  } catch (error) {
 
    return null; // Token is invalid or expired
  }
}

// Allow exact paths and prefix-matched paths (e.g., /about/team)
const publicRoutes = ['/', '/login', '/register', '/about', '/contact','/shop','/products','/checkout'];
const adminRoutePrefixes = ['/dashboard'];
const authenticatedRoutes = ['/checkout'];
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Check if route is public
  const isPublic = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  if (isPublic) {
    return NextResponse.next();
  }


  // No token -> redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify token
  const payload = await verifyToken(token);
  if (!payload) {
    console.log(payload)
    const loginUrl = new URL('/login', request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('token');
    response.cookies.delete('user');
    return response;
  }


  if(payload && authenticatedRoutes){
     return  NextResponse.next();

  }
  // Role-based access control for admin routes
  const userRoles = (payload.roles as string[]) || [];

  const isAdminRoute = adminRoutePrefixes.some((prefix) => pathname.startsWith(prefix));
  if (isAdminRoute && !userRoles.includes('ADMIN')) {
    const unauthorizedUrl = new URL('/unauthorized', request.url);
    return NextResponse.redirect(unauthorizedUrl);
  }

  return NextResponse.next();
}



// Matcher to apply middleware to all non-static paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
