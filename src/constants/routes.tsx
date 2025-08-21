import { Navigation } from '@toolpad/core/AppProvider';
import { AppWindow, Webhook, Codesandbox, MessageCircleQuestionMark } from 'lucide-react';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main',
    },
    {
        segment: 'dashboard/my-apps',
        title: 'My Apps',
        icon: <AppWindow size={22} />,
    },
    {
        segment: 'dashboard/apis',
        title: 'APIs',
        pattern: 'dashboard/apis{/:name}*',
        icon: <Webhook size={24} />,
    },
    {
        segment: 'dashboard/mini-apps',
        title: 'Mini Apps',
        pattern: 'dashboard/mini-apps',
        icon: <Codesandbox size={22} />,
    },
    {
        segment: 'dashboard/self-service',
        title: 'Self Service',
        pattern: 'dashboard/self-service',
        icon: <MessageCircleQuestionMark size={22} />,
    },
    {
        kind: 'header',
        title: 'Documentation',
    },
    {
        segment: 'documentation/introduction',
        title: 'Introduction',
    },
    {
        segment: 'documentation/terminologies',
        title: 'Terminologies',
    },
    {
        segment: 'documentation/development-setup',
        title: 'Development Setup',
    },
    {
        segment: 'documentation/going-live-and-certificates',
        title: 'Going Live & Certificates',
    },
    {
        kind: 'header',
        title: 'Resources',
    },
    {
        segment: 'resources/going-live-and-certificates',
        title: 'Blogs',
    },
    {
        segment: 'resources/community-projects',
        title: 'Community Projects',
    },
];

export default NAVIGATION;
