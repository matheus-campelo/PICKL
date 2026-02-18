import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface CartProps {
    items: Product[];
    onBack: () => void;
    onRemove: (id: string) => void;
    onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onBack, onRemove, onCheckout }) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="flex flex-col h-full bg-background-dark text-white">
            {/* Header */}
            <header className="px-5 py-6 flex items-center justify-between border-b border-white/5">
                <button onClick={onBack} className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 className="text-xl font-bold uppercase tracking-widest font-display">Your Bag</h2>
                <div className="size-10"></div> {/* Spacer */}
            </header>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-40">
                        <span className="material-symbols-outlined text-7xl mb-4">shopping_bag</span>
                        <p className="font-bold uppercase tracking-widest">Bag is empty</p>
                        <button 
                            onClick={onBack}
                            className="mt-6 text-primary font-bold hover:underline"
                        >
                            Go find some drip
                        </button>
                    </div>
                ) : (
                    items.map((item) => (
                        <motion.div 
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={item.id} 
                            className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 relative group"
                        >
                            <div className="size-24 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wide leading-tight">{item.title}</h3>
                                    <p className="text-xs text-white/40 mt-1 uppercase">{item.brand} • {item.size}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-primary font-cooper text-xl">${item.price}</span>
                                    <button 
                                        onClick={() => onRemove(item.id)}
                                        className="text-white/30 hover:text-red-500 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Summary & Checkout */}
            {items.length > 0 && (
                <div className="p-6 bg-surface-dark/80 backdrop-blur-xl border-t border-white/10 space-y-4 pb-32">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-white/60">
                            <span>Subtotal</span>
                            <span>${total}</span>
                        </div>
                        <div className="flex justify-between text-sm text-white/60">
                            <span>Shipping</span>
                            <span className="text-primary font-bold">FREE</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold pt-2 border-t border-white/5">
                            <span className="uppercase tracking-widest">Total</span>
                            <span className="text-primary font-cooper text-2xl">${total}</span>
                        </div>
                    </div>

                    <button 
                        onClick={onCheckout}
                        className="w-full h-16 bg-primary text-black rounded-full font-cooper text-xl uppercase tracking-widest shadow-glow active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        <span>Secure Drip</span>
                        <span className="material-symbols-outlined font-bold">lock</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
