"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const { data: session } = authClient.useSession();

    const user = session?.user || null;
    console.log("Current User:", user);

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await authClient.signOut();
        // Optionally, you can add a toast notification here
    };

    return (
        <nav className="w-full bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a]">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">

                {/* LEFT: Logo + Name */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="HaireLoop Logo"
                        width={40}
                        height={40}
                    />
                    <span className="text-lg font-semibold text-white">
                        HaireLoop
                    </span>
                </div>

                {/* MIDDLE: Menu (Glass pill style) */}
                <div className="hidden md:flex justify-items-end gap-8 px-4 py-2  rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-gray-300 text-sm">

                    <Link href="/jobs" className="hover:text-white transition ">
                        Browse Jobs
                    </Link>
                    <Link href="/company" className="hover:text-white transition">
                        Company
                    </Link>
                    <Link href="/pricing" className="hover:text-white transition ">
                        Pricing
                    </Link>
                </div>

                {/* RIGHT: Auth Section */}
                <div className="hidden md:flex items-center gap-4">
                    {!user ? (
                        <>
                            <Link
                                href="/auth/login"
                                className="text-indigo-400 hover:text-indigo-300 text-sm"
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/auth/register"
                                className="text-black bg-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition"
                            >
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div>Welcome, {user.name}!</div>
                            <Image
                                src={user?.image || "/avatar.png"}
                                alt="User"
                                width={36}
                                height={36}
                                className="rounded-full border border-white/20"
                            />
                            <button className="bg-red-500 text-white px-4 py-2 rounded-xl" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    className="md:hidden text-white text-xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
            </div>

            {/* MOBILE MENU */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3 text-gray-300 bg-[#111]">
                    <Link href="/jobs" className="block">
                        Browse Jobs
                    </Link>
                    <Link href="/company" className="block">
                        Company
                    </Link>
                    <Link href="/pricing" className="block">
                        Pricing
                    </Link>

                    {!user ? (
                        <>
                            <Link href="/auth/login" className="block text-indigo-400">
                                Sign In
                            </Link>
                            <Link
                                href="/auth/register"
                                className="block bg-white text-black px-4 py-2 rounded-xl"
                            >
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <button className="bg-red-500 text-white px-4 py-2 rounded-full" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}