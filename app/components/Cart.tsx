'use client';

import { X } from 'lucide-react';
import { useCartContext } from '../hooks/useCartContext';
import clsx from 'clsx';
import { useEffect } from 'react';

interface ICart {
    visiable: boolean;
    onShow: (value: boolean) => void;
}

export default function Cart({ visiable, onShow }: ICart) {
    const { cartItems } = useCartContext();

    useEffect(() => {
    }, [cartItems]);

    if (visiable) {
        return (
            <div
                className={clsx(
                    'fixed top-0 right-0 bottom-0 z-50 w-full md:w-[500px] h-full bg-gray-200/80 shadow-lg ',
                    visiable
                        ? 'animate__animated animate__fadeInRight'
                        : 'animate__animated animate__fadeInLeft',
                )}
            >
                <div className="cart-heading relative p-2 h-16 bg-primary flex items-center justify-center">
                    <h1 className="text-center text-xl font-bold text-white uppercase">Carts</h1>
                    <div className="absolute top-4 right-4">
                        <X
                            onClick={() => {
                                onShow(false);
                            }}
                            className="text-white cursor-pointer hover:text-red-400 hover:opacity-80"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 p-6">
                    {cartItems.length > 0 ? (
                        cartItems?.map((p, index) => (
                            <div
                                className="flex items-center gap-2 p-2 bg-white shadow-lg rounded-xl cursor-pointer"
                                key={index}
                            >
                                <img
                                    src={p?.product.attributes.thumbnail?.data.attributes.url}
                                    alt={p?.product.attributes.title}
                                    className="w-16 h-16 object-cover rounded-lg shadow-lg"
                                />
                                <div className="">
                                    <p className="line-clamp-1">{p?.product.attributes.title}</p>
                                    <p className="text-sm font-bold text-red-500">
                                        {p?.product.attributes.pricing?.toLocaleString()}
                                        <sup>đ</sup>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Chưa có sản phẩm nào!</p>
                    )}
                </div>
            </div>
        );
    }
}
