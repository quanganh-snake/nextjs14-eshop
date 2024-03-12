'use client';
import { productApi } from '@/apis';
import Breadcrumb from '@/app/components/Breadcrum';
import { IProduct } from '@/app/models';
import { useEffect, useState } from 'react';
import { ProductBanner, ProductInfo } from '../components';
import { ProductList } from '@/app/components/ProductList';

export default function ProductDetail(props: any) {
    const { params } = props;

    const [productDetail, setProductDetail] = useState<IProduct | null>(null);
    const [productCartegoryList, setProductCartoryList] = useState<IProduct[]>([]);

    const getDataProductById = () => [
        productApi.getProductbyId(params?.id).then((res) => {
            const dataProduct = res.data.data;
            setProductDetail(dataProduct);
            getProductByCategory(dataProduct?.attributes.category);
        }),
    ];

    const getProductByCategory = (category: string) => {
        productApi.getProductByCategory(category).then((res) => {
            const dataCategories = res.data.data;
            setProductCartoryList(dataCategories);
        });
    };

    useEffect(() => {
        if (params?.id) {
            getDataProductById();
        }
    }, [params?.id]);

    return (
        <div className="mx-auto py-12 h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <Breadcrumb />
            <div className="grid grid-cols-5 gap-4 lg:gap-10 my-10">
                <div className="col-span-5 sm:col-span-2">
                    <ProductBanner
                        thumbnailUrl={productDetail?.attributes?.thumbnail.data.attributes.url}
                    />
                </div>
                <div className="col-span-5 sm:col-span-3">
                    <ProductInfo product={productDetail} />
                </div>
            </div>

            {productCartegoryList.length > 0 && (
                <div className="my-10">
                    <h2 className="text-4xl font-bold py-2 px-4 bg-primary/60 shadow-md text-white mb-4 rounded-lg">
                        Sản phẩm tương tự
                    </h2>
                    <ProductList productList={productCartegoryList} />
                </div>
            )}
        </div>
    );
}
