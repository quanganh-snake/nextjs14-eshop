import { IProduct } from '@/models';
import { ProductItem } from './ProductItem';

interface IProductList {
    productList: IProduct[] | null;
}

export function ProductList(props: IProductList) {
    const { productList } = props;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productList?.map((item, index) => {
                return (
                    <>
                        {index <= 6 && (
                            <div className="" key={index}>
                                <ProductItem {...item} />
                            </div>
                        )}
                    </>
                );
            })}
        </div>
    );
}
