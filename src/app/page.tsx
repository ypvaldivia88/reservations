"use client";
import { SessionProvider } from "next-auth/react";
import Appointments from "@/pages/appointments";

export default function Index() {
  return (
    <SessionProvider>
      <Appointments />
    </SessionProvider>
  );
}
