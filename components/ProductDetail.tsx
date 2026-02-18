import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
    product: Product;
    onBack: () => void;
    onToggleLike: (id: string) => void;
    onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onToggleLike, onAddToCart }) => {
    const [addedToBag, setAddedToBag] = useState(false);

    const handleBuy = () => {
        setAddedToBag(true);
        onAddToCart(product);
        setTimeout(() => setAddedToBag(false), 2000);
    };

    return (
        <div className="relative flex flex-col w-full min-h-screen bg-background-dark shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 pt-6 bg-gradient-to-b from-black/60 to-transparent">
                <button onClick={onBack} className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-primary hover:text-black transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button 
                    onClick={() => onToggleLike(product.id)}
                    className={`flex items-center justify-center w-12 h-12 backdrop-blur-md rounded-full transition-colors ${product.likes ? 'bg-white text-red-500' : 'bg-white/10 text-white hover:bg-primary hover:text-black'}`}
                >
                    <span className={`material-symbols-outlined ${product.likes ? 'filled' : ''}`}>favorite</span>
                </button>
            </header>

            {/* Product Carousel */}
            <div className="relative w-full h-[500px] shrink-0 bg-[#0f1a0c]">
                <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar">
                    {/* Image 1 */}
                    <div className="w-full h-full shrink-0 snap-center relative">
                        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url('${product.image}')`}}></div>
                        {/* Noise overlay */}
                        <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-grain mix-blend-overlay"></div>
                    </div>
                     {/* Image 2 (Placeholder duplicate for demo) */}
                    <div className="w-full h-full shrink-0 snap-center relative">
                         <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGyp5kbm-vyoE8dy6lYBQTsZprxOjtpO3xilsrluT_rO6lxmVC-IeFLPAv6p9Pk90kknDIzHymboQoX8aFHnJGeAcsQLNsp1S0SrWiqc5qylsNaBxUuFD-mmDTs78dZp2ZQUAREmNtISReBDA_N4pwIqmmHt8iu_SJsl1i_HBdPbAZgEZOzcU5GKTVG77tpKCXfaEGwu7jZAYjXPYIm1cZqvWOUT9wyVLt3rbQGOmbEXuLy5XDBITMAtMz1FrFC9VsqgHeIdVzLXQ')"}}></div>
                    </div>
                </div>
                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-glow"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
                </div>
                {/* Drip SVG */}
                <div className="absolute -bottom-1 left-0 right-0 text-background-dark">
                    <svg className="w-full h-16 fill-current transform scale-150 origin-bottom" viewBox="0 0 1440 320">
                        <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fillOpacity="1"></path>
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-5 pb-32 -mt-4 relative z-10">
                <div className="flex justify-between items-start gap-4 mb-6">
                    <div className="flex-1">
                        <h1 className="text-white text-3xl font-bold leading-tight tracking-tight font-display mb-1">{product.title}</h1>
                        <p className="text-white/60 text-sm font-medium tracking-wide uppercase">Rare Find • 1994</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-primary font-cooper text-3xl drop-shadow-sm">${product.price}</span>
                        <span className="text-xs text-white/40 line-through decoration-primary decoration-2">${Math.round(product.price * 1.5)}</span>
                    </div>
                </div>

                {/* Seller Badge */}
                <div className="flex items-center gap-4 mb-8 p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                    <div className="relative shrink-0 w-16 h-16 flex items-center justify-center">
                        <svg className="absolute w-full h-full text-primary fill-current animate-spin-slow" viewBox="0 0 200 200">
                             <path d="M100,10 L115,40 L145,35 L145,65 L175,75 L160,105 L180,130 L150,145 L150,175 L120,165 L100,190 L80,165 L50,175 L50,145 L20,130 L40,105 L25,75 L55,65 L55,35 L85,40 Z"></path>
                        </svg>
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-black relative z-10 bg-gray-800">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6YVdZh8SrODN7wFUcdOHEqvsxwReAk4bHLy2WyCHBR12q2t_Zp6hmvPjmdCC170tnxcVRjv5WZgrGyjYMTG6YMJUQJjS4-8TyHP6U4QO7nW5c3Ma_MLQ-274oHrdKVL6HUstAJISyO8zqaiJ2bjaSm2aZFUqFEeEnZh_TN4awx80WGMP9VMOHJ0pSQujvMP01wduBBkOe5j1MNLChK6ArORzdOQ-xnkqL2dEvrFVsc6FNehGfOOC7qzJ4Oa2bvCKKquYLUAGdPfY" alt="Seller" className="w-full h-full object-cover"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <span className="text-white font-bold text-lg">@ThriftLord</span>
                            <span className="material-symbols-outlined text-primary text-[16px] filled">verified</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/60 text-sm">
                            <span className="material-symbols-outlined text-yellow-400 text-[14px] filled">star</span>
                            <span>4.9 (124 sales)</span>
                        </div>
                    </div>
                </div>

                {/* Specs */}
                <div className="mb-8 relative">
                     {/* Mascot Hint */}
                    <div className="absolute -top-12 right-0 w-24 h-24 pointer-events-none opacity-80">
                         <svg className="transform rotate-12" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30 80 C 10 70, 10 30, 40 20 C 60 15, 80 25, 80 50 C 80 80, 50 90, 30 80" fill="#46ec13" stroke="white" strokeWidth="2"></path>
                            <circle cx="35" cy="40" fill="black" r="5"></circle>
                            <circle cx="65" cy="35" fill="black" r="5"></circle>
                            <path d="M35 55 Q 50 65 65 50" stroke="black" strokeLinecap="round" strokeWidth="3"></path>
                        </svg>
                    </div>
                    <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">The Specs</h3>
                    <div className="flex flex-wrap items-start gap-4">
                        <div className="bg-white text-black px-4 py-2 rounded-2xl font-bold text-sm transform -rotate-2 shadow-paper border-2 border-black">
                            Size: {product.size.split('•')[0]}
                        </div>
                        {product.condition && (
                            <div className="bg-white text-black px-4 py-2 rounded-2xl font-bold text-sm transform rotate-1 shadow-paper border-2 border-black">
                                {product.condition}
                            </div>
                        )}
                        {product.category && (
                            <div className="bg-white text-black px-4 py-2 rounded-2xl font-bold text-sm transform -rotate-1 shadow-paper border-2 border-black">
                                {product.category}
                            </div>
                        )}
                        {!product.category && (
                            <div className="bg-white text-black px-4 py-2 rounded-2xl font-bold text-sm transform -rotate-1 shadow-paper border-2 border-black">
                                100% Cotton
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <p className="text-gray-300 leading-relaxed font-medium">
                        {product.description || 'Straight from the 90s vault. This piece features a heavy-weight cotton build with the classic cracked print aesthetic. No stains, just pure vintage vibes. Washed and ready to wear.'}
                    </p>
                </div>
            </div>

            {/* Sticky Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-30">
                <button onClick={handleBuy} className={`group relative w-full h-16 rounded-full flex items-center justify-center overflow-hidden transition-all active:scale-95 shadow-glow hover:shadow-[0_0_30px_rgba(70,236,19,0.5)] ${addedToBag ? 'bg-white' : 'bg-primary'}`}>
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
                     <div className="flex items-center gap-3 relative z-10">
                        <span className={`font-cooper text-2xl tracking-wide uppercase group-hover:tracking-wider transition-all ${addedToBag ? 'text-black' : 'text-black'}`}>
                            {addedToBag ? 'ADDED TO BAG!' : 'GRAB IT!'}
                        </span>
                        <span className={`material-symbols-outlined font-bold text-2xl group-hover:rotate-12 transition-transform ${addedToBag ? 'text-black' : 'text-black'}`}>
                            {addedToBag ? 'check_circle' : 'shopping_bag'}
                        </span>
                     </div>
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
