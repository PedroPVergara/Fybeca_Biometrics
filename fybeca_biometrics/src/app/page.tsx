"use client";

import { AuroraText } from "@/components/magicui/aurora-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ContractContent } from "@/components/ContractContent";
import { Montserrat } from "next/font/google";
import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { MagicCard } from "@/components/magicui/magic-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const firstSectionRef = useRef<HTMLElement>(null);
  const secondSectionRef = useRef<HTMLElement>(null);
  const thirdSectionRef = useRef<HTMLElement>(null);
  const [showNav, setShowNav] = useState(true);
  const [showAccept, setShowAccept] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // Definir el esquema de validación con Zod
  const formSchema = z.object({
    name: z.string()
      .min(1, "El nombre es requerido")
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),
    surname: z.string()
      .min(1, "El apellido es requerido")
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo puede contener letras"),
    email: z.string()
      .email("Ingrese un email válido")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "El formato del email no es válido"),
    age: z.string()
      .refine((val) => !isNaN(Number(val)) && val !== "", "La edad debe ser un número")
      .refine((val) => Number(val) >= 18 && Number(val) <= 120, "La edad debe estar entre 18 y 120 años"),
    height: z.string()
      .refine((val) => !isNaN(Number(val)) && val !== "", "La altura debe ser un número")
      .refine((val) => Number(val) >= 100 && Number(val) <= 250, "La altura debe estar entre 100 y 250 cm"),
    weight: z.string()
      .refine((val) => !isNaN(Number(val)) && val !== "", "El peso debe ser un número")
      .refine((val) => Number(val) >= 30 && Number(val) <= 300, "El peso debe estar entre 30 y 300 kg"),
    gender: z.enum(["M", "F"], {
      required_error: "Debe seleccionar un género",
    }),
    diabetes: z.string().regex(/^[0-2]$/, "Valor inválido para diabetes"),
    smoke: z.boolean(),
    bloodPressure: z.boolean(),
  });

  // Tipo inferido del esquema
  type FormValues = z.infer<typeof formSchema>;

  // Configurar React Hook Form con el esquema de validación
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      age: "",
      height: "",
      weight: "",
      gender: undefined,
      diabetes: "0",
      smoke: false,
      bloodPressure: false,
    },
    mode: "onChange",
  });

  // Función para manejar el envío del formulario
  const onSubmit = async (data: FormValues) => {
    try {
      // Convertir los valores numéricos antes de enviar
      const formattedData = {
        ...data,
        age: Number(data.age),
        height: Number(data.height),
        weight: Number(data.weight),
        diabetes: Number(data.diabetes),
      };
      console.log("Datos del formulario:", formattedData);
      // Aquí iría la lógica para enviar los datos al servidor
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

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
    // Resetear estados
    setAccepted(false);
    setShowAccept(false);

    // Resetear el formulario si estamos en la sección 3
    if (thirdSectionRef.current) {
      form.reset();
    }

    // Resetear scroll del contenedor del contrato
    const contractContainer = document.querySelector(".custom-scrollbar");
    if (contractContainer) {
      contractContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Scroll suave hacia la primera sección
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
            </div>
          </div>
        </div>

        {/* Términos y condiciones y botón de continuar */}
        {showAccept && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={accepted}
                onCheckedChange={(checked: boolean) => setAccepted(checked)}
                className="h-5 w-5 border-2 border-gray-400 data-[state=unchecked]:bg-white data-[state=unchecked]:border-gray-400 data-[state=checked]:bg-[#FF4D00] data-[state=checked]:border-[#FF4D00] hover:border-[#FF4D00] hover:bg-orange-50 transition-colors"
              />
              <label
                htmlFor="terms"
                className="text-base font-semibold text-gray-800 cursor-pointer hover:text-[#FF4D00] transition-colors select-none"
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
      </section>

      {/* Tercera sección */}
      <section
        ref={thirdSectionRef}
        className="relative w-full min-h-[100vh] bg-[#FFFFFF] flex flex-col items-center py-8"
      >
        {/* Logo clickeable */}
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

        <div className="w-full max-w-3xl px-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Bienvenido al sistema de diagnóstico inteligente
            </h1>
            <p className="text-gray-600">Complete sus datos y comencemos</p>
          </div>

          <MagicCard
            className="overflow-hidden"
            gradientFrom="#FF4D00"
            gradientTo="#FFA500"
            gradientSize={300}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-1">
                    Nombre <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    {...form.register("name")}
                    className={`${form.formState.errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    aria-invalid={!!form.formState.errors.name}
                    placeholder="Solo letras"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname" className="flex items-center gap-1">
                    Apellido <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="surname"
                    type="text"
                    {...form.register("surname")}
                    className={`${form.formState.errors.surname ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    aria-invalid={!!form.formState.errors.surname}
                    placeholder="Solo letras"
                  />
                  {form.formState.errors.surname && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.surname.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className={`${form.formState.errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    aria-invalid={!!form.formState.errors.email}
                    placeholder="ejemplo@correo.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-1">
                    Edad <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="age"
                    type="text"
                    {...form.register("age")}
                    className={`${form.formState.errors.age ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    aria-invalid={!!form.formState.errors.age}
                    placeholder="18-120"
                  />
                  {form.formState.errors.age && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.age.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="flex items-center gap-1">
                    Altura (cm) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="height"
                    type="text"
                    {...form.register("height")}
                    className={`${form.formState.errors.height ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    aria-invalid={!!form.formState.errors.height}
                    placeholder="100-250"
                  />
                  {form.formState.errors.height && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.height.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center gap-1">
                    Peso (kg) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="weight"
                    type="text"
                    {...form.register("weight")}
                    className={`${form.formState.errors.weight ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    aria-invalid={!!form.formState.errors.weight}
                    placeholder="30-300"
                  />
                  {form.formState.errors.weight && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.weight.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    Género <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={form.watch("gender")}
                    onValueChange={(value) =>
                      form.setValue("gender", value as "M" | "F", { shouldValidate: true })
                    }
                  >
                    <SelectTrigger
                      className={`${form.formState.errors.gender ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      aria-invalid={!!form.formState.errors.gender}
                    >
                      <SelectValue placeholder="Seleccione género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.gender && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.gender.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Diabetes</Label>
                  <Select
                    value={form.watch("diabetes")}
                    onValueChange={(value) =>
                      form.setValue("diabetes", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No</SelectItem>
                      <SelectItem value="1">Tipo 1</SelectItem>
                      <SelectItem value="2">Tipo 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <Label>¿Fuma?</Label>
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant={form.watch("smoke") ? "default" : "outline"}
                      onClick={() => form.setValue("smoke", true)}
                      className="w-24"
                    >
                      Sí
                    </Button>
                    <Button
                      type="button"
                      variant={!form.watch("smoke") ? "default" : "outline"}
                      onClick={() => form.setValue("smoke", false)}
                      className="w-24"
                    >
                      No
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Label>¿Toma medicación para la presión arterial?</Label>
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant={
                        form.watch("bloodPressure") ? "default" : "outline"
                      }
                      onClick={() => form.setValue("bloodPressure", true)}
                      className="w-24"
                    >
                      Sí
                    </Button>
                    <Button
                      type="button"
                      variant={
                        !form.watch("bloodPressure") ? "default" : "outline"
                      }
                      onClick={() => form.setValue("bloodPressure", false)}
                      className="w-24"
                    >
                      No
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end pt-6">
                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                >
                  Continuar
                </Button>
              </div>
            </form>
          </MagicCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full h-[20vh] bg-[#1F3D69] flex items-center justify-center mt-auto">
        <div>{/* Contenido del footer */}</div>
      </footer>
    </main>
  );
}
