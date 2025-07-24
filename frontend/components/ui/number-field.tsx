"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface NumberFieldProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export default function NumberField({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: NumberFieldProps) {
  const [count, setCount] = useState(value);

  const handleIncrement = () => {
    const newValue = Math.min(count + step, max);
    setCount(newValue);
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(count - step, min);
    setCount(newValue);
    onChange?.(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value) || 0;
    val = Math.min(Math.max(val, min), max);
    setCount(val);
    onChange?.(val);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Button variant="outline" size="icon" onClick={handleDecrement}>
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={count}
        onChange={handleChange}
        className="w-10 text-center"
      />
      <Button variant="outline" size="icon" onClick={handleIncrement}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
