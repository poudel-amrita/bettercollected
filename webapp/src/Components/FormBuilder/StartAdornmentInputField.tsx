import { ChangeEvent, ChangeEventHandler, FocusEventHandler, useEffect, useRef } from 'react';

import FormBuilderInput from '@Components/FormBuilder/FormBuilderInput';
import { ArrowDropDown, TrendingUpSharp } from '@mui/icons-material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import useFormBuilderState from '@app/containers/form-builder/context';
import useBuilderTranslation from '@app/lib/hooks/use-builder-translation';
import { FormBuilderTagNames } from '@app/models/enums/formBuilder';
import { setActiveChoice, setActiveField } from '@app/store/form-builder/actions';
import { selectBuilderState } from '@app/store/form-builder/selectors';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';

interface IStartAdornmentInputFieldProps {
    type: FormBuilderTagNames;
    value: string;
    id: string;
    focus?: boolean;
    onChangeCallback: ChangeEventHandler<HTMLInputElement>;
    onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

function getIcon(type: FormBuilderTagNames) {
    switch (type) {
        case FormBuilderTagNames.INPUT_CHECKBOXES:
            return <CheckBoxOutlineBlankIcon />;
        case FormBuilderTagNames.INPUT_MULTIPLE_CHOICE:
            return <RadioButtonUncheckedIcon />;
        case FormBuilderTagNames.INPUT_DROPDOWN:
            return <ArrowDropDown />;
        case FormBuilderTagNames.INPUT_RANKING:
            return <TrendingUpSharp />;
        default:
            return <></>;
    }
}

export default function StartAdornmentInputField({ type, value, id, focus, onChangeCallback, onFocus }: IStartAdornmentInputFieldProps) {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { setBackspaceCount } = useFormBuilderState();
    const { t } = useBuilderTranslation();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBackspaceCount(0);
        onChangeCallback(event);
    };

    useEffect(() => {
        if (focus) {
            console.log(`focus - ${id} `, focus);
            console.log(inputRef.current);
            inputRef.current?.focus();
            // dispatch(setActiveChoice({ id }));
        }
    }, [focus, id]);

    return (
        <FormBuilderInput
            autoFocus={true}
            inputRef={inputRef}
            id={id}
            className="!w-fit !mb-0"
            value={value}
            variant="standard"
            onChange={onChange}
            onFocus={onFocus}
            inputProps={{
                style: {
                    paddingTop: 0,
                    paddingBottom: 0,
                    height: 40,
                    fontSize: 14,
                    fontWeight: 400,
                    color: 'black',
                    content: 'none',
                    letterSpacing: 1,
                    outline: 'none',
                    border: 'none'
                }
            }}
            placeholder={t('COMPONENTS.INPUT.OPTION')}
            InputProps={{
                startAdornment: <div className="text-gray-400"> {getIcon(type)}</div>
            }}
        />
    );
}
