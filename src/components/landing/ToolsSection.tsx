'use client';

import { Users, Building2, RefreshCw, Send, Shield, CreditCard } from 'lucide-react';

const toolsCards = [
    {
        id: 'c2b',
        title: 'Customer To Business (C2B)',
        description: 'Customers can pay to the Business/Merchant through their SasaPay PayBills and Till Numbers.',
        icon: Users,
    },
    {
        id: 'b2c',
        title: 'Business To Customer (B2C)',
        description: 'Business/Merchant can send money to Customers through SasaPay,MNOs and Banks.',
        icon: Building2,
    },
    {
        id: 'b2b',
        title: 'Business To Business (B2B)',
        description: 'Business/Merchant can send money to other SasaPay Businesses/Merchants Tills or PayBills.',
        icon: RefreshCw,
    },
    {
        id: 'p2p',
        title: 'Person To Person (P2P)',
        description:
            'Allows you to send money to almost anyone, anywhere using only their alias or a mobile number',
        icon: Send,
    },
    {
        id: 'agency',
        title: 'AGENCY',
        description:
            'SasaPay Agent means a company or person authorized to offer cash deposit and redemption services by Sasapay to SASAPAY Subscribers.',
        icon: Shield,
    },
    {
        id: 'merchants',
        title: 'Merchants',
        description:
            'Businesses can make Payment Collections from customers,send Payments to customers/users and make payments to other Businesses using SasaPay.',
        icon: CreditCard,
    },
];

export default function ToolsSection() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-6">
                    The Tools you need
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
                    Build world-leading services into your business, covering payments, data, fraud, identity,
                    loyalty, consulting and more.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {toolsCards.map((card) => {
                    const IconComponent = card.icon;
                    return (
                        <div
                            key={card.id}
                            className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-500/30 hover:-translate-y-2"
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-slate-700/50 dark:bg-slate-600/50 rounded-lg shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:bg-slate-600/50 dark:group-hover:bg-slate-500/50">
                                    <IconComponent
                                        size={24}
                                        className="text-slate-400 group-hover:text-white transition-colors duration-300"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white ml-4">
                                    {card.title}
                                </h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}