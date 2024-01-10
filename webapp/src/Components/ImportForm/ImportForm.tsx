import React, { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import _ from 'lodash';

import AppTextField from '@Components/Common/Input/AppTextField';
import ChangeSlugComponent from '@Components/ImportForm/ChangeSlugComponent';
import { CircularProgress } from '@mui/material';
import confetti from 'canvas-confetti';
import { toast } from 'react-toastify';

import GoogleFolder from '@app/assets/images/google_folder.png';
import GoogleForm from '@app/assets/images/google_form.png';
import { LinkIcon } from '@app/components/icons/link-icon';
import { toastMessage } from '@app/constants/locales/toast-message';
import { selectForm, setForm } from '@app/store/forms/slice';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { useImportFormMutation, useLazyGetSingleFormFromProviderQuery } from '@app/store/workspaces/api';

const ImportForm = ({ formId }: { formId?: string }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [importFormLink, setImportFormLink] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const form = useAppSelector(selectForm);

    const [importForm, importFormResult] = useImportFormMutation();
    const [singleFormFromProviderTrigger, singleFormFromProviderResult] = useLazyGetSingleFormFromProviderQuery();

    const workspace = useAppSelector((state) => state.workspace);

    const checkFormUrlPattern = useCallback(
        _.debounce((importFormLink) => {
            if (!importFormLink) {
                setError(false);
                return;
            }
            const pattern = /https:\/\/docs\.google\.com\/forms\/d\/([^/]+)\/edit/;
            const match = importFormLink.match(pattern);
            setIsLoading(false);
            if (match) {
                const formId = match[1];
                setError(false);
                handleImportForm(formId);
            } else {
                setError(true);
                setErrorMessage("Oops! That URL doesn't look quite right. Could you double-check it? Ensure the URL is an edit URL from the browser address bar, not a shared form link, as shown in the image below.");
            }
        }, 1500),
        []
    );

    useEffect(() => {
        if (formId) setImportFormLink(`https://docs.google.com/forms/d/${formId}/edit`);
    }, [formId]);

    useEffect(() => {
        setIsLoading(importFormResult.isLoading || singleFormFromProviderResult.isLoading);
    }, [importFormResult.isLoading, singleFormFromProviderResult.isLoading]);

    const handleImportForm = async (formId: string) => {
        const singleForm: any = await singleFormFromProviderTrigger({ provider: 'google', formId: formId });
        const form: any = { ...singleForm?.data, provider: 'google' };
        delete form['clientFormItems'];
        if (singleForm.error) {
            setError(true);
            if (singleForm?.error?.status === 401) setErrorMessage('Uh-oh! Looks like you need permission to access this form.' + 'Ensure the form is from your Google account, or, check with the owner.');
            if (singleForm?.error?.status === 404) {
                setErrorMessage('Uh-oh! It seems like form you are trying to fetch does not exist in Google Forms.');
            }
            return;
        }
        const response: any = await importForm({
            body: { form, response_data_owner: '' },
            provider: 'google',
            workspaceId: workspace.id
        });
        if (response.data) {
            toast.success(t(toastMessage.formImportedSuccessfully).toString());
            dispatch(setForm(response?.data));
            // fireworks();
        } else {
            setError(true);
            setErrorMessage('error');
            toast.error(response.error?.data || t(toastMessage.couldNotImportedForm));
        }
    };

    useEffect(() => {
        setIsLoading(true);
        setError(false);
        checkFormUrlPattern(importFormLink);
    }, [importFormLink]);

    const getLoadingTextType = () => {
        if (importFormResult?.isLoading) {
            return 'Importing Form';
        } else if (singleFormFromProviderResult?.isLoading) {
            return 'Fetching Form';
        } else return 'Checking form URL';
    };

    if (form?.formId) return <ChangeSlugComponent />;

    return (
        <div className={'flex flex-col items-center gap-4 px-5 md:w-[500px]'}>
            <Image className={'pb-1'} src={GoogleFolder} alt={'GoogleFolder'} />
            <h1 className={'h3-new !text-black-800'}>
                Import Google Form <span className={'!text-pink-500'}> From URL</span>
            </h1>
            <h4 className={'body4 !text-black-700  text-center pb-6'}>Use the editing URL directly from the top of the Google browser bar, not the shared form link.</h4>
            <AppTextField
                placeholder={'Paste URL'}
                className={'w-full'}
                icon={<LinkIcon />}
                autoFocus
                disabled={singleFormFromProviderResult?.isLoading || importFormResult?.isLoading}
                value={importFormLink}
                onFocus={(event) => {
                    event.target.select();
                }}
                onChange={(event) => {
                    setImportFormLink(event.target.value);
                }}
            />
            <div className={'flex gap-1 pb-8 justify-start w-full h-20'}>{importFormLink && isLoading ? <LoadingIconWithText text={getLoadingTextType()} /> : error && <span className={'body4 !text-red-500'}>{errorMessage}</span>}</div>
            <Image src={GoogleForm} alt={'GoogleForm'} />
        </div>
    );
};
export default ImportForm;

const LoadingIconWithText = ({ text }: { text: string }) => {
    return (
        <div className={'flex gap-2'}>
            <CircularProgress size={20} /> <span className={'body4 !text-black-700'}>{text}</span>
        </div>
    );
};

// function fireworks() {
//     let duration = 3 * 1000;
//     let animationEnd = Date.now() + duration;
//     let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
//
//     function randomInRange(min: number, max: number) {
//         return Math.random() * (max - min) + min;
//     }
//
//     let interval: NodeJS.Timer = setInterval(function () {
//         let timeLeft = animationEnd - Date.now();
//
//         if (timeLeft <= 0) {
//             return clearInterval(interval);
//         }
//
//         let particleCount = 100 * (timeLeft / duration);
//         // since particles fall down, start a bit higher than random
//         confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
//         confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
//     }, 250);
// }
