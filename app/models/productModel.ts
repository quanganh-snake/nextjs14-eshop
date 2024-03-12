export interface IProduct {
    id: number | string;
    attributes: {
        title: string;
        category: string;
        desc: string;
        thumbnail: {
            data: {
                id: number;
                attributes: {
                    name: string;
                    alternativeText?: string;
                    caption?: string;
                    url: string;
                }
            }
        };
        pricing: number
    }
}