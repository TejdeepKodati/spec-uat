import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpecUAT — Agile Requirements Analysis & UAT Platform",
  description: "Automated BRD Synthesis, Bidirectional Traceability Matrix, UAT Test Generation, and Jira Sprint Alignment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {children}
        <div className="fixed bottom-4 right-4 z-50">
          <a
            href="https://github.com/TejdeepKodati/spec-uat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white/95 hover:bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-300 shadow-md backdrop-blur transition-all"
          >
            made with ♥ by Tejdeep
          </a>
        </div>
      </body>
    </html>
  );
}
