import "@/app/globals.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import FloatingBadge from '@/components/FloatingBadge';

export const metadata = {
  title: "Login with Spotify",
  description: "Login page to authenticate through Spotify",
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
        </body>
      </NextAuthProvider>
    </html>
  );
}