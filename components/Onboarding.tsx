import React from 'react';

interface OnboardingProps {
    onStart: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onStart }) => {
    return (
        <div className="relative flex flex-col h-full min-h-screen w-full items-center justify-center bg-background-dark overflow-hidden">
             {/* Grain Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-grain opacity-20 mix-blend-overlay"></div>

            {/* Top Bar: Skip Button */}
            <div className="absolute top-0 right-0 p-6 pt-12 z-20">
                <button onClick={onStart} className="flex items-center justify-center rounded-full border border-white/20 px-4 py-1.5 backdrop-blur-sm transition-colors hover:bg-white/10">
                    <span className="text-white text-sm font-bold tracking-wide">Skip</span>
                </button>
            </div>

            {/* Hero Section */}
            <div className="flex-1 flex flex-col items-center justify-center relative w-full px-6 py-4 z-10">
                 {/* Background Blob */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/20 rounded-full blur-[80px]"></div>

                 {/* Mascot Image Container */}
                 <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center mb-8">
                    <div className="relative group cursor-pointer w-64 h-64 transition-transform hover:scale-105 duration-300">
                        {/* Hard Shadow */}
                        <div className="absolute inset-0 bg-primary translate-x-3 translate-y-3 rounded-2xl border-2 border-black"></div>
                        {/* Image */}
                        <div className="absolute inset-0 bg-neutral-900 rounded-2xl border-2 border-white overflow-hidden shadow-glow">
                             <div className="w-full h-full bg-center bg-no-repeat bg-cover" 
                                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPl1W3ajW_q5LgtrwNIvOG7fSJwSMcuoqDiaobxEVXQQveHrK3FxwBbEDVvtB0CLN6cmNcD7G-k28cEaltvra1BVgL5TYLi5MjNWeWKaBJCLrH3UrK-BTapJeozNytFMgCZQwI7HbXpD6maQmbZVBTCKypwvIoyrdNtawpJkL5l7Mls8ZekzJSKoyhIcfFD2L6VqWnlaF08kmYIf0ZuYeTAFIwMkNan5zmGGhIybIglPjxXG3nz4G1sUjwn6pMcf29itZ1_QPmhcQ")'}}>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                             </div>
                        </div>
                        {/* Sticker Element */}
                        <div className="absolute -top-6 -right-6 bg-white text-black p-2 rounded-full border-2 border-black rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20">
                            <span className="material-symbols-outlined text-3xl font-bold">eco</span>
                        </div>
                    </div>
                 </div>

                 {/* Content */}
                 <div className="text-center space-y-2 mb-8">
                    {/* Dots */}
                    <div className="flex flex-row items-center justify-center gap-3 mb-6">
                        <div className="h-3 w-8 rounded-full bg-primary shadow-[0_0_10px_#46ec13]"></div>
                        <div className="h-3 w-3 rounded-full bg-white/20"></div>
                        <div className="h-3 w-3 rounded-full bg-white/20"></div>
                    </div>

                    <h1 className="font-cartoon text-white text-4xl md:text-5xl leading-tight drop-shadow-[2px_2px_0px_#46ec13]">
                        WELCOME TO <br/> <span className="text-primary text-5xl md:text-6xl drop-shadow-[2px_2px_0px_#ffffff]">PICKL</span>
                    </h1>
                    <p className="text-gray-300 font-display text-base font-medium leading-relaxed max-w-xs mx-auto">
                        Trash to Treasure. The circular economy just got sour.
                    </p>
                 </div>
                 
                 {/* CTA */}
                 <div className="w-full max-w-sm space-y-4">
                    <button onClick={onStart} className="w-full bg-white text-black font-display font-extrabold text-lg py-4 rounded-full border-2 border-black shadow-neo hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all active:scale-95 uppercase tracking-wide">
                        Get Started
                    </button>
                    <button className="w-full text-center py-2">
                        <span className="text-white/60 text-sm font-semibold">Already have an account? <span className="text-primary hover:underline cursor-pointer">Sign In</span></span>
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default Onboarding;
