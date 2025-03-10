"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const FloatingNav = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-4 inset-x-0 mx-auto flex items-center justify-between",
        "px-6 py-3",
        "w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%]",
        "border border-transparent dark:border-white/[0.2] rounded-full",
        "bg-white/80 backdrop-blur-sm",
        "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
        "z-[5000]",
        className
      )}
    >
      <div className="flex w-full items-center justify-center sm:justify-start">
        <Image
          src="/fybeca-logo.webp"
          alt="Fybeca Logo"
          width={360} // Triplicado de 120
          height={120} // Triplicado de 40
          className="h-[24px] sm:h-[30px] object-contain" // Ajustado height proporcionalmente
          priority
        />
      </div>
    </motion.div>
  );
};
