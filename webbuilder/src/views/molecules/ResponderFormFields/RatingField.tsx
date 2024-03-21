import React, { useEffect, useState } from 'react';

import _ from 'lodash';

import { Star, StarBorder } from '@mui/icons-material';

import { FormField } from '@app/models/dtos/form';
import { useFormState } from '@app/store/jotai/form';
import { useFormResponse } from '@app/store/jotai/responderFormResponse';
import { useResponderState } from '@app/store/jotai/responderFormState';

import QuestionWrapper from './QuestionQwrapper';

export default function RatingField({
    field,
    slide,
    isBuilder = false
}: {
    field: FormField;
    slide?: FormField;
    isBuilder?: boolean;
}) {
    const { addFieldRatingAnswer, formResponse } = useFormResponse();
    const answer = formResponse.answers && formResponse.answers[field.id]?.number;
    const [hovered, setHovered] = useState(answer || -1);

    const { nextField } = useResponderState();

    useEffect(() => {
        formResponse.answers &&
            setHovered((formResponse?.answers[field.id]?.number ?? 0) - 1);
    }, [formResponse.answers]);
    const { theme } = useFormState();
    const [mouseOver, setMouseOver] = useState(false);
    const RatingSection = () => {
        return (
            <div
                className="relative !mb-0 flex w-fit  flex-wrap gap-3"
                onMouseOut={() => {
                    setMouseOver(false);
                }}
                onMouseOver={() => {
                    !isBuilder && setMouseOver(true);
                }}
            >
                {_.range(field.properties?.steps || 5).map((index) => {
                    const Component = index <= hovered ? Star : StarBorder;
                    return (
                        <span
                            style={{
                                color:
                                    mouseOver || isBuilder
                                        ? theme?.tertiary
                                        : theme?.secondary
                            }}
                            key={index}
                            onMouseOut={() => {
                                if (!isBuilder) setHovered((answer || 0) - 1);
                            }}
                            onClick={() => {
                                if (!isBuilder) {
                                    addFieldRatingAnswer(field.id, index + 1);
                                    setTimeout(() => {
                                        nextField();
                                    }, 200);
                                }
                            }}
                            className="cursor-pointer"
                            onMouseOver={() => {
                                if (!isBuilder) setHovered(index);
                            }}
                        >
                            <Component
                                fontSize="large"
                                className={`pointer-events-none  `}
                            />
                        </span>
                    );
                })}
            </div>
        );
    };
    return (
        <>
            {isBuilder ? (
                <RatingSection />
            ) : (
                <QuestionWrapper field={field}>
                    <RatingSection />
                </QuestionWrapper>
            )}
        </>
    );
}
