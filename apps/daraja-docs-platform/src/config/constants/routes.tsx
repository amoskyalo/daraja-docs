import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import VpnLockOutlinedIcon from '@mui/icons-material/VpnLockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export const HEADERTABS = [
    { label: 'Docs', href: '/docs/introduction' },
    { label: 'Dev console', href: '/dev-console' },
    { label: 'GitHub', href: '/github' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Changelog', href: '/changelog' },
];

export const DEVCONSOLETABS = [
    {
        label: 'Developer Apps',
        value: 0,
        description: 'View, edit, delete, and manage all your sandbox and production developer apps',
        icon: <AppsOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
        label: 'Test Credentials',
        value: 1,
        description:
            'Encrypt your initiator password. Sandbox passwords are pre-set; production passwords are created on the M-PESA portal.',
        icon: <LockOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
        label: 'Go Live',
        value: 2,
        description: "Tested the APIs in sandbox? You're ready for production!",
        icon: <RocketLaunchOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
        label: 'URL Management',
        value: 3,
        description:
            'Register, update, or delete your C2B URLs used by Daraja to send transaction callbacks and notifications.',
        icon: <LinkOutlinedIcon fontSize="small" />,
    },
    {
        label: 'Incident Management',
        value: 4,
        description: 'All tickets appear here',
        icon: <ErrorOutlineOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
        label: 'VPN/MPLS Connection',
        value: 5,
        description: 'My Requests',
        icon: <VpnLockOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
        label: 'Profile',
        value: 6,
        description: 'Keep your profile up to date with your latest email, username, and account details.',
        icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    },
];

export const SIDENAVITEMS = [
    {
        title: 'Getting started',
    },
    {
        segment: '/docs/introduction',
        title: 'Introduction',
        versions: ['v2', 'v3'],
    },
    {
        segment: '/docs/terminologies',
        title: 'Terminologies',
        versions: ['v2', 'v3'],
    },
    {
        segment: '/docs/development-setup',
        title: 'Development Setup',
        versions: ['v2', 'v3'],
    },
    {
        segment: '/docs/going-live-and-certificates',
        title: 'Going Live & Certificates',
        versions: ['v2', 'v3'],
    },
    {
        title: 'APIs',
    },
    {
        title: 'Authorization',
        segment: '/docs/apis/authorization',
        versions: ['v2', 'v3'],
    },
    {
        title: 'Dynamic QR',
        segment: '/docs/apis/dynamic-qr',
        versions: ['v2', 'v3'],
    },
    {
        title: 'M-Pesa Express',
        segment: '/docs/apis/mpesa-express',
        versions: ['v2', 'v3'],
    },
    {
        title: 'Customer To Business (C2B)',
        segment: '/docs/apis/c2b',
        versions: ['v2', 'v3'],
    },
    {
        title: 'Business To Customer (B2C)',
        segment: '/docs/apis/b2c',
        versions: ['v2', 'v3'],
    },
    {
        title: 'Transaction Status',
        segment: '/docs/apis/transaction-status',
        versions: ['v2', 'v3'],
    },
    {
        title: 'Account Balance',
        segment: '/docs/apis/account-balance',
        versions: ['v2', 'v3'],
    },
    {
        title: 'Reversals',
        segment: '/docs/apis/reversals',
        versions: ['v2', 'v3'],
    },
    {
        title: 'Tax Remittance',
        segment: '/docs/apis/tax-remittance',
        versions: ['v2', 'v3'],
    },
    {
        title: 'Business Pay Bill',
        segment: '/docs/apis/business-pay-bill',
        versions: ['v2', 'v3'],
    },
    {
        title: 'Business Buy Goods',
        segment: '/docs/apis/business-buy-goods',
        versions: ['v2', 'v3'],
    },
    {
        title: 'Bill Manager',
        segment: '/docs/apis/bill-manager',
        versions: ['v2', 'v3'],
    },
    {
        title: 'B2B Express CheckOut',
        segment: '/docs/apis/b2b-express-checkout',
        versions: ['v2', 'v3'],
    },
    {
        title: 'Pull Transactions',
        segment: '/docs/apis/pull-transactions',
        versions: ['v3'],
    },
    {
        title: 'Business To Pochi',
        segment: '/docs/apis/b2p',
        versions: ['v3'],
    },
    {
        title: 'Swap',
        segment: '/docs/apis/swap',
        versions: ['v3'],
    },
    {
        title: 'IMSI',
        segment: '/docs/apis/imsi',
        versions: ['v3'],
    },
    {
        title: 'B2C Account Top Up',
        segment: '/docs/apis/b2c-account-top-up',
        versions: ['v2', 'v3'],
    },
    {
        title: 'M-Pesa Ratiba',
        segment: '/docs/apis/mpesa-ratiba',
        versions: ['v2', 'v3'],
    },
    {
        title: 'IoT SIM Managament',
        segment: '/docs/apis/iot-sim-management',
        versions: ['v3'],
    },
    {
        title: 'Community',
    },
    {
        title: 'Contribution Guide',
        segment: '/docs/contribution-guide',
        versions: ['v2', 'v3'],
    },
];
