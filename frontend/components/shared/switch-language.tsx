'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,

} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },

];

export default function LanguageSwitcher() {
    const router = useRouter();
  const locale = useLocale();

  const changeLocale = (newLocale : string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
    router.refresh();
  };

    const currentLabel = languages.find(lang => lang.code === locale)?.label;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none cursor-pointer flex items-center">
                <Globe className="mr-1" size={18} />
                {currentLabel?.slice(0, 2)}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-max">
               
                {languages.map(lang => (
                    <DropdownMenuItem
                        key={lang.code}
                        onSelect={() => changeLocale(lang.code)}
                        className={locale === lang.code ? 'font-bold' : ''}
                    >
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}