"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, X, Flame, Utensils, Clock, Droplets, Thermometer, ChefHat, Scale, ChevronRight } from "lucide-react";

const IconMap: Record<string, any> = {
    "flame": Flame,
    "knife": Utensils,
    "clock": Clock,
    "droplet": Droplets,
    "thermometer": Thermometer,
    "chef-hat": ChefHat
};

export default function FlashcardModal({ recipe, onClose }: { recipe: any | null, onClose: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(1);

    // Parse pasos
    const pasos = recipe ? (Array.isArray(recipe.pasos) ? recipe.pasos : (typeof recipe.pasos === 'string' ? JSON.parse(recipe.pasos) : [])) : [];
    
    // Total steps = Summary (0) + Instruction Steps (pasos.length)
    const totalSteps = pasos.length + 1;

    // Bloquear scroll del body al abrir el modal
    useEffect(() => {
        if (recipe) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [recipe]);

    useEffect(() => {
        if (recipe) {
            setCurrentStep(0);
        }
    }, [recipe]);

    if (!recipe) return null;

    const nextStep = () => {
        setDirection(1);
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    };

    const prevStep = () => {
        setDirection(-1);
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const flashcardVariants = {
        enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0, rotate: direction > 0 ? 10 : -10 }),
        center: { zIndex: 1, x: 0, opacity: 1, rotate: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0, rotate: direction < 0 ? 10 : -10 })
    };

    const isSummaryStep = currentStep === 0;
    const instructionIdx = currentStep - 1;
    const stepData = !isSummaryStep && pasos[instructionIdx] ? pasos[instructionIdx] : null;
    
    // Inferencia de icono basada en el titulo o ingredientes
    let ActionIcon = ChefHat;
    let iconName = 'chef-hat';
    if (stepData) {
        const lowerTitle = stepData.titulo_paso.toLowerCase();
        if (lowerTitle.includes('horn') || lowerTitle.includes('airfryer') || lowerTitle.includes('fuego') || lowerTitle.includes('cocción')) {
            ActionIcon = Flame;
            iconName = 'flame';
        } else if (lowerTitle.includes('cort') || lowerTitle.includes('pic') || lowerTitle.includes('prepar')) {
            ActionIcon = Utensils;
            iconName = 'knife';
        } else if (lowerTitle.includes('agua') || lowerTitle.includes('líquid') || lowerTitle.includes('hidrat')) {
            ActionIcon = Droplets;
            iconName = 'droplet';
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring" as const, damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-xl"
        >
            {/* Top Navigation Bar */}
            <div className="absolute top-4 md:top-8 w-full max-w-4xl px-4 flex justify-between items-center z-50 gap-4">
                <div className="glass px-4 md:px-6 py-2.5 md:py-3 rounded-full font-bold flex gap-2 md:gap-3 items-center text-[10px] md:text-sm shadow-md bg-white/70 text-[var(--color-sage-950)] min-w-0 flex-1 md:flex-none">
                    <span className="text-[var(--color-sage-700)] font-black truncate">{recipe.nombre_receta}</span>
                    <span className="opacity-40 shrink-0">—</span>
                    <span className="whitespace-nowrap shrink-0">
                        {isSummaryStep ? "Resumen" : `${pasos.length} Pasos`}
                    </span>
                </div>
                <button onClick={onClose} className="p-2.5 md:p-3 bg-white/20 text-white rounded-full hover:bg-white/40 backdrop-blur-md transition-colors shrink-0 shadow-lg">
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
            </div>

            {/* Flashcard Area */}
            <div className="relative w-full max-w-2xl h-[70vh] flex items-center justify-center perspective-[1000px]">
                <AnimatePresence custom={direction} mode="sync">
                    <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={flashcardVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = Math.abs(offset.x) * velocity.x;
                            if (swipe < -10000) nextStep();
                            else if (swipe > 10000) prevStep();
                        }}
                        className="absolute w-full h-full bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(81,132,81,0.3)] border border-white p-6 md:p-12 flex flex-col cursor-grab active:cursor-grabbing overflow-x-hidden overflow-y-auto pb-32 md:pb-12"
                    >
                        {isSummaryStep ? (
                            /* Summary Layout */
                            <div className="flex flex-col gap-4 h-full relative z-10 py-2 items-center justify-center text-center">
                                <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring" as const, stiffness: 260, damping: 20 }}
                                    className="flex justify-center mb-4"
                                >
                                    <div className="text-8xl drop-shadow-lg">
                                        {recipe.emoji_representativo || "🍲"}
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h2 className="text-2xl md:text-4xl font-black text-[var(--color-sage-950)] text-balance leading-tight mb-4">
                                        {recipe.nombre_receta}
                                    </h2>
                                    <p className="text-[var(--color-sage-600)] font-bold tracking-widest uppercase text-[10px] md:text-xs bg-[var(--color-sage-100)] px-3 py-1 rounded-full w-max mx-auto mb-8">
                                        Tiempo total: {recipe.tiempo_total_preparacion} min
                                    </p>
                                    
                                    <p className="text-lg text-[var(--color-sage-700)] mb-8">
                                        ¡Desliza a la izquierda o usa los botones de abajo para comenzar a cocinar!
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: [0, -4, 0], opacity: 1 }}
                                    transition={{
                                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                        opacity: { duration: 0.5, delay: 0.4 }
                                    }}
                                    className="mt-auto w-full"
                                >
                                    <button
                                        onClick={nextStep}
                                        className="group w-full bg-[var(--color-sage-600)] text-white py-6 rounded-3xl font-black text-xl shadow-[0_20px_40px_-10px_rgba(81,132,81,0.5)] hover:bg-[var(--color-sage-700)] hover:scale-[1.03] active:scale-95 transition-all outline-none flex items-center justify-center gap-3"
                                    >
                                        Comenzar
                                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            </div>
                        ) : (
                            /* Instruction Step Layout */
                            <>
                                {stepData && (
                                    <div className="flex flex-col h-full relative">
                                        {/* Background Step Number */}
                                        <div className="absolute top-0 right-0 p-8 md:p-12 bg-[var(--color-sage-50)] rounded-bl-[100%] w-32 h-32 md:w-40 md:h-40 -mr-6 md:-mr-12 -mt-6 md:-mt-12 flex items-end justify-start -z-0">
                                            <span className="text-5xl md:text-6xl font-black text-[var(--color-sage-200)] opacity-50 relative right-2 md:right-4 bottom-2 md:bottom-4">{stepData.paso_numero || instructionIdx + 1}</span>
                                        </div>

                                        {/* Header: Action Icon & Time */}
                                        <div className="flex justify-between items-start w-full relative z-10 mb-6 md:mb-8">
                                            <div className="flex gap-4">
                                                <div className="p-3 md:p-4 rounded-2xl bg-[var(--color-sage-100)] text-[var(--color-sage-700)]">
                                                    <ActionIcon className="w-6 h-6 md:w-8 md:h-8" />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <span className="text-xs md:text-sm font-bold text-[var(--color-sage-500)] uppercase tracking-wider flex items-center gap-1">
                                                        <Clock className="w-3 h-3 md:w-4 md:h-4" /> {stepData.tiempo_estimado} min
                                                    </span>
                                                    <span className="text-lg md:text-xl font-bold text-[var(--color-sage-900)] capitalize mt-1 border-b-2 border-[var(--color-sage-500)] w-max pb-1 opacity-60">
                                                        {iconName === 'knife' ? 'Preparación' : iconName === 'flame' ? 'Cocción' : 'Paso Técnico'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <h2 className="text-2xl md:text-4xl font-black text-[var(--color-sage-950)] mb-4 md:mb-6 relative z-10 leading-tight">
                                            {stepData.titulo_paso}
                                        </h2>

                                        {/* Specific Amounts & Ingredients */}
                                        {stepData.ingredientes_usados && stepData.ingredientes_usados !== 'Ninguno' && (
                                            <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-2xl bg-[var(--color-sand-50)] border border-[var(--color-sand-200)] relative z-10 flex gap-3 items-center">
                                                <Scale className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-sand-500)] shrink-0" />
                                                <p className="font-bold text-[var(--color-sand-900)] text-sm md:text-lg">
                                                    {stepData.ingredientes_usados}
                                                </p>
                                            </div>
                                        )}

                                        <p className="text-lg md:text-xl text-[var(--color-sage-800)] font-medium relative z-10 leading-relaxed max-w-full flex-1 text-pretty">
                                            {stepData.detalle}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls - Always show, but style differently based on step */}
            <div className="absolute bottom-6 md:bottom-12 flex justify-center items-center gap-4 md:gap-8 z-50">
                <button
                    onClick={prevStep} disabled={currentStep === 0}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 border-2 border-[var(--color-sage-500)]/20 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white transition-all shadow-xl active:scale-90 group"
                >
                    <ArrowLeft className="w-7 h-7 md:w-8 md:h-8 text-[var(--color-sage-700)] group-hover:-translate-x-1 transition-transform" />
                </button>

                {currentStep === totalSteps - 1 && (
                    <button
                        onClick={onClose}
                        className="h-16 px-8 rounded-full font-black text-lg transition-all active:scale-95 bg-green-500 text-white shadow-[0_15px_30px_rgba(34,197,94,0.45)] hover:bg-green-600"
                    >
                        ¡A Comer!
                    </button>
                )}

                <button
                    onClick={nextStep} disabled={currentStep === totalSteps - 1}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--color-sage-600)] text-white flex items-center justify-center shadow-[0_15px_35px_rgba(81,132,81,0.5)] disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110 active:scale-90 transition-all group min-w-[56px] md:min-w-[64px]"
                >
                    <ArrowRight className="w-7 h-7 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}
