"use client";
import { SessionProvider } from "next-auth/react";
import Turnos from "@/pages/turnos";

export default function Index() {
  return (
    <SessionProvider>
      <Turnos />
    </SessionProvider>
  );
}
