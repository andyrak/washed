"use client"
import { signOut } from "next-auth/react";

const handleLogout = () => {
  signOut({callbackUrl: process.env.NEXTAUTH_URL});
}

const SignoutBadge = () => {
  return (
    <div className="fixed top-0 right-0 z-10 p-4">
      <button
        className="flex px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-primary hover:bg-opacity-80"
        onClick={handleLogout}
        >
        Logout
        </button>
    </div>
  );
};

export default SignoutBadge;