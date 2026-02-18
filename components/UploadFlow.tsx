import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface UploadFlowProps {
    onBack: () => void;
    onComplete: (product: Product | null) => void;
}

const UploadFlow: React.FC<UploadFlowProps> = ({ onBack, onComplete }) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [cameraError, setCameraError] = useState<boolean>(false);

    // Initialize Camera on Step 1
    useEffect(() => {
        let mediaStream: MediaStream | null = null;

        const startCamera = async () => {
            if (step !== 1) return;
            try {
                mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'environment' } 
                });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setCameraError(true);
            }
        };

        if (step === 1) {
            startCamera();
        }

        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [step]);

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            // Set canvas dimensions to match video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageDataUrl = canvas.toDataURL('image/jpeg');
                setCapturedImage(imageDataUrl);
                setStep(2);
            }
        } else if (cameraError) {
            // Fallback for demo if no camera
            setCapturedImage('https://picsum.photos/seed/drip/800/600');
            setStep(2);
        }
    };

    const handleListIt = () => {
        // Create a mock product from the capture
        if (capturedImage) {
            const newProduct: Product = {
                id: Date.now().toString(),
                title: 'Vintage 90s Denim Jacket', // Simulated AI result
                brand: 'Levis',
                price: 85,
                size: 'M',
                image: capturedImage,
                likes: false,
                category: 'Outerwear',
                condition: 'Vintage'
            };
            onComplete(newProduct);
        } else {
            onComplete(null);
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1 as any);
            setCapturedImage(null);
        } else {
            onBack();
        }
    };

    const stepVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-dark pb-8">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-background-dark/90 backdrop-blur-sm sticky top-0 z-50">
                <button onClick={prevStep} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors text-white">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-white text-lg font-bold uppercase tracking-wide">Feed the Monster</h1>
                <div className="w-10"></div>
            </header>

            {/* Stepper */}
            <div className="flex w-full flex-row items-center justify-center gap-2 pb-4 pt-2">
                <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-primary shadow-glow' : 'w-2 bg-surface-accent'}`}></div>
                <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-primary shadow-glow' : 'w-2 bg-surface-accent'}`}></div>
                <div className={`h-2 rounded-full transition-all duration-300 ${step === 3 ? 'w-8 bg-primary shadow-glow' : 'w-2 bg-surface-accent'}`}></div>
            </div>

            {/* Step Content */}
            <main className="flex-1 flex flex-col relative px-4 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* STEP 1: CAMERA */}
                        {step === 1 && (
                            <div className="relative flex-1 bg-surface-dark rounded-[2rem] overflow-hidden border-2 border-primary/20 shadow-2xl min-h-[500px] flex flex-col">
                                {/* Camera Viewport */}
                                <div className="absolute inset-0 z-0 bg-black flex items-center justify-center overflow-hidden">
                                    {!cameraError ? (
                                        <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{backgroundImage: "url('https://picsum.photos/seed/camera/800/1200')"}}></div>
                                    )}
                                    <canvas ref={canvasRef} className="hidden" />
                                </div>
                                
                                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-0 pointer-events-none"></div>

                                {/* Title Overlay */}
                                <div className="absolute top-16 left-0 right-0 z-20 flex justify-center pointer-events-none">
                                    <h2 className="text-white text-2xl font-extrabold uppercase tracking-tight drop-shadow-md text-center px-8 glitch-text" data-text="Feed me fresh gear!">
                                        Feed me fresh gear!
                                    </h2>
                                </div>

                                 {/* Controls */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col items-center gap-6 bg-gradient-to-t from-black via-black/80 to-transparent pt-20">
                                    <div className="bg-black/50 backdrop-blur-md border border-primary/30 rounded-full px-4 py-1.5 flex items-center gap-2 mb-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                        <p className="text-primary text-xs font-bold uppercase tracking-widest">Vision AI Active</p>
                                    </div>
                                     <div className="flex items-center justify-center gap-8 w-full">
                                        <button className="flex shrink-0 items-center justify-center rounded-full size-12 bg-surface-dark border border-white/10 text-white hover:bg-white/10">
                                            <span className="material-symbols-outlined text-2xl">photo_library</span>
                                        </button>
                                        <button onClick={capturePhoto} className="group flex shrink-0 items-center justify-center rounded-full size-20 bg-white border-4 border-white shadow-glow relative active:scale-95 transition-transform duration-100">
                                            <div className="absolute inset-1 rounded-full bg-background-dark flex items-center justify-center">
                                                <div className="size-14 rounded-full bg-primary border-4 border-black group-hover:bg-primary-dim transition-colors"></div>
                                            </div>
                                        </button>
                                        <button className="flex shrink-0 items-center justify-center rounded-full size-12 bg-surface-dark border border-white/10 text-white hover:bg-white/10">
                                            <span className="material-symbols-outlined text-2xl">bolt</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: RECOGNITION */}
                        {step === 2 && (
                             <div className="bg-surface-dark rounded-[2rem] p-4 shadow-xl border border-white/5 relative overflow-hidden flex-1">
                                 {/* Reaction Bubble */}
                                <div className="absolute top-4 right-4 z-20 animate-bounce-slow">
                                    <div className="bg-white text-black text-xs font-black uppercase px-3 py-1.5 rounded-lg rounded-bl-none shadow-lg transform rotate-[-2deg] border-2 border-primary">
                                        Yummy!
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 items-start h-full">
                                     <div className="w-full relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-black shadow-inner">
                                        <img src={capturedImage!} alt="Captured" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-primary/20 pointer-events-none mix-blend-overlay" style={{backgroundSize: '100% 4px', background: 'linear-gradient(to bottom, rgba(70,236,19,0), rgba(70,236,19,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))'}}></div>
                                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                            <div className="flex gap-1">
                                                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                                                <span className="h-1.5 w-1.5 bg-primary rounded-full opacity-50"></span>
                                                <span className="h-1.5 w-1.5 bg-primary rounded-full opacity-25"></span>
                                            </div>
                                            <span className="material-symbols-outlined text-primary drop-shadow-md">check_circle</span>
                                        </div>
                                     </div>

                                     <div className="flex w-full flex-col gap-3 px-2 flex-1 justify-center">
                                        <div>
                                            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">AI Identified</p>
                                            <h3 className="text-white text-2xl font-bold leading-tight tracking-tight">Vintage 90s Denim Jacket</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-medium text-white/80">Denim</span>
                                            <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-medium text-white/80">Outerwear</span>
                                            <span className="px-3 py-1 rounded-full border border-primary/50 bg-primary/10 text-xs font-bold text-primary">High Demand</span>
                                        </div>
                                        <button onClick={() => setStep(3)} className="mt-4 w-full bg-primary hover:bg-primary-dim text-black font-extrabold text-sm py-4 rounded-full uppercase tracking-wider shadow-neo transition-all flex items-center justify-center gap-2">
                                            <span>That's Right</span>
                                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                        </button>
                                     </div>
                                </div>
                             </div>
                        )}

                        {/* STEP 3: PRICING */}
                        {step === 3 && (
                            <div className="bg-surface-dark border border-primary/30 rounded-[2rem] p-6 relative overflow-hidden flex-1">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none"></div>
                                
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-white text-lg font-bold">What's the damage?</h3>
                                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-black">attach_money</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center py-4 flex-1">
                                    <div className="relative">
                                        <span className="text-[4rem] font-black text-white leading-none tracking-tighter flex items-start">
                                            <span className="text-2xl mt-2 mr-1 text-primary">$</span>85
                                        </span>
                                    </div>
                                    <p className="text-white/40 text-sm font-medium mt-2">Suggested range: $70 - $90</p>
                                </div>

                                 {/* Slider */}
                                <div className="mt-8 mb-8 relative h-16 w-full touch-none select-none">
                                    <div className="absolute top-1/2 left-0 right-0 h-4 bg-black rounded-full border border-white/10 -translate-y-1/2 overflow-hidden">
                                        <div className="h-full w-3/4 bg-gradient-to-r from-primary/40 to-primary"></div>
                                    </div>
                                    <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 h-10 w-10 bg-white rounded-full border-4 border-primary shadow-glow cursor-ew-resize flex items-center justify-center z-10">
                                        <span className="material-symbols-outlined text-primary text-sm font-black rotate-90">drag_handle</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <button onClick={prevStep} className="bg-surface-accent hover:bg-white/10 text-white font-bold py-4 rounded-full transition-colors text-sm uppercase tracking-wide">
                                        Back
                                    </button>
                                    <button onClick={handleListIt} className="bg-primary hover:bg-primary-dim text-black font-extrabold py-4 rounded-full transition-colors text-sm uppercase tracking-wide shadow-neo flex items-center justify-center gap-1">
                                        List It <span className="material-symbols-outlined text-base font-bold">rocket_launch</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default UploadFlow;
