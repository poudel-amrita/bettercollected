import React from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import 'nprogress/nprogress.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

import '@app/assets/css/globals.css';
import { DialogModalContainer } from '@app/lib/hooks/useDialogModal';
import { Toaster } from '@app/shadcn/components/ui/toaster';
import ReduxProvider from '@app/shared/hocs/ReduxProvider';
import ThemeProvider from '@app/shared/hocs/ThemeProvider';
import CookieConsent from '@app/views/atoms/CookieConsent';
import NextNProgress from '@app/views/atoms/NextNProgress';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Starter Project',
    description: 'Generated by create next app'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider>
                    <CookieConsent />
                    <NextNProgress
                        color="#0764EB"
                        startPosition={0}
                        stopDelayMs={400}
                        height={2}
                        options={{ easing: 'ease' }}
                    />
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover={false}
                        theme="dark"
                    />
                    <Toaster />
                    <ReduxProvider>
                        {children}
                        <DialogModalContainer />
                    </ReduxProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
