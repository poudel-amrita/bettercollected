import { FormFieldProps } from '@Components/Form/BetterCollectedForm';
import { Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { addAnswer, selectAnswer } from '@app/store/fill-form/slice';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';

export default function DropdownField({ field, ans, enabled }: FormFieldProps) {
    const dispatch = useAppDispatch();
    const answer = useAppSelector(selectAnswer(field.id));
    const onChange = (event: SelectChangeEvent<any>) => {
        const answer: any = {};
        answer.field = { id: field.id };
        answer.choice = { value: event?.target?.value };
        dispatch(addAnswer(answer));
    };

    return (
        <Select
            MenuProps={{
                style: { zIndex: 35001 }
            }}
            defaultValue={ans?.choice.value}
            disabled={!enabled}
            value={ans?.choice.value || answer?.choice?.value || ''}
            onChange={onChange}
            className="w-fit min-w-[167px] !rounded-md !border-gray-600 !mb-7 text-black-900 !bg-white"
        >
            {field?.properties?.choices?.map((choice: any) => (
                <MenuItem key={choice.id} value={choice?.value}>
                    {choice.value}
                </MenuItem>
            ))}
        </Select>
    );
}
