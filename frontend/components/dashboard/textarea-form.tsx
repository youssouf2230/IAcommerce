
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type TextareaFormProps = {
  label?: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>; 

const TextareaForm = ({ label, error, id, ...props }: TextareaFormProps) => {
  return (
    <div className="flex flex-col gap-2 relative pb-4">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Textarea id={id} {...props} />
      {error && (
        <p className="text-destructive/70 text-sm absolute bottom-0">{error}</p>
      )}
    </div>
  );
};

export default TextareaForm;
