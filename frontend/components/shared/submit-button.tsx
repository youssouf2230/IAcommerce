'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type SubmitButtonProps = {
  pending?: boolean;
  onlyLoading?: boolean;
} & React.ComponentPropsWithoutRef<typeof Button>;

export function SubmitButton({
  children,
  pending = false,
  onlyLoading = false,
  ...props
}: SubmitButtonProps) {
  if (onlyLoading) {
    return (
      <Button {...props} type="submit" disabled={pending}>
         {pending ? <Loader2 className=" h-4 w-4 animate-spin" />: children}
      
        
      </Button>
    );
  }

  return (
    <Button {...props} type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
