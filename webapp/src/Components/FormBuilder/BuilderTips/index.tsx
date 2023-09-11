import React from 'react';

import _ from 'lodash';

import { Close } from '@app/components/icons/close';
import { useModal } from '@app/components/modal-views/context';
import useBuilderTranslation from '@app/lib/hooks/use-builder-translation';
import { setBuilderState } from '@app/store/form-builder/actions';
import { useAppDispatch } from '@app/store/hooks';

import { TipList } from './tipsList';

export default function BuilderTips() {
    const { t } = useBuilderTranslation();
    const { openModal } = useModal();
    const dispatch = useAppDispatch();

    const handleCloseIcon = () => {
        dispatch(
            setBuilderState({
                isFormDirty: true
            })
        );
    };

    return (
        <div className="flex flex-col gap-4 mt-10 ml-20 p-6 bg-black-100 rounded-2xl w-[540px]">
            <div className='flex justify-between mb-4'>
                <h1 className="uppercase font-bold tracking-wide text-black-900">{_.capitalize(t('TIPS.DEFAULT'))}:</h1>
                <Close  onClick={handleCloseIcon} className="cursor-pointer"/>
            </div>
            <TipList className='flex flex-row gap-8' listNumber={5}/>
            <h1 className="h6-new !text-brand mt-8 cursor-pointer" onClick={() => openModal('FORM_BUILDER_TIPS_MODAL_VIEW')}>
                Show All
            </h1>
        </div>
    );
}
