import parse from 'html-react-parser';

import { FieldTypes, StandardFormFieldDto } from '@app/models/dtos/form';
import { useFormResponse } from '@app/store/jotai/responderFormResponse';
import { getHtmlFromJson } from '@app/utils/richTextEditorExtenstion/getHtmlFromJson';
import RequiredIcon from '@app/views/atoms/Icons/Required';

import { getPlaceholderValueForTitle } from '../RichTextEditor';
import { RenderImage } from '@app/views/organism/FormBuilder/Fields/renderField';

export default function QuestionWrapper({ field, children }: { field: StandardFormFieldDto; children?: React.ReactNode }) {
    const { formResponse } = useFormResponse();

    const { invalidFields } = formResponse;

    return (
        <div className="relative flex flex-col gap-1" id={field.id}>
            {field?.validations?.required && (
                <div className="absolute -right-10 top-2">
                    <RequiredIcon className="text-black-900" />
                </div>
            )}
            <div className="">
                <div className="font-semibold">{parse(getHtmlFromJson(field?.title) ?? getPlaceholderValueForTitle(field?.type || FieldTypes.TEXT))}</div>
                {field?.description && <div className="text-black-700 mt-1">{field?.description}</div>}
            </div>
            <RenderImage field={field} />
            {children}
            {invalidFields && invalidFields[field.id] && invalidFields[field.id].length && <div className="mt-2 text-red-500">*Field Required</div>}
        </div>
    );
}
