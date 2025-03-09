import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fybeca Biometrics",
  description: "Sistema biométrico de Fybeca",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
