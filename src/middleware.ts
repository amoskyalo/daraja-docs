import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

const protected_routes: string[] = ['/my-apps'];

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    const requested_route = request.nextUrl.pathname;
    const isProtected_route = protected_routes.findIndex((route) => requested_route == route);
    const page_active_tab = request.nextUrl.searchParams.get('tab');

    function appendTab(route_name: string, initial_tab: string) {
        return NextResponse.redirect(new URL(`/${route_name}?tab=${initial_tab}`, request.url));
    }

    if (isProtected_route > -1 && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if(requested_route === '/'){
        return NextResponse.redirect(new URL('/apis/authorization', request.url));
    }

    if (requested_route === '/dashboard/applications' && !page_active_tab) {
        return appendTab('dashboard/applications', 'sandbox');
    }
    
}
