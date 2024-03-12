'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useCartContext } from '../hooks/useCartContext';
import { cartApi } from '../apis/cartApi';
import { toast } from 'react-toastify';

export default function Cart() {
    const { user } = useUser();
    const { cartItems, setCartItems } = useCartContext();

    const totalPrice = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.product.attributes.pricing, 0);
    }, [cartItems]);

    const getCartItems = () => {
        let listProducts = [];
        cartApi
            .getDataCartByUser(user?.primaryEmailAddress?.emailAddress.toString())
            .then(async (res) => {
                listProducts = await res.data.data;
                setCartItems([]);
                if (listProducts) {
                    listProducts?.forEach((p: any) => {
                        setCartItems([
                            ...cartItems,
                            {
                                id: p.id,
                                product: p.attributes.products.data[0],
                            },
                        ]);
                    });
                }
            });
    };

    const handleDeleteCartItem = (id: string | number) => {
        cartApi.delCartItem(id).then((res) => {
            if (res.status === 200) {
                getCartItems();
                toast.success('Xoá sản phẩm thành công!');
                return;
            }
        });
    };
    useEffect(() => {}, [cartItems]);

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
                    </header>

                    <div className="mt-8">
                        <ul className="space-y-4">
                            {cartItems.length > 0 &&
                                cartItems.map((p, index) => (
                                    <li className="flex items-center gap-4" key={index}>
                                        <img
                                            src={p.product.attributes.thumbnail.data.attributes.url}
                                            alt={p.product.attributes.title}
                                            className="w-24 h-24 rounded object-cover"
                                        />
                                        <div>
                                            <h3 className="text-sm sm:text-md lg:text-xl text-gray-900">
                                                {p.product.attributes.title}
                                            </h3>

                                            <dl className="mt-0.5 space-y-px text-sm sm:text-lg text-gray-600">
                                                <div>
                                                    <dt className="inline">Category: </dt>
                                                    <dd className="inline font-semibold">
                                                        {p.product.attributes.category}
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                        <div className="flex flex-1 items-center justify-end gap-2">
                                            <p className="inline font-semibold text-primary">
                                                {p.product.attributes.pricing.toLocaleString()}
                                                <sup>đ</sup>
                                            </p>
                                            <button
                                                onClick={() => {
                                                    handleDeleteCartItem(p.id);
                                                }}
                                                className="text-gray-600 transition hover:text-red-600"
                                            >
                                                <span className="sr-only">Remove item</span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                        </ul>

                        <div className="mt-8 flex justify-end border-t border-gray-100 p-4 rounded-lg bg-gray-200">
                            <div className="w-screen max-w-lg space-y-4">
                                <dl className="space-y-0.5 text-sm text-gray-700">
                                    <div className="flex justify-between font-bold text-xl">
                                        <dt>Total</dt>
                                        <dd className="text-red-600">
                                            {totalPrice.toLocaleString()} <sup>đ</sup>
                                        </dd>
                                    </div>
                                </dl>

                                <div className="hidden justify-end">
                                    <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="-ms-1 me-1.5 h-4 w-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                                            />
                                        </svg>

                                        <p className="whitespace-nowrap text-xs">
                                            2 Discounts Applied
                                        </p>
                                    </span>
                                </div>

                                <div className="flex justify-end">
                                    <a
                                        href="#"
                                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                    >
                                        Checkout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
