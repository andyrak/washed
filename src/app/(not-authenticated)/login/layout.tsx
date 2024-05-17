import "@/app/globals.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import FloatingBadge from '@/components/FloatingBadge';

export const metadata = {
  title: "Am I Washed?",
  description: "Login with Spotify to see if your music tastes are washed.",
  icon: "/favicon.ico",
};

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className="text-white bg-paper-700">
          <main>{children}</main>
          <FloatingBadge />
        </body>
      </NextAuthProvider>
    </html>
  );
}