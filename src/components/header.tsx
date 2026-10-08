

import logo from "@/assets/logo.webp"
import Image from "next/image";
import Link from "next/link";
import NavLinksPage from "./navLinks";


const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
});

const Header = () => {
    

    return (
        <header className="w-10/12 mx-auto">
            <div className="relative flex items-center justify-between py-4">

                {/* Center: Logo + Name + Date */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">

                    <Image
                        src={logo}
                        alt="Header Logo"
                        width={40}
                        height={40}
                    />

                    <div>
                        <p className="text-2xl font-bold text-red-700">
                            Bangla News 24
                        </p>

                        <p className="text-[13px] text-gray-600">
                            {date}
                        </p>
                    </div>

                </div>

                {/* Right: Auth Buttons */}
                <div className="ml-auto flex items-center gap-3">
                    <Link
                        href="/signin"
                        className="px-4 py-2 rounded-md border border-gray-300 hover:text-red-700 border-none"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="px-3.5 py-1.5 rounded-md bg-red-700 text-white"
                    >
                        সাইন আপ
                    </Link>
                </div>

            </div>
            <NavLinksPage></NavLinksPage>
        </header>
    );
};

export default Header;