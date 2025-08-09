import React from 'react';
import { AlertDialogDelete } from './dialogue-delete';
import { Trash } from 'lucide-react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

export function DeleteButton() {
    return (
        <AlertDialogDelete action={() => { console.log("is clicked form delte button") }}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Trash className=" h-4 w-4" />
                Delete
            </DropdownMenuItem>
        </AlertDialogDelete>
    )
}
