import { useEffect, useRef, useState } from 'react';

import { AlternateEmail, ArrowDropDown, DateRange, Grid4x4, Notes, Phone, ShortText, Star, TrendingUpSharp } from '@mui/icons-material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import LinkIcon from '@mui/icons-material/Link';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { List, ListItem, ListSubheader, Paper } from '@mui/material';

import { TagIcon } from '@app/components/icons/tag-icon';
import { BlockTypes, FormBuilderTagNames, KeyType } from '@app/models/enums/formBuilder';

export const allowedInputTags = [
    {
        id: FormBuilderTagNames.INPUT_SHORT_TEXT,
        type: FormBuilderTagNames.INPUT_SHORT_TEXT,
        label: 'Short Input Text',
        icon: <ShortText width={20} height={20} />,
        blockType: BlockTypes.INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.INPUT_LONG_TEXT,
        type: FormBuilderTagNames.INPUT_LONG_TEXT,
        label: 'Long Text Input',
        icon: <Notes width={20} height={20} />,
        blockType: BlockTypes.INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.INPUT_EMAIL,
        type: FormBuilderTagNames.INPUT_EMAIL,
        label: 'Email',
        icon: <AlternateEmail width={20} height={20} />,
        blockType: BlockTypes.INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.INPUT_NUMBER,
        type: FormBuilderTagNames.INPUT_NUMBER,
        label: 'Number',
        icon: <TagIcon width={20} height={20} />,
        blockType: BlockTypes.INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.INPUT_LINK,
        type: FormBuilderTagNames.INPUT_LINK,
        label: 'Link',
        icon: <LinkIcon width={20} height={20} />,
        blockType: BlockTypes.INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.INPUT_DATE,
        type: FormBuilderTagNames.INPUT_DATE,
        label: 'Date',
        icon: <DateRange width={20} height={20} />,
        blockType: BlockTypes.INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.INPUT_PHONE_NUMBER,
        type: FormBuilderTagNames.INPUT_PHONE_NUMBER,
        label: 'Phone Number',
        icon: <Phone width={20} height={20} />,
        blockType: BlockTypes.INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.INPUT_CHECKBOXES,
        type: FormBuilderTagNames.INPUT_CHECKBOXES,
        label: 'Checkboxes',
        icon: <CheckBoxOutlineBlankIcon width={20} height={20} />,
        blockType: BlockTypes.INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.INPUT_MULTIPLE_CHOICE,
        type: FormBuilderTagNames.INPUT_MULTIPLE_CHOICE,
        label: 'Multiple Choice',
        icon: <RadioButtonUncheckedIcon width={20} height={20} />,
        blockType: BlockTypes.INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.INPUT_DROPDOWN,
        type: FormBuilderTagNames.INPUT_DROPDOWN,
        label: 'Dropdown',
        icon: <ArrowDropDown width={20} height={20} />,
        blockType: BlockTypes.INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.INPUT_RATING,
        type: FormBuilderTagNames.INPUT_RATING,
        label: 'Rating',
        icon: <Star width={20} height={20} />,
        blockType: BlockTypes.INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.INPUT_RANKING,
        type: FormBuilderTagNames.INPUT_RANKING,
        label: 'Ranking',
        icon: <TrendingUpSharp width={20} height={20} />,
        blockType: BlockTypes.INPUT_BLOCKS
    }
];

export const allowedLayoutTags = [
    {
        id: FormBuilderTagNames.LAYOUT_HEADER1,
        type: FormBuilderTagNames.LAYOUT_HEADER1,
        label: 'Heading 1',
        icon: <div className="w-5 font-bold text-xl">H1</div>,
        blockType: BlockTypes.LAYOUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.LAYOUT_HEADER2,
        type: FormBuilderTagNames.LAYOUT_HEADER2,
        label: 'Heading 2',
        icon: <div className=" font-bold text-xl">H2</div>,
        blockType: BlockTypes.LAYOUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.LAYOUT_HEADER3,
        type: FormBuilderTagNames.LAYOUT_HEADER3,
        label: 'Heading 3',
        icon: <div className=" font-bold text-xl">H3</div>,
        blockType: BlockTypes.LAYOUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.LAYOUT_HEADER4,
        type: FormBuilderTagNames.LAYOUT_HEADER4,
        label: 'Heading 4',
        icon: <div className=" font-bold text-xl">H4</div>,
        blockType: BlockTypes.LAYOUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.LAYOUT_HEADER5,
        type: FormBuilderTagNames.LAYOUT_HEADER5,
        label: 'Heading 5',
        icon: <div className=" font-bold text-xl">H5</div>,
        blockType: BlockTypes.LAYOUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.LAYOUT_SHORT_TEXT,
        type: FormBuilderTagNames.LAYOUT_SHORT_TEXT,
        label: 'Text',
        icon: <div className="font-bold text-center text-xl">{'T'}</div>,
        blockType: BlockTypes.LAYOUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.LAYOUT_LABEL,
        type: FormBuilderTagNames.LAYOUT_LABEL,
        label: 'Label',
        icon: <div className=" font-bold text-center text-xl">{'L'}</div>,
        blockType: BlockTypes.LAYOUT_BLOCKS
    }
];

