import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { DeleteOutline } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';

import { useModal } from '@app/components/modal-views/context';
import { ToastId } from '@app/constants/toastId';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { useDeleteWorkspaceDomainMutation, usePatchExistingWorkspaceMutation } from '@app/store/workspaces/api';
import { setWorkspace } from '@app/store/workspaces/slice';

import Button from '../ui/button/button';

export default function UpdateWorkspaceSettings({ updateDomain = false }: { updateDomain: boolean }) {
    const [patchExistingWorkspace, { isLoading }] = usePatchExistingWorkspaceMutation();
    const workspace = useAppSelector((state) => state.workspace);
    const [deleteWorkspaceDomain] = useDeleteWorkspaceDomainMutation();
    const { closeModal } = useModal();
    const [error, setError] = useState(false);

    const [updateText, setUpdateText] = useState(updateDomain ? workspace.customDomain || '' : workspace.workspaceName || '');

    const dispatch = useAppDispatch();

    const router = useRouter();

    useEffect(() => {
        if (updateDomain) {
            setError(!!updateText && !updateText.match('(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\\.[a-zA-Z]{2,3})'));
        } else {
            setError(!updateText);
        }
    }, [updateText]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (error) return;
        if (!updateText && !updateDomain) return;
        const formData = new FormData();
        if (updateDomain && updateText === workspace.customDomain) {
            closeModal();
            return;
        }
        if (!updateDomain && updateText === workspace.workspaceName) {
            closeModal();
            return;
        }
        if (updateDomain) {
            formData.append('custom_domain', updateText);
        } else {
            formData.append('workspace_name', updateText);
        }
        const body = {
            workspace_id: workspace.id,
            body: formData
        };
        const response: any = await patchExistingWorkspace(body);
        if (response.data) {
            dispatch(setWorkspace(response.data));
            toast.info(updateDomain ? 'Updated custom Domain of workspace!' : 'Updated workspace handle', { toastId: ToastId.SUCCESS_TOAST });
            if (!updateDomain) {
                router.replace(`/${response.data.workspaceName}/dashboard/settings?view=settings-advanced`);
            }
            closeModal();
        } else if (response.error) {
            toast.error(response.error.data.message, { toastId: ToastId.ERROR_TOAST });
        }
    };

    const delete_custom_domain = async (e: any) => {
        e.preventDefault();
        const res: any = await deleteWorkspaceDomain(workspace.id);
        if (res.data) {
            dispatch(setWorkspace(res.data));
            router.push(router.asPath);
        } else {
            toast.error('Error Deleting Workspace');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-lg md:max-w-xl xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className="flex justify-center space-x-4">
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="#007aff" viewBox="0 0 640 512">
                            <path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.7 8.4 166.9 8 160 8s-13.7 .4-20.4 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM208 176c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 400c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48z" />
                        </svg>
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight md:text-2xl text-gray-900">
                            {updateDomain ? (workspace.customDomain ? 'Update your Custom Domain' : 'Setup your custom domain for workspace') : 'Update Workspace Handle'}
                        </h1>
                    </div>
                    <form className="flex items-center flex-col space-y-4 md:space-y-6">
                        <div>
                            {workspace.customDomain && (
                                <div className="text-center w-80">
                                    {/* <div className="font-bold text-lg text-gray-600">Are you sure?</div> */}

                                    <div className="text-xs text-gray-500">{updateDomain ? "Form links with previous domain won't work after updating." : "Form links with previous workspace handle won't work after updating."}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-center gap-4 w-full">
                            <TextField
                                inputProps={{ 'data-testid': 'update-field' }}
                                error={error}
                                helperText={error ? (updateDomain ? 'Invalid domain' : 'Invalid Workspace Handle') : ''}
                                placeholder={updateDomain ? 'Enter your custom domain' : 'Enter workspace handle'}
                                value={updateText}
                                onChange={(e) => {
                                    setUpdateText(e.target.value);
                                }}
                                className="font-bold w-full"
                            />
                            {workspace.customDomain && updateDomain && (
                                <button data-testid="delete-button" onClick={delete_custom_domain}>
                                    <DeleteOutline className="text-red-500 bg-red-100 h-[35px] w-[35px] rounded p-1.5" />
                                </button>
                            )}
                        </div>

                        <div className="flex w-full gap-4 justify-end">
                            <Button data-testid="save-button" variant="solid" size="medium" onClick={handleSubmit}>
                                Save
                            </Button>
                            <Button variant="solid" color="gray" size="medium" className="bg-black-500" onClick={closeModal}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
