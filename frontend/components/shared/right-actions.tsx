/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '../ui/button';
import {  ShoppingCart } from 'lucide-react';
import ToggleTheme from './toggle-theme';
import LanguageSwitcher from './switch-language';
import UserProfile from './user-profile';
import { useSession } from '../hooks/use-session';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const RightActions = () => {
    const t = useTranslations('Header');

    const { session, isLoading } = useSession();
    return (
        <div>
            <div className="flex items-center gap-5">

                <Button
                    size="icon"
                    variant="ghost"
                    className="relative cursor-pointer"
                    aria-label="Cart"
                >


                    <p className="absolute -right-2 -top-2 size-4 flex items-center justify-center rounded-full bg-rose-600 text-[10px] text-white">
                        2
                    </p>
                    <ShoppingCart size={20} />
                </Button>

                {/* Auth Buttons */}

                {session?.isLoggedIn && session.user ? (
                   
                    <UserProfile user={session.user} />
                ) : (
                    // If any condition is false, show the login button.
                    <Button asChild size="sm" className="hidden sm:inline-flex">
                        <Link href="/login"> {t("auth.signIn")} </Link>
                    </Button>
                )}

                <ToggleTheme />
                <LanguageSwitcher />



            </div>
        </div>
    );
}

export default RightActions;
