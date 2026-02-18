export type ViewState = 'onboarding' | 'feed' | 'product-detail' | 'upload' | 'profile' | 'cart';

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
    category?: string;
    condition?: string;
}
