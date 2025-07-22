import { cookies } from 'next/headers';
import 'server-only'; // Ensures this module is never used on the client
import { User } from '../types';




export async function getToken(): Promise<string | undefined> {
  const cookieStore = cookies();
  return (await cookieStore).get('token')?.value;
}


export async function getUser(): Promise<User | null> {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get('user')?.value;

  if (!userCookie) {
    return null;
  }

  try {
    // Parse the JSON string into a JavaScript object
    const user: User = JSON.parse(userCookie);
    return user;
  } catch (error) {
    // If the cookie is malformed JSON, it will throw an error
    console.error('Failed to parse user cookie:', error);
    return null;
  }
}


export async function getUserSession() {
    const token = await getToken();
    const user = await getUser();

    return {
        isLoggedIn: !!token && !!user, 
        token,
        user,
    };
}