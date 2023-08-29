import React from 'react';

import BackButtonMenuBar from '@Components/Common/BackButtonMenuBar';
import AttentionText from '@Components/Consent/AttentionText';
import ConsentInformationPanel from '@Components/Consent/ConsentInformationPanel';
import CreateConsentForm from '@Components/Consent/Form/CreateConsentForm';

import Layout from '@app/layouts/_layout';

export default function CreateConsent() {
    return (
        <Layout isCustomDomain={false} isClientDomain={false} showNavbar={true} hideMenu={false} showAuthAccount={true} className="!p-0 !bg-white flex flex-col !min-h-calc-68">
            <div className="flex min-w-screen">
                <BackButtonMenuBar text="Back to Form" />
                <div className="mt-12">
                    <div className="ml-[267px] w-[508px] mt-6">
                        <AttentionText className="mt-12" text={`Design your form responder's consent page`} />
                        <CreateConsentForm className="mt-10 pb-20" />
                    </div>
                </div>
                <ConsentInformationPanel />
            </div>
        </Layout>
    );
}
