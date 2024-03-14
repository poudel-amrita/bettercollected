import { FieldTypes, FormField } from '@app/models/dtos/form';
import { FieldInput } from '@app/shadcn/components/ui/input';
import { useFormResponse } from '@app/store/jotai/responderFormResponse';

import QuestionWrapper from './QuestionQwrapper';

export default function InputField({ field }: { field: FormField }) {
    const {
        formResponse,
        addFieldTextAnswer,
        addFieldEmailAnswer,
        addFieldNumberAnswer,
        addFieldURLAnswer
    } = useFormResponse();
    const handleChange = (e: any) => {
        switch (field.type) {
            case FieldTypes.LINK:
                addFieldURLAnswer(field.id, e.target.value);
                break;
            case FieldTypes.NUMBER:
                addFieldNumberAnswer(field.id, e.target.value);
                break;
            case FieldTypes.EMAIL:
                addFieldEmailAnswer(field.id, e.target.value);
                break;
            case FieldTypes.SHORT_TEXT:
                addFieldTextAnswer(field.id, e.target.value);
                break;
            default:
                break;
        }
    };

    const getFieldValue = () => {
        switch (field.type) {
            case FieldTypes.LINK:
                return (
                    (formResponse.answers && formResponse.answers[field.id]?.url) || ''
                );
            case FieldTypes.NUMBER:
                return (
                    (formResponse.answers && formResponse.answers[field.id]?.number) ||
                    ''
                );
            case FieldTypes.EMAIL:
                return (
                    (formResponse.answers && formResponse.answers[field.id]?.email) ||
                    ''
                );
            case FieldTypes.SHORT_TEXT:
                return (
                    (formResponse.answers && formResponse.answers[field.id]?.text) || ''
                );
            default:
                break;
        }
    };

    return (
        <QuestionWrapper field={field}>
            <FieldInput
                type={field.type === FieldTypes.SHORT_TEXT ? 'text' : field.type}
                placeholder={field?.properties?.placeholder}
                className="mt-4"
                value={getFieldValue()}
                onChange={(e: any) => handleChange(e)}
            />
        </QuestionWrapper>
    );
}
