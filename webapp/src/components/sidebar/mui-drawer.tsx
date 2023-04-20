import React from 'react';

import { useRouter } from 'next/router';

import { ExpandMore, SettingsOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';

import { DashboardIcon } from '@app/components/icons/dashboard-icon';
import { FormIcon } from '@app/components/icons/form-icon';
import { useAppSelector } from '@app/store/hooks';
import { useGetAllMineWorkspacesQuery } from '@app/store/workspaces/api';

interface INavbarList {
    key: string;
    name: string;
    url: string;
    icon: any;
}

interface IMuiDrawerProps {
    drawerWidth?: number;
    mobileOpen?: boolean;
    handleDrawerToggle: () => void;
}

MuiDrawer.defaultProps = {
    drawerWidth: 289,
    mobileOpen: false
};
export default function MuiDrawer({ drawerWidth, mobileOpen, handleDrawerToggle }: IMuiDrawerProps) {
    const container = window !== undefined ? () => window.document.body : undefined;
    const router = useRouter();
    const workspace = useAppSelector((state) => state?.workspace);
    const { data, isLoading } = useGetAllMineWorkspacesQuery();

    const workspaceProfile = (size: number = 36) =>
        workspace?.profileImage ? (
            <Avatar sx={{ width: size, height: size, borderRadius: 1 }} src={workspace?.profileImage} className="rounded-[4px] overflow-hidden !mr-0" />
        ) : (
            <Avatar sx={{ width: size, height: size, borderRadius: 1 }}>{workspace?.title[0]?.toUpperCase()}</Avatar>
        );

    const commonWorkspaceUrl = `/${workspace?.workspaceName}/dashboard`;

    const topNavList: Array<INavbarList> = [
        {
            key: 'dashboard',
            name: 'Dashboard',
            url: commonWorkspaceUrl,
            icon: DashboardIcon
        },
        {
            key: 'forms',
            name: 'Forms',
            url: `${commonWorkspaceUrl}/forms`,
            icon: FormIcon
        }
    ];
    const bottomNavList: Array<INavbarList> = [
        {
            key: 'workspace-settings',
            name: 'Workspace Settings',
            url: `${commonWorkspaceUrl}/settings`,
            icon: SettingsOutlined
        }
    ];

    const generateNavbarLists = (list: Array<INavbarList>) => {
        return (
            <List>
                {list.map((element) => {
                    const Icon = element.icon;
                    return (
                        <ListItem key={element.key} disablePadding onClick={() => router.push(element.url, undefined, { shallow: true })}>
                            <ListItemButton sx={{ paddingY: '16px', paddingX: '20px' }}>
                                <ListItemIcon sx={{ minWidth: '32px' }}>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText primary={element.name} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        );
    };

    const drawer = (
        <>
            <Toolbar />
            <Box sx={{ overflow: 'auto', height: '100%' }}>
                <List>
                    <ListItem disablePadding>
                        <Accordion disabled={isLoading} sx={{ paddingY: '16px', paddingX: '4px', width: '100%' }} elevation={0} className="hover:bg-zinc-100">
                            <AccordionSummary expandIcon={<ExpandMore className="h-7 w-7 text-black-900 transition-all duration-300" />}>
                                {workspaceProfile()} <p className="ml-3 p-0 !body1 flex items-center">{workspace?.title}</p>
                            </AccordionSummary>
                            <AccordionDetails className="w-full flex flex-col gap-3">
                                {data && Array.isArray(data) && data.length > 1 ? (
                                    data.map((w) => <p key={w?.id}>{w?.title}</p>)
                                ) : (
                                    <p className="text-black-600">Currently, you only have a single workspace. Creation of new workspaces and collaboration coming soon.</p>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                </List>
                <Divider />
                {generateNavbarLists(topNavList)}
                <Divider />
                {generateNavbarLists(bottomNavList)}
            </Box>
        </>
    );

    return (
        <>
            {/* Mobile drawer */}
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, borderRadius: 0, boxSizing: 'border-box' },
                    display: { xs: 'block', sm: 'block', md: 'block', lg: 'none', xl: 'none' }
                }}
            >
                {drawer}
            </Drawer>

            {/* Desktop drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, borderRadius: 0, boxSizing: 'border-box' },
                    display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' }
                }}
                open
            >
                {drawer}
            </Drawer>
        </>
    );
}
