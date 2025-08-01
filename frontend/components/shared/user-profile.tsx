/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useActionState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { LogOut, User as UserIcon } from 'lucide-react';
import { User as UserType } from '../../types';
import { handleLogout } from '../../actions/auth-action';
import { SubmitButton } from './submit-button';


interface UserProfileProps {
    user: UserType;
}

export default function UserProfile({ user }: UserProfileProps) {

    const [state, formAction, isPending] = useActionState(handleLogout, null);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="rounded-full p-2 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <UserIcon size={20} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="sm:w-56 w-46 border">
                    <DropdownMenuLabel>
                        <div className="flex flex-col">
                            {/* FIX 3: Removed unnecessary optional chaining */}
                            <span className="text-sm font-medium">{user.username}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>

                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()} 
                        className="focus:bg-transparent mt-2"
                    >
                        <form action={formAction} className="w-full">

                            <SubmitButton pending={isPending} size={"sm"} variant="outlineDestructive" className='w-full' >
                                <LogOut  className='text-inherit' />  Logout
                            </SubmitButton>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}