export const allowedQuestionAndAnswerTags = [
    {
        id: FormBuilderTagNames.QUESTION_SHORT_TEXT,
        type: FormBuilderTagNames.QUESTION_SHORT_TEXT,
        label: 'Header + Short Input Text',
        icon: <ShortText width={20} height={20} />,
        blockType: BlockTypes.QUESTION_INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.QUESTION_LONG_TEXT,
        type: FormBuilderTagNames.QUESTION_LONG_TEXT,
        label: 'Header + Long Text Input',
        icon: <Notes width={20} height={20} />,
        blockType: BlockTypes.QUESTION_INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.QUESTION_EMAIL,
        type: FormBuilderTagNames.QUESTION_EMAIL,
        label: 'Header + Email',
        icon: <AlternateEmail width={20} height={20} />,
        blockType: BlockTypes.QUESTION_INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.QUESTION_NUMBER,
        type: FormBuilderTagNames.QUESTION_NUMBER,
        label: 'Header + Number',
        icon: <TagIcon width={20} height={20} />,
        blockType: BlockTypes.QUESTION_INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.QUESTION_LINK,
        type: FormBuilderTagNames.QUESTION_LINK,
        label: 'Header + Link',
        icon: <LinkIcon width={20} height={20} />,
        blockType: BlockTypes.QUESTION_INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.QUESTION_DATE,
        type: FormBuilderTagNames.QUESTION_DATE,
        label: 'Header + Date',
        icon: <DateRange width={20} height={20} />,
        blockType: BlockTypes.QUESTION_INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.QUESTION_PHONE_NUMBER,
        type: FormBuilderTagNames.QUESTION_PHONE_NUMBER,
        label: 'Header + Phone Number',
        icon: <Phone width={20} height={20} />,
        blockType: BlockTypes.QUESTION_INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.QUESTION_CHECKBOXES,
        type: FormBuilderTagNames.QUESTION_CHECKBOXES,
        label: 'Header + Checkboxes',
        icon: <CheckBoxOutlineBlankIcon width={20} height={20} />,
        blockType: BlockTypes.QUESTION_INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.QUESTION_MULTIPLE_CHOICE,
        type: FormBuilderTagNames.QUESTION_MULTIPLE_CHOICE,
        label: 'Header + Multiple Choice',
        icon: <RadioButtonUncheckedIcon width={20} height={20} />,
        blockType: BlockTypes.QUESTION_INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.QUESTION_DROPDOWN,
        type: FormBuilderTagNames.QUESTION_DROPDOWN,
        label: 'Header + Dropdown',
        icon: <ArrowDropDown width={20} height={20} />,
        blockType: BlockTypes.QUESTION_INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.QUESTION_RATING,
        type: FormBuilderTagNames.QUESTION_RATING,
        label: 'Header + Rating',
        icon: <Star width={20} height={20} />,
        blockType: BlockTypes.QUESTION_INPUT_BLOCKS
    },
    {
        id: FormBuilderTagNames.QUESTION_RANKING,
        type: FormBuilderTagNames.QUESTION_RANKING,
        label: 'Header + Ranking',
        icon: <TrendingUpSharp width={20} height={20} />,
        blockType: BlockTypes.QUESTION_INPUT_BLOCKS
    }
];

