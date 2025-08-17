'use client';

import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative bg-slate-900 border-t border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800 to-transparent opacity-50"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4 mt-[-32]">
                        <Link href="/" className="ml-[-16]">
                            <Image
                                src="/images/logo-dark.png"
                                alt="logo"
                                width={170}
                                height={100}
                                priority
                                style={{ objectFit: 'cover' }}
                            />
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            Empowering businesses with secure, seamless payment solutions across Kenya and beyond.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">Services</h3>
                        <ul className="space-y-3 text-slate-400">
                            <li>
                                <Link href="#" className="hover:text-blue-400 transition-colors">
                                    Payment Collection
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-blue-400 transition-colors">
                                    Money Transfer
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-blue-400 transition-colors">
                                    API Integration
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-blue-400 transition-colors">
                                    Business Solutions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">Support</h3>
                        <ul className="space-y-3 text-slate-400">
                            <li>
                                <Link href="/docs/getting-started" className="hover:text-blue-400 transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/docs/getting-started"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    API Reference
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="hover:text-blue-400 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-white font-semibold text-lg">
                                Get connected with us on our social networks!
                            </h3>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="https://www.facebook.com/SasaPayKenya"
                                    className="w-12 h-12 bg-slate-800 hover:bg-blue-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label="Facebook"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Facebook size={20} />
                                </Link>
                                <Link
                                    href="https://x.com/SasaPayKenya"
                                    className="w-12 h-12 bg-slate-800 hover:bg-sky-500 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label="Twitter"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Twitter size={20} />
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/company/sasapay/"
                                    className="w-12 h-12 bg-slate-800 hover:bg-blue-700 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label="LinkedIn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Linkedin size={20} />
                                </Link>
                                <Link
                                    href="https://www.instagram.com/sasapaykenya/"
                                    className="w-12 h-12 bg-slate-800 hover:bg-pink-600 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label="Instagram"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Instagram size={20} />
                                </Link>
                            </div>
                        </div>

                        {/* <div className="space-y-3">
                            <h4 className="text-white font-medium">Stay Updated</h4>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                                />
                                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors font-medium">
                                    Subscribe
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-slate-400 text-sm">
                            © {new Date().getFullYear()} SasaPay. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm text-slate-400">
                            <Link href="#" className="hover:text-blue-400 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="hover:text-blue-400 transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="#" className="hover:text-blue-400 transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
