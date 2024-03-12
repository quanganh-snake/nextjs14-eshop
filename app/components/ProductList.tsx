import { IProduct } from '@/models';
import { ProductItem } from './ProductItem';
import { Fragment } from 'react';

interface IProductList {
    productList: IProduct[] | null;
}

export function ProductList(props: IProductList) {
    const { productList } = props;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productList?.map((item, index) => {
                return (
                    <Fragment key={index}>
                        {index <= 6 && (
                            <>
                                <ProductItem {...item} />
                            </>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
}
