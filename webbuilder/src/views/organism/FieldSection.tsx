'use client';

import React from 'react';

import { RadioGroup } from '@headlessui/react';
import TextField from '@mui/material/TextField';
import cn from 'classnames';

import { FieldTypes, FormField } from '@app/models/dtos/form';
import { Button } from '@app/shadcn/components/ui/button';
import { useActiveFieldComponent } from '@app/store/jotai/activeBuilderComponent';
import useFieldSelectorAtom from '@app/store/jotai/fieldSelector';

import { ArrowDown } from '../atoms/Icons/ArrowDown';
import { FolderUploadIcon } from '../atoms/Icons/FolderUploadIcon';
import { PlusIcon } from '../atoms/Icons/Plus';

function getPlaceholderValueForTitle(fieldType: FieldTypes) {
    switch (fieldType) {
        case FieldTypes.EMAIL:
            return 'Enter Your Email Address';
        case FieldTypes.NUMBER:
            return 'Enter Number';
        case FieldTypes.SHORT_TEXT:
            return 'Enter Text';
        case FieldTypes.LINK:
            return 'Enter Link';
        case FieldTypes.PHONE_NUMBER:
            return 'Enter Your Phone Number';
        case FieldTypes.FILE_UPLOAD:
            return 'Upload Your File';
        case FieldTypes.YES_NO:
            return 'Are you sure?';
        case FieldTypes.DROP_DOWN:
            return 'Select an option';
        case FieldTypes.MULTIPLE_CHOICE:
            return 'Select from list below.';
        default:
            return 'No Field Selected';
    }
}

function getPlaceholderValueForField(fieldType: FieldTypes) {
    switch (fieldType) {
        case FieldTypes.EMAIL:
            return 'name@gmail.com';
        case FieldTypes.NUMBER:
            return '123';
        case FieldTypes.SHORT_TEXT:
            return 'Answer';
        case FieldTypes.LINK:
            return 'https://';
        case FieldTypes.PHONE_NUMBER:
            return '0123456789';
        default:
            return 'No Field Selected';
    }
}

