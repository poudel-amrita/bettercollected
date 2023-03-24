import React from 'react';

import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import ProviderLoginButton from '@app/components/login/provider-login-btn';
import { useModal } from '@app/components/modal-views/context';
import Button from '@app/components/ui/button';
import environments from '@app/configs/environments';

export default function ImportFormsMenu() {
    const { openModal } = useModal();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const googleEnabled = environments.ENABLE_GOOGLE;
    const typeformEnabled = environments.ENABLE_TYPEFORM;
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!googleEnabled && !typeformEnabled) {
        return <></>;
    }
    return (
        <React.Fragment>
            <Button variant="solid" className="md:ml-3 w-full sm:w-auto !px-8 !rounded-xl !bg-blue-500" onClick={handleClick}>
                Import Forms
            </Button>
            <Menu
                anchorEl={anchorEl}
                id="import-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                disableScrollLock
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        ':hover': {
                            bgcolor: 'background.paper'
                        },
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {googleEnabled && (
                    <MenuItem
                        onClick={() => {
                            openModal('IMPORT_GOOGLE_FORMS_VIEW');
                        }}
                    >
                        <ProviderLoginButton data-testid="google-menu-item" className="!w-40" label="Google" type="dark" onClick={() => {}} isGoogle />
                    </MenuItem>
                )}
                {typeformEnabled && (
                    <MenuItem
                        onClick={() => {
                            openModal('IMPORT_TYPE_FORMS_VIEW');
                        }}
                    >
                        <ProviderLoginButton data-testid="typeform-menu-item" className="!w-40" label="Typeform" type="typeform" onClick={() => {}} />
                    </MenuItem>
                )}
            </Menu>
        </React.Fragment>
    );
}
