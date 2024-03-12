'use client';

import { X } from 'lucide-react';
import { useCartContext } from '../hooks/useCartContext';

export default function Cart() {
    const { cartItems } = useCartContext();

    return (
        <div className="absolute top-0 right-0 z-50 w-[500px] h-screen bg-gray-200/80">
            <div className="cart-heading relative p-2 bg-primary">
                <h1 className="text-center text-xl font-bold text-white uppercase">Carts</h1>
                <div className="absolute top-2 right-4">
                    <X className="text-white cursor-pointer hover:text-red-400 hover:opacity-80" />
                </div>
            </div>
            <div className="flex flex-col gap-y-6 p-6">
                {cartItems.length > 0 ? (
                    cartItems?.map((p, index) => (
                        <div className="" key={index}>
                            <div className="">
                                <p className="line-clamp-2">
                                    {p?.attributes?.products.data[0].attributes.title}
                                </p>
                                <p className="text-sm font-bold text-red-500">
                                    {p?.attributes?.products.data[0].attributes.pricing?.toLocaleString()}
                                    <sup>đ</sup>
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Chưa có sản phẩm nào!</p>
                )}
            </div>
        </div>
    );
}
