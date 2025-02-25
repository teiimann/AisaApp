import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/ui/navbar";


export const metadata: Metadata = {
  title: "AISA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
