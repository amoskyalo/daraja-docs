export const NAVTABS = [
    {
        parent: 'documentation',
        items: [
            {
                segment: '/documentation/introduction',
                title: 'Introduction',
            },
            {
                segment: '/documentation/terminologies',
                title: 'Terminologies',
            },
            {
                segment: '/documentation/development-setup',
                title: 'Development Setup',
            },
            {
                segment: '/documentation/going-live-and-certificates',
                title: 'Going Live & Certificates',
            },
            {
                segment: '/documentation/faqs',
                title: 'FAQs',
            }
        ],
    },
    {
        parent: 'apis',
        items: [
            {
                title: 'Authorization',
                segment: '/apis/authorization',
            },
            {
                title: 'Dynamic QR',
                segment: '/apis/dynamic-qr',
            },
            {
                title: 'M-Pesa Express',
                segment: '/apis/mpesa-express',
            },
            {
                title: 'Customer To Business (C2B)',
                segment: '/apis/c2b',
            },
            {
                title: 'Business To Customer (B2C)',
                segment: '/apis/b2c',
            },
            {
                title: 'Transaction Status',
                segment: '/apis/transaction-status',
            },
            {
                title: 'Account Balance',
                segment: '/apis/account-balance',
            },
            {
                title: 'Reversals',
                segment: '/apis/reversals',
            },
            {
                title: 'Tax Remittance',
                segment: '/apis/tax-remittance',
            },
            {
                title: 'Business Pay Bill',
                segment: '/apis/business-pay-bill',
            },
            {
                title: 'Business Buy Goods',
                segment: '/apis/business-buy-goods',
            },
            {
                title: 'Bill Manager',
                segment: '/apis/bill-manager',
            },
            {
                title: 'B2B Express CheckOut',
                segment: '/apis/b2b-express-checkout',
            },
            {
                title: 'B2C Account Top Up',
                segment: '/apis/b2c-account-top-up',
            },
            {
                title: 'M-Pesa Ratiba',
                segment: '/apis/mpesa-ratiba',
            },
        ],
    },
];

export const HEADERTABS = [
    { label: 'APIs', href: '/apis/authorization' },
    { label: 'Documentation', href: '/documentation/introduction' },
    { label: 'My Apps', href: '/my-apps' },
    { label: 'Mini Apps', href: '/mini-apps' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'GitHub', href: '/github' },
    // { label: 'FAQs', href: '/faqs' },
];
