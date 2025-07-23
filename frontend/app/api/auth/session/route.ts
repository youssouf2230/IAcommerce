// app/api/auth/session/route.ts

import { NextResponse } from 'next/server';
import { getUserSession } from '@/components/auth/auth-data'; 


export async function GET() {
  try {
    const session = await getUserSession();

    if (!session.isLoggedIn) {
      return NextResponse.json({ isLoggedIn: false, user: null, token: null }, { status: 200 });
    }
     
    return NextResponse.json({ isLoggedIn: true, user: session.user, token: session.token }, { status: 200 });

  } catch (error) {
  
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching the session.' },
      { status: 500 }
    );
  }
}

