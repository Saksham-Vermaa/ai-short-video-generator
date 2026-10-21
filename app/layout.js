import { ClerkProvider, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "ShortAI - AI Video Generator",
};

export default async function RootLayout({ children }) {
  const { userId } = await auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-950 text-white min-h-screen">
          <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
            <a href="/" className="text-xl font-bold">🎬 ShortAI</a>

            {userId ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-gray-300 hover:text-white">
                  Dashboard
                </Link>
                <UserButton />
              </div>
              ) : (
              <SignInButton mode="modal">
                <button className="bg-white text-black px-4 py-2 rounded-lg font-medium">
                  Sign in
                </button>
              </SignInButton>
              )
            }
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}