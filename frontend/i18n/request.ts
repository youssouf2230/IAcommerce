import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Read locale from a cookie, or use a default locale
  const cookieStore = cookies();
  const locale = (await cookieStore).get('NEXT_LOCALE')?.value || 'en';

  // Load the corresponding messages
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});