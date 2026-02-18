import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface FeedProps {
    products: Product[];
    onProductClick: (product: Product) => void;
    onUploadClick: () => void;
    onToggleLike: (id: string) => void;
}

const CATEGORIES = ['All', 'Sneakers', 'Outerwear', 'Rare Finds', 'Accessories'];

const Feed: React.FC<FeedProps> = ({ products, onProductClick, onUploadClick, onToggleLike }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const TRENDING = ['Dunks', 'Vintage Nike', 'Stussy', 'Supreme', 'Bape'];

    // Filter logic: Matches Category AND Search Query
    const filteredProducts = useMemo(() => {
        let result = products;

        // 1. Filter by Search Query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.brand.toLowerCase().includes(query)
            );
        }

        // 2. Filter by Category
        if (activeFilter === 'All') return result;

        return result.filter(p => {
            const searchStr = `${p.title} ${p.brand} ${p.size} ${p.category}`.toLowerCase();
            
            if (activeFilter === 'Rare Finds') return p.price > 100 || p.condition === 'Rare';
            if (activeFilter === 'Sneakers') return searchStr.includes('nike') || searchStr.includes('dunk') || searchStr.includes('jordan') || p.category === 'Sneakers';
            if (activeFilter === 'Outerwear') return searchStr.includes('jacket') || searchStr.includes('hoodie') || searchStr.includes('trucker') || searchStr.includes('coat') || p.category === 'Outerwear';
            if (activeFilter === 'Accessories') return p.category === 'Accessories';
            
            return true;
        });
    }, [products, activeFilter, searchQuery]);

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-surface-dark pb-32">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-surface-dark/95 backdrop-blur-sm px-5 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-extrabold tracking-tighter text-primary drop-shadow-[2px_2px_0px_rgba(255,255,255,0.2)] italic transform -skew-x-6">
                        PICKL
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="group relative flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-white text-2xl group-hover:animate-bounce">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-acid-purple rounded-full border border-surface-dark animate-pulse"></span>
                    </button>
                    <div className="size-10 rounded-full overflow-hidden border border-primary/30">
                        <img src="https://picsum.photos/seed/user123/100/100" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                </div>
            </header>

            {/* Search & Filters Container */}
            <div className="sticky top-[73px] z-30 bg-surface-dark/95 backdrop-blur-sm border-b border-white/5 shadow-2xl">
                {/* Search Bar */}
                <div className="px-5 pt-4 pb-2">
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-primary transition-colors">search</span>
                        <input
                            type="text"
                            placeholder="Search brand, item..."
                            value={searchQuery}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-full py-3 pl-10 pr-4 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium"
                        />
                         {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Trending Suggestions (Visible when focused) */}
                <AnimatePresence>
                    {isSearchFocused && !searchQuery && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="px-5 py-3 flex flex-wrap gap-2 overflow-hidden"
                        >
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest w-full mb-1">Trending Now</span>
                            {TRENDING.map(tag => (
                                <button 
                                    key={tag}
                                    onClick={() => setSearchQuery(tag)}
                                    className="text-[10px] font-bold text-primary/80 border border-primary/20 px-2 py-1 rounded-md hover:bg-primary/10 transition-colors"
                                >
                                    #{tag.toUpperCase()}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Filters */}
                <div className="w-full overflow-x-auto no-scrollbar py-3 pl-5">
                    <div className="flex gap-3 pr-5">
                        {CATEGORIES.map((filter) => {
                            const isActive = activeFilter === filter;
                            return (
                                <button 
                                    key={filter} 
                                    onClick={() => setActiveFilter(filter)}
                                    className={`flex shrink-0 items-center justify-center rounded-full px-5 py-2 transition-all border ${
                                        isActive 
                                        ? 'bg-primary border-black shadow-neo-sm active:translate-y-[2px] active:shadow-none' 
                                        : 'bg-[#2c4823] border-primary/20 hover:bg-primary/20 text-white'
                                    }`}
                                >
                                    <span className={`text-xs font-bold uppercase tracking-wide ${isActive ? 'text-black' : 'text-white'}`}>
                                        {filter}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <main className="flex-1 px-4 pt-4 min-h-[50vh]">
                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center pt-20 opacity-50">
                        <span className="material-symbols-outlined text-6xl mb-4 text-white/20">search_off</span>
                        <p className="font-bold uppercase tracking-wide text-white/40 text-center px-10">No fresh drips found in this vault</p>
                        <button 
                            onClick={() => {setSearchQuery(''); setActiveFilter('All');}}
                            className="mt-4 text-primary text-sm font-bold hover:underline"
                        >
                            Reset Search
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {filteredProducts.map((product, idx) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={product.id} 
                                className={`group flex flex-col gap-3 cursor-pointer ${idx % 2 !== 0 ? 'mt-8' : ''}`}
                            >
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-2 border-white/10 bg-gray-900 shadow-lg group-hover:border-primary/50 transition-colors">
                                    <div onClick={() => onProductClick(product)} className="w-full h-full">
                                        <img src={product.image} alt={product.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                                    </div>
                                    
                                    {/* Condition Badge */}
                                    {product.condition && (
                                        <div className="absolute top-3 left-3 z-20">
                                            <span className="bg-acid-purple text-white text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded shadow-lg border border-white/20">
                                                {product.condition}
                                            </span>
                                        </div>
                                    )}

                                    {/* Price Tag */}
                                    <div className={`absolute ${idx % 2 === 0 ? 'bottom-4 -left-1 -rotate-6' : 'bottom-4 -right-1 rotate-3'} z-10 transform bg-paper px-3 py-1 shadow-paper border border-black group-hover:scale-110 transition-transform`}>
                                        <p className="font-display font-extrabold text-black text-sm">${product.price}</p>
                                        <div className={`absolute ${idx % 2 === 0 ? '-right-1' : '-left-1'} top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-black/80`}></div>
                                    </div>

                                    {/* Like Button */}
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onToggleLike(product.id);
                                        }}
                                        className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition-transform active:scale-90 hover:bg-black/60"
                                    >
                                        <span className={`material-symbols-outlined hover:text-red-500 hover:fill-current transition-colors ${product.likes ? 'text-red-500 filled' : 'text-white'}`}>favorite</span>
                                    </button>
                                </div>
                                <div className="px-1" onClick={() => onProductClick(product)}>
                                    <h3 className="text-sm font-bold leading-tight text-white uppercase tracking-wide">{product.title}</h3>
                                    <p className="text-xs font-medium text-white/60 mt-1">SIZE {product.size}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* Mascot FAB */}
            <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-2 pointer-events-none">
                <div className="bg-white text-black text-xs font-bold px-3 py-1 rounded-t-xl rounded-bl-xl shadow-lg animate-pulse mb-1 mr-2 pointer-events-auto">
                    Fresh drops!
                </div>
                <button onClick={onUploadClick} className="rubber-hose-shake relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-black shadow-hard border-2 border-black active:translate-y-1 active:shadow-none transition-all pointer-events-auto">
                    <span className="material-symbols-outlined text-4xl">sentiment_very_satisfied</span>
                </button>
            </div>
        </div>
    );
};

export default Feed;