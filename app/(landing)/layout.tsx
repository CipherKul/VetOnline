'use client';

import React from "react";
import Navbar from "../../components/layout/Navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
