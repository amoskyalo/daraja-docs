'use server';

import { cookies } from 'next/headers';

export const handleSetSession = async ({ token }: { token: string }) => {
    const cookieStore = await cookies();
    cookieStore.set('token', token);
};

export const handleRemoveSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('token');
};

export const handleGetSession = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    return token?.value || null;
};
