'use client';

import { useEffect, useState } from 'react';
import { productApi } from '@/apis';
import { ProductList } from './ProductList';
import { IProduct } from '@/models';

interface IProductSection {
    title: string;
}

export const ProductSection = (props: IProductSection) => {
    const { title } = props;

    const [productList, setProductList] = useState<IProduct[]>([]);

    useEffect(() => {
        getLatestProducts();
    }, []);

    const getLatestProducts = () => {
        productApi.getLatestProducts().then((response) => {
            setProductList(response.data.data);
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-lg md:text-2xl lg:text-4xl font-bold mb-4 md:mb-10">{title}</h2>
            {productList.length > 0 ? (
                <ProductList productList={productList} />
            ) : (
                "List products isn't available yet!"
            )}
        </div>
    );
};
