'use client';
import { Button } from '../ui/button';

import ToggleTheme from './toggle-theme';
import LanguageSwitcher from './switch-language';
import UserProfile from './user-profile';
import { useSession } from '../../hooks/use-session';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ShopCart from './shop-cart';

const RightActions = () => {
    const t = useTranslations('Header');
    const { session } = useSession();
    
    return (
        <div>
            <div className="flex items-center gap-4">

                <ShopCart/>

                {/* Auth Buttons */}

                {session?.isLoggedIn && session.user ? (

                    <UserProfile user={session.user} />
                ) : (
                    // If any condition is false, show the login button.
                    <Button asChild size="sm" className="hidden sm:inline-flex">
                        <Link href="/login"> {t("auth.signIn")} </Link>
                    </Button>
                )}

                <ToggleTheme  />
                <LanguageSwitcher />



            </div>
        </div>
    );
}

export default RightActions;
