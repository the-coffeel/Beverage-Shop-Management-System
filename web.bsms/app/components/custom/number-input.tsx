import { forwardRef } from "react";
import { Input } from "@/components/ui/input";

interface NumberInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    ({ onKeyDown, onPaste, ...props }, ref) => {
        return (
            <Input
                ref={ref}
                type="number"
                min={0}
                onKeyDown={(e) => {
                    if (["-", "+", "e", "E"].includes(e.key)) {
                        e.preventDefault();
                    }
                    onKeyDown?.(e);
                }}
                onPaste={(e) => {
                    const pasted = e.clipboardData.getData("text");
                    if (!/^\d*$/.test(pasted)) {
                        e.preventDefault();
                    }
                    onPaste?.(e);
                }}
                {...props}
            />
        );
    }
);

NumberInput.displayName = "NumberInput";