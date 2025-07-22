// hooks/useNavigationLinks.ts
import { useTranslations } from 'next-intl';

export const useNavigationLinks = () => {
  const t = useTranslations('Header');

  return [
    { href: "/", label: t('nav.home') },
    { href: "/shop", label: t('nav.shop') },
    { href: "/categories", label: t('nav.categories') },
    { href: "/deals", label: t('nav.deals') },
    { href: "/contact", label: t('nav.contact') },
  ];
};