const FieldSection = ({
    slide,
    disabled = false
}: {
    slide: FormField;
    disabled?: boolean;
}) => {
    const slideFields = slide?.properties?.fields;
    const { updateTitle, updateDescription } = useFieldSelectorAtom();
    const { setActiveFieldComponent, activeFieldComponent } = useActiveFieldComponent();

    function renderField(field: FormField) {
        switch (field.type) {
            case FieldTypes.EMAIL:
            case FieldTypes.NUMBER:
            case FieldTypes.SHORT_TEXT:
            case FieldTypes.LINK:
            case FieldTypes.PHONE_NUMBER:
                return <InputField field={field} slide={slide} disabled={disabled} />;
            case FieldTypes.FILE_UPLOAD:
                return <FileUpload field={field} slide={slide} disabled={disabled} />;
            case FieldTypes.YES_NO:
                return <YesNoField field={field} slide={slide} disabled={disabled} />;
            case FieldTypes.DROP_DOWN:
            case FieldTypes.MULTIPLE_CHOICE:
                return (
                    <DropDownField field={field} slide={slide} disabled={disabled} />
                );
            default:
                return null;
        }
    }

    return (
        <div
            className={cn(
                'aspect-video h-min w-full bg-white',
                disabled ? 'pointer-events-none overflow-hidden' : ''
            )}
        >
            <div className={'flex flex-col justify-center gap-20 px-20 py-10'}>
                {Array.isArray(slideFields) && slideFields.length ? (
                    slideFields.map((field, index) => {
                        return (
                            <div
                                key={index}
                                tabIndex={0}
                                className={cn(
                                    activeFieldComponent?.id === field.id &&
                                        'ring-1 ring-blue-500',
                                    'w-fit p-1'
                                )}
                                onFocus={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    setActiveFieldComponent({
                                        id: field.id,
                                        index: index
                                    });
                                }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    setActiveFieldComponent({
                                        id: field.id,
                                        index: index
                                    });
                                }}
                            >
                                <div className={'flex flex-col items-start'}>
                                    <div className="flex items-center gap-2">
                                        {slide?.properties?.showQuestionNumbers && (
                                            <span className="text-2xl">
                                                {index + 1}.
                                            </span>
                                        )}
                                        <input
                                            id={`input-${disabled ? `${slide.id}${field.id}` : field.id}`}
                                            placeholder={getPlaceholderValueForTitle(
                                                field.type || FieldTypes.SHORT_TEXT
                                            )}
                                            type="text"
                                            className={'-left-1 border-0 px-0 text-2xl'}
                                            value={field.title}
                                            onChange={(e: any) =>
                                                updateTitle(
                                                    field.index,
                                                    slide.index,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    {field?.description !== undefined && (
                                        <input
                                            id={`input-${disabled ? `${slide.id}${field.id}` : field.id}`}
                                            placeholder={getPlaceholderValueForTitle(
                                                field.type || FieldTypes.SHORT_TEXT
                                            )}
                                            className={
                                                'text-md ring-none -left-1 border-0 px-0 py-0 text-black-800 outline-none '
                                            }
                                            type="text"
                                            value={field.description}
                                            onChange={(e: any) =>
                                                updateDescription(
                                                    field.index,
                                                    slide.index,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    )}
                                    {renderField(field)}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
export default FieldSection;

const FileUpload = ({
    field,
    slide,
    disabled
}: {
    field: FormField;
    slide: FormField;
    disabled: boolean;
}) => {
    const handleFileInputChange = (event: any) => {
        const file = event.target.files[0];
        if (file.size > 26214400) alert('Size greater than 25MB.');
    };
    return (
        <>
            <label
                htmlFor="form-builder-file-upload"
                className={
                    'flex h-[200px] w-[500px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dotted border-brand-500'
                }
            >
                <FolderUploadIcon />
                <div className={'flex flex-col items-center gap-1'}>
                    <span className={'text-base font-semibold'}>
                        Choose your file or drag file
                    </span>
                    <span className={'text-[12px]'}>Max size limit: 25 MB</span>
                </div>
            </label>
            <input
                type="file"
                id="form-builder-file-upload"
                className={'invisible'}
                onChange={handleFileInputChange}
            />
        </>
    );
};

const InputField = ({
    field,
    slide,
    disabled
}: {
    field: FormField;
    slide: FormField;
    disabled: boolean;
}) => {
    const { updateFieldPlaceholder } = useFieldSelectorAtom();

    return (
        <>
            <TextField
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',
                            borderBottom: '1px solid #407270'
                        },
                        '&:hover fieldset': {
                            border: 'none',
                            borderBottom: '1px solid #407270'
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none',
                            borderBottom: '1px solid #407270'
                        },
                        '& .MuiInputBase-input': {
                            color: '#407270',
                            fontSize: 24,
                            paddingLeft: 0
                        }
                    }
                }}
                type={field.type}
                value={field.properties?.placeholder}
                placeholder={getPlaceholderValueForField(
                    field.type || FieldTypes.SHORT_TEXT
                )}
                onChange={(e: any) =>
                    updateFieldPlaceholder(field.index, slide.index, e.target.value)
                }
                className={'w-full border-0 border-b-[1px] border-cyan-500'}
            />
        </>
    );
};

const YesNoField = ({
    field,
    slide,
    disabled
}: {
    field: FormField;
    slide: FormField;
    disabled: boolean;
}) => {
    return (
        <>
            <RadioGroup
                className={'flex w-full flex-col gap-2'}
                value={field.value}
                onChange={() => {}}
            >
                {field &&
                    field.properties?.choices?.map((choice, index) => {
                        return (
                            <RadioGroup.Option value={choice.value} key={index}>
                                <div
                                    className={`flex justify-between rounded-xl border border-cyan-500 p-2 px-4`}
                                >
                                    {choice.value}
                                </div>
                            </RadioGroup.Option>
                        );
                    })}
            </RadioGroup>
        </>
    );
};

const DropDownField = ({
    field,
    slide,
    disabled
}: {
    field: FormField;
    slide: FormField;
    disabled: boolean;
}) => {
    const { updateChoiceFieldValue, addChoiceField } = useFieldSelectorAtom();
    return (
        <>
            {field.type === FieldTypes.DROP_DOWN ? (
                <div className="mb-2 flex w-full items-center justify-between border-0 border-b-[1px] border-brand-500 py-2 text-2xl text-brand-500">
                    <h1>Select an option</h1> <ArrowDown className="stroke-2" />
                </div>
            ) : (
                <div>Choose as many you like</div>
            )}
            <div className={'flex w-full flex-col gap-2'}>
                {field &&
                    field.properties?.choices?.map((choice, index) => {
                        return (
                            <input
                                type="text"
                                value={choice.value}
                                key={index}
                                placeholder={`Item ${index + 1}`}
                                onChange={(e: any) =>
                                    updateChoiceFieldValue(
                                        field.index,
                                        slide.index,
                                        choice.id,
                                        e.target.value
                                    )
                                }
                                className={`flex justify-between rounded-xl border border-cyan-500 p-2 px-4`}
                            />
                        );
                    })}
            </div>
            <Button
                onClick={() => addChoiceField(field.index, slide.index)}
                variant={'ghost'}
                className="mt-2 text-lg font-semibold"
                icon={<PlusIcon className="h-4 w-4" />}
            >
                Add Option
            </Button>
        </>
    );
};
