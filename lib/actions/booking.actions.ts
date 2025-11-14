'use server';


import prisma from "@/lib/prisma";
export const createBooking = async ({ eventId, email }: { eventId: number;  email: string; }) => {
    try {

        await prisma.booking.create({data:{eventId,email}});

        return { success: true };
    } catch (e) {
        console.error('create booking failed', e);
        return { success: false };
    }
}