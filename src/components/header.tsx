

import logo from "@/assets/logo.webp"
import Image from "next/image";
import NavLinks from "./navLinks";
import CurrentDate from "./currentDate";
import UserInfo from "./userInfo";



const Header = () => {


    return (
        <header className="w-10/12 mx-auto mt-2">
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

                        <CurrentDate></CurrentDate>
                    </div>

                </div>

                {/* Right: Auth Buttons */}
                <UserInfo></UserInfo>




            </div>
            <NavLinks></NavLinks>
        </header>
    );
};

export default Header;
