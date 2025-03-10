"use client";

import { AuroraText } from "@/components/magicui/aurora-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ContractContent } from "@/components/ContractContent";
import { Montserrat } from "next/font/google";
import { useRef, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const secondSectionRef = useRef<HTMLElement>(null);
  const thirdSectionRef = useRef<HTMLElement>(null);
  const [, setShowNav] = useState(true);
  const [showAccept, setShowAccept] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // Prevenir scroll manual
  useEffect(() => {
    const preventDefault = (e: WheelEvent | TouchEvent) => {
      // Verificamos si el evento ocurrió dentro del contenedor del contrato
      const target = e.target as HTMLElement;
      const contractContainer = document.querySelector(".custom-scrollbar");

      if (contractContainer?.contains(target)) {
        // Si el evento ocurrió dentro del contenedor, permitimos el scroll
        return;
      }

      // Si el evento ocurrió fuera, lo prevenimos
      e.preventDefault();
      e.stopPropagation();
    };

    // Aseguramos que el scroll esté bloqueado en mobile
    document.body.style.overflow = "hidden";
    document.addEventListener("wheel", preventDefault, { passive: false });
    document.addEventListener("touchmove", preventDefault, { passive: false });

    // Observer para la segunda sección
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNav(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("wheel", preventDefault);
      document.removeEventListener("touchmove", preventDefault);
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    if (secondSectionRef.current) {
      window.scrollTo({
        top: secondSectionRef.current.offsetTop,
        behavior: "smooth",
      });

      secondSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const isAtBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      1;

    if (isAtBottom) {
      setShowAccept(true);
    }
  };

  const handleContinue = () => {
    thirdSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Agregar la nueva función handleLogoClick
  const handleLogoClick = () => {
    // Scroll suave hacia arriba
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Resetear estados
    setShowAccept(false);
    setAccepted(false);

    // Resetear scroll del contenedor del contrato
    const contractContainer = document.querySelector(".custom-scrollbar");
    if (contractContainer) {
      contractContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Opcional: Resetear cualquier otro estado o elemento que necesites
  };

  return (
    <main
      className={`flex flex-col min-h-screen overflow-hidden ${montserrat.className}`}
    >
      {/* Primera sección - 100vh */}
      <section
        className="relative flex h-[100vh] w-full flex-col items-center overflow-hidden rounded-lg border bg-background"
        style={{
          backgroundImage: 'url("")',
          backgroundRepeat: "repeat",
          backgroundSize: "400px",
          backgroundPosition: "center",
          backgroundColor: "#fff", // Color de fondo por si la imagen no carga
        }}
      >
        {/* Logo centrado en la parte superior */}
        <div className="absolute top-8 w-full flex justify-center">
          <Image
            src="/fybeca-logo.webp"
            alt="Fybeca Logo"
            width={360}
            height={120}
            className="h-[150px] object-contain" // Cambiado de h-[40px] a h-[120px]
            priority
          />
        </div>

        {/* Contenedor principal del texto */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 md:gap-4 text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] font-bold text-center max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] leading-[1.2] md:leading-[1.1]">
          <div className="flex items-center justify-center w-full">
            <span className="text-black">¿Estas listo para</span>
          </div>
          <div className="flex items-center justify-center w-full">
            <span className="text-black">ser parte del</span>
          </div>
          <div className="flex items-center justify-center w-full">
            <AuroraText
              className="text-center text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem]"
              colors={[
                "#FF0000",
                "#FF1A1A",
                "#FF4D00",
                "#FF6B00",
                "#FF8533",
                "#FFA500",
                "#FFB732",
                "#FFD000",
                "#FF4500",
                "#FF3300",
                "#FF5733",
                "#FF6B4A",
              ]}
              speed={1.5}
            >
              futuro?
            </AuroraText>
          </div>
        </div>

        {/* ShimmerButton con evento onClick */}
        <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 z-20">
          <ShimmerButton
            className="w-full md:w-auto px-8 py-4 text-base md:text-lg font-medium"
            shimmerColor="#ffffff"
            background="rgba(0, 0, 0, 0.8)"
            onClick={() => handleClick()}
          >
            Comenzar
          </ShimmerButton>
        </div>
      </section>

      {/* Segunda sección con ref */}
      <section
        ref={secondSectionRef}
        className="relative w-full h-[100vh] bg-[#F8F8F3] flex flex-col items-center p-4 sm:p-6 md:p-8"
      >
        {/* Segunda sección - Logo clickeable */}
        <div
          className="w-full flex justify-center mb-8 cursor-pointer"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
        >
          <Image
            src="/fybeca-logo.webp"
            alt="Fybeca Logo"
            width={360}
            height={120}
            className="h-[120px] object-contain"
            priority
          />
        </div>

        {/* Contenedor del contrato */}
        <div className="relative w-[95%] sm:w-[90%] md:w-[85%] lg:w-[90vh] h-[70vh] bg-white rounded-xl shadow-lg overflow-hidden">
          <div
            className="w-full h-full overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-8"
            onScroll={handleScroll}
            onWheel={(e) => e.stopPropagation()} // Previene que el evento wheel se propague
            onTouchMove={(e) => e.stopPropagation()} // Previene que el evento touchmove se propague
          >
            <div className="space-y-6">
              <ContractContent />
              {showAccept && (
                <div className="flex flex-col items-center gap-4 pt-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="terms"
                      checked={accepted}
                      onCheckedChange={(checked: boolean) =>
                        setAccepted(checked)
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Acepto los términos y condiciones
                    </label>
                  </div>

                  {accepted && (
                    <ShimmerButton
                      className="w-full md:w-auto px-8 py-4 text-base md:text-lg font-medium"
                      shimmerColor="#ffffff"
                      background="rgba(0, 0, 0, 0.8)"
                      onClick={handleContinue}
                    >
                      Continuar
                    </ShimmerButton>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tercera sección */}
      <section
        ref={thirdSectionRef}
        className="relative w-full h-[100vh] bg-[#FFFFFF] flex flex-col items-center"
      >
        {/* Tercera sección - Logo clickeable */}
        <div
          className="w-full flex justify-center mt-8 cursor-pointer"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
        >
          <Image
            src="/fybeca-logo.webp"
            alt="Fybeca Logo"
            width={360}
            height={120}
            className="h-[120px] object-contain"
            priority
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full h-[20vh] bg-[#1F3D69] flex items-center justify-center mt-auto">
        <div>{/* Contenido del footer */}</div>
      </footer>
    </main>
  );
}
