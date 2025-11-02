import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

const protected_routes: string[] = ['/dev-console'];

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    const requested_route = request.nextUrl.pathname;
    const isProtected_route = protected_routes.findIndex((route) => requested_route == route);

    if (isProtected_route > -1 && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}
