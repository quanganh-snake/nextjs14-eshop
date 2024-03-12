import { IProduct } from '@/models';
import { ChevronRightSquare } from 'lucide-react';
import Image from 'next/image';

export const ProductItem = (props: IProduct) => {
    const { id, attributes } = props;
    return (
        <div className="h-full bg-gray-100 rounded-lg shadow-md hover:shadow-lg hover:opacity-70">
            <Image
                src={attributes.thumbnail?.data.attributes.url}
                width={400}
                height={350}
                alt={attributes.title}
                className="rounded-t-lg h-[160px] object-cover cursor-pointer"
            />
            <div className="p-3 flex flex-col justify-between">
                <h2 className="text-sm md:text-lg font-semibold line-clamp-1 mb-2 cursor-pointer">
                    {attributes.title}
                </h2>
                {attributes.category && (
                    <h3 className="text-xs font-semibold text-muted flex items-center gap-2 mb-2 cursor-pointer">
                        <ChevronRightSquare className="h-4 w-4" />
                        {attributes.category}
                    </h3>
                )}
                <h2 className="text-sm md:text-lg font-bold">
                    {attributes.pricing.toLocaleString()}
                    <sup>đ</sup>
                </h2>
            </div>
        </div>
    );
};
