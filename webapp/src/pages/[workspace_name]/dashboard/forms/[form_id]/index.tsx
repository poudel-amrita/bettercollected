import React, { useEffect } from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import UserDetails from '@Components/Common/DataDisplay/UserDetails';
import Preview from '@Components/Common/Icons/Preview';
import ResponderIcon from '@Components/Common/Icons/Responder';
import SettingsIcon from '@Components/Common/Icons/Settings';
import { Delete, Group, Settings } from '@mui/icons-material';

import { FormTabContent } from '@app/components/dashboard/form-tab-content';
import FormDeletionRequests from '@app/components/form/deletion-requests';
import FormGroups from '@app/components/form/groups';
import FormPreview from '@app/components/form/preview';
import BreadcrumbsRenderer from '@app/components/form/renderer/breadcrumbs-renderer';
import FormResponses from '@app/components/form/responses';
import FormSettings from '@app/components/form/settings';
import GroupDetails from '@app/components/group-preview/group-details';
import { ChevronForward } from '@app/components/icons/chevron-forward';
import { HistoryIcon } from '@app/components/icons/history';
import { TrashIcon } from '@app/components/icons/trash';
import DashboardLayout from '@app/components/sidebar/dashboard-layout';
import FormPageLayout from '@app/components/sidebar/form-page-layout';
import SidebarLayout from '@app/components/sidebar/sidebar-layout';
import ParamTab, { TabPanel } from '@app/components/ui/param-tab';
import { breadcrumbsItems } from '@app/constants/locales/breadcrumbs-items';
import { formConstant } from '@app/constants/locales/form';
import { localesGlobal } from '@app/constants/locales/global';
import { groupConstant } from '@app/constants/locales/group';
import { useBreakpoint } from '@app/lib/hooks/use-breakpoint';
import { StandardFormDto } from '@app/models/dtos/form';
import { BreadcrumbsItem } from '@app/models/props/breadcrumbs-item';
import Error from '@app/pages/_error';
import { setForm } from '@app/store/forms/slice';
import { useAppDispatch } from '@app/store/hooks';
import { toEndDottedStr } from '@app/utils/stringUtils';

import DeletionRequests from '../../deletion-requests';

export default function FormPage(props: any) {
    const { form }: { form: StandardFormDto } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const locale = props._nextI18Next.initialLocale === 'en' ? '' : `${props._nextI18Next.initialLocale}/`;
    const breakpoint = useBreakpoint();
    const router = useRouter();
    useEffect(() => {
        dispatch(setForm(props.form));
    }, []);

    if (!props && Object.keys(props).length === 0) {
        return <Error />;
    }
    const breadcrumbsItem: Array<BreadcrumbsItem> = [
        {
            title: t(breadcrumbsItems.dashboard),
            url: `/${locale}${props?.workspace?.workspaceName}/dashboard`
        },
        {
            title: t(breadcrumbsItems.forms),
            url: `/${locale}${props?.workspace?.workspaceName}/dashboard/forms`
        },
        {
            title: ['xs'].indexOf(breakpoint) !== -1 ? toEndDottedStr(form?.title, 30) : form?.title || '',
            disabled: true
        },
        {
            title: router.query ? router.query.view?.toString() ?? 'Preview' : 'Preview',
            disabled: true
        }
    ];
    const paramTabs = [
        {
            icon: <Preview className="h-5 w-5" />,
            title: t(formConstant.preview),
            path: 'Preview'
        },
        {
            icon: <HistoryIcon className="h-5 w-5" />,
            title: t(formConstant.responses) + ' (' + form.responses + ')',
            path: 'Responses'
        },
        {
            icon: <TrashIcon className="h-5 w-5" />,
            title: t(formConstant.deletionRequests) + ' (' + form.deletionRequests + ')',
            path: 'Deletion Request'
        },
        {
            icon: <Group className="h-5 w-5" />,
            title: t(groupConstant.groups) + ' (' + form.groups?.length + ')',
            path: 'Groups'
        },
        {
            icon: <SettingsIcon className="h-5 w-5" />,
            title: t(localesGlobal.settings),
            path: 'Settings'
        }
    ];

    const handleBackClick = async () => {
        await router.push(`/${props.workspace.workspaceName}/dashboard/forms`);
    };

    return (
        <SidebarLayout>
            <div className="w-full   my-2 ">
                <BreadcrumbsRenderer items={breadcrumbsItem} />
                <div className="gap-2 my-[10px] flex items-center">
                    <ChevronForward onClick={handleBackClick} className=" cursor-pointer rotate-180 h-6 w-6  p-[2px] " />
                    <p className="h4">{form.title}</p>
                </div>
                <ParamTab className="mb-[38px] pb-0 border-b  border-black-500" tabMenu={paramTabs}>
                    <TabPanel className="focus:outline-none" key="Preview">
                        <FormPreview />
                    </TabPanel>
                    <TabPanel className="focus:outline-none" key="Responses">
                        <FormResponses />
                    </TabPanel>
                    <TabPanel className="focus:outline-none" key="Deletion Requests">
                        <FormDeletionRequests />
                    </TabPanel>
                    <TabPanel className="focus:outline-none" key="Groups">
                        <FormGroups />
                    </TabPanel>
                    <TabPanel className="focus:outline-none" key="Settings">
                        <FormSettings />
                    </TabPanel>
                </ParamTab>
            </div>
        </SidebarLayout>
    );
}
export { getServerSidePropsForDashboardFormPage as getServerSideProps } from '@app/lib/serverSideProps';
