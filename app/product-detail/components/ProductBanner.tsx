import Image from 'next/image';

interface IProductBanner {
    thumbnailUrl?: string;
}

export const ProductBanner = ({ thumbnailUrl }: IProductBanner) => {
    if (!thumbnailUrl) {
        return (
            <Image
                src={'/no-image.png'}
                width={400}
                height={400}
                alt="no image"
                className="rounded-lg h-[280px] object-cover w-full shadow-lg"
            />
        );
    }

    return (
        <div className="w-full">
            <Image
                src={thumbnailUrl}
                width={400}
                height={400}
                alt="detail product"
                className="rounded-lg object-cover w-full shadow-lg"
            />
        </div>
    );
};
