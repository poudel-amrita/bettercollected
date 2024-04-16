'use client';

import { useSearchParams } from 'next/navigation';

import environments from '@app/configs/environments';
import SingleFormPage from '@app/pages/forms/v1/[id]';
import { useStandardForm } from '@app/store/jotai/fetchedForm';
import useWorkspace from '@app/store/jotai/workspace';
import { useGetWorkspaceFormQuery } from '@app/store/workspaces/api';
import FullScreenLoader from '@app/views/atoms/Loaders/FullScreenLoader';
import Form from '@app/views/organism/Form/Form';
import { useEffect } from 'react';
import ReduxWrapperAppRouter from '@app/containers/ReduxWrapperAppRouter';

export default function FormPage({ params }: { params: { form_id: string; workspace_name: string } }) {
    const slug = params.form_id;

    return (
        <ReduxWrapperAppRouter>
            <FetchFormWrapper slug={slug} />
        </ReduxWrapperAppRouter>
    );
}

const FetchFormWrapper = ({ slug }: { slug: string }) => {
    const searchParams = useSearchParams();
    const isPreviewMode = searchParams?.get('isPreview');
    const { workspace } = useWorkspace();
    const { setStandardForm } = useStandardForm();

    const { data, isLoading, error } = useGetWorkspaceFormQuery(
        {
            workspace_id: workspace.id,
            custom_url: slug,
            published: true
        },
        { skip: !workspace.id }
    );

    useEffect(() => {
        // @ts-ignore
        if (data?.formId) setStandardForm(data);
    }, [data]);

    const hasCustomDomain = window.location.host !== environments.NEXT_PUBLIC_V1_CLIENT_ENDPOINT_DOMAIN;

    if (isLoading || error) {
        return <FullScreenLoader />;
    }

    return (
        <>
            {data?.builderVersion === 'v2' && <Form isMobileView={!!isPreviewMode} />}
            {data?.builderVersion !== 'v2' && <SingleFormPage hasCustomDomain={hasCustomDomain} slug={slug} form={data} workspace={workspace} />}
        </>
    );
};
