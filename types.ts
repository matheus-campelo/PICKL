export type ViewState = 'onboarding' | 'feed' | 'product-detail' | 'upload' | 'profile';

export interface Product {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    size: string;
    brand: string;
    description?: string;
    likes?: boolean;
}
