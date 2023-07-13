import { allowedInputTags, allowedLayoutTags, allowedQuestionAndAnswerTags } from '@Components/FormBuilder/BuilderBlock/FormBuilderTagSelector';

import { Close } from '@app/components/icons/close';
import { useModal } from '@app/components/modal-views/context';
import { IBuilderStateProps } from '@app/store/form-builder/types';

const Fields = [
    {
        title: 'Elements with Label',
        items: allowedQuestionAndAnswerTags
    },
    {
        title: 'Layouts',
        items: allowedLayoutTags
    },
    {
        title: 'Elements without Label',
        items: allowedInputTags
    }
];

export default function FormBuilderSpotlightModal() {
    const { closeModal, modalProps } = useModal();

    const builderState: IBuilderStateProps | null = modalProps;

    return (
        <div className="bg-white rounded relative flex flex-col gap-10 last:!mt-0 p-10">
            <Close
                className="absolute top-5 right-5 cursor-pointer"
                onClick={() => {
                    closeModal();
                }}
            />
            {Fields.map((fieldType, index) => (
                <div key={fieldType.title} className="flex flex-col">
                    <div className="body1 mb-6">{fieldType.title}</div>
                    <div className="grid gap-x-12 gap-y-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {fieldType.items.map((tag, index) => (
                            <div key={tag.id} className="flex cursor-pointer hover:bg-gray-100 p-2 items-center rounded gap-2">
                                {tag.icon}
                                {tag.label}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
