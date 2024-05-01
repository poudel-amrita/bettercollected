import { StandardFormFieldDto } from '@app/models/dtos/form';
import { FieldInput } from '@app/shadcn/components/ui/input';
import { useFormState } from '@app/store/jotai/form';
import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

interface IFieldInputWrapper extends React.InputHTMLAttributes<HTMLInputElement> {
    slide?: StandardFormFieldDto;
    value?: string | number | undefined;
    onChange: any;
    disabled?: boolean;
}

export const FieldInputWrapper = ({ id, slide, value, onChange, disabled, className, type = 'text', multiple, placeholder }: IFieldInputWrapper) => {
    const { theme } = useFormState();
    const [inputVal, setInputVal] = useState(value);
    const [debouncedInputValue] = useDebounceValue(inputVal, 300);

    useEffect(() => {
        if (debouncedInputValue && onChange) {
            onChange(debouncedInputValue);
        }
    }, [debouncedInputValue]);

    useEffect(() => {
        value !== inputVal && setInputVal(value);
    }, [value]);

    return (
        <>
            <FieldInput
                id={id}
                disabled={disabled}
                type={type}
                value={inputVal}
                style={{
                    color: slide?.properties?.theme?.tertiary || theme?.tertiary
                }}
                onChange={(e: any) => setInputVal(e.target.value)}
                className={className}
                multiple={multiple}
                placeholder={placeholder}
            />
        </>
    );
};

export default FieldInputWrapper;
