import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Onboarding from './components/Onboarding';
import Feed from './components/Feed';
import ProductDetail from './components/ProductDetail';
import UploadFlow from './components/UploadFlow';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';
import Cart from './components/Cart';
import { ViewState, Product } from './types';

// Initial Mock Data
const INITIAL_PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Vintage Nike Windbreaker',
        price: 80,
        size: 'L • 90s Original',
        brand: 'Nike',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNv-fjDOC24o6ViAHCh71FYjADAkfeXfbXA9P9vWEOThl_7L4WEZ_kF67JjOhWzaXYgKKZeHLGJ-y5ysmRjXZfpbUMymhhFEgQ26_Oi9k1BuXeTWsxh5WoMXIi44UwvB6R_3TY8f2MhN5Qv3Zf1IzH1db-0VZRRXGY8estL8Ea6905U804eaBIVuXlckxwLXr7Qsmp0taocorQ6FBzI885r2t8JDoWwEHE5YZ6MlfMruaRCsPiWHTwfGGRSCgj1VkXlUnyI9u3MsM',
        likes: false,
        description: 'Iconic 90s colorblocking. Lightweight, water-resistant, and perfect for layering. Minor wear on the cuffs adds character.',
        category: 'Outerwear',
        condition: 'Vintage'
    },
    {
        id: '2',
        title: 'Stussy Tee 1990',
        price: 45,
        size: 'M • Rare',
        brand: 'Stussy',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB7LN09aY3Yhcykf_EtsPm-EbFxrm9gNxeCfbxcpgQ5aWQC3YjAIDF-bjG37pTr36bz13jWESgwZaBEhkH7T2YfUB_73wqMaLSc9_U9gPpMv5Ml86qn3bRD_tC-KnutBeODXgdcCGz39MrOnYjwoc2mtB8jjPOG-M_dN2I3mtTVTB58UPQJg1nxFZK7I9MWVfkVzRJnRvAEt4R5GgpUOd-1tfWs-I_nbPpsh0XFSO4rbPQKKDHEwaQ-HEZSh7qzLB8WAaTep8ZP2w',
        likes: true,
        description: 'Single stitch vintage Stussy. The graphic is still popping despite the age. A true collector piece for streetwear historians.',
        category: 'T-Shirts',
        condition: 'Rare'
    },
    {
        id: '3',
        title: 'Supreme Hoodie',
        price: 120,
        size: 'XL • Mint',
        brand: 'Supreme',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW-EbsU3TDQN9borlFs2okDQi9atzhhuBrBgIXhcIK6rzS07xJ3WhijeMOJgSkUMjMhi7UPd63WF_kR1kpy0L_Avlq3afk36e61AdE6sB76oUlTRDsr9kWWsuYKRwY1a3-Q_Is4WlQ4CsLwZOtzsujViEggRI-vju4m3KjmtEMIoU3dHu9QJU045y2rVMDNhZ4EdWOvga1eUcVmam8sA1K4N8cfnaPklPhgGqQxURhS4xow11uqLhu2ji29Oo6QYEMl2ZUchbxZSw',
        likes: false,
        description: 'Heavyweight cotton fleece. Box logo is pristine. This is from the FW18 drop. kept in storage, barely worn.',
        category: 'Outerwear',
        condition: 'Mint'
    },
    {
        id: '4',
        title: 'Bape Camo Jacket',
        price: 200,
        size: 'S • Japan Import',
        brand: 'Bape',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU07ZZRQuZ9c8CStr2UYJjUs8EyF-GQffSe8fVRr8V2NP6rIGbWFc01_k-VASGXrAd1bFebM4hlSFTGVHQ221W8EWbZHm6TbwZArIrEAEGXih6Itwd51ZF5EZNguHLe37gq-kPgMSsi-Fb1vu48SFjdIYyWQTmT508VibUfDnYXB6gkjn8hpvLZEoCGM3NzbDyl892Ynxt9mp51NudHDC0rq8u8cNAN5Ehg6ty_D6sZRp3H9U4-CY57ivgCmocEKITiMfJhhYT8z4',
        likes: true,
        description: 'Direct from Shibuya. The classic 1st Camo pattern. Full zip shark hood functionality. 100% authentic.',
        category: 'Outerwear',
        condition: 'New'
    },
    {
        id: '5',
        title: 'Off-White Tee',
        price: 55,
        size: 'L • 2019',
        brand: 'Off-White',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjxx_CEckk5VRrrl6r13xKoonaWHyENCWo7y2Al3Of7Tp7Dw3-jt6rBwhhf5G5iux59-T21Iu699OWRK97wE2OkaekFgUJEll_1ktpR5M94V9aPKVryVGbhPClsp49SfiU8rkYJ-Ml8HIPB-xwNA-9TzNgu1i78OWg4w_XBdlRvOrEAPJCoceBzXT7IEB1m4W_KMCFeXsFTbkbiS7YabpNqi_L0g6-7fC50o8GoonYPJlF6L6rmoSm4K5yU8_GtCb5W660zycOV_I',
        likes: false,
        description: 'Virgil Abloh era design. Industrial belt print on the back. Slightly oversized fit as intended.',
        category: 'T-Shirts',
        condition: 'Used'
    },
     {
        id: '6',
        title: 'Levis Trucker 1980',
        price: 110,
        size: 'M • Vintage',
        brand: 'Levis',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxuy6TzeDpQcI9EY6NtXs_JJWSQJj74GzXoaW7zQMcLOp0-_foFTrM04woezkBoKw2DHUTXQ-z-bKjKoo4zjGohySAURyeDihZL3PQWUsZUkMd426Nc4sSjiBf_-_I1nnFKU55Z-BwhJolD_pffUbp65wxLT4eBsDWLvimu7ChXK6L2aMipB7FiHH2WSm7fW7iPeclazNV2YIUrYiAS5YPg9CbnzjhAM6GMh98Y6IysacGLhcTMl-LziiBUMXPuxLX-J4DGW2ptZY',
        likes: false,
        description: 'Beautifully faded acid wash denim. Made in USA. Type III Trucker jacket with copper buttons.',
        category: 'Outerwear',
        condition: 'Vintage'
    },
];

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewState>('onboarding');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [cart, setCart] = useState<Product[]>([]);

    // Mock navigation
    const navigateTo = (view: ViewState) => {
        window.scrollTo(0,0);
        setCurrentView(view);
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        navigateTo('product-detail');
    };

    const handleToggleLike = (productId: string) => {
        setProducts(prev => prev.map(p => 
            p.id === productId ? { ...p, likes: !p.likes } : p
        ));
        
        // Also update selected product if it's currently open
        if (selectedProduct && selectedProduct.id === productId) {
            setSelectedProduct(prev => prev ? { ...prev, likes: !prev.likes } : null);
        }
    };

    const handleAddToCart = (product: Product) => {
        setCart(prev => {
            if (prev.find(item => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const handleRemoveFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const handleNewListing = (newProduct: Product) => {
        setProducts(prev => [newProduct, ...prev]);
    };

    const viewVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="w-full max-w-md mx-auto min-h-screen relative bg-black shadow-2xl overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentView}
                    variants={viewVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-1 flex flex-col"
                >
                    {currentView === 'onboarding' && (
                        <Onboarding onStart={() => navigateTo('feed')} />
                    )}

                    {currentView === 'feed' && (
                        <Feed 
                            products={products}
                            onProductClick={handleProductClick} 
                            onUploadClick={() => navigateTo('upload')} 
                            onToggleLike={handleToggleLike}
                        />
                    )}

                    {currentView === 'product-detail' && selectedProduct && (
                        <ProductDetail 
                            product={selectedProduct} 
                            onBack={() => navigateTo('feed')} 
                            onToggleLike={handleToggleLike}
                            onAddToCart={handleAddToCart}
                        />
                    )}

                    {currentView === 'upload' && (
                        <UploadFlow 
                            onBack={() => navigateTo('feed')}
                            onComplete={(product) => {
                                if(product) handleNewListing(product);
                                navigateTo('feed');
                            }}
                        />
                    )}

                    {currentView === 'profile' && (
                        <Profile 
                            onBack={() => navigateTo('feed')} 
                            likedProducts={products.filter(p => p.likes)}
                        />
                    )}

                    {currentView === 'cart' && (
                        <Cart 
                            items={cart}
                            onBack={() => navigateTo('feed')}
                            onRemove={handleRemoveFromCart}
                            onCheckout={() => {
                                alert("Checkout simulated! Your drip is on the way.");
                                setCart([]);
                                navigateTo('feed');
                            }}
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            <BottomNav 
                currentView={currentView} 
                onChangeView={navigateTo} 
                cartCount={cart.length}
            />
        </div>
    );
};

export default App;