export const allowedTags = [...allowedQuestionAndAnswerTags, ...allowedLayoutTags, ...allowedInputTags];
const FormBuilderTagSelector = ({ closeMenu, handleSelection, className = '' }: any) => {
    const [tagList, setTagList] = useState(allowedTags);
    const [selectedTag, setSelectedTag] = useState({ blockType: BlockTypes.INPUT_BLOCKS, index: 0 });
    const [command, setCommand] = useState('');

    const [blockListTypes, setBlockListTypes] = useState<Array<any>>([BlockTypes.INPUT_BLOCKS, BlockTypes.LAYOUT_BLOCKS, BlockTypes.QUESTION_INPUT_BLOCKS]);

    const listRef: any = useRef(null);

    useEffect(() => {
        setTagList(allowedTags);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            const keyActions: any = {
                [KeyType.Enter]: () => {
                    e.preventDefault();
                    const selectedListItem: any = listRef.current?.querySelector('.selected');
                    if (selectedListItem) {
                        const tag = selectedListItem.dataset.tag;
                        handleSelection(tag);
                    }
                },
                [KeyType.ArrowDown]: () => selectNextTag(e),
                [KeyType.ArrowUp]: () => selectPreviousTag(e),
                [KeyType.Backspace]: () => {
                    setCommand((prevCommand) => {
                        closeMenu();
                        return command.slice(0, -1);
                    });
                },
                [KeyType.Escape]: () => closeMenu(),
                default: () => {}
            };

            const action = keyActions[e.key] || keyActions.default;
            action();
        };

        const selectNextTag = (e: any) => {
            e.preventDefault();
            if (getFilteredList(selectedTag.blockType).length - 1 === selectedTag.index) {
                return setSelectedTag(() => {
                    const blockType = blockListTypes[(blockListTypes.indexOf(selectedTag.blockType) + 1) % blockListTypes.length];
                    scrollToSelectedItem(blockType, 0);
                    return { blockType, index: 0 };
                });
            }
            setSelectedTag((prevTag) => {
                const filteredList = getFilteredList(selectedTag.blockType);
                const newIndex = (prevTag.index + 1) % filteredList.length;
                scrollToSelectedItem(prevTag.blockType, newIndex);
                return { ...prevTag, index: newIndex };
            });
        };

        const selectPreviousTag = (e: any) => {
            e.preventDefault();
            if (selectedTag.index === 0) {
                return setSelectedTag(() => {
                    const blockType = blockListTypes[(blockListTypes.indexOf(selectedTag.blockType) - 1 + blockListTypes.length) % blockListTypes.length];
                    const filteredList = getFilteredList(blockType);
                    const newIndex = filteredList.length - 1;
                    scrollToSelectedItem(blockType, newIndex);
                    return { blockType, index: newIndex };
                });
            }
            setSelectedTag((prevTag) => {
                const filteredList = getFilteredList(selectedTag.blockType);
                const newIndex = (prevTag.index - 1 + filteredList.length) % filteredList.length;
                scrollToSelectedItem(prevTag.blockType, newIndex);
                return { ...prevTag, index: newIndex };
            });
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSelection, selectedTag, command, closeMenu]);

    const getFilteredList = (blockType: string) => {
        return tagList.filter((tag) => tag.blockType === blockType);
    };

    const scrollToSelectedItem = (blockType: string, index: number | string) => {
        const selectedItem = listRef.current?.querySelector(`[data-id="${blockType}-${index}"]`);
        if (selectedItem) {
            selectedItem.scrollIntoView({
                block: 'end',
                inline: 'end'
            });
        }
    };

    const renderSingleTypeTagElements = (blockType: string, typeTagList: Array<any>) => (
        <li key={blockType}>
            <ul>
                <ListSubheader className="font-bold tracking-widest shadow-sm">{blockType.toUpperCase()}</ListSubheader>
                {typeTagList.length === 0 && <p className="m-0 px-4 py-2 text-sm text-neutral-300">No items</p>}
                {typeTagList.map((tag: any, index: number) => {
                    const isSelected = selectedTag.blockType === blockType && selectedTag.index === index;
                    const listItemClass = isSelected ? 'bg-indigo-500 text-white selected' : 'text-neutral-700 hover:bg-indigo-400 hover:text-white';

                    return (
                        <ListItem
                            key={index}
                            data-id={`${blockType}-${index}`}
                            data-tag={tag.type}
                            className={`flex items-center px-3 py-2 gap-3 last:border-b-0 ${listItemClass}`}
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                                console.log('Item Clicked');
                                handleSelection(tag.type);
                            }}
                        >
                            {tag.icon}
                            <span className="ml-2">{tag.label}</span>
                        </ListItem>
                    );
                })}
            </ul>
        </li>
    );

    return (
        <div className={`absolute top-full left-0 right-0 z-[9999] overflow-hidden rounded bg-white drop-shadow-main ${className}`}>
            <Paper style={{ maxHeight: 320, overflowY: 'auto' }}>
                <List
                    ref={listRef}
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        '& ul': { padding: 0 }
                    }}
                    subheader={<li />}
                >
                    {blockListTypes.map((type) => renderSingleTypeTagElements(type, getFilteredList(type)))}
                </List>
            </Paper>
        </div>
    );
};

export default FormBuilderTagSelector;
