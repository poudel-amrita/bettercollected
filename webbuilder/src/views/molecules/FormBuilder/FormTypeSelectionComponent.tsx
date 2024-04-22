import { MultiPageFormIcon } from '@app/views/atoms/Icons/MultipageFormIcon';
import { SinglePageFormIcon } from '@app/views/atoms/Icons/SinglePageFormIcon';

interface IFormTypes {
    type: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    theme: string;
}
const FormTypes: IFormTypes[] = [
    {
        type: 'Modern Form',
        icon: <MultiPageFormIcon />,
        title: 'Multi-Page Form',
        description: 'Show single form field per page',
        theme: '#FE3678'
    },
    {
        type: 'Classic Form',
        icon: <SinglePageFormIcon />,
        title: 'Single Page Form',
        description: 'Show all form fields in a single page',
        theme: '#FFA716'
    }
];

const FormTypeSelectionComponent = ({
    handleCreateForm
}: {
    handleCreateForm: (type: any) => void;
}) => {
    return (
        <div className="flex flex-col items-center gap-20 py-12">
            <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-semibold text-black-800">
                    Select Form Type
                </span>
                <span className="text-sm font-normal text-black-600">
                    Select form type according to your need.
                </span>
            </div>
            <div className="flex flex-row gap-12">
                {FormTypes.map((item: IFormTypes) => {
                    return (
                        <FormTypeCard
                            key={item.type}
                            item={item}
                            handleClick={handleCreateForm}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FormTypeSelectionComponent;

const FormTypeCard = ({
    item,
    handleClick
}: {
    item: IFormTypes;
    handleClick: (type: string) => void;
}) => {
    return (
        <div
            onClick={() => handleClick(item.type)}
            className="flex w-[375px] cursor-pointer flex-col rounded-2xl border border-black-200 hover:scale-[1.01]"
        >
            <div className=" rounded-t-2xl p-4" style={{ background: item.theme }}>
                <div
                    className="w-fit rounded-3xl bg-white px-2 py-1"
                    style={{ color: item.theme }}
                >
                    {item.type}
                </div>
                <div className="flex justify-center">{item.icon}</div>
            </div>
            <div className="flex flex-col gap-1 rounded-b-2xl bg-white px-8 py-4">
                <span className="font-medium text-black-800">{item.title}</span>
                <span className="text-sm font-normal text-black-600">
                    {item.description}
                </span>
            </div>
        </div>
    );
};
