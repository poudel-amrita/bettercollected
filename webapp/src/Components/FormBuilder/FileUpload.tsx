import React, { useState } from 'react';

import Image from 'next/image';

import deleteImg from '@app/assets/images/delete.png';
import fileUploadImg from '@app/assets/images/file-upload.png';

interface FileUploadProps {
    id?: string;
}
export default function FileUpload({ id }: FileUploadProps) {
    return (
        <div className="w-[541px] space-y-3">
            <div tabIndex={0} id={id} className={`flex flex-col items-center justify-center space-y-3 rounded border border-dashed border-black-600 bg-black-200 py-10 focus-visible:!outline-none`}>
                <label htmlFor={`${id}-file-input`} className="flex cursor-pointer items-center space-x-2 rounded border bg-white py-2 px-3 hover:bg-gray-50">
                    <Image alt="file-upload-img" src={fileUploadImg} width={24} height={24} />
                    <span className="text-sm font-semibold leading-5 text-black-900">Upload File</span>
                </label>
                <div className="flex w-full flex-col items-center space-y-2 text-xs text-black-800">
                    <span className="font-semibold leading-4">Or drag here</span>
                    <span className="text-center leading-5">
                        Media supported: Images, PDF, Videos, Audios, File <span className="block">Max size limit: 25 MB</span>
                    </span>
                </div>
            </div>
        </div>
    );
}