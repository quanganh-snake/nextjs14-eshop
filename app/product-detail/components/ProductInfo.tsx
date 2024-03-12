'use client';

import { cartApi } from '@/app/apis/cartApi';
import { useCartContext } from '@/app/hooks/useCartContext';
import { IProduct } from '@/app/models';
import { useUser } from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';
export const ProductInfo = ({ product }: any) => {
    const { user } = useUser();
    const router = useRouter();
    const { cartItems, addToCart } = useCartContext();

    const handleAddToCart = () => {
        if (!user) {
            router.push('/sign-in');
            return;
        } else {
            const data = {
                data: {
                    userName: user.fullName,
                    email: user.primaryEmailAddress?.emailAddress,
                    products: [product?.id],
                },
            };

            addToCart({
                id: product.id,
                product: product,
            });

            cartApi.addToCart(data).then(
                (res) => {
                    if (res.status === 200) {
                        return toast.success('Đã thêm sản phẩm vào giỏ hàng!');
                    }

                    return toast.error('Đã có lỗi xảy ra!');
                },
                (error) => {
                    console.log('Error: ', error);
                },
            );
        }
    };

    if (!product) {
        return (
            <>
                <Skeleton height={30} className="mb-4" />
                <Skeleton height={20} width={200} className="mb-4" />
                <Skeleton height={20} className="mb-4" />
                <Skeleton height={40} width={200} className="mb-4" />
                <Skeleton height={50} width={260} className="mb-4" />
            </>
        );
    }

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-2">{product?.attributes.title}</h2>
            {product?.attributes?.category && (
                <h3 className="text-gray-400 font-semibold mb-2">
                    {product?.attributes?.category}
                </h3>
            )}
            {product?.attributes?.desc && (
                <p className="mb-2">{product?.attributes?.desc[0]?.children[0].text}</p>
            )}
            <p className="text-3xl font-bold text-primary mb-2">
                {product?.attributes.pricing.toLocaleString()}
                <sup>đ</sup>
            </p>
            <button
                type="button"
                onClick={handleAddToCart}
                className="bg-primary px-10 py-3 rounded-2xl text-white hover:opacity-70 flex items-center gap-2 shadow-sm"
            >
                <ShoppingCart />
                Add to cart
            </button>
        </div>
    );
};
