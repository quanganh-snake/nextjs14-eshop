'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCartContext } from '../hooks/useCartContext';
import Cart from './Cart';

export const Header = () => {
    const { user } = useUser();
    const [isLogin, setIsLogin] = useState('');
    const pathname = usePathname();
    const [visiableCart, setVisiableCart] = useState(false);
    const { cartItems } = useCartContext();

    useEffect(() => {
        setIsLogin(pathname.includes('sign-in'));
    }, [pathname]);

    return (
        !isLogin && (
            <>
                <header className="fixed right-0 left-0 w-full z-40 bg-white shadow-lg">
                    <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                        <a className="block text-teal-600" href="#">
                            <Image src="/logo.svg" alt="logo" width={90} height={100} />
                        </a>

                        <div className="flex flex-1 items-center justify-end md:justify-between">
                            <nav aria-label="Global" className="hidden md:block">
                                <ul className="flex items-center gap-6 text-sm">
                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            {' '}
                                            Home{' '}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            {' '}
                                            Explore{' '}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            {' '}
                                            Projects{' '}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            {' '}
                                            About Us{' '}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            {' '}
                                            Contact Us{' '}
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            {' '}
                                            Blog{' '}
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                            <div className="flex items-center gap-4">
                                {!user ? (
                                    <div className="sm:flex sm:gap-4">
                                        <Link
                                            className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-70"
                                            href="/sign-in"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-teal-600/75 sm:block"
                                            href="/sign-up"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-6">
                                        <div
                                            onClick={() => {
                                                setVisiableCart(!visiableCart);
                                            }}
                                            className="relative cursor-pointer hover:opacity-70"
                                        >
                                            <ShoppingCart />
                                            <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-center rounded-full text-white text-xs">
                                                {cartItems?.length}
                                            </span>
                                        </div>
                                        <UserButton />
                                    </div>
                                )}

                                <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                                    <span className="sr-only">Toggle menu</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                <Cart visiable={visiableCart} onShow={setVisiableCart} />
            </>
        )
    );
};
