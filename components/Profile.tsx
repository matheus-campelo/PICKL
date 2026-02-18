import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ProfileProps {
    onBack: () => void;
    likedProducts: Product[];
}

const Profile: React.FC<ProfileProps> = ({ onBack, likedProducts }) => {
    const [activeTab, setActiveTab] = useState<'closet' | 'likes'>('closet');

    const myClosetItems = [
        {id: 'c1', price: 120, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCguahlZ3lmoy1rRaAcKL78EvmiNekB8FGvyYPGaQIS4VrBnQwyjHqGdNvXa3zrSEtu-Qwh4EyqxW0koMBCXjaimVo_PwN_VIvgi4Xy_rAKGi6XL3nsSX-LPtQY2gac5dk_eelmQk_k_Pzz5fKpQt64iIzKYCTrvE1JTW2-veQyxa__o-5muOIKDCuGt9MVizf471nux2_ZxLgH_o4li8PWp4R2OYTMGlAOQHlLKrWUFbHpVRFeY9BWTk_fcAQW4-Ct_IblgegruV8', title: '90s Denim Jacket', brand: 'Diesel'},
        {id: 'c2', price: 250, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl5p8S4ir8nNrHlwKFGh6OYQWb5CZWmWM271WYtIsbBtHz13BxEA1sCUqlr5LK5TWoHHN3WcTYKB_NVYnFW-GavcAR8mrZsPQut_nX55QLYx-rImZxMrOoAR7Wpthr9gopiU0R7qsy1K9SG-PMNTynU3KyNZ4sKgAyy4cC45myc9FavMKIOqlNMBY5hJ1MSDKDK6cbm1A4E-Fv-fY7Ucf2Awbyeqp4VRRdIjVpb_PbkNL95YX4oPXJWyp--Oj0-U138qf0qoPjKHI', title: 'Dunk Low Retro', brand: 'Nike'},
        {id: 'c3', price: 85, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEXSVVbIUG_UDai8OdyrVuQbljh38SkfecJsGKyjYP9AMKgRsUpxrwSZOnFuPzTn6ai3Jh3JdY3JELKfPFtJDsXsUB2OUtQ5ZMRKeoV43OEaASBPRHc7wlm_PJAsfKiJeKL827aawFHuFR6BmGd9vslXfpY-6XMG54adqw6ztj2-cCE4xi006awUeEM9fwRlfghSMUUI8xqy4CInBYOr5_nZpfbMd7h018mMpcvqrSxkS89kaojXFCMME5BMmnEvalzy9ULp7tiG8', title: 'Akira Vintage Tee', brand: 'Thrift'},
        {id: 'c4', price: 300, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfDfzm79cXQsl_Dj6zVP8gLyFgyP7d5_a0ta9bBdB0g-N0L86eVKZvSMUpGSXjT-qaxlgQQWch00No63eb492pTSn02Zdrtl2iQFRQpIBVxqgVqRSB8i03_7xl-ZAGmWZUhcLVB2dW4BOB2i1vhJF_V_dnRhx8zMLAp7mwGGi9t3Y7mFAxT4_oprWa_nfrowvRyzT5Y1nrFuWGZSGsipHS3gsm8bhMobu7jAdrDd6e-nIHGNmn4LU-uBYVRleJZozHKHK4WTn40tA', title: 'Tech Fleece Cargo', brand: 'Stone Island'},
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background-dark overflow-x-hidden">
             {/* Background Pattern */}
            <div className="fixed inset-0 z-0 opacity-10" style={{backgroundImage: 'radial-gradient(#1f3318 15%, transparent 16%), radial-gradient(#1f3318 15%, transparent 16%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'}}></div>

            {/* Header */}
            <div className="sticky top-0 z-50 flex items-center bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-white/10">
                <button onClick={onBack} className="text-white flex size-12 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[28px]">arrow_back</span>
                </button>
                <h2 className="text-white text-xl font-extrabold leading-tight tracking-wider uppercase flex-1 text-center">My Stash</h2>
                <button className="flex items-center justify-center rounded-full size-12 text-white active:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[28px]">settings</span>
                </button>
            </div>

            <div className="relative z-10 flex flex-col items-center pt-6 px-4 pb-2">
                 {/* Avatar */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-green-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                    <div className="relative size-32 rounded-full p-[4px] bg-background-dark border-2 border-primary shadow-glow overflow-hidden">
                        <img src="https://picsum.photos/seed/kiki/200/200" alt="Avatar" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                    </div>
                     <div className="absolute bottom-1 right-1 bg-primary text-black rounded-full p-1 border-2 border-background-dark flex items-center justify-center">
                        <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                    </div>
                </div>

                {/* User Info */}
                <div className="flex flex-col items-center justify-center mt-4 w-full">
                    <h1 className="text-white text-3xl font-black tracking-tight text-center uppercase glitch-text" data-text="Kiki_Vibin">Kiki_Vibin</h1>
                    <p className="text-primary font-bold text-sm tracking-wide mt-1">@kikivibin</p>
                    <p className="text-gray-300 text-sm font-medium text-center truncate px-4 mt-3 max-w-xs">
                        Streetwear enthusiast & vintage collector. 🛹 📼
                    </p>
                </div>
            </div>

             {/* Badges */}
             <div className="flex flex-col w-full pb-6 relative z-10 mt-6">
                <div className="px-5 pb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">military_tech</span>
                    <h3 className="text-white text-lg font-bold tracking-wide uppercase">Badges</h3>
                </div>
                <div className="w-full overflow-x-auto no-scrollbar pl-4 bg-[#1a1a1a] border-y border-white/5 py-4">
                    <div className="flex gap-4 min-w-max pr-4">
                        <div className="flex flex-col items-center gap-2 w-20 group">
                             <div className="relative w-16 h-16 transition-transform group-hover:-rotate-6">
                                <div className="absolute inset-0 bg-black/60 rounded-full blur-sm translate-y-1"></div>
                                <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full border-2 border-white/40 shadow-lg flex items-center justify-center relative z-10 overflow-hidden">
                                    <span className="material-symbols-outlined text-black text-3xl font-bold">star</span>
                                </div>
                             </div>
                             <span className="text-white/80 text-[10px] font-bold uppercase text-center bg-black/40 px-2 py-0.5 rounded">Super Lender</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 w-20 group">
                             <div className="relative w-16 h-16 transition-transform group-hover:rotate-3">
                                <div className="absolute inset-0 bg-black/60 rounded-full blur-sm translate-y-1"></div>
                                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-700 rounded-full border-2 border-white/40 shadow-lg flex items-center justify-center relative z-10 overflow-hidden">
                                    <span className="material-symbols-outlined text-white text-3xl font-bold">visibility</span>
                                </div>
                             </div>
                             <span className="text-white/80 text-[10px] font-bold uppercase text-center bg-black/40 px-2 py-0.5 rounded">Vintage Hunter</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex w-full border-b border-white/10 relative z-10 px-4 mt-2">
                <button 
                    onClick={() => setActiveTab('closet')}
                    className={`flex-1 py-4 text-center font-bold uppercase tracking-wide text-sm transition-colors relative ${activeTab === 'closet' ? 'text-primary' : 'text-white/40'}`}
                >
                    My Closet
                    {activeTab === 'closet' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-glow" />}
                </button>
                <button 
                    onClick={() => setActiveTab('likes')}
                    className={`flex-1 py-4 text-center font-bold uppercase tracking-wide text-sm transition-colors relative ${activeTab === 'likes' ? 'text-primary' : 'text-white/40'}`}
                >
                    Likes ({likedProducts.length})
                    {activeTab === 'likes' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-glow" />}
                </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 gap-3 px-4 pt-4 pb-32 relative z-10 min-h-[300px]">
                <AnimatePresence mode="popLayout">
                    {activeTab === 'closet' ? (
                        myClosetItems.map((item) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={item.id} 
                                className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800 border border-white/10"
                            >
                                <div className="absolute top-2 right-2 z-20 bg-primary text-black text-xs font-black px-2 py-1 rounded-full shadow-lg group-hover:rotate-0 transition-transform rotate-2">
                                     ${item.price}
                                </div>
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                 <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 to-transparent">
                                    <p className="text-white font-bold text-sm truncate">{item.title}</p>
                                    <p className="text-gray-400 text-xs">{item.brand}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        likedProducts.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-2 flex flex-col items-center justify-center py-12 text-white/30"
                            >
                                <span className="material-symbols-outlined text-4xl mb-2">favorite_border</span>
                                <p className="font-bold text-sm">No likes yet</p>
                            </motion.div>
                        ) : (
                            likedProducts.map((item) => (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={item.id} 
                                    className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800 border border-white/10"
                                >
                                    <div className="absolute top-2 right-2 z-20 bg-white text-black text-xs font-black px-2 py-1 rounded-full shadow-lg">
                                         ${item.price}
                                    </div>
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                     <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 to-transparent">
                                        <p className="text-white font-bold text-sm truncate">{item.title}</p>
                                        <p className="text-gray-400 text-xs">{item.brand}</p>
                                    </div>
                                </motion.div>
                            ))
                        )
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Profile;
