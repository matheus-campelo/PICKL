import React from 'react';
import { ViewState } from '../types';

interface BottomNavProps {
    currentView: ViewState;
    onChangeView: (view: ViewState) => void;
    cartCount?: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView, cartCount = 0 }) => {
    // Only show on main views
    const mainViews: ViewState[] = ['feed', 'profile', 'cart'];
    if (!mainViews.includes(currentView)) return null;

    return (
        <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-[90%] max-w-[360px]">
            <div className="flex items-center justify-between gap-1 rounded-full bg-[#1e2e1a]/90 border border-[#3a5232] p-2 shadow-2xl backdrop-blur-xl">
                <button 
                    onClick={() => onChangeView('feed')}
                    className={`flex h-12 flex-1 items-center justify-center rounded-full transition-all ${currentView === 'feed' ? 'bg-primary text-black shadow-glow' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                >
                    <span className={`material-symbols-outlined ${currentView === 'feed' ? 'filled' : ''}`}>home</span>
                </button>
                
                <button 
                    onClick={() => onChangeView('upload')}
                    className={`flex h-12 flex-1 items-center justify-center rounded-full transition-all ${currentView === 'upload' ? 'bg-primary text-black shadow-glow' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                >
                    <span className="material-symbols-outlined">add_circle</span>
                </button>

                <button 
                    onClick={() => onChangeView('cart')}
                    className={`relative flex h-12 flex-1 items-center justify-center rounded-full transition-all ${currentView === 'cart' ? 'bg-primary text-black shadow-glow' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                >
                    <span className={`material-symbols-outlined ${currentView === 'cart' ? 'filled' : ''}`}>shopping_bag</span>
                    {cartCount > 0 && (
                        <span className="absolute top-2 right-2 size-4 bg-acid-purple text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-black animate-bounce">
                            {cartCount}
                        </span>
                    )}
                </button>

                <button 
                    onClick={() => onChangeView('profile')}
                    className={`flex h-12 flex-1 items-center justify-center rounded-full transition-all ${currentView === 'profile' ? 'bg-primary text-black shadow-glow' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                >
                    <span className={`material-symbols-outlined ${currentView === 'profile' ? 'filled' : ''}`}>person</span>
                </button>
            </div>
        </nav>
    );
};

export default BottomNav;
