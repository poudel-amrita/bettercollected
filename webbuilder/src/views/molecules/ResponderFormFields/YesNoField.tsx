import { Fragment } from 'react';

import { RadioGroup } from '@headlessui/react';
import styled from 'styled-components';

import { FormField } from '@app/models/dtos/form';
import { useFormTheme } from '@app/store/jotai/fetchedForm';
import { useFormResponse } from '@app/store/jotai/responderFormResponse';
import { useResponderState } from '@app/store/jotai/responderFormState';
import { Check } from '@app/views/atoms/Icons/Check';

import QuestionWrapper from './QuestionQwrapper';

const StyledDiv = styled.div<{ $theme: any }>(({ $theme }) => {
    const secondaryColor = $theme?.secondary;
    return {
        '&:hover': {
            borderColor: secondaryColor + '!important'
        }
    };
});

const YesNoField = ({ field }: { field: FormField }) => {
    const { addFieldBooleanAnswer, formResponse } = useFormResponse();
    const theme = useFormTheme();

    const { nextField } = useResponderState();

    const getValue = () => {
        if (
            formResponse?.answers?.[field.id]?.boolean !== null ||
            formResponse?.answers?.[field.id]?.boolean !== undefined
        )
            return formResponse?.answers?.[field.id]?.boolean;
        else return null;
    };

    return (
        <QuestionWrapper field={field}>
            <RadioGroup
                value={getValue()}
                className={'flex w-full flex-col gap-2'}
                onChange={(value) => {
                    addFieldBooleanAnswer(field.id, !!value);
                    setTimeout(() => {
                        nextField();
                    }, 200);
                }}
            >
                {field &&
                    field.properties?.choices?.map((choice, index) => {
                        return (
                            <RadioGroup.Option
                                value={choice.value === 'Yes'}
                                key={index}
                                as={Fragment}
                            >
                                {({ active, checked }) => {
                                    return (
                                        <StyledDiv
                                            $theme={theme}
                                            style={{
                                                borderColor: theme?.tertiary,
                                                background:
                                                    active || checked
                                                        ? theme?.tertiary
                                                        : ''
                                            }}
                                            className={`flex cursor-pointer justify-between rounded-xl border p-2 px-4`}
                                        >
                                            {choice.value}
                                            {checked && <Check />}
                                        </StyledDiv>
                                    );
                                }}
                            </RadioGroup.Option>
                        );
                    })}
            </RadioGroup>
        </QuestionWrapper>
    );
};

export default YesNoField;
