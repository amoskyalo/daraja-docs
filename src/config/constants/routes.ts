import { BookOpenText, LayoutDashboard, Newspaper, List, Github } from 'lucide-react';

export const HEADERTABS = [
    { label: 'Docs', href: '/docs/introduction', icon: BookOpenText },
    { label: 'Dev Console', href: '/dev-console', icon: LayoutDashboard },
     { label: 'GitHub', href: '/github', icon: Github },
    { label: 'Blogs', href: '/blogs', icon: Newspaper },
    { label: 'Changelog', href: '/changelog', icon: List },
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
        title: "Community"
    },
    {
        title: 'Contribution Guide',
        segment: '/docs/contribution-guide',
        versions: ['v2', 'v3'],
    }
];
