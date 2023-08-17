import React from 'react';

import FormRenderer from '../form/renderer/form-renderer';

export const FormTabContent = ({ form }: any) => {
    return (
        <div className="w-full rounded bg-white p-5 max-w-[700px] flex items-center ">
            <FormRenderer form={form} enabled={false} />
        </div>
    );
};