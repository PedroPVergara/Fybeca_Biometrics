import { Ripple } from "@/components/magicui/ripple";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Primera sección - 90vh */}
      <section className="relative flex h-[90vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
        <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
          Ripple
        </p>
        <Ripple />
      </section>

      {/* Segunda sección - 95vh */}
      <section className="w-full h-[95vh] bg-[#F8F8F3] flex items-center justify-center">
        <div>{/* Contenido de la segunda sección */}</div>
      </section>

      {/* Footer */}
      <footer className="w-full h-[25vh] bg-[#1F3D69] flex items-center justify-center mt-auto">
        <div>{/* Contenido del footer */}</div>
      </footer>
    </main>
  );
}
