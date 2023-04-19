import React from 'react';

import _ from 'lodash';

import { ChevronLeft, Logout } from '@mui/icons-material';
import { Avatar, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

import { useModal } from '@app/components/modal-views/context';
import { useBreakpoint } from '@app/lib/hooks/use-breakpoint';
import { useGetStatusQuery } from '@app/store/auth/api';

export default function AuthAccountMenuDropdown() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const { data, error, isLoading } = useGetStatusQuery('status');

    const screenSize = useBreakpoint();
    const { openModal } = useModal();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        openModal('LOGOUT_VIEW');
        handleClose();
    };

    const user = data?.user;

    const profileName = _.capitalize(user?.first_name) + ' ' + _.capitalize(user?.last_name);

    if (isLoading || error) return <div className="w-9 sm:w-32 h-9 rounded-[4px] animate-pulse bg-black-300" />;

    const userProfile = (size: number = 36) =>
        user?.profile_image ? (
            <Avatar sx={{ width: size, height: size, borderRadius: 1 }} src={user?.profile_image} className="rounded-[4px] overflow-hidden !mr-0" />
        ) : (
            <Avatar sx={{ width: size, height: size, borderRadius: 1 }}>{profileName[0]?.toUpperCase()}</Avatar>
        );

    return (
        <>
            <Tooltip title="Account Settings" arrow enterDelay={400}>
                <IconButton className="hover:rounded-[4px] hover:bg-black-200 rounded-[4px]" onClick={handleClick} size="small" aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                    {userProfile()}
                    {['xs', '2xs', 'sm'].indexOf(screenSize) === -1 && <p className="body4 ml-2 mr-[14px]">{profileName?.trim() || user?.email || ''}</p>}
                    <ChevronLeft className={`${open ? 'rotate-90' : '-rotate-90'} h-7 w-7 text-black-900 transition-all duration-300`} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                draggable
                PaperProps={{
                    elevation: 0,
                    sx: {
                        width: 320,
                        overflow: 'hidden',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 2,
                            borderRadius: 1
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
                <ListItem className="py-2 px-4" alignItems="flex-start">
                    <ListItemIcon className="!min-w-[39px]">{userProfile()}</ListItemIcon>
                    <ListItemText
                        primary="Signed in as"
                        secondary={
                            <React.Fragment>
                                <Typography sx={{ display: 'inline', fontStyle: 'italic' }} component="span" variant="body2" color="text.secondary">
                                    {user?.email}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider className="mb-2" />
                {/* <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add Collaborators
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider /> */}
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" color="error" />
                    </ListItemIcon>
                    <span className="text-[#d32f2f]">Logout</span>
                </MenuItem>
            </Menu>
        </>
    );
}
