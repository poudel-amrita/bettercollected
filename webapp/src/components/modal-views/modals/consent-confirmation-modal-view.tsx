import React from 'react';

import AppButton from '@Components/Common/Input/Button/AppButton';
import HintBox from '@Components/Consent/Form/HintBox';
import TermsAndCondition from '@Components/Consent/Form/TermsAndCondition';

import { DropdownCloseIcon } from '@app/components/icons/dropdown-close';
import { ConsentCategoryType } from '@app/models/enums/consentEnum';
import { IConsentAnswer } from '@app/store/consent/types';
import { resetFillForm } from '@app/store/fill-form/slice';
import { useAppDispatch } from '@app/store/hooks';

import { useModal } from '../context';
import { useFullScreenModal } from '../full-screen-modal-context';

export interface ConsentConfirmationModalProps {
    onFormSubmit: any;
    consentAnswers: Record<string, IConsentAnswer>;
}
export default function ConsentConfirmationModaView({ onFormSubmit, consentAnswers }: ConsentConfirmationModalProps) {
    const { closeModal } = useModal();
    const fullScreenModal = useFullScreenModal();
    const dispatch = useAppDispatch();

    const renderPurposeTermsAndConditon = () => {
        const formPurpose = Object.values(consentAnswers).filter((answer) => answer.category === ConsentCategoryType.PurposeOfTheForm).length !== 0;
        if (formPurpose) {
            return (
                <TermsAndCondition>
                    <TermsAndCondition.Title title={`I have reviewed all the form's purposes.`} />
                    <TermsAndCondition.Description description={`This confirms whether you've taken a moment to go through the stated intentions of the form before proceeding.`} />
                </TermsAndCondition>
            );
        }
    };
    const onSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await onFormSubmit(consentAnswers);
            closeModal();
            fullScreenModal.closeModal();
            dispatch(resetFillForm());
        } catch (e) {}
    };
    return (
        <form onSubmit={onSubmit} className="bg-white rounded-2xl w-fit md:w-[476px] h-content">
            <div className="flex justify-between py-4 px-6 border-b border-black-200">
                <div className="p2 !text-black-800">Purpose Of The Form</div>
                <DropdownCloseIcon className="cursor-pointer" onClick={closeModal} />
            </div>
            <div className="pt-5 px-6">
                <HintBox
                    size="small"
                    iconColor="#FE3678"
                    title={`Putting your data's safety first!`}
                    description={`This page ensures you've seen and understood the consents you're granting. Your trust is essential, and we're here to protect your information.`}
                />
                {renderPurposeTermsAndConditon()}
                <TermsAndCondition>
                    <TermsAndCondition.Title title={`I agree to the privacy policy.`} />
                    <TermsAndCondition.Description description={`By checking this box, you indicate your acceptance and understanding of the provided terms and conditions.`} />
                </TermsAndCondition>
            </div>
            <div className="p-10">
                <AppButton type="submit" className="bg-new-blue-500 !w-full !py-3">
                    Confirm & Submit
                </AppButton>
            </div>
        </form>
    );
}
