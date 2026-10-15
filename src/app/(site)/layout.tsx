import type { ReactNode } from "react";
import { Analytics } from "@/components/Analytics";
import "./globals.css";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
