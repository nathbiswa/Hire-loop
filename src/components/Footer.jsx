import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#0f0f0f] border-t border-white/10 mt-20">
            <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 text-gray-400">
                {/* Branding */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Image
                            src={"/logo.png"}
                            alt="HaireLoop Logo"
                            width={50}
                            height={50}
                            className="mb-4"

                        />
                        <h2 className="text-white text-lg font-semibold">HaireLoop</h2>
                    </div>

                    <p className="text-sm mt-2">
                        Find jobs, connect with companies, and grow your career.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-white font-medium">Quick Links</h3>
                    <Link href="/jobs" className="hover:text-white">Browse Jobs</Link>
                    <Link href="/company" className="hover:text-white">Company</Link>
                    <Link href="/pricing" className="hover:text-white">Pricing</Link>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-white font-medium mb-3">Follow Us</h3>
                    <div className="flex gap-4 text-lg">

                        <a href="#" className="hover:text-white">
                            <FaFacebook /></a>

                        <a href="#" className="hover:text-white transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-white transition">
                            <FaLinkedin />
                        </a>
                        <a href="#" className="hover:text-white transition">
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/10 text-center text-gray-500 text-sm py-4">
                © {new Date().getFullYear()} HaireLoop. All rights reserved.
            </div>
        </footer>
    );
}