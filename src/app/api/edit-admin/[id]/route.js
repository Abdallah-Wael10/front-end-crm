import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const URLl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const id = params.id;
        const response = await fetch(`${URLl}/api/adminLeads/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch lead data');
        }

        const data = await response.json();
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching lead data:', error);
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function PATCH(request, { params }) {
    const id = params.id;
    const leadData = await request.json();
    const URLl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${URLl}/api/adminLeads/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData),
        });

        if (!response.ok) {
            throw new Error('Failed to update lead data');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating lead data:', error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
