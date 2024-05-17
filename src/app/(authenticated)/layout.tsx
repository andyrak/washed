import "@/app/globals.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";


export const metadata = {
  title: "Washed",
  description: "Are your listening tastes washed?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className="h-screen flex flex-col overflow-hidden bg-background text-white items-stretch p-2">
            <div className="grid grid-cols-10">
              <div className="flex flex-col h-[87vh] col-span-10 overflow-auto rounded-lg bg-paper-700">
                <main className="mx-8 my-4">
                    {children}
                </main>
              </div>
            </div>
        </body>
      </NextAuthProvider>
    </html>
  );
}