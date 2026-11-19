import type { Metadata } from "next";
import { MotionDirector } from "@/components/layout/MotionDirector";
import "@/demos/styles/demos.css";

/** Demos de clientes: fora do Google e sem o cabeçalho da Kodar. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function DemoLayout({ children }: LayoutProps<"/demo">) {
  return (
    <>
      <MotionDirector />
      {children}
    </>
  );
}
