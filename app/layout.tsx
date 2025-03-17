import React from "react";
import "./globals.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata = {
  title: 'VetOnline',
  description: 'Get prescriptions from veterinarians online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-[Inter-Regular] flex flex-col bg-white">
        {children}
      </body>
    </html>
  );
}
