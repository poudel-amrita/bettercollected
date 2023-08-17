import React from 'react';

export default function SmallLogo(props: React.SVGAttributes<any>) {
    return (
        <svg width="40" height="40" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M76.0367 48.5683H59.5924C59.4938 48.5683 59.4131 48.4876 59.4131 48.389V31.2812C55.7548 29.739 51.7379 28.8782 47.5148 28.8782C41.588 28.8782 36.0558 30.5729 31.3754 33.4959V6.13965H17.0293V59.3637C17.0293 60.888 17.1369 62.3854 17.3521 63.8469C19.5219 78.5517 32.2003 89.8492 47.5148 89.8492C64.3535 89.8492 78.0003 76.1935 78.0003 59.3637C78.0003 55.562 77.3099 51.9217 76.0367 48.5683ZM47.5148 75.5031C38.6023 75.5031 31.3754 68.2763 31.3754 59.3637C31.3754 50.4512 38.6023 43.2243 47.5148 43.2243C56.4273 43.2243 63.6542 50.4512 63.6542 59.3637C63.6542 68.2763 56.4273 75.5031 47.5148 75.5031Z"
                fill="#0764EB"
            />
            <path d="M17.3247 63.8201C17.1095 62.3586 17.002 60.8612 17.002 59.3369L17.3247 63.8201Z" fill="#0764EB" />
            <path d="M75.5682 32.4648H64.8086V43.2244H75.5682V32.4648Z" fill="#A8C6F0" />
        </svg>
    );
}